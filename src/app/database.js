class Database {
  constructor(id) {
    this.id = id
    this.db = ""
    this.data = ""
  }

  init() {

    // Init indexDB and create requeste
    const self = this
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    const openRequest = indexedDB.open(`${this.id}-db`, 1)

    // Create database model
    openRequest.onupgradeneeded = function() {
      const database = self.db.result
      const store = database.createObjectStore(`${self.id}-store`, {keyPath: "id", autoIncrement:true})
      const index = store.createIndex(`${self.id}-index`, [
          "data.name", 
          "data.cpf", 
          "data.telephone", 
          "data.address", 
          "data.complement", 
          "data.avatar"
        ]
      )
    }

    // Set DB to Class on succes
    openRequest.onsuccess = function(e) {
			self.db = e.target.result
		
			self.db.onerror = function(event) {
			  //console.log("Database error: " + event.target.errorCode) 
        return
			}
		}
  }

  insert(data) {

    const self = this
    // Create promise to return insert return
    const promise = new Promise(function(resolve, reject){

      // Create transaction and get store
      const transaction = self.db.transaction(`${self.id}-store`, "readwrite")
      const store = transaction.objectStore(`${self.id}-store`)

      // Create request to insert in database the form data
      const request = store.put({
        name: data.txtFullname,
        cpf: data.txtCpf,
        telephone: data.txtTelephone,
        address: data.txtAddress,
        complement: data.txtComplement,
        avatar: data.hiddenimgAvatar
      })

      request.onsuccess = function(event) {
        resolve(true)
      }

      request.onerror = function(event) {
        reject(false)
      }
    })

    return promise
  }
  

  getAll() {

    // Get all data inserted 
    const transaction = this.db.transaction(`${this.id}-store`, "readwrite")
    const store = transaction.objectStore(`${this.id}-store`)
    let data = []

    store.openCursor().onsuccess = function(event) {  
      const cursor = event.target.result
      if (cursor) {  
        data.push(cursor.value)
        cursor.continue();  
      }
    }
    
    this.data = data
  }

}

export default Database