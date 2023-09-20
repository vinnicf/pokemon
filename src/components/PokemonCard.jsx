import React from 'react';
import '../styles/pokemon.css'

const PokemonCard = ({ pokemon, onPokemonClick }) => {
    return (
        <div className="pokemon-card" onClick={() => onPokemonClick(pokemon)}>
            <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
        </div>
    );
};

export default PokemonCard;
