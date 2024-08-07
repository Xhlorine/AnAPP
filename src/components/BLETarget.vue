<template>
    <div class="container">
        <div class="names">
            <div class="local"><em>localName: </em>{{ props.localName }}</div>
            <div class="device"><em>deviceName: </em>{{ props.deviceName }}</div>
        </div>
        <div class="mac"><em>Addr: </em>{{ props.MAC }}</div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">


const props = defineProps({
    localName: {
        type: String,
        default: '<null>'
    },
    deviceName: {
        type: String,
        default: '<null>'
    },
    MAC: {
        type: String,
        default: '<unknown>'
    }
})

</script>

<style scoped>
.container {
    width: 96%;
    height: fit-content;
    border: #aaa 1px solid;
    border-radius: 8px;
    box-shadow: #999 5px 5px 5px;
    padding: 8px;
    margin: auto;
    margin-top: 10px;
}
.names {
    display: flex;
    flex-direction: row;
    text-align: left;
}
.names > div {
    display: inline-box;
    width: 50%;
}
.names > div > em {
    text-decoration: none;
    font-style: normal;
    color: #999;
}
</style>