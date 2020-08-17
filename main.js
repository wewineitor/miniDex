const url = 'https://pokeapi.co/api/v2/pokemon';
const input = document.getElementById('input');
const boton = document.getElementById('boton');
const nombrePokemon = document.getElementById('nombre');
const sprite = document.getElementById('sprite');
const id = document.getElementById('id');
const carta = document.getElementById('carta');
const shiny = document.getElementById('shiny');
let nombrePoke;
shiny.style.display = 'none'

const Tipos = {
    acero: '#A8A8C0',
    agua: '#3899F8',
    bicho: '#A8B820',
    dragon: '#7860E0',
    electrico: '#F8D030',
    fantasma: '#6060B0',
    fuego: '#F05030',
    hada: '#E79FE7',
    hielo: '#58C8E0',
    lucha: '#A05038',	
    normal: '#A8A090',	
    planta: '#78C850',	
    psiquico: '#F870A0',	
    roca: '#B8A058',
    siniestro: '#7A5848',	
    tierra: '#E9D6A4',
    veneno: '#B058A0',
    volador: '#98A8F0'
}

const obtenerPokemon = async(nombre) => {
    try {
        input.placeholder = 'Ingresa el nombre o el numero del pokemon(1 - 807)'
        input.value = ''
        const res = await fetch(url + '/' + nombre);
        const data = await res.json();
        nombrePoke = data.name;

        nombrePokemon.innerHTML = data.name.toUpperCase();
        id.innerHTML = 'No. ' + data.id;

        const tipos = data.types.map(poke => poke.type.name);

        cambiarColor(tipos[0]);

        validarNumero(data.id, 'normal')
        
    } catch (error) {
        errores();
        console.log(error);
    }
}

const validarNumero = async(id, tipoColor) =>{
    const res = await fetch(url + '/' + id);
    const data = await res.json();
    if(id <= 649){
        if(tipoColor == 'normal'){
            sprite.innerHTML = `<a href="http://pokemondb.net/pokedex/${data.name}"><img src="https://img.pokemondb.net/sprites/black-white/anim/normal/${data.name}.gif" width = 150 height = 150></a>`
        }
        else{
            sprite.innerHTML = `<a href="http://pokemondb.net/pokedex/${data.name}"><img src="https://img.pokemondb.net/sprites/black-white/anim/shiny/${data.name}.gif" width = 150 height = 150></a>`
        }
    }
    else{
        if(tipoColor == 'normal'){
            sprite.innerHTML = `<img src = '${data.sprites.front_default}' width = 200 height = 200/>`
        }
        else{
            sprite.innerHTML = `<img src = '${data.sprites.front_shiny}' width = 200 height = 200/>`
        }
    } 
}

const errores = () => {
    input.placeholder = 'Ocurrio un error :('
    input.value = ''
    nombrePokemon.innerHTML = ''
    sprite.innerHTML = '';
} 

boton.addEventListener('click',() => {
    shiny.style.display = 'block';
    obtenerPokemon(input.value.toLowerCase().trim());
})

const cambiarColor = tipo => {
    switch(tipo){
        case 'steel': 
            carta.style.backgroundColor = Tipos.acero; 
            break;
        case 'water':
            carta.style.backgroundColor = Tipos.agua;
            break;
        case 'bug':
            carta.style.backgroundColor = Tipos.bicho;
            break;
        case 'dragon':
            carta.style.backgroundColor = Tipos.dragon;
            break;
        case 'electric':
            carta.style.backgroundColor = Tipos.electrico;
            break;
        case 'ghost':
            carta.style.backgroundColor = Tipos.fantasma;
            break;
        case 'fire':
            carta.style.backgroundColor = Tipos.fuego;
            break;
        case 'fairy':
            carta.style.backgroundColor = Tipos.hada;
            break;
        case 'ice':
            carta.style.backgroundColor = Tipos.hielo;
            break;
        case 'fighting':
            carta.style.backgroundColor = Tipos.lucha;
            break;
        case 'normal':
            carta.style.backgroundColor = Tipos.normal;
            break;
        case 'grass':
            carta.style.backgroundColor = Tipos.planta;
            break;
        case 'psychic':
            carta.style.backgroundColor = Tipos.psiquico;
            break;
        case 'rock':
            carta.style.backgroundColor = Tipos.roca;
            break;
        case 'dark':
            carta.style.backgroundColor = Tipos.siniestro;
            break;
        case 'ground':
            carta.style.backgroundColor = Tipos.tierra;
            break;
        case 'poison':
            carta.style.backgroundColor = Tipos.veneno;
            break;
        case 'flying':
            carta.style.backgroundColor = Tipos.volador;
            break;
    }
}

const cambioShiny = async(nombre) =>{
    const res = await fetch(url + '/' + nombre);
    const data = await res.json();
    if(shiny.value == 'Shiny'){
        shiny.value = 'Normal';
        shiny.style.background = 'white'
        validarNumero(data.id, 'shiny');
    }
    else{
        shiny.value = 'Shiny';
        shiny.style.background = 'gold'
        
        validarNumero(data.id, 'normal');
    }
}

shiny.addEventListener('click', () =>{
    cambioShiny(nombrePoke);
})
