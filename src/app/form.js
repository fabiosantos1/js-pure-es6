import Input from "./input"
import Message from "./message"
import Map from "./map"
import Upload from "./upload"
import Button from "./button"
import Image from "./image"
import DB from "./database"
import mock from "./json/mock"

class Form {

  constructor(element, id) {
    this.mock = mock
    this.element = element
    this.id = id
    this.dom = ""
    this.db = ""
    this.ul = ""
  }

  // Create element
  create() {
    this.dom = document.createElement("form")
    this.dom.id = this.id
  }

  // Render elemento to html
  render() {
    this.create()

    this.element.appendChild(this.dom)

    // Create <ul> to better organize the form
    this.ul = document.createElement("ul")
    this.dom.appendChild(this.ul)

    // Create the fields from json file
    Object.entries(this.mock.fields).forEach(
      ([key, value]) => this.createElement(value)
    )

    this.bind()
  }

  createElement(value) {

    // Create <li> to better organize the form
    let element = "" 
    const li = document.createElement("li")
    this.ul.appendChild(li)

    // Create element based on json data
    switch (Object.keys(value)[0]) {
      case "input":
        element = new Input(value.input)
        break
      case "button":
        element = new Button(value.button)
        break
      case "image":
        element = new Image(value.image)
        break
      case "map":
        element = new Map(value.map)
        break
      case "upload":
        element = new Upload(value.upload)
        // Add clas upload to <li> to better manipulate the form
        li.classList.add("upload")
        break
      default:
        // Show error if element is invalid
        element = new Message("error", "Erro ao renderizar elemento")
        break
    }

    // Render element and insert inside <li>
    element.render()
    li.appendChild(element.dom)
    element.bind()    
  }

  // Add events and another actions that need the element created
  bind() {

    // Init Database IndexDB
    this.db = new DB(this.id)
    this.db.init()
    const self = this

    this.dom.addEventListener('submit', function(e) { 
      e.preventDefault()

      // Add loadings to form
      self.dom.classList.add("loading")

      // Get the form data
      let data = {}
      let dataForm = new FormData(self.dom)
      let valid = true
      
      // Mount data to insert to DB
      for(let foo of dataForm.entries())  {
        if (typeof foo[1] !== 'object') {
          data[foo[0]] = foo[1]
        }
      }

      setTimeout(function() {

        const insert = self.db.insert(data)

        insert.then(function(result) {
          console.log(result)
          finishRequest(
            new Message("success", "Dados salvos com sucesso")
          )
        }, function(result){
          console.log(result)
          finishRequest(
            new Message("error", "Erro ao salvar os dados")
          )
        })

        function finishRequest(message) {

          // Cria <li> para exibir mensagem
          const formUl = document.querySelector("form ul")
          const li = document.createElement("li")
          formUl.appendChild(li)

          // Render message, reset form and get results
          message.render()
          li.appendChild(message.dom)
          self.db.getAll()
          self.reset()

          // Show results inserted
          console.log(self.db.data)
        }

      }, 500);
    })
  }

   // Clear form and remove loadings
  reset() {
    document.getElementById(this.id).reset()
    const avatars = document.getElementsByClassName("image")
    const inputs = document.getElementsByTagName("input")

    for(const avatar of avatars) 
      avatar.classList.remove("active")

    for(const input of inputs) {
      input.classList.remove("valid")
      input.classList.remove("length") 
    }
      
    this.dom.classList.remove("loading")
  }
}

export default Form