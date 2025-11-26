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

- **Frontend**: React + React Router
- **Styling**: TailwindCSS
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
├── src/
│   ├── components/        # Componentes React reutilizables
│   ├── pages/            # Páginas de la aplicación
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Funciones auxiliares
│   ├── styles/           # Estilos globales
│   └── App.tsx           # Componente raíz
├── build/
│   ├── client/           # Assets estáticos
│   └── server/           # Código del servidor
├── public/               # Recursos públicos
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
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
