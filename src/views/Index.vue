<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Index</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <!--  -->
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Connect To Telepathy Devices</ion-card-title>
                </ion-card-header>
                <ion-card-content v-if="ble == ''">
                    <div><ion-icon :icon="ban"></ion-icon> No devices connected to</div>
                    <ion-button style="float: right;" @click="router.push('/bluetooth')">
                        Config BlueTooth
                    </ion-button>
                </ion-card-content>
                <ion-card-content v-else>
                    <div><ion-icon :icon="bluetoothOutline"></ion-icon>One Device Recorded</div>
                    <ion-button style="float: right;" @click="router.push('/bluetooth')">
                        Config BlueTooth
                    </ion-button>
                </ion-card-content>
            </ion-card>
            <ion-list>
                <ion-item v-for="p in pushes" :key="p.title" @click="openCapacitorSite(p.contenturl)" button>
                    <ion-thumbnail slot="start">
                        <img :src="p.thumburl" alt="Loading...">
                    </ion-thumbnail>
                    <ion-label>{{ p.title }}</ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon, onIonViewWillEnter, toastController } from "@ionic/vue"
import { IonItem, IonList, IonThumbnail, IonLabel } from "@ionic/vue";
import { ban, bluetoothOutline } from "ionicons/icons"
import { useIonRouter } from "@ionic/vue";
import { ref } from "vue";
import { Browser } from '@capacitor/browser';
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { webAddr } from "@/assets/webAddr";
import wechat from "@/assets/wechat.png"

const openCapacitorSite = async (site: string) => {
  await Browser.open({ url: site });
};


const router = useIonRouter()
const ble = ref("")

interface Push {
    title: string
    thumburl: string
    contenturl: string
    source: string

}
const pushes = ref<Array<Push>>([])

// pushes.value.push({
//     title: "震惊！某红白巫女竟然...",
//     thumburl: "https://upload.thbwiki.cc/thumb/0/0b/%E5%8D%9A%E4%B8%BD%E7%81%B5%E6%A2%A6%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png/100px-%E5%8D%9A%E4%B8%BD%E7%81%B5%E6%A2%A6%EF%BC%88Q%E7%89%88%E7%AB%8B%E7%BB%98%EF%BC%89.png",
//     contenturl: "https://www.baidu.com",
//     source: "我瞎写的XD"
// })

onIonViewWillEnter(async () => {
    await Preferences.get({key: "ble"}).then(async(ans) => {
        ble.value = (ans.value == null) ? "" : ans.value
    })
    await axios.get(`${webAddr}/querypushes`).then(async (response) => {
        var msg = ''
        if(response.status != 200) {
                // 网络故障
                msg += "Net Error. Code: " + response.status + " " + response.statusText
            } else {
                if(response.data["state"] == "success") {
                    // 成功
                    msg += "Changed Successfully!";
                    console.log(response.data["datas"])
                    pushes.value = response.data["datas"]
                    pushes.value.forEach((val) => {
                        if(val.contenturl.includes("mp.weixin.qq.com")) {
                            val.thumburl = wechat
                        }
                    })
                } else {
                    // 失败
                    msg += "Change Failed, " + response.data["error"]
                }
            }
    })
})

</script>

<style scoped>
ion-card {
    padding: 8px;
    margin: 8px;
}
</style>