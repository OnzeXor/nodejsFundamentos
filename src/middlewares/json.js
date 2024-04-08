export async function json(req,res){
    const buffers = []
    //pega as informaçoes que serão mandadas e transforma em uma coisa só dps que é mandado tudo
    for await(const chunk of req){
        buffers.push(chunk)

    }
    
    //tenta pegar as informaçoes do buffer e transformar em codigo
    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
        
    }catch{
        //se não der ele manda null
        req.body = null
    }


    res.setHeader('Content-type','application/json')
}