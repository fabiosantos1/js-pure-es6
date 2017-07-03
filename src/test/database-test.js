import Database from "../app/database" 

describe('Database', () => {
  it('Should be a Promise', () => {

    const data = {
      "txtFullname" : "Fabio Antonio dos Santos",
      "txtCpf" : "417.689.358-31",
      "txtTelephone" : "(12) 991777567",
      "txtAddress" : "Rua Jovino Benedido Pereira, 115",
      "txtComplement" : "Bloco 7",
      "hiddenimgAvatar" : ""
    }

    const db = new Database("form-render-test")
    db.init()
    const insert = db.insert(data)
    expect(insert).toEqual(jasmine.any(Promise))

  })
})
