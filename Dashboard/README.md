# Dashboard de Palestras — React + Axios + OTP (Mock)

Projeto frontend completo com **React + Vite**, **Axios** com **interceptors**, **autenticação com e‑mail + OTP** (simulado), **CRUD** de Palestras/Usuários/Biblioteca/Voluntariado, **Calendário**, **Pesquisa global** e **Gráficos**.

## Rodando

```bash
npm install
npm run dev
```

> Por padrão uso **axios-mock-adapter** para simular a API. Para usar sua API real, remova `setupMockApi()` de `src/main.jsx` e ajuste `baseURL` em `src/services/api.js`.

## Rotas

- `/auth/login`, `/auth/register`, `/auth/otp`
- `/dashboard/overview` (KPIs + gráficos)
- `/dashboard/lectures` (CRUD)
- `/dashboard/users` (CRUD)
- `/dashboard/library` (CRUD)
- `/dashboard/calendar` (CRUD simples)
- `/dashboard/volunteers` (CRUD)
- `/dashboard/settings`

## Endpoints simulados (contrato)

- Auth: `POST /auth/register`, `POST /auth/login`, `POST /auth/otp/send`, `POST /auth/otp/verify`
- Palestras: `GET/POST/PUT/DELETE /lectures` (+ `GET /lectures/:id`)
- Usuários: `GET/POST/PUT/DELETE /users`
- Biblioteca: `GET/POST/PUT/DELETE /library`
- Eventos: `GET/POST/PUT/DELETE /events`
- Voluntariado: `GET/POST/PUT/DELETE /volunteers`

## Notas

- **Responsivo** (Tailwind). Sidebar vira drawer no mobile (placeholder).
- **Acessibilidade** básica: semântica e foco visível.
- **Busca global** (header) com debounce simulada sobre 4 módulos.
- **Proteção de rota** e **persistência de sessão** em `localStorage`.
- **Interceptors** de Axios para token e 401.


## Versão PRO (layout)
- Dark mode persistente
- Componentes UI reutilizáveis (Button, Input, Modal)
- Sidebar e Header aprimorados com drawer móvel
- Tabelas com estado vazio e ações mais limpas
- Formulários com modais profissionais


## Atualizações
- Gráficos agora têm **título, subtítulo, legenda e rótulo do eixo Y**.
- **Header** mais profissional (logo, campos acessíveis, ações compactas).
- **Sidebar** com ícones, seção “Menu” e indicador ativo.
