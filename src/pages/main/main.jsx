import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import { useApiContext } from "../../components/context/Apicontext";
import { useLocation } from "react-router-dom";
import "./main.css";

const Main = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const { pokemons } = useApiContext();

  if (pokemons && pokemons.length > 0) {
    const logo = pokemons[0];
    return (
      <>
        <Navbar logo={logo.logo[0].imageLogo} user={user} />
        <div className="container">
          <Cards user={user} />
        </div>
      </>
    );
  }
};

export default Main;
