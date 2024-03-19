import { Route, Routes } from "react-router-dom"
import Pokedex from "../Components/Podedex/Pokedex";
import PokemonDetails from "../Components/PokemonDetails/PokemonDetails";
function CustomRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Pokedex/>}/>
      <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
      <Route/>

    </Routes>
  )
}

export default CustomRoutes;
