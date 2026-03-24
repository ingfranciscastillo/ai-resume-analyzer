# 🤖 AI Resume Analyzer

Una aplicación moderna y potente que utiliza inteligencia artificial para analizar, evaluar y mejorar currículos vitae. Obtén retroalimentación instantánea sobre tu CV con puntuaciones detalladas, áreas de mejora y recomendaciones personalizadas.

## ✨ Características

- **Análisis Inteligente de CVs** - Análisis impulsado por IA que evalúa estructura, contenido y claridad
- **Puntuación Detallada** - Recibe calificaciones en múltiples categorías (experiencia, habilidades, formato, etc.)
- **Recomendaciones Personalizadas** - Sugerencias concretas para mejorar tu CV
- **Comparativa con Ofertas** - Analiza qué tan bien se ajusta tu CV a descripciones de empleo
- **Interfaz Intuitiva** - Diseño limpio y fácil de usar con TailwindCSS
- **Respuesta en Tiempo Real** - Feedback instantáneo mientras escribes o cargas documentos
- **Exportar Resultados** - Descarga un reporte completo de tu análisis

## 🛠️ Stack Tecnológico

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=flat&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

</div>

- **Frontend**: React 19 + React Router v7
- **Styling**: TailwindCSS + shadcn/ui
- **Backend**: Node.js (integrado con React Router)
- **IA**: Puter.js para análisis inteligente
- **Autenticación**: Puter.js para gestión de usuarios
- **Bundling**: Vite con HMR
- **Tipado**: TypeScript
- **Contenerización**: Docker (listo para producción)

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ instalado
- npm o pnpm
- Git

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ingfranciscastillo/ai-resume-analyzer.git
cd ai-resume-analyzer
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Comandos Disponibles

```bash
# Desarrollo con HMR
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview

# Lint del código
npm run lint
```

## 🐳 Despliegue con Docker

```bash
# Construir la imagen
docker build -t ai-resume-analyzer .

# Ejecutar el contenedor
docker run -p 3000:3000 ai-resume-analyzer
```

## 📁 Estructura del Proyecto

```
ai-resume-analyzer/
├── app/
│   ├── components/       # Componentes React reutilizables
│   ├── routes/          # Rutas de la aplicación (React Router v7)
│   ├── lib/             # Utilidades y configuraciones
│   ├── root.tsx         # Componente raíz
│   └── app.css          # Estilos globales
├── build/                # Output de producción
├── public/               # Recursos públicos
├── types/                # Definiciones de tipos TypeScript
├── constants/            # Constantes de la aplicación
├── components.json       # Configuración de shadcn/ui
├── package.json
├── tsconfig.json
├── vite.config.ts
└── react-router.config.ts
```

## 💡 Cómo Usar

1. **Autenticación** - Inicia sesión con tu cuenta de Puter.
2. **Carga tu CV** - Sube un archivo PDF.
3. **Análisis Automático** - Puter.js analiza tu CV en segundos
4. **Revisa tu Puntuación** - Observa tu calificación general y detallada
5. **Lee Recomendaciones** - Obtén sugerencias específicas de mejora

## 📊 Ejemplo de Análisis

El analizador evalúa:
- Estructura y formato del documento
- Claridad y concisión del contenido
- Presencia de habilidades clave
- Logros y métricas cuantificables
- Palabras clave del sector
- Puntuación de ATS (Applicant Tracking System)

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## ❓ Troubleshooting

### Error: "Port already in use"
Si el puerto 5173 está en uso, puedes especificar otro puerto:
```bash
npm run dev -- --port 3000
```

### Error de compilación en Docker
Asegúrate de tener la versión más reciente de Node.js (18+) y limpia el cache:
```bash
npm run build
docker build -t ai-resume-analyzer .
```

### Problemas con Puter.js
Verifica tu conexión a internet. Puter.js requiere acceso a sus servidores para autenticación y análisis de CVs.

## 👨‍💻 Autor

**Francis Castillo**
- GitHub: [@ingfranciscastillo](https://github.com/ingfranciscastillo)

## 🔗 Enlaces Útiles

- [Documentación Puter.js](https://docs.puter.com/)
- [Documentación React Router](https://reactrouter.com/)
- [Documentación TailwindCSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Construido con ❤️ usando React y IA**
