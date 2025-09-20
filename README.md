# Next-Prisma-Base
##### Criado por Leandro Sobrinho
[![GitHub Repo](https://img.shields.io/badge/GitHub-next--prisma--base-blue?logo=github)](https://github.com/leandroauzier/next-prisma-base)

# Instalação

### instalar pacotes com pnpm:
```bash
pnpm i
```
### Gerar Auth secret pro .env:
```bash
npx auth secret
```
### Depois de criar um database e pôr no env conforme o .env.example, gere o schema prisma com o commando:
```bash
npx prisma generate
```

### Em seguida para salvar no banco: 
```bash
npx prisma db push
```

### ⚠ OBS: Se quiser gerar a Seed base do projeto pra criar um usuário padrão com role **DEV**, rode o comando:
```bash
npx prisma db seed
```

##  Pronto! Você já pode testar rodando o comando : ```pnpm run dev```