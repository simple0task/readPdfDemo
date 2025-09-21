import type { Database } from 'sqlite'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

const $config = useRuntimeConfig()

let db: Database<sqlite3.Database, sqlite3.Statement>

export const getDatabase = async () => {
  if (!db) {
    db = await open<sqlite3.Database, sqlite3.Statement>({
      filename: ($config.public.DB_PATH as string),
      driver: sqlite3.Database,
    })
  }
  return db
}

export const closeDatabase = async (): Promise<void> => {
  if (db) {
    await db.close()
    db = undefined as unknown as Database<sqlite3.Database, sqlite3.Statement>
  }
}
