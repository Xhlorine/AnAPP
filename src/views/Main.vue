<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="index" href="/index">
                    <ion-icon :icon="watch"></ion-icon>
                    <ion-label>Index</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="healthdata" href="/healthdata">
                    <ion-icon :icon="heart"></ion-icon>
                    <ion-label>HealthData</ion-label>
                </ion-tab-button>
                <ion-tab-button tab="userdata" href="/userdata">
                    <ion-icon :icon="water"></ion-icon>
                    <ion-label>UserData</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonRouterOutlet } from '@ionic/vue'
import { watch, heart, water, footsteps } from 'ionicons/icons'
</script>

<style scoped>

</style>