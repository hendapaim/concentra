function $(el)
{
    return document.querySelector(el);
}

function hora(){

}

// Zona de Execução do ConcentraH //
// # Execução de test
let horas = 0;
let minutos = 1;
let segundos = 00;

const concentraTempo = new TemporizadorH(function() {
    if(segundos === 0 && minutos != 0)
    {
        minutos -= 1
        segundos = 60;
    }else if(minutos === 0 && horas != 0)
    {
        horas -= 1;
        minutos = 60;
    }else if(horas === 0 && minutos === 0 && segundos === 0)
    {   
        console.log("Tempo acabou!");
        alert("Tempo acabou");
    }
    
    segundos--; 
    
    $(".s").innerHTML = (segundos < 10) ? ("0" + segundos) : segundos;
    $(".m").innerHTML = ((minutos < 10) ? ("0" + minutos) : minutos) + ":";
    $(".h").innerHTML = `${horas}:`;
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