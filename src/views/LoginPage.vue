<template>
  <ion-page>
    <ion-content>
      <div id="container" class="min-h-screen bg-base-100 grid grid-cols-1 items-center justify-items-center">
        <div class="absolute top-0 w-full left-0 flex justify-center py-6">
            <img src="/assets/logo_default.svg" class="w-12" alt="Sibin Logo">
        </div>
        <div class="px-8 space-y-8">
            <img src="/assets/illustration/login.png" alt="Login Illustration">
            <h1 class="font-bold">Halo.. Selamat Datang</h1>
            <p>Siapkan aksi hero bersihmu bersama kami menjaga kebersihan mulai dari Login</p>
        </div>
        <div class="absolute bottom-0 w-full left-0 p-6">
            <button @click="loginGoogle()" class="btn bg-primary w-full hover:bg-green-800 transition-all">Lanjut</button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { auth } from '@/firebase'
import { IonPage, IonContent } from '@ionic/vue'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Router, useRouter } from 'vue-router'

const router: Router = useRouter()

async function loginGoogle() {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    router.push({name: 'Home'})
  } catch(error) {
    console.error('Error logging in with Google:', error)
  }
}
</script>