# Notry Vision - Dashboard Administrativo

Sistema de gerenciamento com autenticação para **Admin**, **Operador** e **Supervisor**, desenvolvido em **Angular 20** com **Zard UI** (shadcn/ui para Angular).

## 📱 Páginas

| Cargo | URL | Funcionalidades |
|-------|-----|-----------------|
| admin | `/admin` | Dashboard completo + logout |
| operador | `/operador` | Interface operacional + logout |
| supervisor | `/supervisor` | Painel de supervisão + logout |
| Login | `/login` | Formulário de autenticação |

## 🔌 API Externa

**URL Base:** `https://api-notry-vision.vercel.app/api`

### `POST /api/login`

**Entrada:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**Saída (200):**
```json
{
  "id": 1,
  "username": "admin",
  "name": "Administrador",
  "cargo": "admin"
}
```

**Erro (401):**
```json
{ "message": "credenciais inválidas" }
```



## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 20+
- Angular CLI 20+

### 1. Clonar e Instalar
```bash
git clone <seu-repo>
cd notry-vision
npm install
```

### 2. Configurar API (opcional)
Edite `src/app/services/api.service.ts`:
```ts
baseUrl = environment.production 
  ? 'https://api-notry-vision.vercel.app/api'
  : 'http://localhost:3000/api';
```

### 3. Executar
```bash
ng serve
```
Acesse: `http://localhost:4200/login`

## 📂 Estrutura do Projeto

```
src/
├── app/
├── auth/
│   ├── auth.guard.ts
│   ├── redirect.guard.ts
│   └── role.guard.ts
├── pages/
│   ├── admin/
│   ├── login/
│   ├── operador/
│   └── supervisor/
├── services/
│   └── api.service.ts
│   └── auth.service.ts
├── shared/
│    └── components/ui
│    └── utils/

```

## 🎨 Tecnologias

- **Framework:** Angular 20 (Signals)
- **UI:** Zard UI + Tailwind CSS + SCSS
- **Linting:** ESLint + Prettier
- **HTTP:** Angular HttpClient
- **Rotas:** Angular Router (lazy loading)

## 👥 Credenciais de Teste

| Usuário | Senha | Cargo |
|---------|-------|-------|
| `admin` | `123456` | admin |
| `operador1` | `123456` | operador |
| `supervisor1` | `123456` | supervisor |
