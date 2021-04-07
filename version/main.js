function $(el)
{
    return document.querySelector(el);
}

/*const duracao = {
    horas,
    minutos,
    segundos
}

*/

let horas ;
let minutos;
let segundos;
//Este codigo poderá sofre ajustes nas proximas atualizações
for(let hora = 0; hora <= 23; hora++)
{
    let optionHTML = document.createElement("option");
    optionHTML.text = hora;
    $('#hora').options.add(optionHTML, hora);  
}
for(let minuto = 0; minuto <= 59; minuto++)
{
    let optionHTML = document.createElement("option");
    optionHTML.text = minuto;
    $('#minuto').options.add(optionHTML, minuto);
}
for(let segundo = 0; segundo <= 59; segundo++)
{
    let optionHTML = document.createElement("option");
    optionHTML.text = segundo;
    $('#segundo').options.add(optionHTML, segundo);
}

$('#hora').addEventListener('change', (e) => {
    let indice = e.target.selectedIndex;
    horas = parseInt(e.target.options[indice].text);
    console.log(horas)
});
$('#minuto').addEventListener('change', (e) => {
    let indice = e.target.selectedIndex;
    minutos = parseInt(e.target.options[indice].text);
    console.log(minutos)
});
$('#segundo').addEventListener('change', (e) => {
    let indice = e.target.selectedIndex;
    segundos = parseInt(e.target.options[indice].text);
    console.log(segundos)
});


$(".inicio").addEventListener("click", function(){
    if(segundos > 0)
        concentraTempo.iniciar();
});
$(".pausa").addEventListener("click", function(){
    concentraTempo.pausar()
});
$(".cancelar").addEventListener("click", function(){
    concentraTempo.cancelar()
});


// Zona de Execução do ConcentraH //
// # Execução de test

const concentraTempo = new TemporizadorH(function() {
    if(segundos >= 0)
    {
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
            concentraTempo.cancelar()
        }
    
        segundos--; 
    
        $(".s").innerHTML = (segundos < 10) ? ("0" + segundos) : segundos;
        $(".m").innerHTML = ((minutos < 10) ? ("0" + minutos) : minutos) + ":";
        $(".h").innerHTML = (horas > 0) ? `${horas}:` : "";
    }
    console.log(segundos);
}, 1000);

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
        clearTimeout(tempoID);
    }

    this.iniciar = iniciar;
    this.pausar = pausar;
    this.cancelar = cancelar;
} 