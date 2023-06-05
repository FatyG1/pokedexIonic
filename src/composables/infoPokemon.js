import {UseQrReader} from './QRReader'
import { ref } from "vue"

let { QR, url} = UseQrReader();


export const UseQrInfo = () =>{ 

    let nameQR = ref(null);
    let experienceQR = ref(null);
    let heightQR = ref(null);
    let  weightQR = ref(null);
const info = async() =>{ 
  
    if(url == ''){
      alert('You must first look for a pokemon ')
    }else{
    try {   
    fetch(`${url}`)       
    .then(response=> response.json()) 
    .then(data => {
   
    nameQR = data.name
    experienceQR = data.base_experience;
    heightQR = data.height;
    weightQR = data.weight;
    document.querySelector('.containerTxt').innerHTML =  `
            <h1 class="text-center"> INFO </h1>
            <OL id="list">
                <LI>Name: ${nameQR}</LI> 
                <LI>Name: ${experienceQR}</LI> 
                <LI>Name: ${heightQR}</LI> 
                <LI>Name: ${weightQR}</LI>                          
            </OL>
             `
            })
      }        
    catch (error) {
      alert('You must first look for a pokemon ')
    }}
    
  }
  return{    
    info
  };
}