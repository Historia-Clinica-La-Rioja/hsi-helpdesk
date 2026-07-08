# ==========================================
# ETAPA 1: Construir Frontend (Angular)
# ==========================================
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
# Copiamos package.json y descargamos dependencias
COPY frontend/package*.json ./
RUN npm install
# Copiamos el resto del código Angular y compilamos
COPY frontend/ .
RUN npm run build -- --configuration=production

# ==========================================
# ETAPA 2: Construir Backend (Go)
# ==========================================
FROM golang:alpine AS backend-build
WORKDIR /app/backend
# Copiamos dependencias de Go
COPY backend/go.mod backend/go.sum ./
RUN go mod download
# Copiamos el resto del código Go y compilamos
COPY backend/ .
RUN go build -o server ./cmd/server/main.go

# ==========================================
# ETAPA 3: Imagen Final de Producción
# ==========================================
FROM alpine:latest
WORKDIR /app

# 1. Traemos el ejecutable de Go (nuestro nuevo servidor web y API)
COPY --from=backend-build /app/backend/server .

# 2. Traemos los archivos compilados de Angular y los ponemos en la carpeta "public"
# OJO ACÁ: Usamos la ruta que descubrimos antes que genera tu Angular
COPY --from=frontend-build /app/frontend/dist/frontend/browser ./public

# Exponemos el puerto donde escucha Go
EXPOSE 8080

# Comando para arrancar el sistema
CMD ["./server"]