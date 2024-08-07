<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>UserData</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <!-- 头像与用户名设置 -->
            <ion-item>
            <ion-avatar class="avatar" slot="start">
                <img :src="telepathy" alt="此处应有头像">
            </ion-avatar>
            <ion-label @click="openModal()" class="username">{{ username == '' ? '此处应为用户名' : username }}</ion-label>
            </ion-item>
             <!-- 历史数据 -->
             <ion-item @click="r.push('/datas')">
                <ion-icon :icon="statsChart" slot="start"></ion-icon>
                <ion-title>Userdata</ion-title>
             </ion-item>
            <!-- 联系客服 -->
            <ion-item @click="r.push('/feedback')">
                <ion-icon :icon="headset" slot="start"></ion-icon>
                <ion-title>FeedBack</ion-title>
            </ion-item>
            <!-- 关于我们 -->
            <ion-item @click="r.push('/about')">
                <ion-icon :icon="people" slot="start"></ion-icon>
                <ion-title>About</ion-title>
             </ion-item>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonTitle, toastController, modalController, onIonViewWillEnter } from "@ionic/vue"
import { IonItem, IonAvatar, IonLabel, IonIcon, useIonRouter } from "@ionic/vue"
import { Preferences } from "@capacitor/preferences";
import { headset, people, statsChart } from "ionicons/icons";
import { ref } from "vue";
import { BackendResponse } from "@/composables/BackEndResponse";
import axios from "axios"
import Modal from "@/components/Modal.vue";
import { webAddr } from "@/assets/webAddr";
import telepathy from "@/assets/telepathy.png"

const username = ref('')
const r = useIonRouter()

onIonViewWillEnter(async () => {
    var { value } = await Preferences.get({key: "username"})
    username.value = (value == null) ? '' : value
})

// 修改用户名的模态对话框
const openModal = async () => {
    const modal = await modalController.create({
        component: Modal
    })
    var msg = ''
    modal.present()
    const {data, role} = await modal.onWillDismiss()
    if(role == 'confirm') {
        if(data == ''){
            msg += "Empty name is not allowed."
        }
        else if(data.length > 30) {
            msg += "Name's too long."
        } else {
            // 发起https请求(PATCH)
            await axios.patch(`${webAddr}/updatename`, {
                "oldName": "",
                "newName": data as string
            }).then((response) => {
                if(response.status != 200) {
                    // 网络故障
                    msg += "Net Error. Code: " + response.status + " " + response.statusText
                } else {
                    const datas : BackendResponse = response.data as BackendResponse
                    console.log(datas)
                    if(datas["state"] == "success") {
                        // 成功
                        msg += "Change Successfully!"
                        username.value = data
                        Preferences.set({
                            key: "username",
                            value: data
                        })
                    } else if(datas["state"] == "occupied") {
                        msg += "Change Failed. Name's already occupied"
                    } else {
                        // 失败
                        msg += "Change Failed: " + datas["error"]
                    }
                }
            })
        }
        const toast = await toastController.create({
                message: msg,
                position: 'bottom',
                duration: 3000
        })
        await toast.present()
    }
}
</script>

<style scoped>

ion-content {
    padding: 8px;
}

.avatar,
.avatar > img {
    height: 128px;
    width: 128px;
    border: 1px solid #888;
}

ion-item {
    padding-top: 16px;
    padding-bottom: 16px;
}

.username {
    font-size: 1.5em;
}

ion-avatar {
    background-color: #202632;
}

</style>