// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./contexts/PokemonContext"; // Only import PokemonProvider
import HomePage from "./components/HomePage";
import SelectedCardsDisplay from "./check/SelectedCardsDisplay";
import BattleSelection from "./check/BattleSelection";
import BattleResults from "./check/BattleResults";
import Nav from "./components/Nav";

const App = () => {
  return (
    <PokemonProvider>
      <Router>
        <Nav />
        <div className="App">
          <h1 className="text-center text-2xl font-bold my-4">
            Pokémon Battle Game
          </h1>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/selected-cards" element={<SelectedCardsDisplay />} />
            <Route path="/battle-selection" element={<BattleSelection />} />
            <Route path="/battle-results" element={<BattleResults />} />
          </Routes>
        </div>
      </Router>
    </PokemonProvider>
  );
};

export default App;
