class Input {

  constructor(data) {
    this.id = data.id
    this.class = data.class
    this.dom = ""
    this.name = data.name
    this.type = data.type
    this.value = data.value
    this.mask = data.mask
    this.placeholder = data.placeholder
    this.required = data.required
    this.valid = true
  }

  create() {
    this.dom = document.createElement("input")
    this.dom.type = this.type
    //this.dom.placeholder = this.placeholder
    this.dom.name = this.name
    this.dom.value = this.value
    this.dom.className = this.class
    this.dom.id = this.id
    this.dom.required = this.required
    this.dom.placeholder = ""
  }

  // Set masks to input
  setMask() {
    switch (this.mask) {
      case "(00) 00000-0000":
        this.maskTel(this.dom)
        break
      case "000.000.000-00":
        this.maskCpf(this.dom)
        // If is CPF, set validation
        this.setValidationCpf()
        break
      default:
        break
    }
  }

  // Validate CPF on blur
  setValidationCpf() {
    let valid = true
    const self = this

    this.dom.addEventListener('blur', function(e) {
      self.valid = self.validateCpf(e.target.value)
    })
  }

  // Mask tel with regex
  maskTel(tel) {
    tel.addEventListener("input", function(e) {
      const input = e.target.value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,5})(\d{0,4})/)
      e.target.value = !input[2] ? input[1] : "(" + input[1] + ") " + input[2] + (input[3] ? "-" + input[3] : '')
    })
  }

  // Mask cpf with regex
  maskCpf(cpf) {
    cpf.addEventListener('input', function(e) {
      const input = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/)
      e.target.value = !input[2] ? input[1] : input[1] + '.' + input[2] + (input[3] ? '.' + input[3] + (input[4] ?  '-'+input[4] : '') : '')
    })
  }

  // Calcs to validate CPF
  validateCpf(value) {

    let numbers, digits, sum, index, result, sameDigits
    const cpf = value.replace(/[\.-]+/g, "")
    
    sameDigits = 1

    if (cpf.length < 11)
      return false

    for (index = 0; index < cpf.length - 1; index++) 
      
      if (cpf.charAt(index) != cpf.charAt(index + 1)) {
        sameDigits = 0
        break
      }

    if (!sameDigits) {
      numbers = cpf.substring(0,9)
      digits = cpf.substring(9)
      sum = 0

      for (index = 10; index > 1; index--)
        sum += numbers.charAt(10 - index) * index

      result = sum % 11 < 2 ? 0 : 11 - sum % 11

      if (result != digits.charAt(0))
        return false

      numbers = cpf.substring(0,10)
      sum = 0

      for (index = 11; index > 1; index--)
        sum += numbers.charAt(11 - index) * index

      result = sum % 11 < 2 ? 0 : 11 - sum % 11

      if (result != digits.charAt(1))
        return false

      return true
    }
    else
      return false
  }

  // Set label to input and set event in label click
  setLabel() {
    const label = document.createElement("label")
    label.innerHTML = this.placeholder
    label.for = this.id
    this.dom.insertAdjacentElement("afterend", label)
    const self = this
    label.addEventListener('click', function(e) {
      e.preventDefault()
      self.dom.focus()
    })
  }

  render() {
    this.create()
  }

  bind() {
    this.setMask()
    this.setLabel()
    const self = this

    // Set validations on input and classes to show effects
    this.dom.addEventListener('blur', function(e) {
      
      if (self.dom.value.length > 0) 
        self.dom.classList.add("length")
      else 
        self.dom.classList.remove("length")
  
      if ((self.valid) && (self.dom.value.length > 0)) {
        self.dom.classList.remove("invalid")
        self.dom.classList.add("valid")
      }
      else {
        self.dom.classList.remove("valid")
        self.dom.classList.add("invalid")
      }
    })
  }
}

export default Input