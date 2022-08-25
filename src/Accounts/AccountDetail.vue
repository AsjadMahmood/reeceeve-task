<template>
  <div v-if="account" class=" ml-6 mr-6 mt-2">
    <div class="flex justify-center">
      <Heading :heading="fullName" />
    </div><br>
    <div class=" flex justify-center">
      <div class=" w-3/4 shadow-md p-4">
        <div>
          <div class=" mb-5 flex">
            <h3 class="text-2xl font-semibold">Account Detail</h3>
          </div>
          <div class=" flex mb-4">
            <div class="flex w-2/4">
              <div class="text-neutral-400 hidden sm:block text-sm font-bold mr-3">Email</div>
              <div class=" text-md leading-tight font-bold text-gray-600">
                {{ account.debtor.email }}
              </div>
            </div>
            <div class=" flex w-2/4">
              <div class="flex text-neutral-400 sm:block text-sm font-bold mr-3">Mobile #</div>
              <div class=" text-md leading-tight font-bold text-gray-600">
                {{ account.debtor.mobilePhone }}
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="text-neutral-400 hidden sm:block text-sm font-bold mr-3">Address</div>
            <div class=" text-md leading-tight font-bold text-gray-600">
              {{ account.debtor.address.address }}, {{ account.debtor.address.city }}
              {{ account.debtor.address.state }}
              {{ account.debtor.address.zip }}
              {{ account.debtor.address.country }}
            </div>
          </div>
        </div>
        <ClaimsDetail :accountId="accountId"></ClaimsDetail>
      </div>
    </div>


  </div>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import Data from '../../api/db.json';
import { useRoute } from 'vue-router';
import Heading from '@/components/MainHeading.vue';
import { computed } from '@vue/reactivity';
import ClaimsDetail from './ClaimsDetail.vue';

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


const route = useRoute()
const accountId = ref<string>(route.params.accountId as string);
const accounts = ref<(Account[])>(Data.accounts as (Account[]));
const account = ref<(Account)>();

function getAccountById() {
  account.value = accounts.value.filter((account:Account) => account.id === accountId.value)[0] as Account;
}


const fullName = computed(() => {
  let fullName = "";
  if(account.value){
  if(account.value.debtor.title)
    fullName += account.value.debtor.title + " ";
  if(account.value.debtor.firstName)
    fullName += account.value.debtor.firstName + " ";
  if(account.value.debtor.lastName)
    fullName += account.value.debtor.lastName;
  }
  return fullName; 
})


onMounted(() => {
  getAccountById();
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
