import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';


function App() {
  const [ initText, setInitText ] = useState('')
  const [ summarizedText, setSummarizedText ] = useState('')
  const [ inputText, setInputText ] = useState('')

  // useEffect(() => {
  //   updateTexts()
  // }, [])

  const updateTexts = (text) => {
    const textToSend = {
      textToSend: text
    }
    axios.post('http://localhost:8080/summary', textToSend).then(({ data }) => { 
      setInitText(data.original_text)
      setSummarizedText(data.summary_text)
    })
  }

  const setText = (e) => {
    setInputText(e.target.value.slice(0, 700))
  }

  return (
    <div className="App">
      <h1>SUMMARIZER APP</h1>
      <div class="input-group mb-3">
        <input onChange={(e) => setText(e)} type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" />
      </div>
      <button type="button" class="btn btn-primary" onClick={() => updateTexts(inputText)}>Summarize!</button>
      { initText && summarizedText &&
        <div class="row align-items-center">
        <div class="col">
          <h2>Original Text</h2>
          <p>{initText}</p>
        </div>
        <div class="col">
          <h2>Summarized Text</h2>
          <p>{summarizedText}</p>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
