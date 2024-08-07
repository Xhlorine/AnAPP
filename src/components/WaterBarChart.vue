<template>
    <div class="container">
        <svg view-box="0 0 500 600" :style="box">
            <!-- 波浪三层，自后向前 -->
            <path :d="`M ${-(1.2*frames%400)} 100 q 100 -50 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 V 1000 H -100 Z`"
                class="wave wave1"></path>
            <path :d="`M ${-(0.9*frames%280)} 110 q 70 -30 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 V 1000 H -100 Z`"
                class="wave wave2"></path>
            <path :d="`M ${1.5*frames%280-280} 110 q 70 -60 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 V 1000 H -100 Z`"
                class="wave wave3"></path>
            <!-- 左侧刻度，以当前值为中心绘制 -->
            <path :d="d"
                class="lines"></path>
            <!-- 文本提示，显示累计水量 -->
            <text x="85" y="15">
                <tspan class="prompt">Total</tspan>
            </text>
            <text x="80" y="60">
                <tspan class="value">{{ props.value }}mL</tspan>
            </text>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { CSSProperties, onMounted, onUnmounted, ref } from 'vue'
const props = defineProps({
    value: {
        type: Number,
        default: 0,
        validitor(raw: number) {
            return (raw > 0)
        }
    }
})

const frames = ref(0)

const box: CSSProperties = {
    'width': '100%',
    'height': (window.innerHeight*0.55).toFixed(0),
    'position': 'relative'
}

var frameCounter: NodeJS.Timeout
onMounted(() => {
    frameCounter = setInterval(() => {
        frames.value++
        if(frames.value == 10000000) {
            frames.value = 0
        }
    }, 20)
    
})

onUnmounted(() => {
    clearInterval(frameCounter)
})

// 绘制左侧刻度，从0开始，每16为一小格，80为一大格；大格标刻度，参考实际值
const d = ref('M 0 2 ')
for(let i = 0; i * 16 < 1200; i++) {
    let len = i % 5 == 0 ? 30 : 15
    d.value += `h ${len} m -${len} 16 `
}

</script>

<style scoped>
.container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
}
svg {
    --wave-fill-color-1: #b6ddf9;
    --wave-fill-color-2: #b7defa;
    --wave-fill-color-3: #ecf3ff;
    --wave-stroke-color: #deffff;
    --line-stroke-color: #000;
}
@media (prefers-color-scheme: dark) {
    svg {
        --wave-fill-color-1: #3d83b5;
        --wave-fill-color-2: #4e81a7;
        --wave-fill-color-3: #526687;
        --wave-stroke-color: #6b8484;
        --line-stroke-color: #ddd;
    }
}
.wave {
    stroke: var(--wave-stroke-color);
    stroke-width: 2;
    stroke-opacity: .6;
    fill-opacity: .7;
}
.wave1 {
    fill: var(--wave-fill-color-1);
}
.wave2 {
    fill: var(--wave-fill-color-2);
}
.wave3 {
    fill: var(--wave-fill-color-3);
    fill-opacity: .4;
}

.lines {
    stroke: var(--line-stroke-color);
    stroke-width: 2;
}

.text {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
}
.value {
    font-size: 2.2em;
    stroke: var(--font-color);
    fill: var(--font-color);
}
.prompt {
    font-family: Consolas;
    font-size: 1em;
    stroke: var(--font-sub-color);
    fill: var(--font-sub-color);
}

text {
    --font-color: #000;
    --font-sub-color: #999;
}
@media(prefers-color-scheme: dark) {
    text {
        --font-color: #fff;
        --font-sub-color: #aaa;
    }
}
</style>