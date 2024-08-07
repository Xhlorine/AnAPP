<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>
                Set Nickname
            </ion-title>
        </ion-toolbar>
       
    </ion-header>
    <ion-content>
        <ion-card>
            <ion-label>
                Type your name, so we can distinguish you from others. 
            </ion-label>
            <ion-input label="Username: " type="text" v-model="data" placeholder="your nick name here"></ion-input>
            <ion-buttons>
                <ion-button @click="cancel()" fill="outline">Cancel</ion-button>
                <ion-button @click="confirm()" fill="solid">Confirm</ion-button>
            </ion-buttons>    
        </ion-card>
        
    </ion-content>
</template>

<script setup lang="ts">
import { IonToolbar, IonHeader, IonTitle, IonContent, IonInput, IonButton, IonButtons, modalController, IonLabel, IonCard } from "@ionic/vue"
import { ref } from "vue";

const data = ref("")

const cancel = () => {
    modalController.dismiss(data.value, 'cancel')
}

const confirm = () => {
    modalController.dismiss(data.value, 'confirm')
}

</script>

<style scoped>

ion-header,
ion-card,
ion-button,
ion-input {
    padding: 8px;
}


</style>