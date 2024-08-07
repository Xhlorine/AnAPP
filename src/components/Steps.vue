<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <h1>Steps!</h1>
            <DateSelector color-theme="green" @select-date="(sel: any) => {  }" />
        </ion-content>
        <ion-footer>
            <step-bar-chart class="noges" id="chart" :data="test" theme="colorful"></step-bar-chart>
        </ion-footer>
    </ion-page>

</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, onIonViewDidEnter } from '@ionic/vue';
import StepBarChart from '@/components/StepBarChart.vue';
import { CustomSteps } from '@/composables/CustomSteps'
import DateSelector from './DateSelector.vue';

const test: Array<CustomSteps> = [
    {hour: 6, steps: 1698},
    {hour: 7, steps: 0},
    {hour: 8, steps: 300},
    {hour: 9, steps: 2000},
    {hour: 10, steps: 3428},
    {hour: 11, steps: 210},
    {hour: 12, steps: 13},
    {hour: 13, steps: 56},
    {hour: 14, steps: 2865},
]

onIonViewDidEnter(() => {
})

</script>

<style scoped>
ion-footer {
    box-shadow: none;
}
</style>
