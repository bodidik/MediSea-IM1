# FILE: server/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Sadece server'ın package dosyaları
COPY package*.json ./
RUN npm ci --only=production

# Kaynakları tek tek kopyala (case-sensitive güvenli)
COPY server.js ./server.js
COPY controllers ./controllers
COPY routes ./routes
COPY models ./models
COPY middlewares ./middlewares
COPY utils ./utils
COPY calculators ./calculators
COPY seed ./seed
COPY scripts ./scripts

# Emniyet: her şeyi de kopyala (bir şey eksik kalmasın)
COPY . .

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "server.js"]
