<template>
    <div>
        <div class="flex justify-between">
            <div class="text-neutral-400 hidden sm:block text-sm font-bold mr-3">Base Amount</div>
            <div class=" text-md leading-tight font-bold text-gray-600">
                {{ claim.baseAmount / 100 }} {{ claim.currency }}
            </div>
        </div>
        <div class="flex mt-2 justify-between">
            <div class="text-neutral-400 hidden sm:block text-sm font-bold mr-3">Fees</div>
            <div class=" text-md leading-tight font-bold text-gray-600">
                {{ claim.fees / 100 }} {{ claim.currency }}
            </div>
        </div>
        <div class="flex mt-2 justify-between">
            <div class="text-neutral-400 hidden sm:block text-sm font-bold mr-3">Due Date</div>
            <div class=" text-md leading-tight font-bold text-gray-600">
                {{ claim.dueDate }}
            </div>
        </div>
        <div class="flex mt-2 justify-between">
            <div class="text-neutral-400 hidden sm:block text-sm font-bold mr-3">Status</div>
            <div class="flex text-md leading-tight font-bold text-gray-600">
                <span>{{ claim.status }} </span>
                <div v-if="claim.status === 'PAID'" class="flex">
                    <span class="ml-2"> ( {{ claim.paidAt }} ) </span>
                </div>
                <div v-if="claim.status === 'DELETED'" class="flex">
                    <span class="ml-2"> ( {{ claim.deletedAt }} ) </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';

enum ClaimStatus {
    OPEN = "OPEN",
    PAID = "PAID",
    DELETED = "DELETED",
}

interface Claim {
    id: string,
    accountId: string,
    currency: string,
    baseAmount: number,
    fees: number,
    dueDate: string,
    status: ClaimStatus,
    paidAt?: string,
    deletedAt?: string
}

const props = defineProps<{
    claim: Claim
}>()

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>