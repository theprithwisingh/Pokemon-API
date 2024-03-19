import './App.css'
import { Link } from 'react-router-dom'
// import Pokedex from './Components/Podedex/Pokedex'
import CustomRoutes from './Routes/CustomRoutes'
function App() {
  return (
    <> 
    <h1 id='pokedex-heading'>
      <Link to="./">Pokedex</Link>
    </h1>
      <CustomRoutes/>
    </>
  )
}

export default App
