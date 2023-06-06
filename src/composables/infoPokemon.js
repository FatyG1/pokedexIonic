  
  import { ref } from "vue"

  export const useInfoPokemon = () =>{      
    
    const dataQR= ref(null);
    
    let name = ref(null);
    let experience = ref(null);
    let height = ref(null);
    let  weight = ref(null);
  //Método infoPokemon recoge los datos recuperados en el método SearchPokemon y pinta la información en el containerTxt
  const infoPokemon = async(url) =>{ 
    if(url == null){
      alert('You must first look for a pokemon ')
    }else{
    try {   
    fetch(url)       
    .then(response=> response.json()) 
    .then(data => {
   
    name = data.name
    experience = data.base_experience;
    height = data.height;
    weight = data.weight;
    document.querySelector('.containerTxt').innerHTML =  `
            <h1 class="text-center"> INFO </h1>
            <OL id="list">
                <LI>Name: ${name}</LI> 
                <LI>Name: ${experience}</LI> 
                <LI>Name: ${height}</LI> 
                <LI>Name: ${weight}</LI>                          
            </OL>
             `
            })
      }        
    catch (error) {
      alert('You must first look for a pokemon ')
    }}
    
  }
  return{infoPokemon}
}