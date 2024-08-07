<template>
    <div class="container" :style="``">
        <div class="y-axis">
            <span style="color: transparent;">0</span>
            <span v-for="n in 7">{{ (n-1)*30 }}</span>
        </div>
        <div class="plot">
            <svg :view-box="`0 0 600 ${height}`" style="width: 1216px; height: 100%; overflow-x: auto; transform: translateX(56px);">
                <defs>
                    <linearGradient id="shade" x1="0" x2="0" y1=".2" y2="1">
                        <stop offset="0%" stop-color="var(--shade-color)"></stop>
                        <stop offset="30%" stop-color="rgba(252, 207, 222, 0)"></stop> 
                    </linearGradient>

                    <clipPath id="anime">
                        <rect x="0" y="0" :width="widthDy.num" :height="height"></rect>
                    </clipPath>
                </defs>
                <!-- 纵坐标水平线 -->
                <path class="scaleLines" :d="scale"></path>
                <!-- 横坐标文本标签 -->
                <text v-for="hour in 25" :key="hour" :x="(hour-1)*width/25" y="360" v-show="hour%2">{{ hour-1 }}:00</text>
                <!-- 连接曲线 -->
                <path class="line" :d="line" fill="url(#shade)" clip-path="url(#anime)"></path>
                <!-- 样本点展示 -->
                <circle v-if="data.length < 24*3" v-for="dot in dots" :key="dot.time" :cx="dot.time" :cy="dot.heartRate" r="2"></circle>
            </svg>
        </div>
    </div>

</template>

<script setup lang="ts">
import { computed, onMounted, PropType, reactive, ref } from 'vue';
import { CustomHeartRate } from '@/composables/CustomHeartRate';
import gsap from 'gsap';

const width = 1200
const height = 400
const widthDy = reactive({num: 0})
const {data} = defineProps({
    data: {
        type: Object as PropType<CustomHeartRate[]>,
        default: [],
    }
})

// 计算心率点坐标
const dots = computed(() => {
    let d = data
    d = d.filter((el) => {
        return el.time > 0 && el.time < 24 && el.heartRate > 0
    })
    d.forEach((el) => {
        // {x: time, y: heartRate}
        el.time *= width/24
        el.heartRate = (el.heartRate>180) ? height/8/4 : (180-el.heartRate)/180*(height*(1-1/8/2-1/8*3))+(height/8/2)
    })
    return d
})

//绘制拟合曲线
const line = computed(() => {
    let d = `M ${dots.value[0].time} ${dots.value[0].heartRate}`
    dots.value.forEach((el) => {
        d += ` L ${el.time} ${el.heartRate}`
    })
    d += `h 200 v ${height+100} H ${-50} V ${dots.value[0].heartRate} z`
    return d
})

// 绘制水平线
const scale = ref(`M 0 ${height/8/2} `)
for(let i = 0; i < 7; i++) {
    scale.value += `h 1216 m -1216 ${height/8} `
}
console.log(scale)

// 入场动画
onMounted(() => {
    gsap.to(widthDy, {duration: 3, num: width})
})
</script>

<style scoped>
* {
    padding: 0;
}
.container {
    --bgc-color: #fff;
    --font-color: #000;
    --stroke-color: #ccc;
    --shade-color: #fccfde;
}

@media(prefers-color-scheme: dark) {
    .container {
        --bgc-color: #000;
        --font-color: #fff;
        --stroke-color: #999;
        --shade-color: #caafb8;
    }
}

.y-axis {
    width: 48px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: end;
    z-index: 999;
    background-color: var(--bgc-color);
    margin-right: 4px;
    box-shadow: var(--stroke-color) 1px 5px 5px;
}
.y-axis > span {
    padding: 0 8px;
}

.container {
    width: 100%;
    height: 400px;
    overflow-x: scroll;
}

.plot {
    height: 100%;
    overflow-y: hidden;
}
.scaleLines {
    stroke: var(--stroke-color);
    stroke-width: 1.2;
    fill: transparent;
}
circle {
    stroke: red;
    stroke-width: 3;
    fill: red;
}
text {
    font-size: 1.1em;
    stroke: transparent;
    fill: var(--font-color)
}
.line {
    stroke: #FF3D66;
    stroke-width: 3;
    stroke-linejoin: round;
}

</style>