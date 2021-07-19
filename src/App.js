import React, { useState, useEffect } from 'react'
// AWS Amplify에서 API 가져오기
import { API } from "aws-amplify";

function App() {
    const [coins, updateCoins] = useState([])

    // API 호출을 위한  fetchCoins 함수 정의

    async function fetchCoins() {
        const data = await API.get('cryptoapi', '/coins')
        updateCoins(data.coins)
        console.log(data)
    }
    useEffect(() => {
        fetchCoins()
    },[])
    return (
            <div className="App">
              {
                  coins.map((coin, index) => (
                      <div key={index}>
                          <h2>{coin.name} - {coin.symbol}</h2>
                          <h5>${coin.price_usd}</h5>

                      </div>
                  ))
              }
          </div>
    );
}

export default App

