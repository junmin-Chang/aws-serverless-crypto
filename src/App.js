import React, { useState, useEffect } from 'react'
// AWS Amplify에서 API 가져오기
import { API } from "aws-amplify";

function App() {
    const [coins, updateCoins] = useState([])
    const [input, updateInput] = useState({ limit: 5, start: 0})

    function updateInputValues(type, value) {
        updateInput({ ...input, [type] : value})
    }
    // API 호출을 위한  fetchCoins 함수 정의
    async function fetchCoins() {
        const { limit, start } = input
        const data = await API.get('cryptoapi', `/coins?start=${start}&limit=${limit}`)
        updateCoins(data.coins)
    }


    return (
            <div className="App">
                <input
                    onChange={e => updateInputValues('limit', e.target.value) }
                    placeholder="limit"
                />
                <input
                    onChange={e => updateInputValues('start', e.target.value)}
                    placeholder="start"
                />
                <button onClick={fetchCoins}>Fetch Coins</button>
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

