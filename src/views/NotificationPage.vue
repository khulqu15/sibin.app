<template>
  <app-layout>
    <div id="container" class="bg-base-100 relative p-8 pt-0 min-h-screen space-y-3">
        <div>
            <h4 class="text-base-content font-bold">Notifikasi</h4>
            <label for="notification-detail" v-for="(item, index) in messages" :key="index" @click="selected = index" class="w-full flex items-center gap-3 pr-4 space-y-2 bg-base-100 hover:bg-base-200 transition-all rounded-2xl p-2">
                <img :src="`/assets/icon/${item.icon}`" class="w-16 my-1 h-16 rounded-full object-cover object-center" alt="Icon">
                <div class="text-base-content grow">
                    <h6 class="font-semibold m-0">{{ item.title }}</h6>
                    <p class="text-sm">{{ item.description }}</p>
                </div>
                <div>
                    <Icon icon="material-symbols:info-rounded" class="text-indigo-500"/>
                </div>
            </label>
            <input type="checkbox" id="notification-detail" class="modal-toggle" />
            <label for="notification-detail" class="modal modal-bottom sm:modal-middle z-40">
                <label for="" class="modal-box">
                    <img :src="`/assets/icon/${messages[selected].icon}`" class="w-16 my-1 h-16 rounded-full object-cover object-center" alt="Icon">
                    <h3 class="font-bold text-lg m-0">{{ messages[selected].title }}</h3>
                    <p class="pb-4">{{ messages[selected].description }}</p>
                    <div class="modal-action">
                        <label for="notification-detail" class="btn w-full bg-base-200 text-base-content">Tutup</label>
                    </div>
                </label>
            </label>
        </div>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { Icon } from '@iconify/vue'
import { ref, onBeforeMount, onMounted, onUnmounted, Ref } from 'vue'
import { useRouter } from 'vue-router'

const selected: Ref<number> = ref(0)
const messages = ref([
    {
        icon: 'green.png',
        title: 'Rute Telah Siap',
        description: 'Rute Pens, Kalisari, Keputih'
    },{
        icon: 'blue.png',
        title: 'Request Baru Nih...',
        description: 'Putera minta sampahnya diambil'
    },{
        icon: 'red.png',
        title: 'Request Gak Jadi',
        description: 'Putera cancel sampahnya diambil'
    },{
        icon: 'green.png',
        title: 'Rute Telah Siap',
        description: 'Rute Pens, Kalisari, Keputih'
    },{
        icon: 'blue.png',
        title: 'Request Baru Nih...',
        description: 'Putera minta sampahnya diambil'
    },{
        icon: 'red.png',
        title: 'Request Gak Jadi',
        description: 'Putera cancel sampahnya diambil'
    }
])

</script>