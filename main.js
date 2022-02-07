import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css'

const $ = el => document.querySelector(el); //* Function para pegar elementos html

const som="./sons/alarme1.mp3";

let tempoID;
let timer_pad = $(".tempoMinutos").value*60

function init (){
  $(".start").addEventListener("click", start);
  $(".stop").addEventListener("click", stop);
  $(".reset").addEventListener("click", reset);
  $(".save").addEventListener("click", save);

  if(localStorage.timer_on === 'true'){
    timerCount();
    $(".start").classList.add("disabled");
    $(".stop").classList.remove("disabled");
    // console.log("verdadeiro estou aqui");
  }else{
    localStorage.timer = Number(localStorage.timer) || timer_pad;
    localStorage.carry = localStorage.carry ? localStorage.carry : localStorage.timer;
    display(localStorage.timer);
    // console.log(localStorage.timer);
    // console.log("Localstorage é " + localStorage.timer_on);
  }
}

function timerCount(){
    if(Number(localStorage.timer) <= 0){
        $(".start").classList.remove("disabled");
        $(".stop").classList.add("disabled");
        toque();
        localStorage.timer_on = false;
        // alert("Tempo esgotou! alivia-se por 5 minutos depois volte o PomoCentra!");
        reset();
        return;
    }
    localStorage.timer--; // logica estara aqui
    display(localStorage.timer);
    tempoID = setTimeout(timerCount, 1000);
}

function display(timer) {
    let minutos = (timer / 60) | 0;
    let segundos = (timer % 60) | 0;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    $('.relogio').innerHTML = localStorage.timer_on === 'true' ? Date().slice(16, 21) : " ";
    $('.count').innerHTML = `${minutos}:${segundos}`;
    $("title").innerHTML = `${minutos}:${segundos} | Concentra`;
}

function start(){
    if(localStorage.timer_on != 'true')
    {
        localStorage.timer_on = true;
        // localStorage.carry = !localStorage.carry ? localStorage.timer;
        // console.log(carry);
        timerCount();

        $(".start").classList.add("disabled");
        $(".stop").classList.remove("disabled");
    }
    // 
    // $(".pausa").style.display="block";
}

function stop(){
    if(localStorage.timer_on === 'true')
    {
        localStorage.timer_on = false;
        clearTimeout(tempoID);
    }
    $(".start").classList.remove("disabled");
    $(".stop").classList.add("disabled");
}

function reset() {
    localStorage.timer = localStorage.carry;
    display(localStorage.timer);
}

function save(){
    localStorage.timer = $(".tempoMinutos").value*60;
    localStorage.carry = localStorage.timer;
    display(localStorage.timer);
}

async function  toque(){
    $("audio").src = await som;
    $("audio").play();
}
// iniciar o programa
init()