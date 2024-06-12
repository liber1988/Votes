import axios from "axios";

const pokemonUrl = "https://6666a2bea2f8516ff7a4233f.mockapi.io/pokemon";

export const getPokemons = async () => {
  try {
    const response = await axios(pokemonUrl);
    return response.data;
  } catch (error) {
    throw new Error("cannot fetch pokemons data");
  }
};

export const addPokemon = async (pokemon) => {
  try {
    const response = await axios.post(pokemonUrl, pokemon);
  } catch (error) {
    throw new Error("Unable to add pokemon to db");
  }
};

export const deletePokemon = async (pokemon) => {
  try {
    const response = await axios.delete(pokemonUrl, pokemon);
  } catch (error) {
    throw new Error("Unable to delete pokemon.");
  }
};

export const updatePokemon = async (pokemon) => {
  try {
    const response = await axios.put(pokemonUrl, pokemon);
  } catch (error) {
    throw new Error("Unable to update pokemon.");
  }
};
