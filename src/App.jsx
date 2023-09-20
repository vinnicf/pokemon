import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import ScoreModal from './components/ScoreModal';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [clickedPokemons, setClickedPokemons] = useState(new Set());
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 30; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        pokemonPromises.push(fetch(url).then((res) => res.json()));
      }
      const fetchedPokemons = await Promise.all(pokemonPromises);
      setPokemons(fetchedPokemons);
    };
    fetchPokemons();
  }, []);

  // Shuffle Pokemon array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handlePokemonClick = (pokemon) => {
    if (clickedPokemons.has(pokemon.name)) {
      // Reset game
      setLastScore(score);
      setShowModal(true);
      setTopScore(Math.max(topScore, score));
      setScore(0);
      setClickedPokemons(new Set());


    } else {
      // Add clicked Pokemon to the set
      setClickedPokemons((prevSet) => new Set([...prevSet, pokemon.name]));
      setScore((prevScore) => prevScore + 1);

      // Shuffle pokemons
      shuffleArray(pokemons);
      setPokemons([...pokemons]);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <div className="App">
      <h1>Pokemon Memory Game</h1>
      <h2>Score: {score}</h2>
      <h3>Top Score: {topScore}</h3>

      {showModal && (
        <ScoreModal
          score={lastScore}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            onPokemonClick={handlePokemonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
