# FILE: server/Dockerfile
FROM node:20-alpine AS runtime
WORKDIR /app

# Yalnızca bağımlılık manifestleri (cache dostu)
COPY package*.json ./

# Sadece prod bağımlılıkları
# npm v7+ için --omit=dev de olur: npm ci --omit=dev
RUN npm ci --only=production

# Uygulama kaynakları
COPY server.js ./server.js
COPY controllers ./controllers
COPY routes ./routes
COPY models ./models
COPY middlewares ./middlewares
COPY utils ./utils
COPY calculators ./calculators
COPY seed ./seed
COPY scripts ./scripts

# Ortam değişkenleri runtime'da verilecek
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# Güvenlik: non-root kullanıcı (opsiyonel ama önerilir)
# node imajında 'node' kullanıcısı hazır
USER node

CMD ["node", "server.js"]
