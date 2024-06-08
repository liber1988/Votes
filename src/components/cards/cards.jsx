import React from "react";
import Card from "./card/card";
import "./cards.css";
const Cards = ({ pokemons, onVoteIncrement, showVoteButtons }) => {
  return (
    <div className="cards">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          onVoteIncrement={onVoteIncrement}
          showVoteButtons={showVoteButtons}
        />
      ))}
    </div>
  );
};

export default Cards;
