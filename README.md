# Generador de Express

¡Bienvenido a **Generador de Express**! 🚀

Esta es una herramienta de línea de comandos (CLI) diseñada para automatizar la creación de proyectos backend con **Express.js**. Te permite configurar rápidamente una estructura base sólida, elegir tu lenguaje preferido (JavaScript o TypeScript) y tu gestor de paquetes favorito.

## ✨ Características

- **Multi-lenguaje**: Soporte nativo para **JavaScript** y **TypeScript**.
- **Gestores de Paquetes**: Elige entre **npm**, **yarn**, **pnpm** o **bun** para instalar tus dependencias.
- **Estructura Automática**: Genera una estructura de carpetas organizada para tu proyecto.
- **Dependencias Esenciales**: Instala automáticamente paquetes clave como:
  - `express`
  - `cors`
  - `dotenv`
  - `nodemon` (para desarrollo)
  - Tipos de TypeScript (`@types/express`, etc.) si se selecciona TS.

## 🛠️ Instalación y Uso

1. **Clonar el repositorio** (si no lo has descargado aún):

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd "Generador de express/CLI"
   ```

2. **Instalar dependencias del generador**:
   Asegúrate de estar en la carpeta `CLI` y ejecuta:

   ```bash
   npm install
   ```

3. **Ejecutar el generador**:
   Inicia la herramienta con:

   ```bash
   npm start
   ```

4. **Seguir las instrucciones**:
   La herramienta te hará una serie de preguntas interactivas:
   - 📝 **Nombre del proyecto**: Define el nombre de la carpeta de tu nuevo proyecto (por defecto `my-express-app`).
   - 💻 **Lenguaje**: Selecciona entre JavaScript o TypeScript.
   - 📦 **Gestor de paquetes**: Elige tu preferido para la instalación (`npm`, `yarn`, `pnpm`, `bun`).

## 📂 Estructura del Generador

El código fuente de esta herramienta se organiza de la siguiente manera:

- `bin/index.js`: Punto de entrada principal de la CLI.
- `lib/question.js`: Maneja las preguntas interactivas al usuario (usando `inquirer`).
- `lib/structure.js`: Lógica para crear las carpetas y archivos base del proyecto.
- `lib/dependencies.js`: Se encarga de instalar las dependencias seleccionadas usando el gestor de paquetes elegido.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la estructura generada o añadir más opciones (como bases de datos, testing, etc.), no dudes en abrir un _issue_ o enviar un _pull request_.

## 📄 Licencia

Este proyecto está bajo la Licencia **ISC**.
