import React, { useState } from "react";
import "../card/card.css";

const Card = ({ pokemon, onVoteIncrement, showVoteButtons }) => {
  const [voting, setVoting] = useState(false);

  const handleVoteClick = () => {
    setVoting(true);
  };

  const handleCancelClick = () => {
    setVoting(false);
  };
  const handleSureClick = () => {
    onVoteIncrement(pokemon.id);
    setVoting(false);
  };
  return (
    <div className={`card ${voting ? "active" : ""}`}>
      <h1 className="votes">Votes:{pokemon.votes}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      {showVoteButtons && (
        <div className="vote-button">
          <button onClick={handleVoteClick}>Vote</button>
        </div>
      )}
      <div className="confirm-buttons">
        <button onClick={handleSureClick}>I am sure</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
};

export default Card;
