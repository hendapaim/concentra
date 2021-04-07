
window.onload = function () {
    function $(el)
    {
        return document.querySelector(el);
    }

    let horas ;
    let minutos;
    let segundos;
    let tempo = 0;
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
        tempo += (horas * 3600);
        console.log(horas)
    });
    $('#minuto').addEventListener('change', (e) => {
        let indice = e.target.selectedIndex;
        minutos = parseInt(e.target.options[indice].text);
        tempo += (minutos * 60);
        console.log(minutos)
    });
    $('#segundo').addEventListener('change', (e) => {
        let indice = e.target.selectedIndex;
        segundos = parseInt(e.target.options[indice].text);
        tempo += segundos;
        console.log(segundos)
    });

    //const tempot = 60*120;
    let pomoCentra;
    $(".inicio").addEventListener("click", function(){
        if(!pomoCentra){
            pomoCentra = new TemporizadorH(tempo, $('.display'));
            pomoCentra.iniciar();
        }else{
            pomoCentra.iniciar();
        }
    });
    $(".pausa").addEventListener("click", function(){
        pomoCentra.pausar()
    });
    $(".cancelar").addEventListener("click", function(){
        concentraTempo.cancelar()
    });
};

function TemporizadorH(tempo, display) {
    let tempoID,
        horas,
        minutos,
        segundos,
        contagem = false;
        tempoDecorrido = tempo;
    function temporizador() {
        horas = (tempoDecorrido / 3600) | 0;
        minutos = (tempoDecorrido / 60) % 60 | 0;
        segundos = (tempoDecorrido % 60) | 0;

        horas = (horas > 0) ? horas + ":" : "";
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        display.textContent = `${horas}${minutos}:${segundos}`; 
        tempoDecorrido--;
        if (tempoDecorrido < 0) {
            clearInterval(tempoID);
            tempoDecorrido = tempo;
            contagem = true;
            return;
        }
        console.log(tempoDecorrido)
    };
    function pausar() {
        clearInterval(tempoID);
    };

    function cancelar() {
        tempoDecorrido = tempo;
        clearInterval(tempoID);
    }
    
    function iniciar()
    {
        tempoID = setInterval(() => temporizador(), 1000);
    }
    this.temporizador = temporizador;
    this.iniciar = iniciar;
    this.pausar = pausar;
    this.cancelar = cancelar;
    this.contagem = contagem;
}
