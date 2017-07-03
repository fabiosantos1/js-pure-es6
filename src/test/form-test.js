import Form from "../app/form" 

const form = document.createElement("div")
form.id = "form"
document.body.appendChild(form)

const formRender = new Form(form, "form-render-test")
formRender.render()
const inputs = formRender.dom.getElementsByTagName("input")
const buttonSubmit = formRender.dom.querySelector("button[type='submit']")

describe("Form", () => {
  
  it("Should be a JSON Mock", () => {
    expect(typeof formRender.mock).toBe("object")
  })

  it("Should have a input", () => {    
    expect(inputs.length).toBeGreaterThan(0)
  })

  it("Should have a submit button", () => {
    expect(buttonSubmit).toBeDefined()
  })

  it("Should submit form", () => {

    for (let input of inputs)
      if (input.type == "text") 
        input.value = 1

    let hasSubmit = false

    formRender.dom.addEventListener('submit', function(e) {
      hasSubmit = true
    })

    buttonSubmit.click()
    expect(hasSubmit).toBeTruthy()
  })

})
