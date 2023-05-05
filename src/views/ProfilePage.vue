<template>
  <app-layout>
    <div id="container"  @mousemove="handleMouseMove($event)" @mouseup="handleMouseUp($event)" class="bg-base-100 relative p-8 min-h-screen space-y-3">
      <div>
        <div class="border-2 p-4 overflow-hidden relative border-base-content/50 bg-base-100 w-full rounded-3xl">
          <div class="w-full space-y-3 text-base-content">
            <div>
                <div class="w-16 mask mask-squircle">
                    <img v-if="!isEmpty(user)" :src="`${user.photoURL}`" alt="Photo profile"/>
                    <img v-else src="/assets/avatar.png" alt="Photo profile"/>
                </div>
            </div>
            <div>
                <h5 class="font-bold">{{ user.displayName }}</h5>
                <p class="text-sm">{{ user.email }}</p>
            </div>
          </div>
          <div role="button" class="w-full mt-4 rounded-xl hover:bg-green-800 transition-all bg-primary p-4 relative z-40">
            <div class="flex text-white items-center">
              <div class="grow space-y-1">
                <h5 class="m-0 font-bold">120.000</h5>
                <p class="text-sm m-0">Total Koinku</p>
              </div>
              <div>

                <Icon icon="ph:coin-duotone" class="text-5xl"/>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="fixed z-30 bottom-0 w-full left-0 p-6">
            <div ref="swiperContainer" id="swiper-container" class="w-full bg-base-200 p-3 rounded-3xl relative">
                <div ref="swiperRight" id="swipe-right" class="absolute right-5 top-7 flex text-2xl">
                    <Icon class="icon-swipe" icon="material-symbols:chevron-right-rounded" />
                    <Icon class="icon-swipe" icon="material-symbols:chevron-right-rounded" />
                    <Icon class="icon-swipe" icon="material-symbols:chevron-right-rounded" />
                </div>
                <div @mousedown="handleMouseEnter($event)" 
                    @mouseup="handleMouseUp($event)"
                    ref="swiperButton" id="swiper-button" class="p-4 z-40 transition-all px-8 bg-red-500 rounded-2xl text-white inline-block relative hover:scale-105">{{ buttonText }}</div>
            </div>
        </div>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { Icon } from '@iconify/vue'
import { ref, onBeforeMount, onMounted, onUnmounted, Ref } from 'vue'
import { auth, db } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const user = ref({})
const router = useRouter()

const swiperContainer: Ref<HTMLElement | null> = ref(null)
const swiperButton: Ref<HTMLElement | null> = ref(null)
const swiperRight: Ref<HTMLElement | null> = ref(null)
const buttonText: Ref<string> = ref("Logout")
const slideMovementTotal: Ref<number> = ref(0)
const initialMouse: Ref<number> = ref(0)
const isSuccess: Ref<boolean> = ref(false)
const isMouseEnter: Ref<boolean> = ref(false)

onBeforeMount(() => {
    onAuthStateChanged(auth, (item) => {
        if(item) user.value = item
    })
})

onMounted(() => {
    swiperButton.value?.addEventListener('touchstart', handleMouseEnter)
    swiperButton.value?.addEventListener('touchend', handleMouseUp)
    swiperContainer.value?.addEventListener('touchend', handleMouseUp)
    swiperContainer.value?.addEventListener('touchmove', handleMouseMove)
})

onUnmounted(() => {
    swiperButton.value?.removeEventListener('touchstart', handleMouseEnter)
    swiperButton.value?.removeEventListener('touchend', handleMouseUp)
    swiperContainer.value?.removeEventListener('touchend', handleMouseUp)
    swiperContainer.value?.removeEventListener('touchmove', handleMouseMove)
})

function handleMouseEnter(event: any) {
    if(!isSuccess.value && swiperContainer.value && swiperButton.value) {
        isMouseEnter.value = true
        slideMovementTotal.value = (swiperContainer.value.getBoundingClientRect().width - swiperButton.value.getBoundingClientRect().width)
        initialMouse.value = event.clientX || event.changedTouches[0].pageX;
    }
} 

function handleMouseMove(event: any) {
    if(!isSuccess.value) {
        if(!isMouseEnter.value) 
            return
        
        const currentMouse = event.clientX || event.changedTouches[0].pageX
        const relativeMouse = currentMouse - initialMouse.value
        if(swiperButton.value) {
            if(relativeMouse <= 0) {
                swiperButton.value.style.left = '-10px'
                return
            }
            if(relativeMouse >= slideMovementTotal.value + 10) {
                swiperButton.value.style.left = slideMovementTotal.value + 'px'
                return
            }
            swiperButton.value.style.left = (relativeMouse + 10) + 'px'
            if(relativeMouse < slideMovementTotal.value) {
                buttonText.value = "Logout"
            } else {
                handleSuccess()
            }
        }
    }
}

function handleMouseUp(event: any) {
    if(!isSuccess.value) {
        if(!isMouseEnter.value) 
            return

        isMouseEnter.value = false
        const currentMouse = event.clientX || event.changedTouches[0].pageX
        const relativeMouse = currentMouse - initialMouse.value
        if(relativeMouse < slideMovementTotal.value) {
            buttonText.value = "Logout"
        } else {
            handleSuccess()
        }
    }
}

function handleSuccess() {
    setTimeout(() => {
        isSuccess.value = true
        onLogout()
        if(swiperButton.value) swiperButton.value.style.left = '0px'
        swiperButton.value?.classList.add('w-full', 'absolute', 'top-0', 'left-0', 'scal')
        buttonText.value = "Sampai Jumpa"
    }, 1000)
    setTimeout(() => {
        router.push({name: 'Login'})
    }, 2500)
}

function isEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

async function onLogout() {
    try {
        await signOut(auth)
        router.push({name: 'Start'})
    } catch (error) {
        console.error('Error signing out:', error)
    }
}

</script>