(function() {
  'use strict';

  var POKEAPI_URL = 'http://pokeapi.co/api/v2/pokemon';
  var MIN_POKEMON_ID = 1;
  var MAX_POKEMON_ID = 151;

  // if the pokemon api is being slow, set debug to true to always fetch the same pokemon
  var DEBUG = true;
  var YOUR_FAVORITE_POKEMON_ID = 92;

  var vm = {
    pokemon: {
      id: ko.observable(),
      name: ko.observable(),
      types: ko.observable(),
      height: ko.observable(),
      weight: ko.observable(),
      imageUrl: ko.observable()
    }, testimonials: [
      {
        trainer: 'Sansa',
        pokemon: 'Gloom',
        blurb: 'Yay! I\'m so happy I did this!',
        imageUrl: ''
      }, {
        trainer: 'Bran',
        pokemon: 'Geodude',
        blurb: 'He\'s my best friend.',
        imageUrl: ''
      }, {
        trainer: 'Arya',
        pokemon: 'Staryu',
        blurb: 'Why bother catching your own when there are so many Pokémon just waiting to be adopted?',
        imageUrl: ''
      }
    ]
  };

  function getRandomId() {
    return Math.floor(Math.random() * (MAX_POKEMON_ID - MIN_POKEMON_ID + 1)) + MIN_POKEMON_ID;
  }

  function getRandomPokemon() {
    var id = DEBUG ? YOUR_FAVORITE_POKEMON_ID : getRandomId();
    var key = 'pokemon-' + id;

    if (window.localStorage.getItem(key)) {
      setPokemonData(JSON.parse(window.localStorage.getItem(key)));
    } else {
      $.get(POKEAPI_URL + '/' + id, function(result) {
        var data = {
          id: result.id,
          name: result.name,
          types: result.types.map(function(item) {
            return item.type.name
          }).join(', '),
          height: result.height,
          weight: result.weight,
          imageUrl: result.sprites.front_default
        };

        window.localStorage.setItem(key, JSON.stringify(data));
        setPokemonData(data);
      });
    }
  }

  function setPokemonData(data) {
    vm.pokemon.id(data.id);
    vm.pokemon.name(data.name);
    vm.pokemon.types(data.types);
    vm.pokemon.height(data.height);
    vm.pokemon.weight(data.weight);
    vm.pokemon.imageUrl(data.imageUrl);
  }

  $(document).ready(function() {
    getRandomPokemon();
    ko.applyBindings(vm);
  });
})(window);
