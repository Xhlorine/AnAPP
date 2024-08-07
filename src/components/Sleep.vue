<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <h1>Sleep!</h1>
            <DateSelector color-theme="purple" @select-date="(sel) => { selected = sel }"/>
        </ion-content>
        <ion-footer>
            <SleepChart :length="9.2"></SleepChart>
            <!-- <div id="log" v-html="logs"></div> -->
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import DateSelector from '../components/DateSelector.vue'
import SleepChart from '../components/SleepChart.vue'
import { IonButton, IonContent, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonFooter } from '@ionic/vue';
import { ref } from 'vue'

const num = ref(0)
const selected = ref()

</script>

<style scoped>
#log {
    width: 100%;
    height: 300px;
    overflow: scroll;
    z-index: 100001;
    background-color: #ccc;
}
ion-footer {
    box-shadow: none;
}
ion-fab {
    z-index: 99999;
}
</style>
