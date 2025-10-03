import { createWorker } from 'tesseract.js'

async function getOcr(base64Image: string): Promise<string> {
  const worker = await createWorker('jpn+eng')
  try {
    const { data: { text } } = await worker.recognize(base64Image)
    return text
  }
  catch (e) {
    console.error(e)
    return ''
  }
  finally {
    await worker.terminate()
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const base64Image = body.base64Image

    if (!base64Image) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Base64 Image data is required',
      })
    }

    const fullText = await getOcr(base64Image)

    return {
      success: true,
      fullText: fullText.trim(),
    }
  }
  catch (error) {
    console.error('画像処理エラー:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Image processing failed',
      data: {
        error: error.message,
        stack: error.stack,
      },
    })
  }
})
