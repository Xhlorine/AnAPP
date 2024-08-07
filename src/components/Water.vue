<template>
    <ion-page>
        <ion-content :fullscreen="true" >
            <h1>Water!</h1>
            <DateSelector color-theme="blue"></DateSelector>
        </ion-content>

        <ion-footer id="foot">
            <water-bar-chart id="water" :value="1500"></water-bar-chart>
        </ion-footer>
    </ion-page>

</template>

<script setup lang="ts">
import { IonSegment, IonContent, IonHeader, IonSegmentButton, IonLabel, IonPage, IonTitle, IonToolbar, IonFooter, onIonViewDidEnter, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/vue';
import WaterBarChart from '@/components/WaterBarChart.vue'
import DateSelector from '@/components/DateSelector.vue';
import gsap from 'gsap'
import { ref } from 'vue';

onIonViewDidEnter(() => {
    gsap.from('#foot', {duration: .8, y: 600})
})

</script>

<style>
h1 {
    margin: 8px;
    padding: 8px;
    padding-left: 16px;
    font-size: 3.5em;
    font-weight: bolder
}

</style>
