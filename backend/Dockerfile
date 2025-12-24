# Stage1 for build porject
FROM node:24-alpine AS build

# Install pnpm at Global
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

# Stage2 for production/runtime
FROM node:24-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy file important for production
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 8055

CMD ["pnpm", "start"]