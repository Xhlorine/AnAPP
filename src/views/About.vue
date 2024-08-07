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
                <ion-title>About</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ul class="content">
                <li>
                    此APP为2024年MGC参赛队伍Telepathy的配套设施。<br/> 
                </li>
                <li>
                    一位不愿透露姓名的开发者表示：这个APP的开发由一人完成，并且因为个人技术和生活等问题导致比较粗糙XD<br/> 
                </li>
                <li>
                    程序运行在开发者自己的服务器上，试验阶段并非全天开放，无法使用属正常现象，请尝试联系开发者<br/> 
                </li>
                <li>
                    如有疑问可以尝试在APP中提交反馈或联系邮箱：<a href="mailto:xhlorine@zju.edu.cn">xhlorine@zju.edu.cn</a>
                </li>
            </ul>
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
.content {
    margin: 8px;
    margin-top: 16px;
    padding: 16px;
}
</style>