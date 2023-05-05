<template>
  <ion-page>
    <ion-content>
        <div ref="appContainer" id="app-container">
            <div ref="appHeader" id="app-header" class="px-8 pt-8 flex items-center justify-between">
                <div>
                    <button class="btn btn-ghost">
                        <Icon icon="ri:notification-2-line" class="text-base-content text-xl"/>
                    </button>
                </div>
                <div>
                    <div @click="$router.push({name: 'Profile'})" class="avatar btn btn-ghost px-0 hover:bg-base-200">
                        <div class="w-12 mask mask-squircle">
                            <img v-if="!isEmpty(user)" :src="`${user.photoURL}`" alt="Photo profile"/>
                            <img v-else src="/assets/avatar.png" alt="Photo profile"/>
                        </div>
                    </div>
                </div>
            </div>

            <slot></slot>
        
            <div :class="{'opacity-0 z-0': $route.name === 'Profile'}" ref="appFooter" id="app-footer" class="fixed transition-all bottom-0 left-0 w-full p-6">
                <div class="w-full rounded-2xl bg-base-200 p-6 shadow-xl flex items-center justify-items-between justify-between">
                    <div class="text-base-content hover:text-primary btn btn-ghost transition-all">
                        <Icon icon="solar:home-smile-angle-bold-duotone" class="text-3xl"/>
                    </div>
                    <div class="text-base-content hover:text-primary btn btn-ghost transition-all">
                        <Icon icon="uim:history-alt" class="text-3xl"/>
                    </div>
                    <div class="text-base-content hover:text-primary btn btn-ghost transition-all">
                        <Icon icon="solar:star-bold-duotone" class="text-3xl"/>
                    </div>
                    <div class="text-base-content hover:text-primary btn btn-ghost transition-all">
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
import { ref } from 'vue'

export default defineComponent({
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
