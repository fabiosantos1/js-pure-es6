class Upload {

  constructor(data) {
    this.type = "file"
    this.accept = "image/*"
    this.class = data.class
    this.id = data.id
    this.name = data.name
    this.avatar = data.avatar
    this.placeholder = data.placeholder
    this.dom = ""
  }

  create() {
    this.dom = document.createElement("input")
    this.dom.type = this.type
    this.dom.className = this.class
    this.dom.id = this.id
    this.dom.name = this.name
    this.dom.accept = this.accept
  }

  render() {
    this.create()
  }

  bind() {
    this.setButton()
    const self = this

    // Upload image imediately on select
    this.dom.addEventListener('change', function() {

      // Create a FileReader and read image uploaded
      let src = ""
      const file  = self.dom.files[0]
      const reader = new FileReader()
      const preview = document.getElementById(self.avatar)

      if (file) 
        reader.readAsDataURL(file)
      else
        src = ""

      reader.onloadend = function () {
        
        // Create Image and show preview
        src = reader.result
        const uploadedImage = new Image()
        uploadedImage.src = src
        preview.classList.add("active")

        uploadedImage.onload = function() {

          // Create Canvas to get image Thumb
          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")

          // Calc Aspect Ratio
          const maxWidth = 300
          const maxHeight = 300
          let ratio =  Math.min(maxWidth/uploadedImage.width, maxHeight/uploadedImage.height)

          // Set thumb config and create
          canvas.width = uploadedImage.width*ratio
          canvas.height = uploadedImage.height*ratio

          context.drawImage(uploadedImage, 
            0, 0, uploadedImage.width, uploadedImage.height, 
            0, 0, canvas.width, canvas.height
          );

          // Show thumb created and set to input hidden 
          preview.src = canvas.toDataURL() 
          const inputHidden = document.getElementById("hidden"+self.avatar)
          inputHidden.value = preview.src
        }
      }
    });
  }

  // Set a button to improve the upload visual
  setButton() {
    const button = document.createElement("button")
    button.type = "button"
    button.innerHTML = this.placeholder
    button.classList.add("file")
    this.dom.insertAdjacentElement("afterend", button)
  }
}

export default Upload