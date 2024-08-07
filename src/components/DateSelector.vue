<template>
    <div class="container">
        <div class="selector">
            <Day v-for="d in daysList" :key="d.date" 
                :date="d" :color-theme="props.colorTheme"
                @click="selected = d.date; $emit('selectDate', selected)" />
        </div>
        <ion-datetime-button :datetime="props.id"></ion-datetime-button>
        <ion-modal :keep-contents-mounted="true">
            <ion-datetime :id="props.id" v-model="selected" presentation="date" 
                @ion-change="(arg) => $emit('selectDate', arg.detail.value)"></ion-datetime>
        </ion-modal>
    </div>
</template>

<script setup lang="ts">
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue'
import { ref, computed, onMounted } from 'vue'
import Day from './Day.vue'
import { stringfyDate } from '@/composables/CustomDate';
const props = defineProps({
    colorTheme: {
        type: String,
        default: 'blue'
    },
    id: {
        type: String,
        default: 'default'
    }
})

// 时间的格式为：YY-MM-DDDD
const emit = defineEmits(['selectDate'])

onMounted(() => {
    emit('selectDate', stringfyDate(new Date))
})

const today = new Date
const selected = ref(stringfyDate(today))

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const daysList = computed(() => {
    let days = []
    let day = new Date
    days.push({
        date: stringfyDate(day),
        day: day.getDate(),
        week: weekdays[today.getDay()],
        state: (selected.value == stringfyDate(day)) ? 'selected' : 'todayDefault'
    })
    for(let i = 1; i <= 1; i++) {
        day.setDate(day.getDate()+1)
        days.push({
            date: stringfyDate(day),
            day: day.getDate(),
            week: weekdays[day.getDay()],
            state: (stringfyDate(day) == selected.value) ? 'selected' : 'default'
        })
    }
    day = new Date
    for(let i = 0; i < 5; i++) {
        day.setDate(day.getDate()-1)
        days.unshift({
            date: stringfyDate(day),
            day: day.getDate(),
            week: weekdays[day.getDay()],
            state: (stringfyDate(day) == selected.value) ? 'selected' : 'default'
        })
    }
    return days
})


</script>

<style scoped>
* {
    padding: 10px;
    margin: 2px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: end;
}

.selector {
    background-image: radial-gradient(var(--background) 70%, transparent 100%);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}
</style>