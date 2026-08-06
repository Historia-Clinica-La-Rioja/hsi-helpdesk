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

type OllamaOptions struct {
	NumCtx     int `json:"num_ctx,omitempty"`
	NumPredict int `json:"num_predict,omitempty"`
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
	systemPrompt := fmt.Sprintf(`Eres "Asistente HSI", el soporte técnico oficial. 
Tu única misión es transmitir la información de las guías oficiales de forma íntegra.

BASE DE CONOCIMIENTO:
%s

INSTRUCCIONES DE RESPUESTA:
1. Busca la solución en la BASE DE CONOCIMIENTO.
2. Si está ahí, TRANSCRIBE LA RESPUESTA COMPLETA, PALABRA POR PALABRA. Incluye todos los números, pasos y aclaraciones finales. Tu respuesta debe ser un clon del texto original.
3. Si el problema NO está en la base de conocimiento, responde exactamente esto: "Ese inconveniente no figura en mis guías. Por favor, creá un Ticket indicando: Establecimiento, Módulo y Descripción del error."
4. Si la pregunta NO es sobre el sistema HSI (deportes, clima, etc), responde: "Disculpá, solo puedo responder consultas sobre el uso del sistema HSI."`, context)

	reqBody := OllamaRequest{
		Model:     s.modelName,
		Prompt:    question,
		System:    systemPrompt,
		Stream:    false,
		KeepAlive: "1h",
		Options: OllamaOptions{
			NumCtx:     1024,
			NumPredict: 400,
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