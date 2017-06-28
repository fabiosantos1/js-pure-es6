class ErrorMessage {

  constructor(cssClass, message) {
    this.dom = ""
    this.class = cssClass
    this.message = message
  }

  create() {
    this.dom = document.createElement("div")
    this.dom.innerHTML = this.message
    this.dom.classList.add(this.class)
  }

  render() {
    this.create()
  }

  bind() {}

}

export default ErrorMessage