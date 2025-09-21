<template>
  <div class="mx-auto w-75">
    <h4 class="my-4">ＰＤＦアップロードしてください</h4>
    <v-file-input
      accept=".pdf"
      placeholder="ＰＤＦファイルを選択してください"
      prepend-icon="mdi-paperclip"
      hide-details="auto"
      :clearable="true"
      :disabled="loading"
      @change="readFile"
      @click:clear="clear"
    />
    <div v-show="res && res?.fullText" class="my-2 pa-2 border-sm rounded">{{ res?.fullText }}</div>
  </div>
</template>

<script setup lang="ts">
interface IRes {
  success: boolean
  fullText: string
  pages: number
  totalPages: number
}

const res = ref<IRes>()
const loading = ref(false)

onMounted(async () => {
  res.value = {
    success: false,
    fullText: '',
    pages: 0,
    totalPages: 0,
  }
})

async function readFile(e: Event) {
  const files = (e.target as HTMLInputElement).files
  const file = files![0]
  if (typeof file !== 'undefined') {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === 'string') {
        loading.value = true
        await readPdf(e.target.result)
        loading.value = false
      }
    }
  }
}

async function readPdf(pdf: string) {
  const base64Pdf = convBase64(pdf)
  res.value = await $fetch('/api/ReadPdf', {
    method: 'POST',
    body: {
      base64Pdf,
    },
  })
}

const convBase64 = (dataUrl: string): string => {
  const base64Index = dataUrl.indexOf(',')

  if (base64Index === -1) {
    throw new Error('無効なData URL形式です')
  }

  // カンマ以降の部分（base64エンコードされたデータ）を返す
  return dataUrl.substring(base64Index + 1)
}

const clear = () => {
  res.value = {
    success: false,
    fullText: '',
    pages: 0,
    totalPages: 0,
  }
}
</script>

<style scoped></style>
