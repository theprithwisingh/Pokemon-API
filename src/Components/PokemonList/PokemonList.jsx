import axios from "axios";
import './PokemonList.css'
import { useState } from "react";
import { useEffect } from "react"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

  const[PokemonList, setPokemonList] = useState([]);
  const[isLoading, setIsLoading] = useState(true);

  const[nextUrl, setNextUrl] = useState('');
  const[prevUrl, setPrevUrl] = useState('');

  const[pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  // const POKEDEX_URL  ='https://pokeapi.co/api/v2/pokemon';

   async function downloadPokemons(){
    setIsLoading(true)
     const response = await axios.get(pokedexUrl);//this downloads list of 20 pokemons
     const PokemonResults=response.data.results; //we get the array of pokemons from results 
     setNextUrl(response.data.next)
     setPrevUrl(response.data.previous)

    //iterating over the array of pokemons , and using their url, to create an array of promises
     const pokemonResultProsime = PokemonResults.map((pokemon)=>axios.get(pokemon.url));

     //passing that promise array to axios.all
     const pokemonData = await axios.all(pokemonResultProsime);
     console.log(pokemonData);

     //now iterate on the data of each pokemon, and extract id, name, image, types
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
    },[pokedexUrl]);
  return (
    <div className="pokemon-list-wrapper">
       <div>Pokemon list</div>
       <div className="pokemon-wrapper">
       {(isLoading)?' Loading....' : 
       PokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
       }
       </div>
       <div className="controls">
          <button disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
          <button disabled={nextUrl == null} onClick={()=> setPokedexUrl(nextUrl)}>Next</button>

       </div>
    </div>
  )
}

export default PokemonList;
