<script setup >
  import {IonCol, IonGrid, IonRow, IonPage, IonHeader, IonContent, IonButton, IonModal, IonIcon, IonCard, IonCardContent} from '@ionic/vue'
  import { defineComponent } from 'vue';
  import { logoIonic, search, qrCode } from 'ionicons/icons';
  import {UseQrReader} from '../composables/QRReader'
  import {} from '../composables/jsQR'
  let { QR, info, abilities, stat} = UseQrReader();
  
</script>
<template>
<ion-page>
  <ion-header>
    <div class = " containerCircle">
            <div class="camera" >              
              <div id="scannerContainer">
            <video id="video" ></video>          
    </div>
            </div>
            <div class="circleGreen"  >

            </div>
            <div class="circleYellow">
                
            </div>
        
  </div>
</ion-header>  
  <ion-content>
    <body>
    <ion-card color="secondary" class="container containerImg" >
      <ion-card-content>

      </ion-card-content>
    </ion-card>  
  
  <ion-card color="success" class="container containerTxt">
    <ion-card-content >  
      <canvas id="canvas" style="display: none;"></canvas>
      <div id="result"></div>    
    </ion-card-content>  
  </ion-card>

  <div class= "containerButtons" >
    
        <ion-button v-if="nameS" 
          color="warning"
          class="btn" 
          id="btInfo" 
          @click='infoPokemon'>
          INFO
        </ion-button>
        <ion-button v-else 
          color="warning"
          class="btn" 
          id="btInfo" 
          @click='info'>
          INFO
        </ion-button>
        <ion-button v-if="nameS" 
          color="warning"
          class="btn"  
          id="btStats" 
          @click='statPokemon'>
          STATS
        </ion-button >
        <ion-button v-else
          color="warning"
          class="btn"  
          id="btStats" 
          @click='stat'>
          STATS
        </ion-button >
        <ion-button v-if="nameS" 
          color="warning"
          class="btn" 
          id="btInfo"
          @click='abilitiesPokemon' 
          >
          ABILITIES
        </ion-button>
        <ion-button v-else
          color="warning"
          class="btn" 
          id="btInfo"
          @click='abilities' 
          >
          ABILITIES
        </ion-button>
    
  </div>

    <ion-grid >
    <ion-row >
      <ion-col >
    <ion-button id="open-modal" color="brown" expand="block"   
    aria-label="Favo"> 
      <ion-icon :icon="search" size="large" aria-hidden="true"
        >
      </ion-icon>
    </ion-button >  
  </ion-col>
  <ion-col >
    <ion-button aria-label="Favorite" color="brown" id="btQr" expand="block" @click='QR'>
      <ion-icon :icon="qrCode" size="large" aria-hidden="true"></ion-icon>
  </ion-button>
</ion-col>
  </ion-row>
  </ion-grid>

  <!-- Modal -->
  <ion-modal trigger="open-modal" :initial-breakpoint="1" :breakpoints="[0, 1]">
   
    <label> Search Pokemon:  </label>
    <input
      type="text" 
      id='namePokemon' 
      placeholder="Pikachu"
      v-model="pokemonId"/>
    <ion-button color="warning" 
      shape="round"
      class="btn"
      id="btModalSearch"
      @click="searchPokemon">   
      Search
    </ion-button>
  
  </ion-modal>
</body>
</ion-content>
</ion-page>
</template>


<script>
export default defineComponent({
    components: {IonCol, IonGrid, IonRow, IonButton, IonModal, IonHeader, IonContent, IonIcon, IonCard, IonCardContent},
    setup() {
      return { logoIonic, search, qrCode };
    },
  
  data: () => ({
    
    pokemonData : {},
    pokemonId: ``,
    ab:'',
    statName:'', 
    statBasic:'',
    statEffort:'', 
    name:'',
    experience:'',
    height:'',
    weight:'',
    nameS :  '',
}), 
methods: {

async clean(){
  document.querySelector('.containerTxt').innerHTML =  ``

  },
  async searchPokemon() {(``)
  this.nameS = true;
   
    try {
      this.clean();
      const pokemonToFind = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`)       
      const pokemon = await pokemonToFind.json();
      this.pokemonData = pokemon;
      
     
      document.querySelector('.containerImg').innerHTML =  ` 
      <img class=" img" src="${this.pokemonData.sprites.front_default}" alt="pokemonData.name">
              ` 
    } catch (error) {
      alert('Pokemon not found')
    }
   
  },
  async abilitiesPokemon(){(``)
    let name = this.pokemonData.name; 
    let ab=[] 
   try{
    if (name != null){
    document.querySelector('.containerTxt').innerHTML =  ` 
              <h1 class="text-center"> ABILITIES </h1>
              <OL id="list"></OL>
              ` 
    for(let i = 0; i < this.pokemonData.abilities.length; i++){+
      ab.push([this.pokemonData.abilities[i].ability.name])             

      const element = document.createElement("LI");
      const text = document.createTextNode("Name: " + ab[i]);
      element.appendChild(text);
      const list = document.getElementById("list");
      list.appendChild(element);
    }}
    else{
      alert('busca pokemon')
    } 
  } catch (error) {
      alert('You must first look for a pokemon ')
    }    
},
async statPokemon(){(``)
  let name = this.pokemonData.name;
  let statName=[] 
  let statBasic=[]
  let statEffort=[]
  try {
    if(name == null){
      alert('You must first look for a pokemon ')
    }else{
    document.querySelector('.containerTxt').innerHTML =  `
          <h1 class="text-center"> STATS </h1>
          <OL id="list"></OL>
      `
          for(let i = 0; i < this.pokemonData.stats.length; i++){            
              statName.push([this.pokemonData.stats[i].stat.name])
              statBasic.push([this.pokemonData.stats[i].base_stat])
              statEffort.push([this.pokemonData.stats[i].effort])

              const element = document.createElement("LI");
              const text = document.createTextNode("Name: " + statName[i] + " Basic stat: " + statBasic[i] + " Effort: " + statEffort[i]);
              element.appendChild(text);
              const list = document.getElementById("list");
              list.appendChild(element);
}
          }    
  } catch (error) {
      alert('You must first look for a pokemon ')
    }
  
},
async infoPokemon(){(``)
 let name = this.pokemonData.name;
  let experience = this.pokemonData.base_experience;
  let height = this.pokemonData.height;
  let weight = this.pokemonData.weight;
  
  try{
 if(name != null){
    document.querySelector('.containerTxt').innerHTML =  `
          <h1 class="text-center"> INFO </h1>
          <OL id="list">
              <LI>Name: ${name}</LI> 
              <LI>Experience: ${experience}</LI>    
              <LI>Height: ${height}</LI>
              <LI>Weiht: ${weight}</LI>            
          </OL>
           `
       }else{
        alert('You must first look for a pokemon ')
       }
      }
  catch (error) {
    alert(error)
  }
}
}
});
</script>

<style scoped>
@import "/src/theme/main.css";

</style>