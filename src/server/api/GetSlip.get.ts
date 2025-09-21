import { getDatabase } from '~/server/Sqlite'

export default defineEventHandler(async () => {
  try {
    const sql = `
      SELECT 
        SLIP_ID AS slipId,
        SLIP_NAME AS slipName,
        SLIP_TEXT AS slipText,
        LAST_UPDATED AS lastUpdated,
        UPDATE_USER AS updateUser
      FROM 
        M_SLIP 
    `

    const db = await getDatabase()
    return await db.all(sql)
  }
  catch (e: unknown) {
    console.error(e) // eslint-disable-line no-console
    return null
  }
})
