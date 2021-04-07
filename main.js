function $(el)
{
    return document.querySelector(el);
}
window.onload = function () {
    
    const tempo= 25;
    let tempoID,
        minutos,
        segundos = "0"+00,
        contagem = false,
        
        tempoDecorrido = tempo*60;
        
    $('.display').innerHTML = `${25}:${segundos}`;
    
    function pausar() {
        clearInterval(tempoID);
    };

    function cancelar() {
        tempoDecorrido = tempo*60;
        clearInterval(tempoID);
    }

    function iniciar()
    {
        tempoID = setInterval(() => temporizador(), 1000);
    }

    function temporizador() {
        // horas = (tempoDecorrido / 3600) | 0;
        // minutos = (tempoDecorrido / 60) % 60 | 0;
        minutos = (tempoDecorrido / 60) | 0;
        segundos = (tempoDecorrido % 60) | 0;

        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        $('.display').innerHTML = `${minutos}:${segundos}`; 
        tempoDecorrido--;
        if (tempoDecorrido < 0) {
            clearInterval(tempoID);
            tempoDecorrido = tempo;
            contagem = true;
            return;
        }
        console.log(tempoDecorrido)
    };

    $(".inicio").addEventListener("click", function(){
        iniciar();
    });
    $(".pausa").addEventListener("click", function(){
        pausar()
    });
    $(".cancelar").addEventListener("click", function(){
        cancelar()
    });

    if(contagem)
    {
        alert("Tempo esgotou! alivia-se por 5 minutos depois volte o PomoCentra");
    }
};