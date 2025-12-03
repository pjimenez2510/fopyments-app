# 💰 Fopyments App

Aplicación de gestión financiera personal desarrollada con Next.js 14, que permite a los usuarios administrar sus finanzas, presupuestos, deudas, metas de ahorro y transacciones de manera eficiente e intuitiva.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Ejecución](#-ejecución)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Testing](#-testing)
- [Docker](#-docker)
- [Contribución](#-contribución)

## ✨ Características

### 🔐 Autenticación y Seguridad
- Sistema de autenticación con NextAuth.js
- Registro de usuarios
- Inicio de sesión
- Recuperación de contraseña
- Protección de rutas mediante middleware

### 💵 Gestión Financiera
- **Presupuestos**: Crea y administra presupuestos mensuales con seguimiento en tiempo real
- **Transacciones**: Registra ingresos y gastos con categorización
- **Deudas**: Controla tus deudas y pagos pendientes
- **Metas de Ahorro**: Define y sigue el progreso de tus objetivos financieros
- **Métodos de Pago**: Gestiona tarjetas, cuentas bancarias y otros métodos de pago

### 📊 Reportes y Análisis
- Reportes financieros detallados
- Visualización de datos
- Análisis de gastos por categoría
- Seguimiento de progreso de metas

### 🎙️ Características Adicionales
- Grabación de audio para notas de voz
- Notificaciones en tiempo real con Socket.IO
- Interfaz moderna y responsiva
- Modo claro/oscuro
- Asistente virtual "Fopy"

## 🛠️ Tecnologías

### Frontend
- **[Next.js 14](https://nextjs.org/)** - Framework de React con App Router
- **[React 18](https://react.dev/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles sin estilos
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizables

### Gestión de Estado y Datos
- **[React Hook Form](https://react-hook-form.com/)** - Manejo de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas
- **[TanStack Query](https://tanstack.com/query)** - Gestión de estado asíncrono
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gestión de estado global

### Utilidades
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[date-fns](https://date-fns.org/)** - Manipulación de fechas
- **[Socket.IO Client](https://socket.io/)** - WebSockets en tiempo real
- **[NextAuth.js](https://next-auth.js.org/)** - Autenticación
- **[Lucide React](https://lucide.dev/)** - Iconos

### Testing
- **[Jest](https://jestjs.io/)** - Framework de testing
- **[Testing Library](https://testing-library.com/)** - Utilidades para testing de React
- **[MSW](https://mswjs.io/)** - Mock Service Worker para testing de APIs

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** o **pnpm**
- **Git**

## 🚀 Instalación

1. **Clona el repositorio**

```bash
git clone <url-del-repositorio>
cd fopyments-app
```

2. **Instala las dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

## 🔧 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=tu-secret-key-aqui

# Otras configuraciones
NODE_ENV=development
```

**Nota**: Nunca compartas tus variables de entorno en repositorios públicos.

## 🏃‍♂️ Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3001](http://localhost:3001)

### Modo Producción

```bash
# Construir la aplicación
npm run build

# Ejecutar la aplicación en producción
npm run start
```

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en el puerto 3001 |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción en el puerto 3001 |
| `npm run lint` | Ejecuta ESLint para verificar el código |
| `npm run test` | Ejecuta las pruebas con Jest |

## 📁 Estructura del Proyecto

```
fopyments-app/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── (auth)/            # Grupo de rutas de autenticación
│   │   ├── api/               # API Routes
│   │   ├── management/        # Rutas de gestión financiera
│   │   └── ...
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes de UI base (Shadcn)
│   │   └── rhf/              # Componentes de React Hook Form
│   ├── core/                 # Funcionalidades core
│   │   ├── hooks/            # Hooks personalizados globales
│   │   ├── infrastructure/   # Configuración de librerías
│   │   ├── layout/           # Layouts de la aplicación
│   │   ├── providers/        # Providers de contexto
│   │   └── services/         # Servicios base
│   ├── features/             # Módulos por funcionalidad
│   │   ├── auth/             # Autenticación
│   │   ├── budgets/          # Presupuestos
│   │   ├── transactions/     # Transacciones
│   │   ├── debts/            # Deudas
│   │   ├── goals/            # Metas
│   │   ├── payment-methods/  # Métodos de pago
│   │   └── reports/          # Reportes
│   ├── hooks/                # Hooks compartidos
│   ├── lib/                  # Utilidades y helpers
│   ├── shared/               # Código compartido
│   └── types/                # Tipos TypeScript globales
├── public/                    # Archivos estáticos
│   └── images/               # Imágenes
├── .env.local                # Variables de entorno (no versionado)
├── Dockerfile                # Configuración de Docker
├── jest.config.ts            # Configuración de Jest
├── next.config.mjs           # Configuración de Next.js
├── tailwind.config.ts        # Configuración de Tailwind
└── package.json              # Dependencias y scripts
```

### Arquitectura por Features

El proyecto utiliza una arquitectura basada en características (feature-based architecture), donde cada módulo contiene:

- **hooks/**: Hooks personalizados de React Query y lógica de estado
- **interfaces/**: Tipos e interfaces TypeScript
- **presentation/**: Componentes de UI específicos del feature
- **services/**: Servicios de API y lógica de negocio
- **utils/**: Utilidades específicas del feature
- **constants/**: Constantes y configuraciones

## 🧪 Testing

El proyecto incluye configuración para testing con Jest y React Testing Library.

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test -- --watch

# Ejecutar tests con coverage
npm run test -- --coverage
```

## 🐳 Docker

El proyecto incluye un `Dockerfile` para containerización.

```bash
# Construir la imagen
docker build -t fopyments-app .

# Ejecutar el contenedor
docker run -p 3001:3001 fopyments-app
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Código

- Usa TypeScript para todo el código nuevo
- Sigue las reglas de ESLint configuradas
- Escribe tests para nuevas funcionalidades
- Mantén los componentes pequeños y reutilizables
- Usa Tailwind CSS para estilos
- Documenta funciones complejas

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Autores

Desarrollado por el equipo de Fopyments.

## 📞 Soporte

Para soporte y consultas, por favor contacta al equipo de desarrollo.

---

**Hecho con ❤️ y Next.js**
