const jwt = require('jsonwebtoken')
const SECRETKEY = '123456'


let token = jwt.sign({
    name: 'Kaiz',
    created_at: (new Date).toISOString()
}, SECRETKEY, {
    expiresIn: '1h'
})

let verification = jwt.verify(token, SECRETKEY)
console.log(token, verification)