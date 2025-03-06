FROM node:20-alpine

RUN addgroup --system nextjs

RUN adduser --system nextjs

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN chown nextjs:nextjs .next

ENV PORT 3000

ENV NODE_ENV production

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
