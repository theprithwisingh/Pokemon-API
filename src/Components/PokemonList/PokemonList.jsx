import axios from "axios";
import './PokemonList.css'
import { useState } from "react";
import { useEffect } from "react"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
    prevUrl: "",
    nextUrl: "",
  });

  // const[pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  // const POKEDEX_URL  ='https://pokeapi.co/api/v2/pokemon';

   async function downloadPokemons(){
    // setIsLoading(true);
    setPokemonListState({...pokemonListState,isLoading: true})

     const response = await axios.get(pokemonListState.pokedexUrl);//this downloads list of 20 pokemons
     const PokemonResults=response.data.results; //we get the array of pokemons from results 

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));


    //iterating over the array of pokemons , and using their url, to create an array of promises
     const pokemonResultProsime = PokemonResults.map((pokemon)=>axios.get(pokemon.url));

     //passing that promise array to axios.all
     const pokemonData = await axios.all(pokemonResultProsime);
     console.log(pokemonData);

     //now iterate on the data of each pokemon, and extract id, name, image, types
     const pokeListResult = pokemonData.map((pokeData)=>{
      const pokemon = pokeData.data;
      return{
        id:pokemon.id,
        name:pokemon.name,
        image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
        types:pokemon.types,
        
      }
     })
     setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
    //  setIsLoading(false);
   }

    useEffect(()=>{
        downloadPokemons();
    },[pokemonListState.pokedexUrl]);
  return (
    <div className="pokemon-list-wrapper">
       <div>Pokemon list</div>
       <div className="pokemon-wrapper">
       {(pokemonListState.isLoading)?' Loading....' : 
       pokemonListState.pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
       }
       </div>

       <div className="controls">
          <button disabled={pokemonListState.prevUrl == null} onClick={()=>{
           const urlToSet = pokemonListState.prevUrl;
           setPokemonListState({...pokemonListState,pokedexUrl:urlToSet})}}>Prev</button>
          <button disabled={pokemonListState.nextUrl == null} onClick={()=>{
           const urlToSet = pokemonListState.nextUrl;
           setPokemonListState({...pokemonListState,pokedexUrl:urlToSet})}}>Next</button>
       </div>

    </div>
  )
}

export default PokemonList;
