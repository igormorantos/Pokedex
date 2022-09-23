const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName2 = document.querySelector('.pokemon__name2');
const pokemonNumber2 = document.querySelector('.pokemon__number2');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonImage2 = document.querySelector('.pokemon__image2');
const pokemonType = document.querySelector('.pokemon__type')
const pokemonAbility = document.querySelector('.pokemon__ability')
const pokemonAbility2 = document.querySelector('.pokemon__ability2')
const pokemonAbility3 = document.querySelector('.pokemon__ability3')

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonName2.innerHTML = data.name;
    pokemonNumber2.innerHTML = data.id;
    pokemonType.innerHTML = data['types']['0']['type']['name']
    pokemonAbility.innerHTML = data['moves']['4']['move']['name']
    pokemonAbility2.innerHTML = data['moves']['6']['move']['name']
    pokemonAbility3.innerHTML = data['moves']['7']['move']['name']
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage2.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
