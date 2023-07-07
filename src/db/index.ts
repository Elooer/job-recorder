import IndexedDB from "../utils/indexedDB"
import { DBNAME, STORENAME } from "../constant/db"


async function initDB() {
  await IndexedDB.openDB(DBNAME, STORENAME)
}
export default initDB