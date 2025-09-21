<template>
  <div class="mx-auto w-75">
    <v-table>
      <thead>
        <tr>
          <th>slipId</th>
          <th>slipName</th>
          <th>slipText</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(slip) in slips" :key="slip.slipId">
          <td>{{ slip.slipId }}</td>
          <td>{{ slip.slipName }}</td>
          <td>{{ slip.slipText }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { ISlip } from '~/model/Slip'

const slips = ref<ISlip[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await getSlips()
  loading.value = false
})

async function getSlips() {
  const res: ISlip[] = await $fetch('/api/GetSlip', {
    method: 'GET',
  })

  slips.value = res
}
</script>

<style scoped></style>
