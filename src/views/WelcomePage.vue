<template>
  <ion-page>
    <ion-content>
      <div id="container" @mousemove="handleMouseMove($event)" @mouseup="handleMouseUp($event)" class="min-h-screen bg-base-100 grid grid-cols-1 items-center justify-items-center">
        <div class="absolute top-0 w-full left-0 flex justify-center py-6">
            <img src="/assets/logo_default.svg" class="w-12" alt="Sibin Logo">
        </div>
        <div class="px-8 space-y-8">
            <img src="/assets/illustration/welcome.png" alt="Home Illustration">
            <h1 class="font-bold">Ayo jaga kebersihan lingkungan kota kita</h1>
            <p>Kami disini untuk membantu lingkunganmu tetap bersih bebas dari sampah</p>
        </div>
        <div class="absolute bottom-0 w-full left-0 p-6">
            <div ref="swiperContainer" id="swiper-container" class="w-full bg-base-200 p-3 rounded-3xl relative">
                <div ref="swiperRight" id="swipe-right" class="absolute right-5 top-7 flex text-2xl">
                    <Icon class="icon-swipe" icon="material-symbols:chevron-right-rounded" />
                    <Icon class="icon-swipe" icon="material-symbols:chevron-right-rounded" />
                    <Icon class="icon-swipe" icon="material-symbols:chevron-right-rounded" />
                </div>
                <div @mousedown="handleMouseEnter($event)" 
                    @mouseup="handleMouseUp($event)"
                    ref="swiperButton" id="swiper-button" class="p-4 z-40 transition-all px-8 bg-primary rounded-2xl text-white inline-block relative hover:scale-105">{{ buttonText }}</div>
            </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import { Icon } from '@iconify/vue'
import { ref, Ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const swiperContainer: Ref<HTMLElement | null> = ref(null)
const swiperButton: Ref<HTMLElement | null> = ref(null)
const swiperRight: Ref<HTMLElement | null> = ref(null)
const buttonText: Ref<string> = ref("Mulai")
const slideMovementTotal: Ref<number> = ref(0)
const initialMouse: Ref<number> = ref(0)
const isSuccess: Ref<boolean> = ref(false)
const isMouseEnter: Ref<boolean> = ref(false)

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
                buttonText.value = "Mulai"
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
            buttonText.value = "Mulai"
        } else {
            handleSuccess()
        }
    }
}

function handleSuccess() {
    setTimeout(() => {
        isSuccess.value = true
        if(swiperButton.value) swiperButton.value.style.left = '0px'
        swiperButton.value?.classList.add('w-full', 'absolute', 'top-0', 'left-0', 'scal')
        buttonText.value = "Selamat datang"
    }, 1000)
    setTimeout(() => {
        router.push({name: 'Login'})
    }, 2500)
}
</script>

<style>
@keyframes Blinkin {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
#swipe-right .icon-swipe {
    animation-name: Blinkin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
}
#swipe-right .icon-swipe:nth-child(2) {
    animation-delay: 0.2s;
}
#swipe-right .icon-swipe:nth-child(3) {
    animation-delay: 0.4s;
}
</style>