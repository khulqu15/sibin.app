<template>
  <ion-page>
    <ion-content>
        <div ref="appContainer" class="bg-base-100" id="app-container">
            <div ref="appHeader" id="app-header" class="px-8 pt-8 flex bg-base-100 items-center justify-between">
                <div v-if="$route.name === 'Profile' || $route.name === 'Notification'" @click="$router.push({name: 'Home'})" class="btn btn-ghost mb-3">
                    <Icon icon="solar:smart-home-angle-bold-duotone" class="inline-block text-2xl mr-3"/>
                    Kembali
                </div>
                <div v-if="$route.name !== 'Notification'">
                    <button @click="$router.push({name: 'Notification'})" class="btn btn-ghost">
                        <Icon icon="ri:notification-2-line" class="text-base-content text-xl"/>
                    </button>
                </div>
                <div v-if="$route.name !== 'Profile'">
                    <div @click="$router.push({name: 'Profile'})" class="avatar btn btn-ghost px-0 hover:bg-base-200">
                        <div class="w-12 mask mask-squircle">
                            <img v-if="!isEmpty(user)" :src="`${user.photoURL}`" alt="Photo profile"/>
                            <img v-else src="/assets/avatar.png" alt="Photo profile"/>
                        </div>
                    </div>
                </div>
            </div>

            <slot></slot>
        
            <div :class="{'opacity-0 z-0 hidden': $route.name === 'Profile' ||  $route.name === 'Notification'}" ref="appFooter" id="app-footer" class="fixed transition-all bottom-0 left-0 w-full p-6">
                <div class="w-full rounded-2xl bg-base-200 p-6 shadow-xl flex items-center justify-items-between justify-between">
                    <div @click="$router.push({name: 'Home'})" :class="{'text-primary': page === 'Home', 'text-base-content': page !== 'Home'}" class="hover:text-primary btn btn-ghost transition-all">
                        <Icon icon="solar:home-smile-angle-bold-duotone" class="text-3xl"/>
                    </div>
                    <div @click="$router.push({name: 'History'})" :class="{'text-primary': page === 'History', 'text-base-content': page !== 'History'}" class="text-base-content hover:text-primary btn btn-ghost transition-all">
                        <Icon icon="uim:history-alt" class="text-3xl"/>
                    </div>
                    <div @click="$router.push({name: 'Star'})" :class="{'text-primary': page === 'Star', 'text-base-content': page !== 'Star'}" class="text-base-content hover:text-primary btn btn-ghost transition-all">
                        <Icon icon="solar:star-bold-duotone" class="text-3xl"/>
                    </div>
                    <div @click="$router.push({name: 'Developer'})" :class="{'text-primary': page === 'Developer', 'text-base-content': page !== 'Developer'}" class="text-base-content hover:text-primary btn btn-ghost transition-all">
                        <Icon icon="solar:code-circle-bold-duotone" class="text-3xl"/>
                    </div>
                </div>
            </div>
        </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage} from '@ionic/vue'
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export default defineComponent({
    props: ['page'],
    components: { 
        Icon,
        IonPage,
        IonContent,
    },
    data() {
        return {
            user: {}
        }
    },
    created() {
        const appContainer = document.getElementById('app-container')
        appContainer?.addEventListener('scroll', this.handleScroll)
        onAuthStateChanged(auth, (user) => {
            if (user) this.user = user
            console.log(this.user)
        })
    },
    mounted() {
        const appContainer = document.getElementById('app-container')
        appContainer?.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        isEmpty(obj: object): boolean {
           return Object.keys(obj).length === 0 && obj.constructor === Object;
        },
        handleScroll(event: any) {
            console.log('SCROLL')
        }
    }

})
</script>
