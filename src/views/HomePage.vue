<script setup >

  import {IonCol, IonGrid, IonRow, IonPage, IonHeader, IonContent, IonButton, IonModal, IonIcon, IonCard, IonCardContent} from '@ionic/vue';
  import { defineComponent,  ref  } from 'vue';
  import { logoIonic, search, qrCode } from 'ionicons/icons';
  import {UseQrReader} from '../composables/QRReader'
  import {} from '../composables/jsQR'  
  import {useInfoPokemon} from '../composables/infoPokemon'
  import {useStatPokemon} from '../composables/statPokemon'
  import {useAbilitiesPokemon} from '../composables/abilitiesPokemon'
  import{ useSearchPokemon } from '../composables/searchPokemon'

  let { QR, infoQR, abilitiesQR, statQR} = UseQrReader();
  let { infoPokemon } = useInfoPokemon();
  let {statPokemon} = useStatPokemon();
  let {abilitiesPokemon} = useAbilitiesPokemon(); 
  let {searchPokemon} = useSearchPokemon();
  
  let searchPk = ref(null);
</script>
<template>
  <ion-page>
    <ion-content :fullscreen="true">
      
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
      
      <ion-button v-if="searchPk" 
        color="warning"
        class="btn" 
        id="btInfo" 
        @click='infoPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)'>
        INFO
      </ion-button>

      <ion-button v-else 
        color="warning"
        class="btn" 
        id="btInfo" 
        @click='infoQR(`${url}`)'>
        INFO
      </ion-button>

      <ion-button v-if="searchPk" 
        color="warning"
        class="btn"  
        id="btStats" 
        @click='statPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)'>
        STATS
      </ion-button >
      <ion-button v-else
        color="warning"
        class="btn"  
        id="btStats" 
        @click='statQR'>
        STATS
      </ion-button >
      <ion-button v-if="searchPk" 
        color="warning"
        class="btn" 
        id="btInfo"
        @click='abilitiesPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)'>
        ABILITIES
      </ion-button>
      <ion-button v-else
        color="warning"
        class="btn" 
        id="btInfo"
        @click='abilitiesQR'>
        ABILITIES
      </ion-button>
      
    </div>

    <ion-grid >
      <ion-row >
        <ion-col >
          <ion-button 
            id="open-modal" 
            color="brown" 
            expand="block"   
            aria-label="Favo"> 
            <ion-icon 
              :icon="search" 
              size="large" 
              aria-hidden="true"          >
            </ion-icon>
          </ion-button >  
        </ion-col>
        <ion-col >
          <ion-button 
            aria-label="Favorite" 
            color="brown" 
            id="btQr" 
            expand="block" 
            v-on:click="searchPk=false" 
            @click='QR'>
            <ion-icon 
              :icon="qrCode" 
              size="large" 
              aria-hidden="true">
            </ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>

    <!-- Ventana modal: se activará al pulsar el botón de la lupa. El usuario introducira 
      en el input el id o el nombre del pokemon que desea buscar -->
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
        v-on:click="searchPk=true" 

        @click="searchPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)">   
        Search
      </ion-button>
    
    </ion-modal>
    
  </body>
  </ion-content>
  </ion-page>
</template>


<script>
export default defineComponent({
    components: { IonCol, IonGrid, IonRow, IonButton, IonModal, IonHeader, IonContent, IonIcon, IonCard, IonCardContent},
    
    setup() {
      return { logoIonic, search, qrCode};
    },
 
});
</script>

<style scoped>
  @import "/src/theme/main.css";
</style>