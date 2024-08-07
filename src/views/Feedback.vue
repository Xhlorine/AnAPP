<template>
    <!-- 简单的数据上传和展示 -->
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button fill="clear" @click="r.back()">
                        <ion-icon :icon="arrowBack"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Feedback</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Input your feedback</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-textarea label="Text" auto-grow fill="outline" label-placement="floating" v-model="fb">
                    </ion-textarea>
                    <ion-button style="float: right;" @click="submit()">Submit</ion-button>
                </ion-card-content>
            </ion-card>
            <ion-list>
                <ion-item v-for="f in feedbacks" :key="f.time" button>
                    <ion-label>
                        <strong>{{ f.time }}</strong><br/>
                        <ion-note class="ion-text-wrap">{{ f.content }}</ion-note>
                    </ion-label>
                </ion-item>
            </ion-list>
            
            <ion-infinite-scroll @ion-infinite="queryFeedback(false)" :disabled="loadAll">
                <ion-infinite-scroll-content loading-text="Loading..." loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { webAddr } from '@/assets/webAddr';
import { Preferences } from '@capacitor/preferences';
import { IonPage, IonTitle, IonContent, IonHeader, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon, onIonViewWillEnter, toastController } from '@ionic/vue';
import { useIonRouter, IonTextarea, IonNote, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import axios from 'axios';
import { arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
const r = useIonRouter()

interface Feedback {
    id: number,
    username: string,
    time: string,
    content: string
}
const feedbacks = ref<Array<Feedback>>([])

const loadAll = ref(false)
const queryFeedback = async (refresh: boolean) => {
    var offset = refresh ? 0 : feedbacks.value.length
    await axios.get(`${webAddr}/queryfeedback?username=${username}&offset=${offset}`).then(async (response) => {
        var msg = ''
        if(response.status != 200) {
                // 网络故障
                msg += "Net Error. Code: " + response.status + " " + response.statusText
            } else {
                if(response.data["state"] == "success") {
                    // 成功
                    if(response.data["count"] == '0') {
                        loadAll.value = true
                    } else {
                        msg += "Changed Successfully!";
                        console.log(response.data["datas"])
                        feedbacks.value = response.data["datas"]
                    }
                } else {
                    // 失败
                    msg += "Change Failed, " + response.data["error"]
                }
            }
    })
}

const fb = ref('')
var username = ''
onIonViewWillEnter(async () => {
    await Preferences.get({key: "username"}).then(async (res) => {
        if(res.value == null) {
            const toast = await toastController.create({
                message: 'Please set name first',
                position: 'bottom',
                duration: 3000
            })
            await toast.present()
            r.back()
        } else {
            username = res.value
        }
    })
    queryFeedback(true)
})


const submit = async () => {
    const now = new Date()
    const time = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    axios.post(`${webAddr}/uploadfeedback`, {
        "username": username,
        "time": time,
        "content": fb.value
    }).then(async (res) => {
        var msg = ''
        if(res.status != 200) {
            // 网络故障
            msg = 'Network Error,code: ' + res.status
        } else {
            // 正常收到服务器回应
            if(res.data["state"] == 'success') {
                msg = 'Feedback successfully!'
            } else {
                msg = 'Feedback failed, error:' + res.data["error"]
            }
        }
        // 最后显示toast
        const toast = await toastController.create({
            message: msg,
            position: 'bottom',
            duration: 3000
        })
        await toast.present()
        await queryFeedback(true)
    })
}

</script>

<style scoped>
ion-card{
    padding: 8px;
}
</style>