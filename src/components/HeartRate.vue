<template>
    <ion-page>
        <ion-content>
            <h1>HeartRate!</h1>
            <DateSelector color-theme="red" @select-date="(sel: any) => {  }" />
        </ion-content>
        <ion-footer>
            <heart-rate-chart class="noges" :data="demo"></heart-rate-chart>
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonFooter, onIonViewDidEnter } from '@ionic/vue';
import { CustomHeartRate } from '@/composables/CustomHeartRate';
import HeartRateChart from '@/components/HeartRateChart.vue';
import DateSelector from './DateSelector.vue';

const demo: CustomHeartRate[] = [
    { time: 0.2, heartRate: 68},
    { time: 0.36, heartRate: 75},
    { time: 1, heartRate: 69},
    { time: 1.65, heartRate: 85},
    { time: 1.70, heartRate: 135},
    { time: 1.86, heartRate: 200},
    { time: 2.06, heartRate: 162},
    { time: 3.59, heartRate: 103},
    { time: 6.89, heartRate: 96},
    { time: 7.66, heartRate: 78},
    { time: 8.52, heartRate: 68},
    { time: 9.10, heartRate: 58},
    { time: 13.62, heartRate: 89},
    { time: 19.52, heartRate: 78},
    { time: 22.9, heartRate: 66},
    { time: 23.9, heartRate: 95}
]

onIonViewDidEnter(() => {
})

</script>

<style scoped>
ion-footer {
    box-shadow: none;
}
</style>