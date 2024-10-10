import { useRoutes } from "react-router-dom"
import route from './Routes'
import './App.css'

function App(){
  const router = useRoutes(route)

  return (
    <>
      {router}
    </>
  )
}

export default App