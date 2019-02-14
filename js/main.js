var botaoAdicionar = document.querySelector("#buscar-pokemon");
var imagemPokemon = document.querySelector("#buscaPokemon");
var radios = document.getElementsByName('pokebola');
var tamanho1;
var tamanho2;
var indice;

botaoAdicionar.addEventListener("click", function(){

  verificaLista();

});

function verificaLista(){
  var lista = document.querySelectorAll('.pokemon');

  if(lista.length == 0){
    carregaLista();
  }else if (lista.length >= 1 && indice != pegaGeracao()) {
      document.querySelectorAll('.pokemon').forEach(function(pokemonLista){
        pokemonLista.remove();
      });
      carregaLista();
  }
}

function carregaLista(){
  pegaGeracao();
  for (tamanho1; tamanho1 <= tamanho2; tamanho1++) {
    buscaPokemon(tamanho1);
  };
  indice = document.querySelector('.text-id').textContent.replace('#', '');
}

function buscaPokemon(numero){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/"+numero+"/", false);
  xhr.addEventListener("load", function(){
      if (xhr.status == 200){
       var pokemon = JSON.parse(xhr.responseText);

       var id = document.createElement("text");
       var imagem = document.createElement("img");
       var nome = document.createElement("text");
       var tipo = document.createElement("text");

       id.classList.add("text-id");
       nome.classList.add("text-nome");
       tipo.classList.add("text-tipo");

       id.textContent = "#"+pokemon.id;
       imagem.setAttribute('width', "150px");
       imagem.setAttribute('height', "150px");
       imagem.setAttribute('src', pokemon.sprites.front_default);
       nome.textContent = pokemon.name;
       pokemon.types.forEach(function(pokemon){
         tipo.textContent += pokemon.type.name+" ";
       });

       var idPokemon = document.createElement("div");
       idPokemon.classList.add("id-pokemon");
       idPokemon.appendChild(id);
       var imgPokemon = document.createElement("div");
       imgPokemon.classList.add("img-pokemon");
       imgPokemon.appendChild(imagem);
       var namePokemon = document.createElement("div");
       namePokemon.classList.add("nome-pokemon");
       namePokemon.appendChild(nome);
       var tipoPokemon = document.createElement("div");
       tipoPokemon.classList.add("tipo-pokemon");
       tipoPokemon.appendChild(tipo);

       var conteudo = document.createElement("div");
       conteudo.classList.add("pokemon");
       conteudo.appendChild(idPokemon);
       conteudo.appendChild(imgPokemon);
       conteudo.appendChild(namePokemon);
       conteudo.appendChild(tipoPokemon);

       var meio = document.querySelector("#meio");
       meio.appendChild(conteudo);
     }
  });

xhr.send(null);
imagemPokemon.setAttribute('src', 'img/menu/pokebola-aberta.png');
}



function pegaGeracao(){
  for (var i = 0, length = radios.length; i < length; i++)
  {
   if (radios[i].checked)
   {
     var radio = radios[i].value;
     if(radio == "all"){
       tamanho1 = 1;
       tamanho2 = 649;
     }
     if(radio == "1"){
       tamanho1 = 1;
       tamanho2 = 151;
     }
     if(radio == "152"){
       tamanho1 = 152;
       tamanho2 = 251;
     }
     if(radio == "252"){
       tamanho1 = 252;
       tamanho2 = 386;
     }
     if(radio == "387"){
       tamanho1 = 387;
       tamanho2 = 493;
     }
     if(radio == "494"){
       tamanho1 = 494;
       tamanho2 = 649;
     }
    return radios[i].value;
    break;
   }
  }
}

botaoAdicionar.addEventListener("mouseover", function(){
  imagemPokemon.setAttribute('src', 'img/menu/pokebola-abrindo.png');
});

botaoAdicionar.addEventListener("mouseout", function(){
  setTimeout(function(){
    imagemPokemon.setAttribute('src', 'img/menu/pokebola-fechada.png');
  }, 500);
});

var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function() {
  console.log( this.value);
  var busca = document.querySelectorAll(".text-nome");
  if( this.value.length > 0){
      for( var i = 0; i < busca.length ; i++){
           var busca1 = busca[i];
           var div = busca1.parentElement.parentElement;
           var expressao = new RegExp(this.value, "i");
           if( !expressao.test(busca1.textContent)){
               div.classList.add("invisivel");
          } else{
               div.classList.remove("invisivel");
          }
      }
  }else{
   for( var i = 0; i < busca.length; i++) {
      var pokemon = busca[i];
      var div = pokemon.parentElement.parentElement;
      div.classList.remove("invisivel");
    }
  }
});
