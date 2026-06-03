# IA Express

Mini app comercial basada en el ebook `100 Trucos de IA que Nadie te Cuenta`. Convierte el libro en un selector practico: el usuario indica su objetivo, tiempo disponible y caso real; la app recomienda los 3 trucos mas utiles, genera un prompt operativo y permite guardar progreso.

## Producto

**Promesa:** elegir el truco correcto de IA en minutos y salir con un prompt listo para copiar.

**Comprador ideal:** lectores del ebook, freelancers, creadores, estudiantes y profesionales que quieren aplicar IA sin perderse entre herramientas.

**Precio sugerido:** 19-39 EUR como companion premium del ebook, o incluido en un bundle con plantillas y workbook.

## Funciones

- Catalogo de 100 trucos organizado en 10 categorias.
- Recomendador por objetivo, tiempo disponible y texto del caso.
- Biblioteca con busqueda por tarea, herramienta, resultado o categoria.
- Prompt personalizado para el truco activo.
- Checklist de aplicacion por tipo de truco.
- Favoritos, completados y progreso persistente en `localStorage`.
- Exportacion Markdown del plan, top 3, prompt activo, favoritos y completados.
- Diseno responsive, mobile-first, sin backend y sin costes de IA.

## Desarrollo local

```bash
npm install
npm run dev
```

La app se abre por defecto en `http://127.0.0.1:5173`.

## Build

```bash
npm run build
```

La version compilada queda en `dist/`.

## Variables de entorno

Esta version no necesita variables de entorno. El archivo `.env.example` queda preparado para una futura mejora con IA server-side.

## Privacidad

El progreso, favoritos y caso escrito por el usuario se guardan solo en `localStorage` del navegador. No se envia informacion a servidores externos.

## Diseno

Archivo Figma de direccion visual: https://www.figma.com/design/l3F49M0USngguHyY133HfS

El rediseno actual usa una estructura de herramienta premium: ruta de hoy, recomendacion principal, selector de objetivo, top 3, biblioteca filtrable y panel de prompt/checklist. La maqueta Figma queda como base de handoff; el plan Starter de Figma limito las llamadas MCP antes de completar la captura automatica de la app.

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. Importalo en Vercel como proyecto Vite.
3. Usa `npm run build` como comando de build.
4. Usa `dist` como output directory.

## Siguiente version comercial

- Importar una seleccion de trucos desde el ebook y convertirla en retos de 7 dias.
- Modo "pack de prompts" exportable por categoria.
- Recomendaciones con IA mediante endpoint server-side y clave privada.
- Exportar CSV/JSON de favoritos y completados.
