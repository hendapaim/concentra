function $(el)
{
    return document.querySelector(el);
}

function sons(){
    som="./sons/alarme1.mp3"
    $("audio").src = som;
    $("audio").play();

    alert("Tempo esgotou! alivia-se por 5 minutos depois volte o PomoCentra");
}

const tempo = 25;
if(tempo<=999){

    let tempoID,
        minutos,
        segundos,
        contagem = false,
        tempoEmSegundos =tempo*60,
        tempoDecorrido = tempoEmSegundos;

    function display(tempoDecorrido) {
        minutos = (tempoDecorrido / 60) | 0;
        segundos = (tempoDecorrido % 60) | 0;

        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;
        $('.relogio').innerHTML = Date().slice(16, 21);
        $('.display').innerHTML = `${minutos}:${segundos}`;
    }
        
    //$('.display').innerHTML = `${tempo}:${segundos}`;
    display(tempoDecorrido);

    function pausar()
    {
        clearInterval(tempoID);
    }
    function cancelar()
    {
        clearInterval(tempoID);
        tempoDecorrido = tempoEmSegundos;
        $('.display').innerHTML = `${tempo}:${segundos}`;
    }
    function iniciar()
    {
        tempoID = setInterval(() => temporizador(), 1000);
    }
    function temporizador()
    {
        // horas = (tempoDecorrido / 3600) | 0;
        // minutos = (tempoDecorrido / 60) % 60 | 0;
        display(tempoDecorrido);

        tempoDecorrido--;
        if (tempoDecorrido<-1)
        {
            clearInterval(tempoID);
            sons();
            contagem = true;
            tempoDecorrido = tempoEmSegundos;
            display(tempoDecorrido);
            $(".pausa").style.display="none";
            $(".inicio").style.display="block";
            return;
        }
        //console.log(tempoDecorrido)
    }

    $(".inicio").addEventListener("click", function(){
        iniciar();
        $(".inicio").style.display="none";
        $(".pausa").style.display="block";
    });
    $(".pausa").addEventListener("click", function(){
        pausar();
        $(".pausa").style.display="none";
        $(".inicio").style.display="block";
    });
    /*
    $("#cancelar").addEventListener("click", function(){
        cancelar();
    });
    */
}else{
    alert("O tempo deve ser menor que 999 minutos!")
}