function $(el)
{
    return document.querySelector(el);
}

function TemporizadorH(callback, tempo)
{
    let tempoID;
    let inicio;
    let tempoDecorrido = tempo;

    function pausar() {
        clearTimeout(tempoID);
        tempoDecorrido -= new Date() - inicio;
    }

    function iniciar() {
        inicio = new Date();
        
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

// Zona de Execução do ConcentraH //
(function() {
    console.log("Visor")
})();
//

// # Execução de test
let contador = 60;
var concentraTempo = new TemporizadorH(function() {
    if(contador === 0)
    {
        contador = 60;
    }
    contador--; 
    console.log(contador);
}, 1000);
concentraTempo.iniciar()
