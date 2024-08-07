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
                <ion-title>Datas</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Input your feedback</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-textarea label="Title" auto-grow fill="outline" label-placement="floating" v-model="name">
                    </ion-textarea>
                    <ion-textarea label="Content" auto-grow fill="outline" label-placement="floating" v-model="content">
                    </ion-textarea>
                    <ion-button style="float: right;" @click="submit()">Submit</ion-button>
                </ion-card-content>
            </ion-card>
            <ion-list>
                <ion-item-sliding v-for="d in datas" :key="d.time">
                    <ion-item>
                        <ion-label class="time">{{ d.time }}</ion-label><br/>
                        <ion-label>{{ d.name }}: {{ d.content }}</ion-label>
                    </ion-item>
                    <ion-item-options side="end">
                        <ion-item-option color="danger" @click="deleteData(d.id)">
                            <ion-icon :icon="trashBin"></ion-icon>
                        </ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-list>
            
            <ion-infinite-scroll @ion-infinite="queryData(false)" :disabled="loadAll">
                <ion-infinite-scroll-content loading-text="Loading..." loading-spinner="bubbles"></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { Preferences } from '@capacitor/preferences';
import { IonPage, IonTitle, IonContent, IonHeader, IonToolbar, IonItemSliding, IonItem, IonLabel, IonButtons, IonButton, IonIcon, onIonViewWillEnter, toastController } from '@ionic/vue';
import { useIonRouter, IonCard, IonCardContent, IonCardHeader, IonTextarea, IonCardTitle, IonList, IonItemOptions, IonItemOption, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import axios from 'axios';
import { arrowBack, trashBin } from 'ionicons/icons';
import { ref } from 'vue';
import { webAddr } from '@/assets/webAddr';
const r = useIonRouter()

interface Data {
    id: string,
    username: string,
    time: string,
    name: string,
    content: string
}

var username = ''
const datas = ref<Array<Data>>([])
const loadAll = ref(false)
const queryData = (refresh:boolean) => {
    var offset = refresh ? 0 : datas.value.length
    axios.get(`${webAddr}/querydata?username=${username}&offset=${offset}`).then(async (response) => {
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
                        if(refresh) {
                            datas.value = response.data["datas"]
                        } else {
                            datas.value = datas.value.concat(response.data["datas"])
                        }
                    }
                    
                } else {
                    // 失败
                    msg += "Change Failed, " + response.data["error"]
                }
            }
    })
}

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
    queryData(true)
})

const name = ref('')
const content = ref('')
const submit = async () => {
    const now = new Date()
    const time = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    await axios.post(`${webAddr}/uploaddata`, {
        "username": username,
        "time": time,
        "name": name.value,
        "content": content.value
    }).then(async (res) => {
        var msg = ''
        if(res.status != 200) {
            // 网络故障
            msg = 'Network Error,code: ' + res.status
        } else {
            // 正常收到服务器回应
            if(res.data["state"] == 'success') {
                msg = 'Submit successfully!'
            } else {
                msg = 'Submit failed, error:' + res.data["error"]
            }
        }
        // 最后显示toast
        const toast = await toastController.create({
            message: msg,
            position: 'bottom',
            duration: 3000
        })
        await toast.present()
    })
    queryData(true)
}

const deleteData = async (id:string) => {
    await axios.delete(`${webAddr}/delete/${id}`).then(async (res) => {
        var msg = ''
        if(res.status != 200) {
            msg = 'Network Error, Code: ' + res.status
        } else if(res.data["state"] == 'success') {
            msg = 'Delete Successfully!'
            queryData(true)
        } else {
            msg = 'Delete Failed: ' + res.data["error"]
        }
        const toast = await toastController.create({
            message: msg,
            position: 'middle',
            duration: 2000
        })
        await toast.present()
    })
}

</script>

<style scoped>
.time {
    color: #999;
}
ion-textarea {
    margin: 8px;
}
</style>