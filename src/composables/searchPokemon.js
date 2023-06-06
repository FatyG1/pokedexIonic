import {ref} from 'vue'
export const useSearchPokemon = () =>{
    let img = ref(null);
   
    
   
const searchPokemon= async(url) =>{
    
    try {
        fetch(`${url}`)       
        .then(response=> response.json()) 
        .then(data => {
            img = data.sprites.front_default
     
      document.querySelector('.containerImg').innerHTML =  ` 
      <img class=" img" src="${img}" alt="pokemonData.name">
              ` 
            }) 
    } catch (error) {
      alert('Pokemon not found')
    }
  
  }
  return{ searchPokemon}
}