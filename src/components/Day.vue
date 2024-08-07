<template>
    <!-- 单个日期按钮，显示星期几，几号；可调节颜色样式、状态样式 -->
    <button class="daycontainer" fill="clear">
        
        <div class="week">{{ week }}</div>
        <div class="date" v-bind="appearance">
            <div class="day">{{ day }}</div>
        </div>
        <div class="shade"></div>
    </button>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { CustomDate } from '../composables/CustomDate'
const props = defineProps({
    date: {
        type: Object as PropType<CustomDate>,
        validitor(raw: CustomDate) {
            return ['default', 'selected', 'todayDefault'].includes(raw.state)
        }
    },
    colorTheme: {
        type: String,
        default: 'blue',
        validitor(raw: string) {
            return ['blue', 'green', 'purple', 'red'].includes(raw)
        }
    }
})

const week = computed(() => {
    return props.date!.week
})
const day = computed(() => {
    return props.date!.day
})
const appearance = computed(() => {
    return {
        color: props.colorTheme,
        state: props.date?.state
    }
})
</script>

<style scoped>

/* 需要调用者缩放 */
.daycontainer {
    position: relative;
    width: 48px;
    height: 64px;
    padding: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    /* border: 1px #aaa solid; */
}
.daycontainer:focus > .shade {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 15px;
    transform: translate(-50%, -50%);
    background-color: #ccc;
    animation: focuson linear .3s 1;
}
@keyframes focuson {
    0%  {height: 0; width: 0; opacity: 0;}
    20% {height: 75%; width: 75%; opacity: .3;}
    50% {height: 110%; width: 110%; opacity: .2;}
    80% {height: 120%; width: 120%; opacity: .1;}
    100%{height: 120%; width: 120%; opacity: 0;}
}
.week {
    height: 16px;
    font-size: 12px;
    color: #aaa;
}
.date {
    margin-top: 4px;
    border-radius: 48px;
    height: 44px;
    width: 44px;
    transition: all .3s;
}
.day {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    font-size: 1.6em;
    font-weight: bold;
    text-align: center;
}

.date {
/* Light mode variables go here */
--bgc-blue: rgb(188,227,255);
--bgc-green: rgb(196,244,228);
--bgc-purple: rgb(216,212,254);
--bgc-red: rgb(255,208,225);
--bgc-orange: rgb(254,225,197);
}
@media (prefers-color-scheme: dark) {
  .date {
    /* Dark mode variables go here */
    --bgc-blue: rgb(40, 114, 188);
    --bgc-green: rgb(56, 166, 118);
    --bgc-purple: rgb(135, 91, 182);
    --bgc-red: rgb(236, 145, 178);
    --bgc-orange: rgb(151, 106, 63);
  }
}

.date[color="blue"] {
    --date-color: var(--bgc-blue)
}
.date[color="green"] {
    --date-color: var(--bgc-green)
}
.date[color="purple"] {
    --date-color: var(--bgc-purple)
}
.date[color="red"] {
    --date-color: var(--bgc-red)
}

.date[state="default"] {
    border: none;
    background-color: inherit;
}
.date[state="selected"] {
    border: 2px var(--date-color) solid;
    background-color: var(--date-color);
}
.date[state="todayDefault"] {
    border: 2px var(--date-color) solid;
    background-color: inherit;
}
</style>