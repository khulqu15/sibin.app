<template>
  <app-layout page="Home">
    <div id="container" class="bg-base-100 p-8 min-h-screen space-y-3 pb-32">
      <div>
        <div class="border-2 p-5 overflow-hidden relative border-base-content/50 bg-base-100 w-full rounded-3xl">
          <img src="/assets/illustration/home.png" class="absolute -right-2 bottom-20" alt="Home Illustration">
          <div class="w-7/12 space-y-3 text-base-content relative z-20">
            <h4 class="font-bold">Buat kota kita indah, Minimalisir Tumpukan Sampah</h4>
            <p class="text-sm">Pantau terus, jangan lengah dengan tumpukan sampah</p>
          </div>
          <div role="button" class="w-full mt-4 rounded-xl hover:bg-green-800 transition-all bg-primary p-4 relative z-40">
            <div class="flex text-white items-center">
              <div class="grow space-y-1">
                <h5 class="m-0 font-bold">Mulai Sekarang</h5>
                <p class="text-sm m-0">Pantau tumpukan sampah</p>
              </div>
              <div>
                <Icon icon="solar:map-point-bold-duotone" class="text-5xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h4 class="font-bold text-base-content">Pelayanan Lain</h4>
        <div class="grid grid-cols-2 gap-3">
          <button class="btn inline-block h-40 bg-base-200 rounded-2xl p-2 transition-all text-center text-base-content hover:text-white hover:bg-primary">
            <div class="w-full my-3">
              <Icon icon="solar:smart-home-angle-bold-duotone" class="inline-block text-4xl"/>
            </div>
            User Request
          </button>
          <button class="btn inline-block h-40 bg-base-200 rounded-2xl p-2 transition-all text-center text-base-content hover:text-white hover:bg-primary">
            <div class="w-full my-3">
              <Icon icon="solar:trash-bin-2-bold-duotone" class="inline-block text-4xl"/>
            </div>
            Sibin Smart
          </button>
          <button class="btn inline-block h-40 bg-base-200 rounded-2xl p-2 transition-all text-center text-base-content hover:text-white hover:bg-primary">
            <div class="w-full my-3">
              <Icon icon="ph:coin-duotone" class="inline-block text-4xl"/>
            </div>
            Sibin Coin
          </button>
          <button class="btn inline-block h-40 bg-base-200 rounded-2xl p-2 transition-all text-center text-base-content hover:text-white hover:bg-primary">
            <div class="w-full my-3">
              <Icon icon="solar:book-bookmark-bold-duotone" class="inline-block text-4xl"/>
            </div>
            Sibin Edu
          </button>
        </div>
      </div>
      <div class="mt-4">
        <h4 class="font-bold text-base-content">Data Percobaan</h4>
        <div class="space-y-3">
          <div v-for="(item, index) in data" :key="index" class="w-full rounded-2xl flex items-center justify-items-between justify-between bg-base-200 p-3 pr-6">
            <div class="px-5 py-2 bg-primary rounded-xl text-white inline-block">
              {{ item }}
            </div>
            <div v-if="value.length > 0" class="text-base-content">
              {{ value[index] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { Icon } from '@iconify/vue'
import { ref, onBeforeMount, Ref } from 'vue'
import { db } from '@/firebase'
import { ref as firef, onValue } from 'firebase/database';

const data: string[] = ['capacity', 'laser', 'latitude', 'longitude', 'opened', 'ultrasonic']
const value: Ref<any[]> = ref([])

onBeforeMount(() => {
  setupRealtimeListener()
})

const setupRealtimeListener = () => {
  const dataRef = firef(db, '/')
  console.log(dataRef)
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val()
    value.value = [data.capacity, data.laser, data.latitude, data.longitude, data.opened, data.ultrasonic]
  })
}
</script>