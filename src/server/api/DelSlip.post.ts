import { getDatabase } from '~/server/Sqlite'

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const slipId = body.slipId as string

  try {
    const sql = `
      DELETE FROM 
        M_SLIP 
      WHERE 
        SLIP_ID = ${slipId}
    `

    const db = await getDatabase()
    await db.run(sql)
  }
  catch (e: unknown) {
    console.error(e) // eslint-disable-line no-console
    return -1
  }

  return 0
})
