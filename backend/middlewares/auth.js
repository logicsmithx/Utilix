import crypto from 'crypto'

const AUTH_SECRET = process.env.AUTH_SECRET || 'utilix-dev-secret-change-me'

function encode(data){
return Buffer.from(data).toString('base64url')
}

function decode(data){
return Buffer.from(data,'base64url').toString('utf8')
}

function createSignature(payload){
return crypto.createHmac('sha256',AUTH_SECRET).update(payload).digest('base64url')
}

export function createAuthToken(user){
const payload=encode(JSON.stringify({
id:user._id?.toString(),
email:user.email,
name:user.name,
}))
const signature=createSignature(payload)
return `${payload}.${signature}`
}

export function requireAuth(req,res,next){
const authHeader=req.headers.authorization || ''
if(!authHeader.startsWith('Bearer ')){
return res.status(401).json({message:'Unauthorized'})
}
const token=authHeader.slice(7)
const [payload,signature]=token.split('.')
if(!payload || !signature){
return res.status(401).json({message:'Unauthorized'})
}
const expectedSignature=createSignature(payload)
const actualBuffer=Buffer.from(signature)
const expectedBuffer=Buffer.from(expectedSignature)
if(actualBuffer.length!==expectedBuffer.length){
return res.status(401).json({message:'Unauthorized'})
}
if(!crypto.timingSafeEqual(actualBuffer,expectedBuffer)){
return res.status(401).json({message:'Unauthorized'})
}
try{
req.user=JSON.parse(decode(payload))
next()
}catch{
return res.status(401).json({message:'Unauthorized'})
}
}
