FROM node:12
#
# Diretório cwd
#
WORKDIR /usr/src/mailer
#
# Copia a package
#
COPY package*.json ./
#
# Copia os arquivo do projeto
#
COPY . .
#
# Instala as depedencias
#
RUN npm install
#
# Compila o código fonte em typescript
#
RUN npm run compile
#
# Modo de produção
#
ENV NODE_ENV production
#
# remover devDependencies
#
RUN npm prune --production
#
# Inicia o serviço
#
CMD ["npm", "run", "start"]