import { Database } from "./middlewares/databse.js"
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"
const database = new Database()

export const routes = [
    
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res)=>{
            const { search } = req.query

            const users = database.select('users', search ? {
                name: search,
                email:search, 
            } : null)
        
        return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res)=>{
             //vai pegar o body da requisiçao onde tem as informaçoes que está sendo enviada
        //para pegar o nome e o email
        const {name, email } = req.body
        //se não tiver usuario ainda ele cria o primeiro id
        
        const user = {
            id: randomUUID(),
            name,
            email
        }
            database.insert('users',user)
            return res.writeHead(201).end('criação de usuarios')
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res)=>{
            const {id} = req.params
            const { name, email} = req.body
            database.update('users', id, {
                name,
                email,
            })

            return res.writeHead(204)
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res)=>{
            const {id} = req.params

            database.delete('users', id)

            return res.writeHead(204)
        }
    },
]