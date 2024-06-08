import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./form.css";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Move this inside the component

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user", { name, email });
      if (response.data) {
        navigate("/main");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <section>
      <h2 className="text-center">Welcome To vote Pokemons</h2>
      <section>
        <img
          className="image-fixed"
          src="../../../public/images/Mega.png"
          alt=""
        />
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
};

export default Form;
