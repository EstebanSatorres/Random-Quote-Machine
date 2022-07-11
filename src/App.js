import React, {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {faTwitter} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  //const [state, setState] = useState(initialState)
  const [quote, setQuote] = useState("Life isn’t about getting and having, it’s about giving and being.")
  const [author, setAuthor] = useState("Kevin Kruse")
  const [randomQuote, setRandomQuote] = useState(0)
  
  const [quotesArray, setQuotesArray] = useState(null)

  const [accentColor, setAccentColor] = useState("#0282c34")

  //Asynchronos function
  const fetchQuotes = async(url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes) //Array on API is called quotes
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  

  const randomQuoteGenerator = () => {
    let randomInteger = Math.floor(quotesArray.length*Math.random())
    let randomIntegerColor = Math.floor(COLORS_ARRAY.length*Math.random())
    
    setRandomQuote(randomInteger)

    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)

    setAccentColor(COLORS_ARRAY[randomIntegerColor])

  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <p id="text"><a id="quote-symbol"><FontAwesomeIcon icon={faQuoteLeft} size="2x" /></a>
          {quote}"
          </p>
          <p id="author">
           - {author}
          </p>
          <div className="button">
            <a id="tweet-quote" style={{backgroundColor: accentColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote}\n  - ${author}`)} target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" style={{backgroundColor: accentColor}} onClick={randomQuoteGenerator}>Change quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
