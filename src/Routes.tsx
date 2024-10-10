import { RouteObject } from "react-router-dom"
import Result from "./Result/Result"
import PrivetRoutes from "./PrivetRoutes"
import Container from "./Container/Container"


let route:RouteObject[] = [
    {path:'/', element:<Container/>},
    {path:'/Result' , element:<PrivetRoutes><Result/></PrivetRoutes>}
]

export default route