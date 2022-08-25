<template>
  <Heading :heading="heading" />
  <div class=" flex justify-center w5/6">
    <table class="shadow-lg bg-white">
      <tr>
        <th class="bg-blue-100 border text-left px-8 py-4">Name</th>
        <th class="bg-blue-100 border text-left px-8 py-4">Email</th>
        <th class="bg-blue-100 border text-left px-8 py-4">Country</th>
        <th class="bg-blue-100 border text-left px-8 py-4">Debt (OPEN)</th>
      </tr>
      <tr v-for="account in accounts" :key="account.id" class="cursor-pointer hover:bg-slate-100"
        @click="seeAccountDetail(account.id)">
        <td class="border px-8 py-4">{{ account.debtor.title }} {{ account.debtor.firstName }} {{ account.debtor.lastName }}
        </td>
        <td class="border px-8 py-4">{{ account.debtor.email }}</td>
        <td class="border px-8 py-4">{{ account.debtor.address.country }}</td>
        <td class="border px-8 py-4">{{ getTotalDebt(account.id) }} EUR</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import Data from '../../api/db.json';
import router from '@/router';
import Heading from '@/components/MainHeading.vue';

interface Account {
  id: string,
  debtor: AccountDebator
}

interface AccountDebator {
  title: string,
  firstName: string,
  lastName: string,
  address: Address,
  mobilePhone: string,
  email: string
}

interface Address {
  address: string,
  city: string,
  state: string,
  zip: number,
  country: string
}

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

let heading = ref<string>("Account List");
const accounts = ref<(Array<Account>)>(Data.accounts as (Account[]));
const claims = ref<(Array<Claim>)>(Data.claims as (Claim[]));

function getClaimByAccountId(accountId: string) {
  accounts.value.forEach((account: Account) => {
    account.id;
  })
  return claims.value.filter(claim => claim.accountId === accountId);
}

function getTotalDebt(accountId: string) {
  let totalAmount = 0;
  getClaimByAccountId(accountId).forEach((claim: Claim) => {
    if (claim.status === 'OPEN') {
      totalAmount += claim.baseAmount;
    }
  })
  return totalAmount / 100;
}

function seeAccountDetail(accountId: string) {
  router.push(`/account/${accountId}`)
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
