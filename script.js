

// ------------------------------  DATOS  ------------------------------

const KEY_TO_PITCH = {
  KeyA: "C4", KeyW: "C#4", KeyS: "D4", KeyE: "D#4", KeyD: "E4",
  KeyF: "F4", KeyT: "F#4", KeyG: "G4", KeyY: "G#4", KeyH: "A4",
  KeyU: "A#4", KeyJ: "B4", KeyK: "C5", KeyO: "C#5", KeyL: "D5",
  KeyP: "D#5", Semicolon: "E5",
};


const SONGS = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle, Little Star",
    composer: "Traditional",
    bpm: 90,
    notes: [
      { pitch: "C4", beats: 1 }, { pitch: "C4", beats: 1 }, { pitch: "G4", beats: 1 }, { pitch: "G4", beats: 1 },
      { pitch: "A4", beats: 1 }, { pitch: "A4", beats: 1 }, { pitch: "G4", beats: 2 },
      { pitch: "F4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "E4", beats: 1 },
      { pitch: "D4", beats: 1 }, { pitch: "D4", beats: 1 }, { pitch: "C4", beats: 2 },
      { pitch: "G4", beats: 1 }, { pitch: "G4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "F4", beats: 1 },
      { pitch: "E4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "D4", beats: 2 },
      { pitch: "G4", beats: 1 }, { pitch: "G4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "F4", beats: 1 },
      { pitch: "E4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "D4", beats: 2 },
      { pitch: "C4", beats: 1 }, { pitch: "C4", beats: 1 }, { pitch: "G4", beats: 1 }, { pitch: "G4", beats: 1 },
      { pitch: "A4", beats: 1 }, { pitch: "A4", beats: 1 }, { pitch: "G4", beats: 2 },
      { pitch: "F4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "E4", beats: 1 },
      { pitch: "D4", beats: 1 }, { pitch: "D4", beats: 1 }, { pitch: "C4", beats: 2 },
    ],
  },

  {
    id: "ode-to-joy",
    title: "Ode to Joy",
    composer: "Ludwig van Beethoven",
    bpm: 100,
    notes: [
      { pitch: "E4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "G4", beats: 1 },
      { pitch: "G4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "D4", beats: 1 },
      { pitch: "C4", beats: 1 }, { pitch: "C4", beats: 1 }, { pitch: "D4", beats: 1 }, { pitch: "E4", beats: 1 },
      { pitch: "E4", beats: 1.5 }, { pitch: "D4", beats: 0.5 }, { pitch: "D4", beats: 2 },
      { pitch: "E4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "G4", beats: 1 },
      { pitch: "G4", beats: 1 }, { pitch: "F4", beats: 1 }, { pitch: "E4", beats: 1 }, { pitch: "D4", beats: 1 },
      { pitch: "C4", beats: 1 }, { pitch: "C4", beats: 1 }, { pitch: "D4", beats: 1 }, { pitch: "E4", beats: 1 },
      { pitch: "D4", beats: 1.5 }, { pitch: "C4", beats: 0.5 }, { pitch: "C4", beats: 2 },
    ],
  },

  {
    id: "fur-elise",
    title: "Für Elise (opening theme)",
    composer: "Ludwig van Beethoven",
    bpm: 60,
    notes: [
      { pitch: "E5", beats: 0.25 }, { pitch: "D#5", beats: 0.25 },
      { pitch: "E5", beats: 0.25 }, { pitch: "D#5", beats: 0.25 }, { pitch: "E5", beats: 0.25 },
      { pitch: "B4", beats: 0.25 }, { pitch: "D5", beats: 0.25 }, { pitch: "C5", beats: 0.25 },
      { pitch: "A4", beats: 0.75 }, { pitch: "C4", beats: 0.25 }, { pitch: "E4", beats: 0.25 }, { pitch: "A4", beats: 0.25 },
      { pitch: "B4", beats: 0.75 }, { pitch: "E4", beats: 0.25 }, { pitch: "G#4", beats: 0.25 }, { pitch: "B4", beats: 0.25 },
      { pitch: "C5", beats: 0.75 }, { pitch: "E4", beats: 0.25 }, { pitch: "E5", beats: 0.25 }, { pitch: "D#5", beats: 0.25 },
      { pitch: "E5", beats: 0.25 }, { pitch: "D#5", beats: 0.25 }, { pitch: "E5", beats: 0.25 },
      { pitch: "B4", beats: 0.25 }, { pitch: "D5", beats: 0.25 }, { pitch: "C5", beats: 0.25 },
      { pitch: "A4", beats: 0.75 }, { pitch: "C4", beats: 0.25 }, { pitch: "E4", beats: 0.25 }, { pitch: "A4", beats: 0.25 },
      { pitch: "B4", beats: 0.75 }, { pitch: "E4", beats: 0.25 }, { pitch: "C5", beats: 0.25 }, { pitch: "B4", beats: 0.25 },
      { pitch: "A4", beats: 1.5 },
    ],
  },
];


const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


const PX_PER_BEAT = 120;  // block height for one beat


// ------------------------------  ESTADO  ------------------------------


let songBeat = 0;
let nextIndex = 0;        // the note the player must hit next
let lastTime = null;
let currentSong = null;
let noteBlocks = [];
let playing = false;
let animationId = null;
let misses = 0;


// ------------------------------  SONIDO  ------------------------------


const audio = new AudioContext();


function midiOf(pitch) {                 // "C#4" -> 61
  const octave = Number(pitch.slice(-1));
  return (octave + 1) * 12 + NAMES.indexOf(pitch.slice(0, -1));
}


function playTone(pitch) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "triangle";
  osc.frequency.value = 440 * 2 ** ((midiOf(pitch) - 69) / 12);
  gain.gain.setValueAtTime(0.3, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 1); // fade out
  osc.connect(gain).connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 1);
}


// ------------------------------  TECLAS  ------------------------------


function getKey(pitch) {
  return document.querySelector(`[data-pitch="${pitch}"]`);
}

function showKeyLabels() {
  for (const [code, pitch] of Object.entries(KEY_TO_PITCH)) {
    const label =  code === "Semicolon" ? ";" : code.replace("Key","");  //Si code es semicolon,  usar ;
    getKey(pitch).textContent = label;
  }
}

function pressKey(pitch) {
  audio.resume();
  playTone(pitch);
  getKey(pitch).classList.add("active");
  if (playing) checkNote(pitch);
}

function releaseKey(pitch) {
  getKey(pitch).classList.remove("active","wrong");
}


// ------------------------------  JUEGO  ------------------------------


function withStartBeats(notes) {
  let beat = 0;
  return notes.map((note) => {
    const timed = { ...note, start: beat };
    beat += note.beats;
    return timed;
  });
}

function startSong(song) {
  stopLoop();
  currentSong = {...song, notes: withStartBeats(song.notes) };
  showScreen("game");
  document.querySelector(".song-name").textContent = "Song: " + currentSong.title;
  document.getElementById("score-total").textContent = currentSong.notes.length;
  songBeat = 0;
  nextIndex = 0;
  misses = 0;
  updateScore();
  createNoteBlocks();
  draw();
}

function finishSong() {
  document.getElementById("result-value-correct").textContent = nextIndex;
  document.getElementById("result-value-wrong").textContent = misses;
  showScreen("results");
}


//Bar
const bar = document.querySelector(".bar");

function createNoteBlocks() {
  bar.querySelectorAll(".note-block").forEach((block) => block.remove()); //Borra blocks de partida anterior
  noteBlocks = [];
  const barRect = bar.getBoundingClientRect();
  for (const note of currentSong.notes) {
    const keyRect = getKey(note.pitch).getBoundingClientRect();  //Copia el tamaño de las teclas
    const block = document.createElement("div");
    block.className = "note-block";
    block.style.left = (keyRect.left - barRect.left - bar.clientLeft) + "px";
    block.style.width = keyRect.width + "px";
    block.style.height = note.beats * PX_PER_BEAT + "px";
    bar.appendChild(block);
    noteBlocks.push(block);
  }
}

function draw() {
  const hitY = bar.clientHeight;        //hit line
  currentSong.notes.forEach((note, i) => {
    const bottom = hitY - (note.start - songBeat) * PX_PER_BEAT;
    const top = bottom - note.beats * PX_PER_BEAT;
    noteBlocks[i].style.transform = `translateY(${top}px)`;
  });
}


function frame(now) {
  if (lastTime !== null) {
    const seconds = Math.min((now - lastTime) / 1000, 0.1); // cap big jumps (e.g. after a hidden tab)
    songBeat += seconds * (currentSong.bpm / 60);
    const next = currentSong.notes[nextIndex];
    if (next && songBeat >= next.start) songBeat = next.start; // wait at the line
  }
  lastTime = now;
  draw(); // each block: bottom edge at HIT_Y - (note.start - songBeat) * PX_PER_BEAT
  if (playing) animationId = requestAnimationFrame(frame);
}


//Loop
function startLoop() {
  stopLoop();          //Detiene si habia uno antes
  playing = true;
  lastTime = null;
  animationId = requestAnimationFrame(frame);
}

function stopLoop() {
  playing = false;
  cancelAnimationFrame(animationId);
}

//Score
function updateScore() {
  document.getElementById("score-value").textContent = nextIndex;
  document.getElementById("misses-value").textContent = misses;
}

function checkNote(pitch) {
  const expected = currentSong.notes[nextIndex];
  if (pitch === expected.pitch) {
    noteBlocks[nextIndex].classList.add("hit");
    nextIndex++;
    updateScore();
    if (nextIndex === currentSong.notes.length) finishSong();  //Detecta si hay mas notas por tocar
  } else {
      misses++;
      getKey(pitch).classList.add("wrong");
      updateScore();
    }
}


// ------------------------------  PANTALLAS  ------------------------------


//Mostrar/Ocultar menu
const screens = {
  menu: document.getElementById("menu-screen"),
  game: document.getElementById("game-screen"),
  results: document.getElementById("results-screen"),
};

function showScreen(name) {         
  if (name !== "game") stopLoop();                 //Solo muestra la pantalla que se llama
  for (const screen of Object.values(screens)) {
    screen.classList.add("hidden");
  }
  screens[name].classList.remove("hidden");
}

//Menu de canciones
function showSongList() {
  const list = document.getElementById("song-list");
  for (const song of SONGS) {
    const button = document.createElement("button");                  //Crea botones
    button.textContent = song.title;                                  //Label del boton
    button.className = "btn";                                         //style de btn de CSS
    button.addEventListener("click", () => startSong(song));          // Click inciia la cancion
    list.appendChild(button);                                         //boton hijo de div song-list
  }
}




//JUEGO

//RESULTADOS



// ------------------------------  EVENTOS  ------------------------------

//Teclado

document.addEventListener("keydown", (event) => {
  if (event.repeat) return;               // holding a key fires keydown again and again
  const pitch = KEY_TO_PITCH[event.code];
  if (!pitch) return;                     // not one of our keys
  pressKey(pitch);                        // the same function a mouse click calls
});

document.addEventListener("keyup", (event) => {
  const pitch = KEY_TO_PITCH[event.code];
  if (pitch) releaseKey(pitch);
});


//Mouse

const piano = document.querySelector(".piano");

piano.addEventListener("mousedown", (event) => {
  const pitch = event.target.dataset.pitch;
  if (!pitch) return;
  pressKey(pitch);
});

function handleMouseRelease(event) {
  const pitch= event.target.dataset.pitch;
  if (!pitch) return;
  releaseKey(pitch);
}

piano.addEventListener("mouseup", handleMouseRelease);
piano.addEventListener("mouseout", handleMouseRelease);




//Boton Free Play
document.getElementById("free-play-btn").addEventListener("click", () => showScreen("game"));

//Boton Play
document.getElementById("play-btn").addEventListener("click", () => {audio.resume(); startLoop()});

//Boton Back to Menu
document.getElementById("back-btn").addEventListener("click", () => showScreen("menu"));

//Boton Back desde Results screen
document.getElementById("results-back-btn").addEventListener("click", () => showScreen("menu"));

//Boton Play Again
document.getElementById("play-again-btn").addEventListener("click", () => {startSong(currentSong)});



// ------------------------------  INICIO  ------------------------------

showKeyLabels();

showSongList();
