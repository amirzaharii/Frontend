import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hi_hat from "./sounds/hi_hat.wav";
import kick from "./sounds/kick.wav";
import open_hat from "./sounds/open_hat.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tink from "./sounds/tink.wav";
import tom from "./sounds/tom.wav";

//changing game mode and app mode
let app_mode = "";
const start_game_btn = document.getElementById("start_game");
start_game_btn.addEventListener("click", () => {
  if (app_mode === "game") {
    start_game_btn.textContent = "Start Game";
    app_mode = "";
  } else {
    start_game_btn.textContent = "End Game";
    app_mode = "game";
  }
});

//recording mode
let record_mode = "";
const record = [];
var start;
const record_mode_btn = document.getElementById("record");
record_mode_btn.addEventListener("click", () => {
  if (app_mode === "record") {
    record_mode_btn.textContent = "Start Record";
    record_mode = "";
    app_mode = "";
  } else {
    record_mode_btn.textContent = "Stop Record";
    record_mode = "record";
    app_mode = "record";
  }

  //initiating the timestamp
  start = Date.now();
  console.log(record);
});

const key_config = [
  { id: "boom", key: "a", sound: boom },
  { id: "clap", key: "s", sound: clap },
  { id: "hi_hat", key: "d", sound: hi_hat },
  { id: "kick", key: "f", sound: kick },
  { id: "open_hat", key: "g", sound: open_hat },
  { id: "ride", key: "h", sound: ride },
  { id: "snare", key: "j", sound: snare },
  { id: "tink", key: "k", sound: tink },
  { id: "tom", key: "l", sound: tom },
];

//Setting timestamp by using getTime()
const time = { timestamp: "", key: "" }; //creating object for the timestamp and button click collection
const game_record = []; //creating array to include above objects later

//creating beats
const beats = ["f", "d", "f", "d", "f", "f", "d", "f", "d"];
const padding_count = 3;
const empty_array = Array(padding_count).fill("");

//<div class="card sequence-card">A</div>
const targets = document.getElementById("targets");
let new_array = [...empty_array, ...beats, ...empty_array];

//Game mode and counting score
let current_index = 0;
let score = 0;
const getActualPosition = () => current_index + padding_count;

const score_element = document.getElementById("score");
const updateTargets = () => {
  targets.innerHTML = "";
  const computed_array = new_array.slice(
    current_index,
    getActualPosition() + 4
  );
  if (app_mode === "game") {
    console.log(computed_array);
  }
  computed_array.forEach((item, index) => {
    const target_div = document.createElement("div");
    target_div.setAttribute(
      "class",
      `card sequence-card ${index === 3 ? "active" : ""}`
    );
    target_div.textContent = item;
    targets.appendChild(target_div);
  });
  score_element.textContent = score;
};
updateTargets();

/**
 * <div id="boom" class="card control">
     <div class="label container">Boom</div>
     <div class="key container">A</div>
   </div>
 */
const parent = document.getElementById("controls");
key_config.forEach((k) => {
  const control_div = document.createElement("div");
  control_div.setAttribute("id", k.id);
  control_div.setAttribute("class", "card control");

  const control_label = document.createElement("div");
  control_label.setAttribute("class", "label container");
  control_label.textContent = k.key;

  const control_key = document.createElement("div");
  control_key.setAttribute("class", "key container");
  control_key.textContent = k.id;

  control_div.appendChild(control_label);
  control_div.appendChild(control_key);
  parent.appendChild(control_div);

  control_div.addEventListener("click", (e) => {
    const audio = new Audio(k.sound);
    audio.play();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === k.key) {
      const audio = new Audio(k.sound);
      audio.play();
    }

    //if user key matches current tartget key then the increment happens
    if (app_mode === "game" && new_array[getActualPosition()] === e.key) {
      current_index++;
      score++;
    }

    //Finding the difference between two timestamp and pushing it to console log
    if (record_mode === "record") {
      if (e.key.toLocaleLowerCase() === k.key) {
        record.push({
          key: e.key,
          duration: Date.now() - start,
        });
        console.log(record);
      }
    }

    if (getActualPosition() >= new_array.legth - padding_count - 1) {
    }
    updateTargets();
  });
});
