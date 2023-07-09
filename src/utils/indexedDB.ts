import { TableList } from "../types/common";

interface AnyEvent {
  [k: string]: any;
}
/**
 * 封装的方法以及用法
 * 打开数据库
 */
export function openDB(dbName: string, storeName: string, version = 1) {
  return new Promise((resolve, reject) => {
    let indexedDB = window.indexedDB
    const request = indexedDB.open(dbName, version)
    request.onsuccess = function (event: AnyEvent) {
      window.db = event.target.result // 数据库对象
      resolve(window.db)
    }

    request.onerror = function (event: AnyEvent) {
      reject(event)
    }

    request.onupgradeneeded = function (event: AnyEvent) {
      // 数据库创建或升级的时候会触发
      console.log('onupgradeneeded')
      window.db = event.target.result // 数据库对象
      if (!window.db.objectStoreNames.contains(storeName)) {
        window.db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true }) // 创建表
        // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
      }
    }
  })
}

/**
 * 新增数据
 */
export function addData(db: IDBDatabase, storeName: string, data: any) {
  return new Promise((resolve, reject) => {
    let request = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
      .objectStore(storeName) // 仓库对象
      .add(data)

    request.onsuccess = function (event: AnyEvent) {
      resolve(event)
    }

    request.onerror = function (event: AnyEvent) {
      throw new Error(event.target.error)
      reject(event)
    }
  })
}

/**
 * 通过主键读取数据
 */
export function getDataByKey(db: IDBDatabase, storeName: string, key: number) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([storeName]) // 事务
    let objectStore = transaction.objectStore(storeName) // 仓库对象
    let request = objectStore.get(key)

    request.onerror = function (event: AnyEvent) {
      reject(event)
    }

    request.onsuccess = function (event: AnyEvent) {
      resolve(event)
    }
  })
}

/**
 * 通过游标读取数据
 */
export function cursorGetData(storeName: string): Promise<TableList[]> {
  let list: TableList[] = []
  let store = window.db.transaction(storeName, 'readwrite') // 事务
    .objectStore(storeName) // 仓库对象
  let request = store.openCursor() // 指针对象
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event: AnyEvent) {
      let cursor = event.target.result
      if (cursor) {
        // 必须要检查
        list.push(cursor.value)
        cursor.continue() // 遍历了存储对象中的所有内容
      } else {
        resolve(list)
      }
    }
    request.onerror = function (event: AnyEvent) {
      reject(event)
    }
  })
}

/**
 * 通过游标删除数据
 */
export function cursorDeleteData(storeName: string) {
  const list: any[] = []
  const store = window.db.transaction(storeName, "readwrite").objectStore(storeName);
  let request = store.openCursor()
  return new Promise((resolve, reject) => {
    request.onsuccess = (event: AnyEvent) => {
      const cursor = event.target.result;
      if (cursor) {
        const request = cursor.delete();
        list.push(request)
        cursor.continue();
      } else {
        resolve(list)
      }
    }
    request.onerror = (event: AnyEvent) => {
      reject(event)
    }
  })

}

/**
 * 通过索引读取数据
 */
export function getDataByIndex(db: IDBDatabase, storeName: string, indexName: string, indexValue: string) {
  let store = db.transaction(storeName, 'readwrite').objectStore(storeName)
  let request = store.index(indexName).get(indexValue)
  return new Promise((resolve, reject) => {
    request.onerror = function (event: AnyEvent) {
      reject(event)
    }
    request.onsuccess = function (event: AnyEvent) {
      resolve(event.target.result)
    }
  })
}

/**
 * 通过索引和游标查询记录
 */
export function cursorGetDataByIndex(db: IDBDatabase, storeName: string, indexName: string, indexValue: string) {
  let list: any[] = []
  let store = db.transaction(storeName, 'readwrite').objectStore(storeName) // 仓库对象
  let request = store.index(indexName) // 索引对象
    .openCursor(IDBKeyRange.only(indexValue)) // 指针对象
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event: AnyEvent) {
      let cursor = event.target.result
      if (cursor) {
        list.push(cursor.value)
        cursor.continue() // 遍历了存储对象中的所有内容
      } else {
        resolve(list)
      }
    }
    request.onerror = function (event: AnyEvent) {
      reject(event)
    }
  })
}

/**
 * 更新数据
 */
export function updateDB(db: IDBDatabase, storeName: string, data: any) {
  let request = db.transaction([storeName], 'readwrite') // 事务对象
    .objectStore(storeName) // 仓库对象
    .put(data)

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event: AnyEvent) {
      resolve(event)
    }

    request.onerror = function (event: AnyEvent) {
      reject(event)
    }
  })
}

/**
 * 删除数据
 */
export function deleteDB(db: IDBDatabase, storeName: string, id: number) {
  let request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event: AnyEvent) {
      resolve(event)
    }

    request.onerror = function (event: AnyEvent) {
      reject(event)
    }
  })
}

/**
 * 删除数据库
 */
export function deleteDBAll(dbName: string) {
  console.log(dbName)
  let deleteRequest = window.indexedDB.deleteDatabase(dbName)
  return new Promise((resolve, reject) => {
    deleteRequest.onerror = function (event: AnyEvent) {
      resolve(event)
    }
    deleteRequest.onsuccess = function (event: AnyEvent) {
      reject(event)
    }
  })
}

/**
 * 关闭数据库
 */
export function closeDB(db: IDBDatabase) {
  db.close()
  console.log('数据库已关闭')
}

export default {
  openDB,
  addData,
  getDataByKey,
  cursorGetData,
  cursorDeleteData,
  getDataByIndex,
  cursorGetDataByIndex,
  updateDB,
  deleteDB,
  deleteDBAll,
  closeDB
}