<template>
  <app-layout page="Developer">
    <div id="container" class="bg-base-100 p-8 min-h-screen space-y-3 pb-32">
      <div>
        <img src="/assets/illustration/developer.png" alt="Developer">
      </div>
      <div class="mt-4">
        <div class="flex items-center justify-start gap-x-3">
            <img src="/assets/logo_default.svg" alt="Sibin Logo" class="w-12"/>
            <h4 class="font-bold text-base-content">SIBIN Team</h4>
        </div>
      </div>
      <div class="mt-4 space-y-4">
        <div class="flex items-center justify-start gap-x-3">
            <img src="/assets/developer/leader.png" alt="Sibin Logo" class="w-24"/>
            <div>
                <h6 class="font-bold text-primary m-0">Mohammad Khusnul Khuluq (Ninno)</h6>
                <p class="text-sm text-base-content">Leader, Programmer</p>
            </div>
        </div>
        <div class="flex items-center justify-start gap-x-3">
            <img src="/assets/developer/designer.png" alt="Sibin Logo" class="w-24"/>
            <div>
                <h6 class="font-bold text-primary m-0">Putera Dewangga</h6>
                <p class="text-sm text-base-content">Designer, Illustrator</p>
            </div>
        </div>
         <div class="flex items-center justify-start gap-x-3">
            <img src="/assets/developer/engineer.png" alt="Sibin Logo" class="w-24"/>
            <div>
                <h6 class="font-bold text-primary m-0">Muhtarum Yusuf</h6>
                <p class="text-sm text-base-content">Mechanical & Electrical Engineer</p>
            </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import { Icon } from '@iconify/vue'

</script>