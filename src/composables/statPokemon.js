
  export const useStatPokemon = () =>{

const statPokemon = async(url)=>{
    if(url == ''){
      alert('You must first look for a pokemon ')
    }else{
    try {
    fetch(`${url}`)       
    .then(response=> response.json()) 
    .then(data => {
    let nameQR = data.name
    let statName=[] 
    let statBasic=[]
    let statEffort=[]
    
      document.querySelector('.containerTxt').innerHTML =  `
            <h1 class="text-center"> STATS </h1>
            <OL id="list"></OL>
        `
            for(let i = 0; i < data.stats.length; i++){            
                statName.push([data.stats[i].stat.name])
                statBasic.push([data.stats[i].base_stat])
                statEffort.push([data.stats[i].effort])

                const element = document.createElement("LI");
                const text = document.createTextNode("Name: " + statName[i] + " Basic stat: " + statBasic[i] + " Effort: " + statEffort[i]);
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
    statPokemon
  }
}