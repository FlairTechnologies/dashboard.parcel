# ------------ Builder Stage -------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN  npm install --legacy-peer-deps

    
    COPY . .
    
    RUN npm run build
    
    # ------------ Production Stage -------------
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    # Only copy the necessary files
    COPY --from=builder /app/.next .next
    COPY --from=builder /app/public public
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules node_modules
    COPY --from=builder /app/next.config.mjs ./
    
    ENV NODE_ENV production
    EXPOSE 3000
    
    CMD ["npm", "start"]