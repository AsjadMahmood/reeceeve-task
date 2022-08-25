<template>
    <div>
        <h3 class="text-4xl font-semibold"> {{ heading }} </h3>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps<{
    heading: string
}>()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
