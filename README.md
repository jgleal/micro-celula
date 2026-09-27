# Micro · misión vida

Juego de navegador para Biología de 1º de ESO y 1º de Bachillerato, con referencia curricular de Andalucía. Pilotaje con teclado, objetivos simultáneos y partidas cortas sin cuenta atrás. El conocimiento mantiene las rachas de puntos; la velocidad no puntúa. Ofrece controles de teclado y una modalidad táctil adicional.

## Ejecutar y comprobar

```sh
npm install
npm run dev
npm run build
node tests/game.cjs
```

En smartphone se activan joystick y botones: Entregar, Impulso, Soltar y Ampliar/Ver mapa. El joystick admite precisión de velocidad y movimiento simultáneo con el impulso. «Ampliar» sigue la nave a 1,8×. No cambia los objetivos ni la puntuación y no automatiza destinos. Las misiones siguen debajo del escenario en pantallas estrechas. Se recomienda orientación vertical. Desde «Guía → Cómo pilotar» se puede activar o desactivar este método; el teclado sigue disponible.

El gesto del joystick no desplaza la página; fuera de los controles se conserva el scroll y el zoom del navegador. Pausar, abrir paneles, cambiar de célula, girar la pantalla o interrumpir un gesto cancela el movimiento. El diseño y controles de escritorio se mantienen cuando el modo táctil está desactivado.

Vite requiere Node.js 20.19+ o 22.12+. La compilación produce `docs/`, que se publica mediante GitHub Pages.

## Elegir una partida

El menú superior permite elegir curso. Las pestañas Animal, Vegetal y Bacteria están disponibles desde el principio. Cada célula es una partida independiente: cambiar de célula o curso reinicia la ronda y vuelve a la bienvenida. Al completarla se muestra el resultado; «Otra partida» repite la selección actual.

Se recuerda el curso. Los récords son locales e independientes por curso y célula, porque las misiones y las puntuaciones máximas difieren. No hay cuentas ni clasificación compartida.

- **ESO:** encargos simbólicos que relacionan estructuras y funciones, sin ATP, reactivos moleculares ni rutas de fabricación. Animal tiene 6 misiones, vegetal 7 y bacteria 3. El núcleo y la membrana de las eucariotas siguen en el dibujo y la guía, sin añadir tareas a la ronda. RER y ribosomas aceptan PR; REL fabrica lípidos; Golgi organiza envíos. Son objetivos independientes: Golgi puede resolverse primero.
- **Bachillerato:** materiales y procesos conectados. Animal tiene 6 objetivos, vegetal 7 y bacteria 3 (energía y proteínas con dos operaciones cada una; ADN con una). La fotosíntesis genera alimento y oxígeno para la respiración vegetal. Ribosomas, RER, REL y Golgi utilizan energía. RER genera P y REL genera L para llevar al Golgi.

## Controles y puntuación

WASD/flechas: pilotar; Espacio: impulso y campo de recogida; E: entregar; Q: soltar la última ficha; H: revelar pista; Escape: pausa.

Recogida por proximidad, tres huecos de carga visibles orbitando el nanoguía. El impulso tiene recarga de 3 segundos y atrae fichas durante 1,2 segundos. Las fichas recién soltadas tienen un breve bloqueo de recogida. Los depósitos conservan materiales entregados; una entrega errónea conserva la carga y resta una de tres oportunidades. No se penaliza pasar cerca de un destino.

Los aciertos sin pista suman 100 puntos por el multiplicador, que sube cada dos aciertos hasta ×4. Completar la célula suma 200 puntos. Un error rompe la racha. La puntuación no sustituye una evaluación de comprensión.

## Ayuda y pistas

El botón `?` de cada misión muestra ayuda gratuita al pasar el puntero, enfocar con teclado o pulsar. Explica el objetivo y no altera racha, puntos ni contador de pistas.

«Revelar destino» y H muestran una pista concreta en un diálogo que detiene el pilotaje mientras se lee. Se identifica el objetivo y se explica el coste: su próximo acierto dará 40 puntos y reiniciará la racha. El objetivo queda marcado hasta que se realiza ese acierto. Volver a consultar la misma pista no vuelve a contabilizarla. Las pistas se aplican al objetivo indicado, aunque se resuelvan otros antes.

La guía es gratuita e incluye funciones, materiales, puntuación, contenido educativo, referencias y límites del modelo. Los textos son para todo el público.

## Referencia educativa

Anexo II de las órdenes andaluzas de 30 de mayo de 2023:

