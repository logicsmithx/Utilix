import { Link } from 'react-router-dom'
import { useState,useEffect,useRef } from 'react'
const paragraphs=["The quick brown fox jumps over the lazy dog.","Typing fast requires practice and focus.","React makes building interfaces easier.","Consistency is the key to improvement.","Practice daily to increase typing speed."]
function pickParagraph(){
return paragraphs[Math.floor(Math.random()*paragraphs.length)]
}
function getResults(currentInput,currentText){
const words=currentInput.trim().split(" ").filter(w=>w!=="")
let correct=0
for(let i=0;i<currentInput.length;i++){if(currentInput[i]===currentText[i])correct++}
return {
wpm: words.length,
accuracy: currentInput.length?Math.round((correct/currentInput.length)*100):0,
}
}
function Keysprint(){
const [text,setText]=useState(()=>pickParagraph())
const [input,setInput]=useState("")
const [time,setTime]=useState(60)
const [running,setRunning]=useState(false)
const [wpm,setWpm]=useState(0)
const [accuracy,setAccuracy]=useState(0)
const inputRef=useRef(null)
useEffect(()=>{
inputRef.current?.focus()
},[])
useEffect(()=>{
if(!running){return}
const timer=setInterval(()=>{
setTime(currentTime=>{
if(currentTime<=1){
clearInterval(timer)
const currentInput=inputRef.current?.value ?? ""
const results=getResults(currentInput,text)
setWpm(results.wpm)
setAccuracy(results.accuracy)
setRunning(false)
return 0
}
return currentTime-1
})
},1000)
return()=>clearInterval(timer)
},[running,text])
function handleChange(e){
const value=e.target.value
setInput(value)
if(!running)setRunning(true)
}
function handleReset(){
setInput("")
setTime(60)
setWpm(0)
setAccuracy(0)
setRunning(false)
setText(pickParagraph())
inputRef.current?.focus()
}
return(
<div>
<main>
<Link to="/dashboard">⬅️ Back to Dashboard</Link>
<h1>⌨️ KeySprint</h1>
<p>{text}</p>
<textarea ref={inputRef} value={input} onChange={handleChange} placeholder="Start typing here..."/>
<br/>
<p>Time: {time}s</p>
{time===0&&(<div><p>WPM: {wpm}</p><p>Accuracy: {accuracy}%</p></div>)}
<button onClick={handleReset}>Restart</button>
</main>
</div>
)
}
export default Keysprint
