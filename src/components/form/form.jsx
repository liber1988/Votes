import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./form.css";
import { useApiContext } from "../context/Apicontext";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { pokemons } = useApiContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/main", { state: { user } });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if pokemons and pokemons[0] exist
    if (pokemons && pokemons.length > 1) {
      const usersArray = pokemons[1].users; // Adjusting to pokemons[1] based on your requirement
      const matchUser = usersArray.find(
        (user) =>
          user.name.toLowerCase() === name.toLowerCase() &&
          user.email.toLowerCase() === email.toLowerCase()
      );

      if (matchUser) {
        setUser(matchUser);
      } else {
        console.log("No match found");
        setShowModal(true);
        console.log(showModal);
      }
    } else {
      console.log(
        "Pokemons data is not loaded or there's an issue with the data structure"
      );
    }
  };

  if (pokemons && pokemons.length > 0 && showModal === false) {
    const image = pokemons[0].logo[0].imageForm;
    const pokemonUsers = pokemons[1].users;
    return (
      <section className="main-sec">
        <h2 className="text-center">Welcome To vote Pokemons</h2>
        <section>
          <img className="image-fixed" src={image} alt="" />{" "}
        </section>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-block">
            register
          </button>
        </form>
      </section>
    );
  } else {
    return (
      <>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Error</h2>
              <p>There is a problem with loading the data</p>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-block"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Form;
