
export const useAbilitiesPokemon = () =>{    
const abilitiesPokemon =   async(url) =>{
    if(url == ''){
      alert('You must first look for a pokemon ')
    }else{
    try{
    fetch(`${url}`)       
    .then(response=> response.json()) 
    .then(data => {
        let nameQR = data.name
        let ab=[] 
       
        document.querySelector('.containerTxt').innerHTML =  ` 
                  <h1 class="text-center"> ABILITIES </h1>
                  <OL id="list"></OL>
                  ` 
        for(let i = 0; i < data.abilities.length; i++){
          ab.push([data.abilities[i].ability.name])             
  
          const element = document.createElement("LI");
          const text = document.createTextNode("Name: " + ab[i]);
          element.appendChild(text);
          const list = document.getElementById("list");
          list.appendChild(element);
        } 
       })
      } catch (error) {
          alert('You must first look for a pokemon ')
        }    
    }
    }
    return{
        abilitiesPokemon
    }
}