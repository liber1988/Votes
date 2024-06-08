import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import axios from "axios";
import images from "../../assets/constants/images";
import "./main.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [showVoteButtons, setShowVoteButtons] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user");
        console.log("User data:", response.data); // Debugging line
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await axios.get("/api/votes");
        console.log("Votes data:", response.data); // Debugging line
        const votes = response.data;

        if (!Array.isArray(votes)) {
          throw new Error("Votes data is not an array");
        }

        const initialCombinedData = images.map((pokemon) => {
          const voteData = votes.find((vote) => vote.id === pokemon.id) || {
            votes: 0,
          };
          return { ...pokemon, votes: voteData.votes };
        });

        setPokemons(initialCombinedData);
      } catch (error) {
        console.error("Error fetching votes data:", error);
      }
    };

    fetchUser();
    fetchVotes();
  }, []);
  console.log(user);

  
  const handleVoteIncrement = (id) => {
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, votes: pokemon.votes + 1 } : pokemon
      )
    );
    setShowVoteButtons(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="container">
        <Cards
          pokemons={pokemons}
          onVoteIncrement={handleVoteIncrement}
          showVoteButtons={showVoteButtons}
        />
      </div>
    </>
  );
};

export default Main;
