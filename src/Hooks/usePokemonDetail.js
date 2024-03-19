import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id){
    const[pokemon, setPokemon] = useState({})
    // const[isloading, setIsLoading] = useState(true);
    let pokemonListHookResponse = [];
    async function downloadPokemons(){
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // console.log(response.data);
    setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t)=>t.type.name)
    })
    }
    pokemonListHookResponse = usePokemonList(`https://pokeapi.co/api/v2/type/${pokemon.types ? pokemon.type[0]:'fire'}`,true)

    useEffect(()=>{
        downloadPokemons();
        console.log(pokemonListHookResponse);
    },[])
}
export default usePokemonDetails;