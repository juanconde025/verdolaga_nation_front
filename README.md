
---

### Frontend `README.md`

# Verdolaga Nation - Frontend

Este es el frontend de la aplicación **Verdolaga Nation**, una red social interactiva. El frontend está construido con **React** y configurado con **Vite** para un entorno de desarrollo rápido.

---

## Tabla de Contenidos

- [Requisitos Frontend](#requisitos-frontend)
- [Instalación y Configuración Frontend](#instalacion-y-configuracion-frontend)
- [Scripts de Desarrollo](#scripts-de-desarrollo-frontend)

---

## Requisitos Frontend

- **Node.js** (14.x o superior)
- **npm** (v7 o superior)

---

## Instalación y Configuración Frontend

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/usuario/verdolaga-nation-frontend.git
   cd verdolaga-nation-frontend
   ```
2. **Instalar dependencias:**
Asegúrate de tener npm instalado en tu máquina. Luego ejecuta:

```bash
npm install
```
3. **Configurar las variables de entorno:**

Si necesitas configurar alguna variable de entorno (como la URL del backend o las claves API), crea un archivo .env en la raíz de tu proyecto y agrega las variables necesarias:

```env
VITE_BACKEND_URL=http://localhost:8080
```
4. **Iniciar el servidor de desarrollo con Vite:**
Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
npm run dev
```
El frontend se iniciará en http://localhost:3000.

5. **Scripts de Desarrollo**
```yaml
npm run dev: Inicia el servidor de desarrollo de React (Vite).
npm run build: Construye la aplicación para producción.
npm run preview: Sirve la aplicación construida de producción.
```


