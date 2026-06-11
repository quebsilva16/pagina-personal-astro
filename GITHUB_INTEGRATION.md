# Integración con GitHub 🚀

Se han añadido tres componentes nuevos que integran tu perfil de GitHub en tu página personal:

## Componentes Agregados

### 1. **GitHubStats** (Opción B)
Muestra estadísticas de tu perfil de GitHub:
- Número de repositorios públicos
- Seguidores
- Personas que sigues

Se renderiza antes de la sección de Gallery.

### 2. **GitHubRepositories** (Opción A)
Muestra tus 6 repositorios más destacados (ordenados por estrellas):
- Nombre del repositorio
- Descripción
- Cantidad de estrellas
- Lenguaje de programación
- Topics/etiquetas

Se renderiza entre Gallery y Experience.

### 3. **GitHubWidget** (Opción C)
Un widget compacto con tu información de perfil:
- Avatar
- Nombre y bio
- Localización
- Stats resumidas (repos, followers, following)
- Link al perfil de GitHub

Se renderiza antes del Footer.

## Configuración

### Variables de Entorno

Edita el archivo `.env.local` en la raíz del proyecto:

```env
# Cambia 'queb' por tu usuario de GitHub
GITHUB_USERNAME=tu-usuario-github

# Opcional: Token personal de GitHub para mayor límite de requests
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
```

### Cómo obtener tu token de GitHub (Opcional)

1. Ve a https://github.com/settings/tokens
2. Haz clic en "Generate new token" → "Generate new token (classic)"
3. Dale un nombre (ej: "Personal Website")
4. Selecciona permisos: solo `public_repo`
5. Genera el token y cópialo en `.env.local`

**Nota:** Sin token puedes hacer 60 requests/hora. Con token: 5000 requests/hora.

## Cómo funcionan

Todos los componentes traen datos en tiempo real de la GitHub API:
- Al construir la página (build time), se obtienen los datos
- Se cachean en el HTML generado
- Cada vez que hagas un rebuild, se actualizan los datos

## Personalizaciones

Si deseas cambiar la cantidad de repositorios mostrados, edita `src/components/GitHubRepositories.astro`:

```astro
// Línea ~3
const repositories = await getRepositories(6); // Cambia 6 por el número que desees
```

## Estilos

Todos los componentes están diseñados para coincidir con tu tema:
- Utilizan el color violeta como color principal
- Responsive en móviles
- Animaciones suaves con transiciones

## API Endpoint

La integración utiliza la GitHub API v3 de forma gratuita:
- `GET /users/{username}` - Información del usuario
- `GET /users/{username}/repos` - Repositorios del usuario

Para más información: https://docs.github.com/en/rest

## Troubleshooting

### ¿No ves los datos?
1. Verifica que `GITHUB_USERNAME` sea correcto en `.env.local`
2. El usuario debe ser público en GitHub
3. Revisa la consola del navegador en DevTools

### ¿Error de rate limit?
Si ves errores de límite de requests:
1. Añade un `GITHUB_TOKEN` válido en `.env.local`
2. Los tokens personales tienen un límite de 5000 requests/hora

### ¿Los datos no se actualizan?
Astro cachea los datos en build time:
1. Para actualizar, ejecuta: `pnpm run build`
2. O en desarrollo: `pnpm run dev` (se reconstruye con cambios)

