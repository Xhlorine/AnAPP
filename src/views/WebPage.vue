<template>
    <!-- 纯粹的静态页面 -->
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button fill="clear" @click="r.back()">
                        <ion-icon :icon="arrowBack"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>WebPage</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <iframe src="https://mp.weixin.qq.com/s/soTwihU-IkqVq1hYRj5sPQ" allow="fullscreen"></iframe>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonTitle, IonContent, IonHeader, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonText } from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
const r = useIonRouter()
</script>

<style scoped>
</style>