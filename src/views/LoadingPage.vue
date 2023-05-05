<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container" class="bg-primary min-h-screen grid grid-cols-1 items-center justify-items-center">
        <div>
            <img ref="splashImage" src="/assets/logo_white_transparent.svg" class="w-24 splashscreen vanishIn" alt="Logo">
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const splashImage = ref<HTMLElement | null>(null)
const router = useRouter()

onMounted(() => {
    setTimeout(() => {
        splashImage.value?.classList.remove('vanishIn')
        splashImage.value?.classList.add('vanishOut')
    }, 2500)
    setTimeout(() => {
        router.push({name: 'Welcome'})
    }, 3500)
})
</script>

<style>
@keyframes vanishIn {
  0% {
    filter: blur(50px);
    transform: scale(1.4);
    opacity: 0.5;
  }
  100% {
    filter: blur(0px);
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes vanishOut {
  0% {
    filter: blur(0px);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    filter: blur(50px);
    transform: scale(1.4);
    opacity: 0.5;
  }
}
.splashscreen {
  animation-delay: 0.5s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
.splashscreen.vanishIn {
  opacity: 0;
  animation-name: vanishIn;
}
.splashscreen.vanishOut {
  animation-name: vanishOut;
}
</style>