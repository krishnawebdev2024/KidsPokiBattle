import React, { useContext } from "react";
import PokemonContext from "../contexts/PokemonContext";

const SelectedCardsDisplay = () => {
  const { state, dispatch } = useContext(PokemonContext);

  // Function to reset selected cards
  const handleResetSelectedCards = () => {
    dispatch({ type: "RESET_SELECTED_CARDS" }); // Dispatch action to reset selected cards
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Selected Pokémon</h2>
      <button
        onClick={handleResetSelectedCards}
        disabled={state.selectedCards.length === 0} // Disable button if selectedCards is empty
        className={`mt-6 py-2 px-4 rounded transition ${
          state.selectedCards.length === 0
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        Reset Selected Pokémon
      </button>
      <div className="h-1 bg-slate-500 mb-10 mt-10 "></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[30px]">
        {state.selectedCards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center">{card.name}</h3>
              <div className="mt-2 text-gray-600">
                <p>
                  Attack: <span className="font-bold">{card.attack}</span>
                </p>
                <p>
                  Defense: <span className="font-bold">{card.defense}</span>
                </p>
                <p>
                  Speed: <span className="font-bold">{card.speed}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedCardsDisplay;
