import axios from "axios";
import { useEffect, useState } from "react";
function usePokemonList(url,type){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl:url,
        prevUrl: "",
        nextUrl: "",
      });

      async function downloadPokemons(){
        setPokemonListState((state) => ({ ...state, isLoading: true }));
    
        //this downloads list of 20 pokemons
        const response = await axios.get(pokemonListState.pokedexUrl);
        const pokemonResults = response.data.results;
    
        setPokemonListState((state) => ({
          ...state,
          nextUrl: response.data.next,
          prevUrl: response.data.previous,
        }));

        //iterating over the array of pokemons , and using their url, to create an array of promises
        //that will download those 20 pokemons
        if(type){
        setPokemonListState((state)=>({
          ...state,
          pokemonList:response.data.pokemon.splice(0,5)
        }))
        }else{

        const pokemonResultPromise = pokemonResults.map((pokemon) =>
          axios.get(pokemon.url)
        );
    
        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data
    
        console.log(pokemonData);
    
        //now iterate on the data of each pokemon and i dname image types
        const pokeListResult = pokemonData.map((pokeData) => {
          const pokemon = pokeData.data;
          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.other.front_shiny,
            type: pokemon.types,
          };
        });
    
        setPokemonListState((state) => ({
          ...state,
          pokemonList: pokeListResult,
          isLoading: false,
        }));
      }
      }

      useEffect(()=>{
        downloadPokemons();
      },[pokemonListState.pokedexUrl])

      return[pokemonListState, setPokemonListState]
}
export default usePokemonList;