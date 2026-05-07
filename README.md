# hsi-helpdesk
Sistema de gestión de consultas, reclamos y solicitudes para usuarios de **Historia de Salud Integrada (HSI)** — Ministerio de Salud de La Rioja.

Reemplaza la atención informal por WhatsApp con una plataforma trazable, con chatbot 24/7 y escalamiento a agentes humanos.

---

## Descripción general

El sistema ofrece tres vistas diferenciadas según el rol:

| Rol | Acceso |
|-----|--------|
| **Usuario** | Chatbot con FAQ, formularios de autogestión, escalamiento a agente |
| **Agente** | Gestión de tickets derivados, registro de acciones, métricas operativas |
| **Owner** | Todo lo anterior + administración de usuarios, logs del sistema, supervisión |

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Go (Gin) |
| Frontend | Angular |
| Base de datos | MongoDB |
| Tiempo real | WebSockets |
| Auth | JWT + roles |
| Contenedores | Docker / Docker Compose |

---

## Estructura del repositorio

```
hsi-support-tickets/
├── backend/                  # API REST en Go
│   ├── cmd/server/           # Punto de entrada (main.go)
│   ├── internal/
│   │   ├── handlers/         # Controladores HTTP
│   │   ├── services/         # Lógica de negocio
│   │   ├── repositories/     # Acceso a MongoDB
│   │   ├── models/           # Structs de dominio
│   │   └── middleware/       # JWT, roles, CORS, logger
│   ├── domain/
│   │   ├── chatbot/          # Matching de FAQ, escalamiento, sesiones
│   │   ├── tickets/          # Estados y transiciones de tickets
│   │   └── roles/            # Definición de permisos por rol
│   ├── config/               # Variables de entorno, conexión MongoDB
│   ├── pkg/                  # Utilidades reutilizables (jwt, response, etc.)
│   ├── websocket/            # Hub y clientes para notificaciones en tiempo real
│   ├── seeder/               # Datos iniciales (FAQs, roles)
│   ├── .env.example
│   ├── go.mod
│   └── Dockerfile
│
├── frontend/                 # Aplicación Angular
│   └── src/app/
│       ├── core/             # Guards, interceptors, servicios globales
│       ├── shared/           # Componentes y pipes reutilizables
│       └── features/
│           ├── chatbot/      # Vista pública 24h
│           ├── agent/        # Dashboard del agente
│           ├── owner/        # Panel de supervisión
│           ├── forms/        # Formularios de autogestión
│           └── auth/         # Login (agente y owner)
│
├── docker-compose.yml
└── README.md
```

---

## Requisitos previos

- [Go](https://go.dev/) >= 1.21
- [Node.js](https://nodejs.org/) >= 18 y Angular CLI >= 17
- [Docker](https://www.docker.com/) y Docker Compose
- [MongoDB](https://www.mongodb.com/) >= 6 (o usar el contenedor incluido)

---

## Inicio rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/Historia-Clinica-La-Rioja/hsi-support-tickets.git
cd hsi-support-tickets
```

### 2. Configurar variables de entorno

```bash
cp backend/.env.example backend/.env
# Editar backend/.env con los valores del entorno local
```

Variables requeridas en `.env`:

```env
MONGO_URI=mongodb://localhost:27017
MONGO_DB=hsi_tickets
JWT_SECRET=cambiar_por_secreto_seguro
SERVER_PORT=8080
```

### 3. Levantar con Docker Compose

```bash
docker-compose up --build
```

Esto levanta:
- MongoDB en `localhost:27017`
- Backend Go en `localhost:8080`
- Frontend Angular en `localhost:4200`

### 4. Desarrollo local (sin Docker)

**Backend:**
```bash
cd backend
go mod download
go run cmd/server/main.go
```

**Frontend:**
```bash
cd frontend
npm install
ng serve
```

---

## Endpoints principales

| Método | Ruta | Descripción | Rol |
|--------|------|-------------|-----|
| `POST` | `/api/auth/login` | Autenticación | Agente / Owner |
| `GET` | `/api/faq` | Listado de preguntas frecuentes | Público |
| `POST` | `/api/tickets` | Crear ticket desde chatbot | Público |
| `GET` | `/api/tickets` | Listar tickets | Agente / Owner |
| `PATCH` | `/api/tickets/:id` | Actualizar estado de ticket | Agente / Owner |
| `GET` | `/api/metrics` | KPIs operativos | Agente / Owner |
| `GET` | `/api/admin/users` | Gestión de usuarios | Owner |
| `GET` | `/api/admin/logs` | Logs del sistema | Owner |
| `WS` | `/ws` | Canal tiempo real | Agente / Owner |

---

## Estados de un ticket

```
abierto → en_progreso → resuelto
                      ↘ escalado → en_progreso
```

---

## Contribución

1. Crear una rama desde `main`: `git checkout -b feature/nombre-de-la-feature`
2. Realizar los cambios y commits con mensajes descriptivos
3. Abrir un Pull Request hacia `main` con descripción del cambio

---

## Equipo

Desarrollado por el equipo de la **Dirección de Informática en Salud** — Ministerio de Salud de La Rioja.

Parte del ecosistema [Historia-Clinica-La-Rioja](https://github.com/Historia-Clinica-La-Rioja).
