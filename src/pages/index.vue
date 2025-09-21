<template>
  <v-card variant="text">
    <v-row>
      <v-col cols="12">
        <ReadPdf />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <SlipList />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import ReadPdf from '~/components/ReadPdf.vue'
import SlipList from '~/components/SlipList.vue'
</script>

<style scoped></style>
