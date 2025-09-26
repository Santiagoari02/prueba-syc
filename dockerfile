# Etapa de build
FROM node:20 AS build

WORKDIR /usr/src/app

# 1. Instala dependencias
COPY package*.json ./
RUN npm ci

# 2. Copia todo el código fuente
COPY . .

# 3. Compila TypeScript a JS
RUN npm run build

# Etapa de producción
FROM node:20-slim

WORKDIR /usr/src/app

# 4. Copia solo lo necesario desde la etapa de build
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Crear usuario no-root para seguridad
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /usr/src/app
USER appuser

# 5. Expone el puerto
EXPOSE 3000

# 6. Arranca la app
CMD ["node", "dist/index.js"]