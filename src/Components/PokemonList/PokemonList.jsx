import axios from "axios";
import './PokemonList.css'
import { useState } from "react";
import { useEffect } from "react"

function PokemonList() {

   async function downloadPokemons(){
     const responce = await axios.get('https://pokeapi.co/api/v2/pokemon')
     console.log(responce);
   }

    useEffect(()=>{
        downloadPokemons();
    },[]);
  return (
    <div className="pokemon-list-wrapper">
       Pokemon List
    </div>
  )
}

export default PokemonList
