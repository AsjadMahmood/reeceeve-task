<template>
    <div class="mt-9">
        <div class=" flex mb-4">
            <h3 class="text-2xl font-semibold"> Claim Detail </h3>
        </div>
        <div class="flex gap-9 flex-wrap">
            <div v-for="claim in accountClaims" :key="claim.id"
                class="p-3 border-solid border border-gray-300 rounded basis-[28.285714%]">
                <ClaimInfo :claim="claim"></ClaimInfo>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import { onMounted, ref, defineProps } from 'vue';
import Data from '../../api/db.json';
import ClaimInfo from './ClaimInfo.vue';


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

const props = defineProps({
    accountId: String
})
const claims = ref<(Claim[])>(Data.claims as (Claim)[]);
const accountClaims = ref<(Claim[])>();


function getClaimByAccountId() {
    accountClaims.value = claims.value.filter((claim: Claim) => claim.accountId === props.accountId);
}

function getTotalDebt() {
    let totalAmount = 0;
    if (accountClaims.value) {
        accountClaims.value.forEach((claim: Claim) => {
            if (claim.status === ClaimStatus.OPEN) {
                totalAmount += claim.baseAmount;
            }
        })
    }
    return totalAmount / 100;
}



onMounted(() => {
    getClaimByAccountId();
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
