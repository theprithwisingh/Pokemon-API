import axios from "axios";
import './PokemonList.css'
import { useState } from "react";
import { useEffect } from "react"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

  const[PokemonList, setPokemonList] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const POKEDEX_URL  ='https://pokeapi.co/api/v2/pokemon';

   async function downloadPokemons(){
     const response = await axios.get(POKEDEX_URL);//this downloads list of 20 pokemons
     const PokemonResults=response.data.results; //we get the array of pokemons from results 

    //iterating over the array of pokemons , and using their url, to create an array of promises
     const pokemonResultProsime = PokemonResults.map((pokemon)=>axios.get(pokemon.url));
     const pokemonData = await axios.all(pokemonResultProsime);
     console.log(pokemonData);

     const pokeListResult = pokemonData.map((pokeData)=>{
      const pokemon = pokeData.data;
      return{
        name:pokemon.name,
        image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
        types:pokemon.types,
        id:pokemon.id
      }
     })
     setPokemonList(pokeListResult);
     setIsLoading(false);
   }

    useEffect(()=>{
        downloadPokemons();
    },[]);
  return (
    <div className="pokemon-list-wrapper">
       Pokemon List
       {(isLoading)?' Loading....' : 
       PokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
       }
    </div>
  )
}

export default PokemonList;
