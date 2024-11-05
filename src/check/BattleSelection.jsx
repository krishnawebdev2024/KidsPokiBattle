import React, { useContext } from "react";
import PokemonContext from "../contexts/PokemonContext";
import BattleResults from "./BattleResults";

const BattleSelection = () => {
  const { state, dispatch } = useContext(PokemonContext);

  const handleSelectForBattle = (card) => {
    // Check if the card is already selected
    if (state.currentBattlePokemon?.name === card.name) {
      // Unselect the Pokémon if it's already selected
      dispatch({ type: "SET_BATTLE_POKEMON", payload: null });
    } else if (!state.usedCards.includes(card.name)) {
      // Select the new Pokémon if it's not already used
      dispatch({ type: "SET_BATTLE_POKEMON", payload: card });
    } else {
      alert(
        `${card.name} has already been used in a battle and cannot be selected.`
      );
    }
  };

  const handleBattle = () => {
    if (!state.currentBattlePokemon) {
      alert("Please select a Pokémon for battle!");
      return;
    }

    const availableCards = state.selectedCards.filter(
      (card) => !state.usedCards.includes(card.name)
    );

    if (availableCards.length === 0) {
      alert("All available Pokémon have been used. Game Over!");
      return; // Stop the battle if no Pokémon are available
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const computerPokemon = availableCards[randomIndex];

    dispatch({ type: "SET_COMPUTER_POKEMON", payload: computerPokemon });

    initiateBattle(state.currentBattlePokemon, computerPokemon);
  };

  const initiateBattle = (playerPokemon, computerPokemon) => {
    if (!playerPokemon || !computerPokemon) {
      alert("Both Pokémon must be selected for the battle!");
      return;
    }

    const playerScore = playerPokemon.attack;
    const computerScore = computerPokemon.attack;

    let battleResult;
    if (playerScore > computerScore) {
      battleResult = "You win!";
      dispatch({ type: "UPDATE_USER_SCORE", payload: 1 });
    } else if (playerScore < computerScore) {
      battleResult = "You lose!";
    } else {
      battleResult = "It's a tie!";
    }

    // Mark the selected Pokémon as used
    dispatch({ type: "ADD_USED_CARD", payload: playerPokemon.name });

    dispatch({
      type: "ADD_BATTLE_RESULT",
      payload: {
        player: playerPokemon.name,
        computer: computerPokemon.name,
        result: battleResult,
      },
    });

    dispatch({ type: "INCREMENT_ROUNDS" });

    alert(`${battleResult}\n${playerPokemon.name} vs ${computerPokemon.name}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Pokémon for Battle</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.selectedCards
          .filter((card) => !state.usedCards.includes(card.name)) // Filter out used cards
          .map((card, index) => {
            const isSelected = state.currentBattlePokemon?.name === card.name;

            return (
              <div
                key={index}
                className={`bg-white shadow-md rounded-lg p-4 flex flex-col items-center ${
                  isSelected ? "border-2 border-blue-500" : ""
                }`}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-24 h-24 mb-2 rounded-md"
                />
                <h3 className="text-lg font-semibold">{card.name}</h3>
                <button
                  onClick={() => handleSelectForBattle(card)}
                  className={`mt-2 py-1 px-4 rounded transition ${
                    isSelected
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {isSelected ? "Unselect" : "Select for Battle"}
                </button>
              </div>
            );
          })}
      </div>
      <button
        onClick={handleBattle}
        className="block mt-6 mx-auto bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out"
      >
        Battle!
      </button>

      <div className="h-1 bg-slate-500 mb-10 mt-10 "></div>
      <BattleResults />
    </div>
  );
};

export default BattleSelection;
