import { Link } from 'react-router-dom'
import { useState } from 'react'
function Apilab() {
const [url, setUrl] = useState("")
const [params, setParams] = useState("")
const [method, setMethod] = useState("GET")
const [data, setData] = useState(null)
const [status, setStatus] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
async function handleFetch(e) {
e.preventDefault()
if (!url.trim()) {
setError("URL is required")
setData(null)
setStatus("")
return
}
let fullUrl = url
if (method === "GET" && params.trim()) {
fullUrl += `?${params}`
}
try {
setLoading(true)
setError("")
setData(null)
const res = await fetch(fullUrl, {
method: method,
headers: {
"Content-Type": "application/json",
},
body: method !== "GET" && params ? params : undefined,
})
let result
try {
result = await res.json()
} catch {
result = "No JSON response"
}
setStatus(res.status)
setData(result)
} catch {
setError("Request failed or invalid URL")
setStatus("")
setData(null)
} finally {
setLoading(false)
}
}
return (
<div>
<main>
<Link to="/dashboard">⬅️ Back to Dashboard</Link>
<h1>🌐 API Lab</h1>
<form onSubmit={handleFetch}>
<input type="text" placeholder="Base URL" value={url} onChange={(e) => setUrl(e.target.value)} />
<br />
<textarea placeholder="Parameters (key=value&key2=value2 OR JSON for POST)" value={params} onChange={(e) => setParams(e.target.value)} />
<br />
<select value={method} onChange={(e) => setMethod(e.target.value)}>
<option value="GET">GET</option>
<option value="POST">POST</option>
<option value="PUT">PUT</option>
<option value="DELETE">DELETE</option>
</select>
<br />
<button type="submit">Send Request</button>
</form>
{loading && <p>Loading...</p>}
{error && <p>{error}</p>}
{status && <p>Status: {status}</p>}
{data && (
<pre>
{JSON.stringify(data, null, 2)}
</pre>
)}
</main>
</div>
)
}
export default Apilab
