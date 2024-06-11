<script>
export default {
    props: {
        packDir: {
            type: String,
            required: true
        },
        allNamespace: {
            type: Object,
            required: true
        },
        indexMenuDialog: {
            type: Object,
            required: true
        }
    },
    data() {
        return {};
    }
}
</script>

<template>
    <div style="display: flex;">
        <div style="display: flex; width: 70%; margin-right: 2%">
            <button class="left-button"></button>
            <button class="right-button"></button>
            <button class="right-button"></button>
        </div>
        <div style="width: 28%; background-color: #6a6a6d">
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
        </div>
    </div>
</template>

<style scoped>
.left-button {
    width: 48%;
    height: 30px
}

.right-button {
    width: 48%;
    height: 30px;
    margin-left: 2%
}
</style>