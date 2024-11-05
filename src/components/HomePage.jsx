// HomePage.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import PokemonContext from "../contexts/PokemonContext";

const HomePage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const { state, dispatch } = useContext(PokemonContext);

  useEffect(() => {
    // Function to load Pokémon data
    const loadPokemonData = () => {
      const storedPokemon = localStorage.getItem("PokimonsBox");

      if (storedPokemon) {
        // Parse the stored data and set it to state
        setPokemonData(JSON.parse(storedPokemon));
      } else {
        // Fetch Pokémon data from API if not available in local storage
        fetchPokemonData();
      }
    };

    // Function to fetch Pokémon data from the API
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const pokemonList = response.data.results;

        // Fetch detailed data for each Pokémon
        const detailedPokemon = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailResponse = await axios.get(pokemon.url);
            const { name, sprites, stats } = detailResponse.data;
            const attack = stats[1].base_stat; // Attack stat
            const defense = stats[2].base_stat; // Defense stat
            const speed = stats[0].base_stat; // Speed stat

            return {
              name,
              image: sprites.front_default,
              attack,
              defense,
              speed,
            };
          })
        );

        // Store fetched data in local storage
        localStorage.setItem("PokimonsBox", JSON.stringify(detailedPokemon));
        setPokemonData(detailedPokemon); // Set state with fetched data
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    // Load Pokémon data when component mounts
    loadPokemonData();
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default HomePage;