- [ESO](https://www.juntadeandalucia.es/boja/2023/104/36): BYG.1.C.1 y BYG.1.C.2, unidad celular y tipos/partes de células. RER, REL y Golgi se incluyen descriptivamente por petición docente.
- [Bachillerato](https://www.juntadeandalucia.es/boja/2023/104/37): conexiones con BGCA.1.F.1.1, fotosíntesis y nutrición vegetal, y BGCA.1.G.3.1, metabolismo bacteriano. Se practican aspectos de interpretación de modelos y resolución de problemas de los criterios 1.1 y 4.1. RER/REL/Golgi y el uso de energía son ampliación celular.

La correspondencia curricular es parcial. No se simula observación microscópica, experimentación o argumentación. Tampoco se exige memorizar glucólisis, Krebs, Calvin ni rendimientos reales de ATP.

## Modelo biológico

La célula vegetal representa una célula de hoja; la bacteria del modo Bachillerato es aerobia. Todas las bacterias no usan oxígeno. La respiración bacteriana se resume en una entrega a la membrana aunque intervienen citoplasma y membrana. Toda la membrana bacteriana, incluidos los extremos curvos, admite entregas al mismo depósito.

En Bachillerato, los costes de ATP son reglas ficticias. Una ficha representa múltiples moléculas y las cantidades no son estequiométricas. RER: AA + 4 ATP produce P; REL: PL + 4 ATP produce L; Golgi: P + L + 2 ATP prepara un envío. No significa que todos los lípidos sigan esa ruta. El nanoguía y su transporte son ficticios. En ESO todas las fichas representan encargos, no moléculas.

Referencias de funciones: [retículo endoplasmático](https://www.ncbi.nlm.nih.gov/books/NBK9889/) y [Golgi](https://www.ncbi.nlm.nih.gov/books/NBK9838/), NCBI Bookshelf.

## Interfaz y audio

Canvas con diseños de orgánulos dibujados por código. Bienvenida con la célula visible al fondo y un único botón de inicio. Curso en menú propio y célula en botones directos. Misiones en una columna para ambos cursos, con tipografía ampliada. El contenedor de misiones puede desplazarse internamente si acumula anotaciones de pistas; la página se ajusta a la altura de escritorio.

Audio en panel flotante colocado bajo su botón y limitado al viewport. Efectos sintetizados localmente y música ambiental independiente con dos volúmenes. Se activa tras interacción; no descarga pistas de audio. Audio, guía, pista y menú de curso suspenden el pilotaje mientras están abiertos. Los ajustes de audio permiten escuchar la mezcla.

## Validación

Pruebas de recursos finitos de ambos cursos, procesos independientes de ESO, dependencias de energía y productos de Bachillerato, entregas parciales y completas, límites, movimiento, impulso, audio, pistas sin doble cargo, ayuda gratuita, selección directa, final de ronda y récords por curso/célula. Comprobación en navegador de menús, diálogo de pista y página sin scroll a 1280 × 720. Dificultad y duración reales pendientes de prueba con alumnado.

La bacteria trabaja membrana, ribosomas y material genético. Se retiró la misión del citoplasma porque recoger y entregar en el mismo lugar no aportaba una decisión significativa. Su función se conserva en la guía y el dibujo. Una tarjeta fija indica el destino cercano y si se puede entregar; el dibujo resalta la estructura seleccionada sin añadir instrucciones flotantes. Se comprueban entregas en membrana completa, ADN y ribosomas. Los récords bacterianos se separan de las versiones con distinto número de misiones.

## Publicación

- Juego: https://jgleal.github.io/micro-celula/
- Repositorio: https://github.com/jgleal/micro-celula

GitHub Pages sirve `docs/` desde `main`. Las rutas relativas permiten ejecutar el juego en la subcarpeta del repositorio. `public/.nojekyll` evita el procesamiento Jekyll.

Para publicar una actualización, ejecuta `npm ci`, `npm test` y `npm run build`; incluye los cambios de código y de `docs/` en un commit y súbelo a `main`. GitHub publicará automáticamente la carpeta compilada. La compilación se hace localmente, no en un workflow de Actions.

Los récords se guardan en el navegador: los del servidor local no se trasladan al dominio público.

Validación táctil: pruebas automatizadas de desplazamiento analógico, dos identificadores de puntero, cancelación/pausa, impulso simultáneo, misma puntuación de entrega y dibujo ampliado. Diseño inspeccionado en viewport móvil. Pendiente valorar comodidad y precisión de los pulgares en un smartphone físico.
