# Planificador Meta Ads 30 Días

Aplicación complementaria para el libro digital **Crea Campañas de Meta con IA**. Transforma el plan de 30 días en una experiencia móvil tipo curso operativo: panel de progreso, calendario por fases, estrategia, tarea diaria, lista de tareas, notas, recursos y exportación.

## Producto

**Promesa:** que una persona principiante sepa exactamente qué hacer cada día para montar, lanzar y optimizar su primera campaña de Meta Ads sin perderse en Ads Manager.

**Usuario ideal:** pequeños negocios, creadores, freelancers, marcas personales, tiendas online e infoproductores que quieren lanzar anuncios en Facebook e Instagram con estructura.

**Precio sugerido:** 29-49 EUR como app complementaria premium, o bono de alto valor junto al libro digital.

## Funciones

- Pantalla `Hoy` con progreso circular, racha, hitos y siguiente acción.
- Calendario de 30 días dividido en 4 fases: cimientos, creatividad, lanzamiento y optimización.
- Detalle diario con imagen, objetivo, lista de tareas interactiva, plan de acción, notas locales y recursos.
- Pantalla `Estrategia` con resumen de campaña, estado del pixel, creativos, próximos pasos y exportación.
- Pantalla `Perfil` para editar marca, oferta, audiencia, objetivo, presupuesto, CPA y ROAS.
- Persistencia local con `localStorage`.
- Exportación Markdown y opción de imprimir como PDF desde el navegador.
- Diseño móvil inspirado en una app premium de aprendizaje/operaciones.

## Arquitectura

- `src/App.tsx`: orquestador fino de pantallas.
- `src/data/plannerData.ts`: fases, lecciones, textos, imágenes y estado inicial.
- `src/hooks/usePlannerState.ts`: estado, progreso, navegación, notas, exportación y acciones.
- `src/screens/`: pantallas principales (`Hoy`, `Calendario`, `Estrategia`, `Perfil`).
- `src/components/ui/`: piezas reutilizables como botones, métricas, cabeceras y progreso.
- `src/components/planner/`: componentes específicos del plan, como tareas, recursos y línea temporal.
- `src/lib/`: utilidades puras de progreso, almacenamiento, exportación y texto.
- `src/styles/tokens.css`: colores, espacios, radios, sombras y dimensiones globales.

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

La versión compilada queda en `dist/`.

## Datos y privacidad

No usa cuentas, servidor ni claves de IA. Toda la información del usuario se guarda en el navegador mediante `localStorage`. Las exportaciones se generan localmente.

## Siguiente versión comercial

- Modo IA en servidor para generar textos, guiones y diagnósticos.
- Exportación PDF con marca blanca.
- Múltiples campañas por usuario.
- Recordatorios diarios/semanales.
- Biblioteca de plantillas por nicho.
