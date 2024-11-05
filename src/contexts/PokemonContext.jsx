import React, { createContext, useReducer } from "react";

// Create the context
const PokemonContext = createContext();

// Define the initial state
const initialState = {
  selectedCards: [], // Stores the selected Pokémon for the player's roster
  currentBattlePokemon: null, // Stores the Pokémon currently selected for battle
  computerBattlePokemon: null, // Stores the randomly selected Pokémon for the computer
  battleResults: [], // Stores the results of each battle
  usedCards: [],
  leaderboard: [], // Stores the leaderboard data
  userScore: 0, // Stores the user's score
  roundsPlayed: 0, // Tracks the number of rounds played
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_CARD":
      // Add a selected Pokémon to the player's roster
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload],
      };

    case "REMOVE_CARD":
      // Remove a selected Pokémon from the player's roster
      return {
        ...state,
        selectedCards: state.selectedCards.filter(
          (card) => card.name !== action.payload.name
        ),
      };

    case "SET_BATTLE_POKEMON":
      // Set the user's selected Pokémon for battle
      return {
        ...state,
        currentBattlePokemon: action.payload,
      };

    case "SET_COMPUTER_POKEMON":
      // Set the computer's randomly selected Pokémon for battle
      return {
        ...state,
        computerBattlePokemon: action.payload,
      };

    case "ADD_BATTLE_RESULT":
      // Add the result of a battle to the battle results array
      return {
        ...state,
        battleResults: [...state.battleResults, action.payload],
      };

    case "ADD_USED_CARD":
      return {
        ...state,
        usedCards: [...state.usedCards, action.payload],
      };

    case "UPDATE_USER_SCORE":
      // Update the user's score based on battle results
      return {
        ...state,
        userScore: state.userScore + action.payload,
      };

    case "INCREMENT_ROUNDS":
      // Increment the rounds played count
      return {
        ...state,
        roundsPlayed: state.roundsPlayed + 1,
      };

    case "RESET_GAME":
      // Reset the game state to start a new game
      return {
        ...initialState,
      };

    case "UPDATE_LEADERBOARD":
      // Update the leaderboard with the user's score
      return {
        ...state,
        leaderboard: [...state.leaderboard, action.payload],
      };

    case "RESET_SELECTED_CARDS":
      return {
        ...state,
        selectedCards: [], // Reset selectedCards to an empty array
      };

    default:
      return state;
  }
};

// Create the context provider component
export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};

// Export the context and provider
export default PokemonContext;
