const html = document.querySelector("html");
const selectShortBreake = document.querySelector(".app__card-button--corto");
const selectLongBreake = document.querySelector(".app__card-button--largo");
const selectFocus = document.querySelector(".app__card-button--enfoque");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const inputFocusMusic = document.querySelector("#alternar-musica");
const starPauseButton = document.querySelector("#start-pause");
const textPauseButton = document.querySelector("#start-pause span");
const pauseIcon = document.querySelector(".app__card-primary-butto-icon");
const timer = document.querySelector("#timer");

//Instancias de sonidos
const music = new Audio("./sonidos/luna-rise-part-one.mp3");
const beep = new Audio("./sonidos/beep.mp3");
const pause = new Audio("./sonidos/pause.mp3");
const play = new Audio("./sonidos/play.wav");

let elapcedTimeInSecons = 1500;
let idInterval = null;

//activar volumen de sonidos
music.volume = true;
beep.volume = true;
pause.volume = true;
play.volume = true;

inputFocusMusic.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

selectFocus.addEventListener("click", () => {
  elapcedTimeInSecons = 1500;
  changeContext("enfoque");
  selectFocus.classList.add("active");
});

selectLongBreake.addEventListener("click", () => {
  elapcedTimeInSecons = 900;
  changeContext("descanso-largo");
  selectLongBreake.classList.add("active");
});

selectShortBreake.addEventListener("click", () => {
  elapcedTimeInSecons = 300;
  changeContext("descanso-corto");
  selectShortBreake.classList.add("active");
});

const changeContext = (context) => {
  viewTime();
  
  buttons.forEach((context) => {
    context.classList.remove("active");
  });

  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `./imagenes/${context}.png`);

  switch (context) {
    case "enfoque":
      title.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong" >sumérgete en lo que importa.</strong>`;
      break;
    case "descanso-largo":
      title.innerHTML = `Hora de volver a la superficie, <br>
                <strong class="app__title-strong" > Haz una pausa larga.</strong>`;
      break;
    case "descanso-corto":
      title.innerHTML = `¿Qué tal tomar un respiro? , <br>
                    <strong class="app__title-strong" >¡Haz una pausa corta!</strong>`;
      break;
  }
};

const countdown = () => {
  if (elapcedTimeInSecons <= 6) {
    beep.play();
  }
  if (elapcedTimeInSecons === 0) {
    alert("¡Tiempo cumplido!");
    textPauseButton.textContent = "Comenzar";
    pauseIcon.setAttribute("src", "./imagenes/play_arrow.png");
    restart();
    return;
  }
  textPauseButton.textContent = "Pausar";
  pauseIcon.setAttribute("src", "./imagenes/pause.png");
  elapcedTimeInSecons -= 1;
  viewTime();
};

starPauseButton.addEventListener("click", () => {
  initPause();
});

const initPause = () => {
  if (idInterval) {
    pause.play();
    beep.pause();
    textPauseButton.textContent = "Retomar";
    pauseIcon.setAttribute("src", "./imagenes/play_arrow.png");
    restart();
    return;
  }
  play.play();
  idInterval = setInterval(countdown, 1000);
};

const restart = () => {
  clearInterval(idInterval);
  idInterval = null;
};

const viewTime = () => {
  const time = new Date(elapcedTimeInSecons * 1000);
  const formatTime = time.toLocaleTimeString("es-CO", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${formatTime}`;
};

viewTime();
