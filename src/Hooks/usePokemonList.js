import axios from "axios";
import { useEffect, useState } from "react";
function usePokemonList(){
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        prevUrl: "",
        nextUrl: "",
      });

      async function downloadPokemons(){

            setPokemonListState((state)=>({...state,isLoading:true}));
            const response = await axios.get(pokemonListState.pokedexUrl)

            const pokemonResults = response.data.results;
            setPokemonListState((state)=>({
                ...state,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
             } ));
             const pokemonResultPromise = pokemonResults.map((pokemon) =>
             axios.get(pokemon.url)
           );

        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);

        const pokeListResult  = pokemonData.map((pokeData)=>{
            const pokemon  = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other
                  ? pokemon.sprites.other.dream_world.front_default
                  : pokemon.sprites.other.front_shiny,
                type: pokemon.types,
              };
        });

        setPokemonListState((state)=>({
            ...state,
            pokemonList:pokeListResult,
            isLoading:false
        }));

}
useEffect(()=>{
    downloadPokemons()
},[pokemonListState.pokedexUrl]);

return[pokemonListState,setPokemonListState]
}

export default usePokemonList;