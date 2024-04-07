import { Readable } from 'node:stream'
import fetch from 'node-fetch'


class OnetoHundredStream extends Readable{
    index = 1

    _read(){
        const i = this.index ++
        
        setTimeout(()=>{
            if(i>5){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
    
        },1000)
    }
}

fetch('http://localhost:7777', {
    method: 'POST',
    body: new OnetoHundredStream(),
}).then(response =>{
    return response.text()
}).then(data =>{
    console.log(data)
})