// PokemonCard.jsx
import React, { useContext, useState } from "react";
import PokemonContext from "../contexts/PokemonContext";

const PokemonCard = ({ pokemon }) => {
  const { state, dispatch } = useContext(PokemonContext);
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    if (isSelected) {
      dispatch({ type: "REMOVE_CARD", payload: pokemon });
      setIsSelected(false);
    } else {
      if (state.selectedCards.length < 6) {
        dispatch({ type: "SELECT_CARD", payload: pokemon });
        setIsSelected(true);
      } else {
        alert("You can only select up to 6 Pokémon.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{pokemon.name}</h3>
      <p>Attack: {pokemon.attack}</p>
      <p>Defense: {pokemon.defense}</p>
      <p>Speed: {pokemon.speed}</p>
      <button
        onClick={handleSelect}
        className={`mt-4 px-4 py-2 rounded ${
          isSelected ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        }`}
      >
        {isSelected ? "Remove Selection" : "Select"}
      </button>
    </div>
  );
};

export default PokemonCard;
