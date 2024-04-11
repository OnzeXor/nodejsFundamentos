//importa o http
import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-path.js"
//lista de usuarios(só na minha maquina e se eu atualizar ele reinicia)



//meu server 
const server = http.createServer(/*requisiçao e resposta*/ async (req, res)=>{

    const {method, url} = req
    // pega o metodo e url da requisiçao

    await json(req,res)
    

    const route = routes.find(route =>{
        return route.method === method && route.path.test(url)
    })
  
    if(route){
        const routeParams = req.url.match(route.path)
        
        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query): {}

        return route.handler(req,res)
    }

    return res.writeHead(404).end("Error 404")
})

server.listen(3333)