import React, { useState } from "react";
import "../card/card.css";
import { useApiContext } from "../../context/Apicontext";
const Card = ({ pokemon, user }) => {
  const [voting, setVoting] = useState(false);
  const { updatePokemonData } = useApiContext();
  console.log(user.name);
  const handleVoteClick = () => {
    setVoting(true);
    console.log(user.user.voteStatus);
  };

  const handleCancelClick = () => {
    setVoting(false);
  };
  const handleSureClick = async () => {
    setVoting(false);
    console.log("i was here");
    pokemon.votes = parseInt(pokemon.votes);
    pokemon.votes += 1;
    user.user.voteStatus = "";
    user.user.namePokemon = pokemon.name;

    await updatePokemonData(pokemon);
  };

  const handleUnVoteClick = async () => {
    pokemon.votes = parseInt(pokemon.votes);
    if (user.user.namePokemon === pokemon.name) {
      pokemon.votes -= 1;
      user.user.voteStatus = "True";

      await updatePokemonData(pokemon);
    }
  };
  if (user.user.voteStatus) {
    return (
      <div className={`card ${voting ? "active" : ""}`}>
        <h1 className="votes">Votes:{pokemon.votes}</h1>
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        {user.user.voteStatus && (
          <>
            <div className="vote-button">
              <button onClick={handleVoteClick}>Vote</button>
            </div>

            <div className="confirm-buttons">
              <button onClick={handleSureClick}>I am sure</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className={`card ${voting ? "active" : ""}`}>
        <h1 className="votes">Votes:{pokemon.votes}</h1>
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        {user.user.namePokemon === pokemon.name && (
          <>
            <div className="vote-button">
              <button onClick={handleUnVoteClick}>unVote</button>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default Card;
