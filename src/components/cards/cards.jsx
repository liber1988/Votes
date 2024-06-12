import React from "react";
import Card from "./card/card";
import "./cards.css";
import { useApiContext } from "../context/Apicontext";

const Cards = (user) => {
  const { pokemons } = useApiContext();

  if (pokemons && pokemons.length > 0) {
    const firstPokemonData = pokemons[2];

    if (firstPokemonData.pokemon && Array.isArray(firstPokemonData.pokemon)) {
      const pokemonArray = firstPokemonData.pokemon;

      return (
        <>
          <div className="cards">
            {pokemonArray.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} user={user} />
            ))}
          </div>
        </>
      );
    } else {
      console.error(
        "The first element does not contain a valid pokemon array."
      );
    }
  } else {
    console.error("The pokemons array is empty or not defined.");
  }
};

export default Cards;
