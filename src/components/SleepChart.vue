<template>
    <div class="container" @click="rotate" :style="{transform: `rotate(${rotAngle}deg)`}">
        <svg class="clock" :view-box="`0 0 ${2*radius} ${2*radius}`"
            :style="{height: 2*radius+'px', width: 2*radius+'px'}">
            <defs>
                <linearGradient id="interColor" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%"   stop-color="#d8d4fe" stop-opacity=".8"></stop>
                    <stop offset="100%" stop-color="#c2bbfc" stop-opacity=".8"></stop>
                </linearGradient>
            </defs>
            <!-- 环形 -->
            <circle class="outer" :cx="radius" :cy="radius" :r="outerRatio*radius" :stroke-width="2"></circle>
            <circle class="inner" :cx="radius" :cy="radius" :r="innerRatio*radius" :stroke-width="1"></circle>
            <!-- 时钟填充 -->
            <path :d="`M ${radius} ${radius} m 0 ${-radius*interRatio} 
                       a ${radius*interRatio} ${radius*interRatio} 0 ${anime.theta<Math.PI?0:1} 1 ${interRatio*radius*Math.sin(anime.theta)} ${interRatio*radius*(1-Math.cos(-anime.theta))} `"
                fill="transparent" stroke="url(#interColor)" :stroke-width="widthRatio*radius" stroke-linecap="round"></path>
            <!-- 时钟刻度 -->
            <path class="scaler" :d="scaler" stroke-width="2"></path>
        </svg>
        <!-- 起始、终点图标 -->
        <div class="bg" :style="{top: startCenter.y+'px', left: startCenter.x+'px',
                                width: 0.8*radius*widthRatio+'px', height: 0.8*radius*widthRatio+'px'}">
            <ion-icon :icon="moon"></ion-icon>
        </div>
        <div class="bg":style="{top: endCenter.y+'px', left: endCenter.x+'px',
                                width: 0.8*radius*widthRatio+'px', height: 0.8*radius*widthRatio+'px'}">
            <ion-icon :icon="time"></ion-icon>
        </div>
        <!-- 中央文字 -->
        <div class="text">
            <div class="head">Total Sleep</div>
            <div class="body">{{ props.length.toFixed(1) }}h</div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { gsap } from 'gsap/gsap-core';
import { IonIcon } from '@ionic/vue';
import { moon, time } from 'ionicons/icons';

const props = defineProps({
    length: {
        type: Number,
        default(raw:number) {
            console.log(raw)
            return raw/2
        }
    }
})
const length = ref(0)

// 半径及各种比例
const radius = (360 < innerWidth/1.3) ? 360/2 : innerWidth/2.6;
const outerRatio = 1.00;
const innerRatio = 0.60;
const interRatio = 0.5*(innerRatio+outerRatio);
const scalerStart = 0.90*innerRatio
const scalerEnd = 0.98*innerRatio
const widthRatio = outerRatio - innerRatio

// 时钟填充起始点中心坐标
const startCenter = computed(() => {
    return {
        x: radius,
        y: radius-interRatio*radius
    }
})
// 时钟填充终点中心坐标
const endCenter = computed(() => {
    return {
        x: radius+interRatio*radius*Math.sin(anime.theta),
        y: radius-interRatio*radius*Math.cos(anime.theta)
    }
})

// 时钟刻度轨迹生成
const scaler = computed(() => {
    const n = 8
    let d = ''
    for(let i = 0; i < n; i++) {
        d += `M ${radius+scalerStart*radius*Math.sin(Math.PI*2*i/n)} ${radius-scalerStart*radius*Math.cos(-Math.PI*2*i/n)} `
        d += `L ${radius+scalerEnd*radius*Math.sin(Math.PI*2*i/n)} ${radius-scalerEnd*radius*Math.cos(-Math.PI*2*i/n)} `
    }
    return d
})

// 动画
const anime = reactive({
    theta: 0
})
watch(length, () => {
    gsap.to(anime, {duration: 1.2, theta: length.value/12*Math.PI*2, delay: .3})
})
onMounted(() => {
    if(props.length > 12) length.value = 12
    else if(props.length < 0) length.value = 0
    else length.value = props.length
})
const rot = reactive({
    theta: 0
})
async function rotate() {
    console.log('Anime Start!')
    await gsap.to(rot, {duration: 2, theta: 2*Math.PI})
    rot.theta = 0
}
const rotAngle = computed(() => {
    return 5*Math.sin(rot.theta)*(0.2+rot.theta/Math.PI/2*0.8)
})



</script>

<style scoped>
.container {
    --color-bgc: #fff;
    --color-fill: #f4f4f5;
    --color-stroke: #eeeef0;
    --color-txt: #000;
}
@media(prefers-color-scheme: dark) {
    .container {
        --color-bgc: #000;
        --color-fill: #98989d;
        --color-stroke: #aaaabc;
        --color-txt: #fff;
    }
}

.container {
    position: relative;
    width: fit-content;
    margin: auto;
    margin-bottom: 10px;
}
.clock {
    border-radius: 10000px;
    box-shadow: #aaa 5px 5px 5px;
}
.outer {
    stroke: var(--color-stroke);
    fill: var(--color-fill);
}
.inner {
    stroke: transparent;
    fill: var(--color-bgc);
}
.scaler {
    stroke: var(--color-txt);
}

.bg {
    background-color: var(--color-bgc);
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 100%;
}
ion-icon {
    transform: scale(2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2);
}

.text {
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
.head {
    color: #aaa;
    font-size: 1.5em;
}
.body {
    color: var(--color-txt);
    font-size: 2.5em;
}
</style>