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

func NewIAService(vmIP string) IAService {
	return &iaService{
		ollamaURL: fmt.Sprintf("http://%s:11434/api/generate", vmIP),
		modelName: "llama3.2:1b",
		client: &http.Client{
			Timeout: 45 * time.Second, 
		},
	}
}

type OllamaRequest struct {
	Model     string `json:"model"`
	Prompt    string `json:"prompt"`
	System    string `json:"system"`
	Stream    bool   `json:"stream"`
	KeepAlive string `json:"keep_alive,omitempty"`

type OllamaResponse struct {
	Response string `json:"response"`
}

func (s *iaService) AskChatbot(question string, context string) (string, error) {
	
	systemPrompt := fmt.Sprintf(`Eres un asistente virtual de soporte técnico del sistema de Historia Clínica Salud (HSI).
Tu función es responder consultas de usuarios de forma concisa, educada y clara (máximo 2 párrafos).
Basate ESTRICTAMENTE en la información provista en la BASE DE CONOCIMIENTO. Si la respuesta a la consulta no figura en la base de conocimiento o es un problema complejo, indícale amablemente que cree un Ticket de soporte desde la solapa "Tickets". No inventes respuestas.

%s`, context)

	reqBody := OllamaRequest{
		Model:  s.modelName,
		Prompt: question,
		System: systemPrompt,
		Stream: false,
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