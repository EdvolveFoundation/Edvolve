FROM node:22-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

ARG GIT_REF=main
RUN git clone --depth=1 --branch "${GIT_REF}" https://github.com/EdvolveFoundation/Edvolve.git .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm ci
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
