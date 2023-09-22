import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import ScoreModal from './components/ScoreModal';
import Footer from './components/Footer';
import './App.css'

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [clickedPokemons, setClickedPokemons] = useState(new Set());
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [displaySet, setDisplaySet] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);


  // Shuffle Pokemon array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };


  // Fetch Pokemon data
  const fetchPokemons = async () => {
    const pokemonPromises = [];
    for (let i = 1; i <= 30; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      pokemonPromises.push(fetch(url).then((res) => res.json()));
    }
    let fetchedPokemons = await Promise.all(pokemonPromises);

    // Shuffle and select first 12 Pokémon
    shuffleArray(fetchedPokemons);
    fetchedPokemons = fetchedPokemons.slice(0, 12);

    setPokemons(fetchedPokemons);
  };

  // Shuffle Pokemon array


  useEffect(() => {

    fetchPokemons();
  }, []);  // Empty Dependencies array. Run once on mount



  const handlePokemonClick = (pokemon) => {
    if (clickedPokemons.has(pokemon.name)) {
      // Reset game
      setLastScore(score);
      setShowModal(true);
      setTopScore(Math.max(topScore, score));
      setScore(0);
      setClickedPokemons(new Set());
      setCurrentRound(1);  // Reset the round counter

      // Re-fetch and set random 12 Pokémon for new round
      fetchPokemons();


    } else {

      setClickedPokemons((prevSet) => new Set([...prevSet, pokemon.name])); // Add clicked Pokemon to the set
      setScore((prevScore) => prevScore + 1);
      setCurrentRound((prevRound) => prevRound + 1)
    }
  };

  useEffect(() => {
    if (pokemons.length > 0) {

      const remainingPokemons = pokemons.filter(p => !clickedPokemons.has(p.name));

      if (remainingPokemons.length === 0) {
        setLastScore(score);
        setShowModal(true);
        setTopScore(Math.max(topScore, score));
        setScore(0);
        setClickedPokemons(new Set());
        setCurrentRound(1);
        fetchPokemons();
        return;
      }

      const newPokemon = getRandomElement(remainingPokemons);
      const pool = [...pokemons.filter(p => p.name !== newPokemon.name)];
      const others = getRandomElements(pool, 3, shuffleArray);

      // Validate that "others" has content
      if (others && others.length === 3) {
        setDisplaySet([newPokemon, ...others]);
      } else {
        console.error('Unexpected issue with generating the display set.');
      }
    }
  }, [pokemons, clickedPokemons, score, topScore]);




  const closeModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <div className="App">
      <div className="app-header">
        <div className="logo"><img src="src/assets/pokelogo.png" alt="" /></div>
        <div className="score">
          <h2>Score: {score}</h2>
          <h3>Top Score: {topScore}</h3>
        </div>
      </div>
      {showModal && (
        <ScoreModal
          score={lastScore}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="pokemon-list">
        {displaySet.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onPokemonClick={handlePokemonClick}
          />
        ))}
      </div>
      <div>{currentRound}/12</div>
      <Footer />
    </div>

  );
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = (array, count, shuffleFunc) => {
  const shuffled = [...array];
  shuffleFunc(shuffled);
  return shuffled.slice(0, count);
};

export default App;
