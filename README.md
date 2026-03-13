# 🏰 Disney Explorer

Aplicación web desarrollada con **Vue.js 3** que consume la API pública de Disney para explorar personajes del universo Disney.

## API Utilizada

**Disney API** — [https://api.disneyapi.dev](https://api.disneyapi.dev)

- Gratuita, sin necesidad de registro ni API key
- Más de 1.000 personajes con información de películas, series, videojuegos, aliados y enemigos

## Descripción del Aplicativo

Disney Explorer permite al usuario:
- Explorar un catálogo de personajes Disney con imágenes, nombres y películas
- Buscar personajes por nombre en tiempo real
- Ver el detalle completo de cada personaje (películas, series, videojuegos, etc.)
- Guardar personajes como favoritos (persistidos en localStorage)
- Navegar entre páginas del catálogo

## Instrucciones de Ejecución

### Requisitos previos
- Node.js 18 o superior
- npm

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

### Para construir y desplegar en Vercel

```bash
# Construir para producción
npm run build

# Desplegar en Vercel (requiere CLI de Vercel instalado)
npx vercel deploy
```

## Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| Vue.js 3 | Framework frontend principal |
| Vue Router 4 | Navegación entre vistas |
| Axios | Consumo de API REST |
| Vite | Bundler y servidor de desarrollo |
| CSS3 + Flexbox/Grid | Diseño responsive |
| Google Fonts (Cinzel + Lato) | Tipografías |
| Font Awesome 6 | Íconos |

## Estructura del Proyecto

```
disney-explorer/
├── src/
│   ├── components/
│   │   ├── NavBar.vue        # Barra de navegación responsive
│   │   ├── CharacterCard.vue # Tarjeta de personaje
│   │   ├── LoadingSpinner.vue# Indicador de carga
│   │   └── FooterBar.vue     # Pie de página
│   ├── views/
│   │   ├── Home.vue          # Página de inicio con hero y destacados
│   │   ├── Characters.vue    # Catálogo con búsqueda y paginación
│   │   ├── CharacterDetail.vue # Detalle de personaje
│   │   └── Favorites.vue     # Favoritos guardados
│   ├── App.vue               # Componente raíz
│   └── main.js               # Punto de entrada + configuración de rutas
├── index.html
├── vite.config.js
└── package.json
```

## Responsive Design

La app se adapta a 3 tamaños de pantalla:

- **PC (>1024px)**: Grilla de 5 columnas, layout completo
- **Tablet (768px - 1024px)**: Grilla de 3-4 columnas
- **Móvil (<768px)**: Grilla de 2 columnas, menú hamburguesa

## Vistas Principales

1. **Inicio** — Hero animado, estadísticas, 8 personajes destacados
2. **Personajes** — Catálogo completo con búsqueda y paginación
3. **Detalle** — Info completa de un personaje (películas, series, juegos, aliados, enemigos)
4. **Favoritos** — Personajes guardados por el usuario
