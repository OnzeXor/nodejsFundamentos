//importa o http
import http from "node:http"
import { json } from "./middlewares/json.js"

//lista de usuarios(só na minha maquina e se eu atualizar ele reinicia)
const users = []


//meu server 
const server = http.createServer(/*requisiçao e resposta*/ async (req, res)=>{
    /*
    pega o metodo e a url da requisiçao
    Exemplos:
    localhost:3333/users <---url da requisiçao
    metodo é o que o servidor pede da requisiçao
    GET     mostra os usuários          - pede uma informaçao da requisiçao
    HEAD    - O método HEAD solicita uma resposta de forma idêntica ao método GET, porém sem conter o corpo da resposta.
    PUT     atuaiza todos os usuarios   - O método PUT substitui todas as atuais representações do recurso de destino pela carga de dados da requisição.
    DELETE  remove um usuário           - O método DELETE remove um recurso específico.
    PATCH   muda o dado de Um usuario   - O método PATCH é utilizado para aplicar modificações parciais em um recurso.
    POST    cria um usuario             - O método POST é utilizado para submeter uma entidade a um recurso específico, frequentemente causando uma mudança no estado do recurso ou efeitos colaterais no servidor.

    
    */
    const {method, url} = req
    // pega o metodo e url da requisiçao


   await json(req,res)
    
    //se o metodo for get e a url users ele vai pegar a lista de usuarios
    if (method === 'GET' && url === '/users') {
        return res
        .end(JSON.stringify(users))
    }
    // se for post ele cria o usuario
    if (method === 'POST' && url === '/users') {
        //vai pegar o body da requisiçao onde tem as informaçoes que está sendo enviada
        //para pegar o nome e o email
        const {name, email } = req.body
        //se não tiver usuario ainda ele cria o primeiro id
        if(users.length == 0){
            users.push({
                id: 1,
                name,
                email
            })
        }else{
            //adiciona um id novo a cada novo usuario criado
            users.push({
                id: users[users.length -1].id + 1,
                name,
                email
            })
        }
        return res.end('criação de usuarios')
    }
    
    return res.end("canal base")
})

server.listen(3333)