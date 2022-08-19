
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()
app.use(cors())
app.use(bodyParser.json())



const encodedParams = new URLSearchParams();
// encodedParams.append("q", "Hello, world!");
// encodedParams.append("source", "en");
// encodedParams.append("target", "es");

const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';

app.get('/',(req,res)=>{
   res.send('translator')
})
app.post('/',async (req,res)=>{
  let text = req.body.text
  let targetCode = req.body.targetCode
  let sourceCode = req.body.sourceCode
  encodedParams.append("source",targetCode)
  encodedParams.append("target",sourceCode)
  encodedParams.append("q",text)
  let response = await fetch(url,{
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'dbc33279bemsh645e756f92fcbf7p1ab19ajsnab2a63ab43c9',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    body: encodedParams
  })
  let responseJson = await response.json()
  return res.send(responseJson.data.translations[responseJson.data.translations.length-1].translatedText)
})


app.listen(3000)



