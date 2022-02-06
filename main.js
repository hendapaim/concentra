import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css'

const $ = el => document.querySelector(el); //* Function para pegar elementos html

let tempoID,
    tempoEmSegundos = 24*60;
let timer_on = false;

localStorage.timer_on = localStorage.timer_on || false; 
localStorage.timer = Number(localStorage.timer || 24);

if(localStorage.timer_on)
{
    display(localStorage.timer)
    
}else{
   timerCount();
   localStorage.timer_on = true; 
}

function timerCount(){
    localStorage.timer--;
    display(localStorage.timer);
    if(localStorage.timer <= 0){
        localStorage.timer_on = false; 
        return;
    }
   
    tempoID = setTimeout(timerCount, 1000);
}

function display(timer) {
    let minutos = (timer / 60) | 0;
    let segundos = (timer % 60) | 0;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    $('.relogio').innerHTML = Date().slice(16, 21);
    $('.count').innerHTML = `${minutos}:${segundos}`;
    $("title").innerHTML = `${minutos}:${segundos} | Concentra`;
}

function iniciar(){
    if(!timer_on && (localStorage.timer > 0))
    {
        localStorage.timer_on = true;
        timerCount();
    }
}
// Evento do button iniciar
$(".iniciar").addEventListener("click", function(){
    iniciar();
    // $(".iniciar").classList.add = "disable";
    // $(".pausa").style.display="block";
});

// $(".salvar").addEventListener("click", ()=> {
//     tempo = $(".tempoMinutos").value
//     tempoEmSegundos =tempo*60;
//     tempoDecorrido = tempoEmSegundos;
//     display(tempoDecorrido);
// })



// $(".pausa").addEventListener("click", function(){
//     pausar();
//     $(".pausa").style.display="none";
//     $(".inicio").style.display="block";
// });

// $("#cancelar").addEventListener("click", function(){
//     cancelar();
//     $(".pausa").style.display="none";
//     $(".inicio").style.display="block";
// });


function sons(){
    const som="./sons/alarme1.mp3"
    $("audio").src = som;
    $("audio").play();

    //alert("Tempo esgotou! alivia-se por 5 minutos depois volte o PomoCentra!");
}

// Chamadas dad funcition


// /*
// if(tempo<=999){
    
//     function temporizador()
//     {
//         // horas = (tempoDecorrido / 3600) | 0;
//         // minutos = (tempoDecorrido / 60) % 60 | 0;
//         display(tempoDecorrido);

//         tempoDecorrido--;
//         if (tempoDecorrido<0)
//         {
//             clearInterval(tempoID);
//             sons();
//             contagem = true;
//             tempoDecorrido = tempoEmSegundos;
//             display(tempoDecorrido);
//             $(".pausa").style.display="none";
//             $(".inicio").style.display="block";
//             return;
//         }
//         //console.log(tempoDecorrido)
//     }
// }else{
//     alert("O tempo deve ser menor que 999 minutos!")
// }
// */