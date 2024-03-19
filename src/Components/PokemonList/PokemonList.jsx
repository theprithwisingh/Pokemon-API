
import './PokemonList.css'
// import { useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../Hooks/usePokemonList";


function PokemonList() {

  const [pokemonListState, setPokemonListState] = usePokemonList('https://pokeapi.co/api/v2/pokemon')
    

   
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
