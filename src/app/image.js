class Image {

  constructor(data) {
    this.class = data.class
    this.id = data.id
    this.name = data.name
    this.dom = ""
  }

  create() {
    this.dom = document.createElement("img")
    this.dom.className = this.class
    this.dom.id = this.id
    this.dom.name = this.name
  }

  render() {
    this.create()
  }

  bind() {
    // Create input hidden to send image how form data
    let inputHidden = document.createElement("input")
    inputHidden.type = "hidden"
    inputHidden.id =  `hidden${this.id}`
    inputHidden.name = `hidden${this.name}`
    this.dom.insertAdjacentElement("afterend" ,inputHidden);
  }
}

export default Image