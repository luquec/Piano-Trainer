# Piano Trainer

**Play here:** https://luquec.github.io/Piano-Trainer/  
**Video:** 

Piano Trainer es un juego web interactivo que permite aprender y practicar canciones en un piano virtual utilizando el teclado de la computadora o mouse.

## Cómo se juega
- **Notas caen y hit line:** Al elegir una canción y presionar *Play*, los bloques de notas caen desde la parte superior hacia la línea roja inferior (*Hit Line*).
Cuando una nota llega a la línea, la canción se detiene y espera hasta que presiones la tecla correcta para continuar.
- **Controles y notas:** Se utilizan 17 teclas del teclado físico que imitan la disposición de un piano real (de C4 a E5), aunque también puedes hacer clic con el mouse sobre las teclas en pantalla.
  - **Teclas blancas (fila base):** `A` (C4), `S` (D4), `D` (E4), `F` (F4), `G` (G4), `H` (A4), `J` (B4), `K` (C5), `L` (D5), `;` / `Ñ` (E5).
  - **Teclas negras (fila superior):** `W` (C#4), `E` (D#4), `T` (F#4), `Y` (G#4), `U` (A#4), `O` (C#5), `P` (D#5).
  - **Al acertar:** La tecla se ilumina en azul, suena su nota correspondiente y la canción avanza hacia la siguiente nota.
  - **Al fallar:** La tecla suena igualmente pero se ilumina en rojo y se suma un fallo (*Miss*) al contador.
  # Piano Trainer

## Canciones
- Twinkle, Twinkle, Little Star
- Ode to Joy
- Für Elise (opening theme)

## Créditos
- **Sonidos:** Generados de forma sintetizada en tiempo real utilizando la **Web Audio API** (`AudioContext` y osciladores de onda triangular) sin archivos de audio externos.
- **Canciones:** Melodías de dominio público estructuradas en arreglos de objetos con tono (`pitch`) y duración (`beats`).
- **Código base:** La estructura de datos inicial (`KEY_TO_PITCH` y `SONGS`), el cálculo de tiempos (`withStartBeats`), el bucle de animación (`frame`), los eventos básicos de teclado y
la síntesis de sonido (`midiOf` y `playTone`) fueron proporcionados como base en la guía del proyecto.# Piano Trainer

