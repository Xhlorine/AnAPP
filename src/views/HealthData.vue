<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-segment v-model="currentSeg">
                    <ion-segment-button :value="0">Sleep</ion-segment-button>
                    <ion-segment-button :value="1">HeartRate</ion-segment-button>
                    <ion-segment-button :value="2">Water</ion-segment-button>
                    <ion-segment-button :value="3">Steps</ion-segment-button>
                </ion-segment>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ges">
            <!-- enter-active-class, leave-active class -->
            <Transition :name="animeDirection">
                <Sleep v-if="currentSeg == 0" class="component"></Sleep>
                <HeartRate v-else-if="currentSeg == 1" class="component"></HeartRate>
                <Water v-else-if="currentSeg == 2" class="component"></Water>
                <Steps v-else-if="currentSeg == 3" class="component"></Steps>
            </Transition>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle, IonSegment, IonSegmentButton, createGesture, onIonViewDidEnter } from "@ionic/vue"
import { ref } from "vue";
import Sleep from "@/components/Sleep.vue";
import HeartRate from "@/components/HeartRate.vue";
import Water from "@/components/Water.vue";
import Steps from "@/components/Steps.vue";

const currentSeg = ref(0)
const animeDirection = ref('to-right')

onIonViewDidEnter(() => {
    // Gestrue
    const ges = createGesture({
        el: document.querySelector('.ges') as Element,
        threshold: 15,
        gestureName: 'slide',
        disableScroll: true,
        canStart: (ev) => {
            return !(ev.currentY > window.innerHeight/2 && (currentSeg.value == 1 || currentSeg.value == 3))
        },
        onEnd: (ev) => {
            if(ev.deltaX > 110 || ev.velocityX > 4) {
                currentSeg.value -= (currentSeg.value == 0) ? 0 : 1
                animeDirection.value = 'to-right'
            } else if(ev.deltaX < -110 || ev.velocityX < -4) {
                currentSeg.value += (currentSeg.value == 3) ? 0 : 1
                animeDirection.value = 'to-left'
            } else {
                // Do nothing
            }
            if(currentSeg.value > 3) {
                currentSeg.value = 3
            }
            else if(currentSeg.value < 0) {
                currentSeg.value = 0
            }
        }
    })
    ges.enable(true)
})

</script>

<style scoped>
.to-left-leave-active,
.to-left-enter-active,
.to-right-leave-active,
.to-right-enter-active {
    transition: all .3s ease-in-out;
}

.to-left-leave-to,
.to-right-enter-from {
    transform: translateX(-100%);
}

.to-left-enter-from,
.to-right-leave-to {
    transform: translateX(100%);
}

.to-left-enter-to,
.to-right-enter-to,
.to-left-leave-from,
.to-right-leave-from {
    transform: translateX(0);
}

</style>