import { getDatabase } from '~/server/Sqlite'
import dayjs from 'dayjs'

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const slip = body.slip

  const db = await getDatabase()

  try {
    const sql = `
      SELECT
        SLIP_ID AS slipId
      FROM 
        M_SLIP 
      WHERE 
        SLIP_ID = ${slip.slipId}
    `

    const slips = await db.get(sql)

    if (slips) {
      const updateSql = `
        UPDATE
          M_SLIP
        SET
          SLIP_NAME = ?,
          SLIP_TEXT = ?,
          LAST_UPDATED = ?,
          UPDATE_USER = ?
        WHERE
          SLIP_ID = ?
      `
      await db.run(updateSql, [
        slip.slipName,
        slip.slipText,
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
        slip.updateUser,
        slip.slipId,
      ])
    }
    else {
      const insertSql = `
        INSERT INTO
          M_SLIP
        (
          SLIP_ID,
          SLIP_NAME,
          SLIP_TEXT,
          UPDATE_USER
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      await db.run(insertSql, [
        slip.slipId,
        slip.slipName,
        slip.slipText,
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
        slip.updateUser,
      ])
    }
  }
  catch (e: unknown) {
    console.error(e) // eslint-disable-line no-console
    return -1
  }

  return 0
})
