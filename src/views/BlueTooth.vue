<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button fill="clear" @click="r.back()">
                        <ion-icon :icon="arrowBack"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>BlueTooth</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>BLE Devices Connected:{{ state }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <span v-if="state">Now Connected to: {{ current.deviceName }}</span>
                    <input v-if="state" type="text" name="cmd" id="cmd" v-model="cmd"></input>
                    <ion-button v-if="state" @click="send()">Send</ion-button>
                </ion-card-content>
            </ion-card>
            <ion-list v-if="!state">
                <ion-list-header>
                    <ion-title>Devices Available</ion-title>
                </ion-list-header>
                <ion-item button detail v-for="dev in devices" :key="dev.MAC" @click="current=dev,connectTo(dev.MAC)">
                    <ion-icon :icon="bluetooth" slot="start"></ion-icon>
                    <ion-label>
                        <h3>{{ dev.deviceName }}</h3>
                        <div class="mac">{{ dev.MAC }}</div>
                    </ion-label>
                </ion-item>
            </ion-list>
            
            <!-- <BLETarget v-if="state" :local-name="current.localName" :device-name="current.deviceName" :-m-a-c="current.MAC"></BLETarget> -->
            <div class="recv" v-if="state">{{ recv }}</div>
        </ion-content>
    </ion-page>

</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, onIonViewWillEnter, IonButton, IonButtons, onIonViewWillLeave } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonListHeader, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { bluetooth, arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
import { BleClient, textToDataView, dataViewToText } from '@capacitor-community/bluetooth-le';
import { useIonRouter } from '@ionic/vue';
import { Preferences } from '@capacitor/preferences';

const r = useIonRouter()
const state = ref(false)
const cmd = ref('')
const recv = ref('Received: \n')
var current = {
    localName: '',
    deviceName: '',
    MAC: ''
};
const devices = ref([{
    localName: 'test',
    deviceName: 'test',
    MAC: 'test:test:test'
}])
devices.value.shift()
const HC04 = '0000fff0-0000-1000-8000-00805f9b34fb';
const SERVICE = '0000ffe0-0000-1000-8000-00805f9b34fb'
const RW = '0000ffe1-0000-1000-8000-00805f9b34fb'
onIonViewWillEnter(() => {
    try {
        BleClient.isEnabled()
        BleClient.initialize({ androidNeverForLocation: false })
        BleClient.requestLEScan(
            {
                services: [HC04]
            },
            (result) => {
                devices.value.push({
                    localName: (result.localName == undefined) ? '<null>' : result.localName,
                    deviceName: (result.device.name == undefined) ? '<null>' : result.device.name,
                    MAC: result.device.deviceId
                })
            }
        );
        setTimeout(async () => {
            await BleClient.stopLEScan();
            console.log('stopped scanning');
        }, 3000);
    } catch(error) {
        recv.value += error
    }
})

onIonViewWillLeave(() => {
    if(state.value == true) {
        BleClient.disconnect(current.MAC)
    }
})



async function connectTo(target : string){
    BleClient.disconnect(target)
    await BleClient.connect(target)
    await BleClient.isBonded(target).then((ans) => {
        recv.value += ans;
        state.value = true;
        Preferences.set({
            key: "ble",
            value: current.MAC
        })
    })
    BleClient.startNotifications(current.MAC, SERVICE, RW, (val) => {
        recv.value += dataViewToText(val) + 'bala'
    })
}

function send() {
    BleClient.write(current.MAC, SERVICE, RW, textToDataView(cmd.value))
}

</script>

<style scoped>
ion-content {
    padding: 8px;
}

#cmd {
    width: 90%;
    margin: auto;
    margin-top: 15px;
    padding: 6px;
}

.recv {
    width: 90%;
    height: 200px;
    overflow-y: scroll;
    margin: 8px;
    padding: 6px;
}

ion-card {
    padding: 8px;
}

.mac {
    float: right;
    color: gray;
}
</style>