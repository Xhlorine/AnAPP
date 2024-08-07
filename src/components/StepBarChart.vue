<template>
    <div class="container" :theme="props.theme">
        <div v-for="col in data" :key="col.hour">
            <div class="steps">{{ col.steps }}</div>
            <div class="col" :level="col.level" :style="{height: col.height as number + 64 +'px'}">
                <div class="icon" v-if="col.level != 'low' || mode != 'plain'">{{ col.icon }}</div>
            </div>
            <div class="time">{{ col.hour }}:00</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CustomSteps } from '@/composables/CustomSteps'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const icons:Map<string, string[]> = new Map()
icons.set('high', ['💪', '👍', '🏃‍♂️', '🏅', '🏆', '💯'])
icons.set('middle', ['👏', '✌️', '✨', '😺', '👌', '✊'])
icons.set('low', ['🧘‍♂️', '😪', '💤', '🥱', '💫', '🛏️'])
const mode = 'plain'

const props = defineProps({
    theme: {
        type: String,
        default: 'colorful',
        validitor(raw: string) {
            return ['colorful', 'blue', 'green', 'purple', 'red'].includes(raw)
        }
    },
    data: {
        type: Array<CustomSteps>,
        default: [],
    },
})

const data = ref(props.data)
onMounted(() => {
    // 以最高的边为基归一化，并标记高度等级，以选择颜色和icon
    let maxStep = 0
    let data2 = data.value
    let arr
    data2.forEach((val) => { maxStep = (maxStep < val.steps) ? val.steps : maxStep })
    data2.forEach((val) => {
        let ratio = val.steps / maxStep
        if(ratio > 0.8) {
            val.level = 'high'
            arr = icons.get(val.level) as string[]
            val.icon = arr[Math.floor(Math.random()*arr.length)]
        } else if(ratio > 0.4) {
            val.level = 'middle'
            arr = icons.get(val.level) as string[]
            val.icon = arr[Math.floor(Math.random()*arr.length)]
        } else {
            val.level = 'low'
            arr = icons.get(val.level) as string[]
            val.icon = arr[Math.floor(Math.random()*arr.length)]
        }
        val.height = window.innerHeight * 0.35 * ratio
    })
    data.value = data2
    // 入场动画
    gsap.from('#chart', {duration: .6, y: 600})
})


</script>

<style scoped>
.container {
    /* Light mode variables go here */
    --bgc-blue: rgb(188,227,255);
    --bgc-green: rgb(196,244,228);
    --bgc-purple: rgb(216,212,254);
    --bgc-red: rgb(255,208,225);
    --bgc-orange: rgb(254,225,197);
    --bgc-gray: #eee;
    --bgc-color: #fff;
    --color-font: #999;
}
@media (prefers-color-scheme: dark) {
  .container {
    /* Dark mode variables go here */
    --bgc-blue: rgb(40, 114, 188);
    --bgc-green: rgb(56, 166, 118);
    --bgc-purple: rgb(135, 91, 182);
    --bgc-red: rgb(236, 145, 178);
    --bgc-orange: rgb(151, 106, 63);
    --bgc-gray: #777;
    --bgc-color: #233;
    --color-font: #bbb;
  }
}

.container[theme="colorful"] {
    --col-color-high: var(--bgc-purple);
    --col-color-middle: var(--bgc-blue);
    --col-color-low: var(--bgc-gray);
}
.container[theme="blue"] {
    --col-color-high: var(--bgc-blue);
    --col-color-middle: var(--bgc-blue);
    --col-color-low: var(--bgc-blue);
}
.container[theme="green"] {
    --col-color-high: var(--bgc-green);
    --col-color-middle: var(--bgc-green);
    --col-color-low: var(--bgc-green);
}
.container[theme="purple"] {
    --col-color-high: var(--bgc-purple);
    --col-color-middle: var(--bgc-purple);
    --col-color-low: var(--bgc-purple);
}
.container[theme="red"] {
    --col-color-high: var(--bgc-red);
    --col-color-middle: var(--bgc-red);
    --col-color-low: var(--bgc-red);
}

.container {
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-around;
    width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
}

.col {
    width: 64px;
    background-color: var(--bgc-orange);
    border-radius: 50px 50px 0 0;
    margin: 0 8px;
    flex: 0 0 auto;
}

.icon {
    width: 56px;
    height: 56px;
    position: relative;
    left: 4px;
    top: 4px;
    background-color: var(--bgc-color);
    border-radius: 32px;
    text-align: center;
    vertical-align: middle;
    font-size: 2.2em;
    animation: scaling .6s linear 1;
}

@keyframes scaling {
    0%  {transform: scale(0.01);}
    40% {transform: scale(0.50);}
    80% {transform: scale(1.00);}
    90% {transform: scale(1.10);}
    100%{transform: scale(1.00);}
}

.col[level="high"] {
    background-color: var(--col-color-high);
}
.col[level="middle"] {
    background-color: var(--col-color-middle);
}
.col[level="low"] {
    background-color: var(--col-color-low);
}

.steps {
    color: var(--color-font);
    text-align: center;
    padding: 4px;
}
.time {
    text-align: center;
    font-size: 1.2em;
    padding: 4px;
}

</style>