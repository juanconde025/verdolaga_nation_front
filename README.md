
---

### Frontend `README.md`

# Verdolaga Nation - Frontend

This is the frontend for the Verdolaga Nation application, an interactive social network. The frontend is built with React and configured with Vite for a fast development environment.

---

## Table of Contents

- [Frontend Requirements](#requisitos-frontend)
- [Frontend Installation and Configuration](#instalacion-y-configuracion-frontend)
- [Development Scripts](#scripts-de-desarrollo-frontend)

---

## Frontend Requirements

- **Node.js** (14.x or higher)
- **npm** (v7 or higher)

---

## Frontend Installation and Configuration

1. **Clone the repository**:
   ```bash
   git clone https://github.com/usuario/verdolaga-nation-frontend.git
   cd verdolaga-nation-frontend
   ```
2. **Install dependencies:**

Ensure you have npm installed on your machine. Then run:

```bash
npm install
```
3. **Configure environment variables:**

If you need to configure any environment variables (such as the backend URL or API keys), create a .env file in the root of your project and add the necessary variables:

```env
VITE_BACKEND_URL=http://localhost:8080
```
4. **Start the Vite development server:**
Run the following command to start the development server:

```bash
npm run dev
```
The frontend will start at http://localhost:5173.

5. **Development Scripts**
```yaml
npm run dev: Inicia el servidor de desarrollo de React (Vite).
npm run build: Construye la aplicación para producción.
npm run preview: Sirve la aplicación construida de producción.
```


