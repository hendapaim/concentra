function $(el)
{
    return document.querySelector(el);
}

// Zona de Execução do ConcentraH //
// # Execução de test
let horas = 1;
let minutos = 30;
let segundos = 60;

const concentraTempo = new TemporizadorH(function() {
    if(segundos === 0)
    {
        segundos = 60;
        minutos -= 1
    }else if(minutos === 0)
    {
        minutos = 60;
        horas -= 1;
    }else if(horas === 0)
    {
        console.log("Tempo acabou!")
    }
    
    segundos--; 
    $(".s").innerHTML = segundos;
    $(".m").innerHTML = minutos +":";
    $(".h").innerHTML = horas +":";
    console.log(segundos);
}, 1000);

$(".inicio").addEventListener("click", function(){
    concentraTempo.iniciar();
});
$(".pausa").addEventListener("click", function(){
    concentraTempo.pausar()
});
$(".cancelar").addEventListener("click", function(){
    concentraTempo.cancelar()
});
//console.log(concentraTempo.inicio)

function TemporizadorH(callback, tempo)
{
    let tempoID;
    let momentoDoInicio;
    let tempoDecorrido = tempo;

    function pausar() {
        clearTimeout(tempoID);
        tempoDecorrido -= new Date() - momentoDoInicio;
    }

    function iniciar() {
        momentoDoInicio = new Date();
        
        tempoID = setTimeout (function(){
            tempoDecorrido = tempo
            iniciar();
            callback();
        }, tempoDecorrido);
    }

    function cancelar() {
        tempoDecorrido = tempo;
    }

    this.iniciar = iniciar;
    this.pausar = pausar;
    this.cancelar = cancelar;
} 