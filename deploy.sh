#!/bin/bash

# 1. Definir el archivo donde se guardará la versión
VERSION_FILE=".version"

# Si el archivo no existe, iniciamos en la versión base
if [ ! -f "$VERSION_FILE" ]; then
    echo "2.2.0" > "$VERSION_FILE"
fi

CURRENT_VERSION=$(cat "$VERSION_FILE")

# 2. Separar la versión en Mayor, Menor y Parche (ej. 2.2.1)
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR="${VERSION_PARTS[0]}"
MINOR="${VERSION_PARTS[1]}"
PATCH="${VERSION_PARTS[2]}"

# Incrementar el parche (+1)
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

echo "🚀 Iniciando despliegue automatizado..."
echo "📦 Versión anterior: v$CURRENT_VERSION -> Nueva versión: v$NEW_VERSION"

# Detener el script si algún comando falla
set -e

# 3. Compilar Angular
echo "🔨 [1/3] Compilando frontend (Angular)..."
cd frontend
# Limpiamos la carpeta anterior para no dejar basura
rm -rf ../backend/public

# Compilamos
npm run build -- --output-path=../backend/public

# Movemos los archivos de /browser a la raíz de /public
if [ -d "../backend/public/browser" ]; then
    mv ../backend/public/browser/* ../backend/public/
    rm -rf ../backend/public/browser
fi
cd ..

# 4. Construir y subir Docker
echo "🐳 [2/3] Construyendo imagen Docker (v$NEW_VERSION)..."
cd backend
docker build -t rodrigobnh/hsi-tickets:v$NEW_VERSION .

echo "☁️ [3/3] Subiendo imagen a Docker Hub..."
docker push rodrigobnh/hsi-tickets:v$NEW_VERSION
cd ..

# 5. Guardar la nueva versión para la próxima ejecución
echo "$NEW_VERSION" > "$VERSION_FILE"
echo "✅ Imagen v$NEW_VERSION empaquetada y subida a Docker Hub con éxito."
echo "📝 Proceso local finalizado. Ingresa manualmente por SSH a la VM para actualizar el .env con \"nano .env\" y ejecutar docker compose."
