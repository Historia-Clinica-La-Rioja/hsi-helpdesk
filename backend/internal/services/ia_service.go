package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type IAService interface {
	AskChatbot(question string, context string) (string, error)
}

type iaService struct {
	ollamaURL string
	modelName string
	client    *http.Client
}

// 👇 ACÁ ESTABA EL ERROR: Faltaba declarar NumPredict en esta estructura
type OllamaOptions struct {
	NumCtx     int `json:"num_ctx,omitempty"`
	NumPredict int `json:"num_predict,omitempty"` // 👈 Ahora sí está declarado
}

type OllamaRequest struct {
	Model     string        `json:"model"`
	Prompt    string        `json:"prompt"`
	System    string        `json:"system"`
	Stream    bool          `json:"stream"`
	KeepAlive string        `json:"keep_alive,omitempty"`
	Options   OllamaOptions `json:"options,omitempty"`
}

type OllamaResponse struct {
	Response string `json:"response"`
}

func NewIAService(vmIP string) IAService {
	return &iaService{
		ollamaURL: fmt.Sprintf("http://%s:11434/api/generate", vmIP),
		modelName: "llama3.2:1b",
		client: &http.Client{
			Timeout: 90 * time.Second,
		},
	}
}

func (s *iaService) AskChatbot(question string, context string) (string, error) {
	// SYSTEM PROMPT CON REGLA DE CORTE ABSOLUTO
	systemPrompt := fmt.Sprintf(`Eres el asistente de soporte técnico del sistema HSI (Historia Clínica Salud).

REGLA DE ORO Y RECHAZO:
- Si el usuario pregunta sobre cualquier tema ajeno al sistema HSI (deportes, fútbol, clima, historia, cultura general, chistes, etc.), tu ÚNICA respuesta debe ser:
"Disculpá, solo puedo responder consultas sobre el uso del sistema HSI."
- Queda TOTALMENTE PROHIBIDO responder o dar datos sobre la pregunta fuera de tema.

INFORMACIÓN OFICIAL HSI:
%s

INSTRUCCIONES DE RESPUESTA:
1. Si la pregunta es sobre el sistema HSI y está en la INFO, responde usando esa información.
2. Si es un problema del sistema HSI que NO figura en la INFO, pide amablemente que creen un Ticket de soporte.
3. Respuestas breves y profesionales.`, context)

	reqBody := OllamaRequest{
		Model:     s.modelName,
		Prompt:    question,
		System:    systemPrompt,
		Stream:    false,
		KeepAlive: "1h",
		Options: OllamaOptions{
			NumCtx:     1024,
			NumPredict: 400, //
		},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	resp, err := s.client.Post(s.ollamaURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("error conectando con Ollama en la VM: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("Ollama devolvió código de error: %d", resp.StatusCode)
	}

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var ollamaResp OllamaResponse
	if err := json.Unmarshal(bodyBytes, &ollamaResp); err != nil {
		return "", err
	}

	return ollamaResp.Response, nil
}