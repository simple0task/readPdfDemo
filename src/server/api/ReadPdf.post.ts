// 動的インポートを使用してpdfjs-distを読み込み
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const base64Pdf = body.base64Pdf

    if (!base64Pdf) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Base64 PDF data is required',
      })
    }

    // 動的インポートでpdfjs-distを読み込み
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')

    // Base64からBufferに変換
    const pdfBuffer = Buffer.from(base64Pdf, 'base64')

    // PDF.jsの設定（サーバーサイド用）
    const loadingTask = pdfjs.getDocument({
      data: new Uint8Array(pdfBuffer),
      useSystemFonts: true,
      // サーバーサイドでWorkerを使用しない
      useWorkerFetch: false,
      isEvalSupported: false,
      // Canvas APIが利用できない環境用の設定
      canvasFactory: null,
      cMapUrl: null,
      cMapPacked: false,
    })

    const pdf = await loadingTask.promise

    let fullText = ''
    const pages = []

    // 各ページからテキストを抽出
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()

        const pageText = textContent.items
          .map((item) => {
            // itemがstrプロパティを持つかチェック
            return typeof item.str === 'string' ? item.str : ''
          })
          .filter(text => text.trim().length > 0) // 空の文字列を除外
          .join(' ')

        const formattedPageText = `--- ページ ${pageNum} ---\n${pageText}`
        fullText += `\n${formattedPageText}\n`

        pages.push({
          pageNumber: pageNum,
          text: pageText,
        })
      }
      catch (pageError) {
        console.error(`ページ ${pageNum} の処理中にエラー:`, pageError)
        pages.push({
          pageNumber: pageNum,
          text: `[ページ ${pageNum} の読み込みに失敗しました]`,
          error: pageError.message,
        })
      }
    }

    // PDFドキュメントをクリーンアップ
    await pdf.destroy()

    return {
      success: true,
      fullText: fullText.trim(),
      pages: pages,
      totalPages: pdf.numPages,
    }
  }
  catch (error) {
    console.error('PDF処理エラー:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'PDF processing failed',
      data: {
        error: error.message,
        stack: error.stack,
      },
    })
  }
})
