import useDebounce from "../../Hooks/useDebounce";
import "./Search.css"
function Search({updateSearchTerm}) {
  const debounceCallback = useDebounce((e)=>updateSearchTerm(e.target.value))
  return (
    <div className="search-wrapper">
      <input 
        type="text" 
        id="pokemon-name-search"   
        placeholder="pokemon name...." 
        onChange={debounceCallback}
      />
    </div>
  )
}

export default Search;
