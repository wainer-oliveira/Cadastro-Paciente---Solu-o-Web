import AppRoutes from "./routes"
import "./App.css"

function App() {
/*  
  localStorage.setItem(import.meta.env.VITE_REACT_APP_LOCALSTORAGE_PATIENTS_LIST, JSON.stringify([{
    nome: "Wainer",
    dataNascimento: "05/11/1997",
    cpf: "44534993889",
    sexo: "masculino",
    endereco: "Ricardo Pelizaro, 41, Cristais Paulista - SP"
  }]))
*/
  return (
    <AppRoutes/>
  )
}

export default App
