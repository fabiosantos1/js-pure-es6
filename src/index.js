import Form from "./app/form" 
import styles from './scss/index.scss'

// Renderiza o formulário no elemento selecionado
const formRender = new Form(document.querySelector('#form'), "form-render")
formRender.render()
