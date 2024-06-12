import { createContext, useState, useContext, useEffect } from "react";
import {
  addPokemon,
  getPokemons,
  deletePokemon,
  updatePokemon,
} from "../../api/api";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemonsData = async () => {
    setIsLoading(true);
    try {
      const data = await getPokemons();
      setPokemons(data);
    } catch (error) {
      setErrorMessage(error.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonsData();
  }, []);

  const catchPokemon = async (pokemon) => {
    setIsLoading(true);
    try {
      const result = await addPokemon(pokemon);
      await fetchPokemonsData();
    } catch (error) {
      setErrorMessage(error);
    } finally {
      isLoading(false);
    }
  };

  const deletePokemonData = async (pokemon) => {
    try {
      const result = await deletePokemon(pokemon);
      await fetchPokemonsData();
    } catch (error) {
      setErrorMessage(error);
    } finally {
      SetIsLoading(false);
    }
  };
  const updatePokemonData = async (pokemon) => {
    try {
      const result = await updatePokemon(pokemon);
      await fetchPokemonsData();
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  // why we pass it as object            vvvvvvv
  return (
    <ApiContext.Provider
      value={{ pokemons, catchPokemon, deletePokemonData, updatePokemonData }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};
