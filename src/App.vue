<template>
  <ion-app>
      <home-page />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup >
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import HomePage from './views/HomePage.vue';

</script>
