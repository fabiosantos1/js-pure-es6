class Button{
  
  constructor(data) {
    this.id = data.id
    this.class = data.class
    this.name = data.name
    this.text = data.text
    this.dom = ""
    this.type = "submit" 
    this.loader = ""
  }

  create() {

    // Add loader to buton, the loader is a hide <span>
    this.loader = document.createElement("span")
    this.loader.className = "loader"

    const text = document.createElement("span")
    text.innerHTML = this.text

    this.dom = document.createElement("button")
    this.dom.type = this.type
    this.dom.className = this.class
    this.dom.id = this.id
    this.dom.name = this.name
    this.dom.appendChild(text)
    this.dom.appendChild(this.loader)
  }

  render() {
    this.create()
  }

  bind() {}

}

export default Button