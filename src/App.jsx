import React, { useState } from 'react'
import { players } from './data/players'
import { hallOfFame } from './data/hallOfFame'
import './index.css'

const App = () => {
  const [menu, setMenu] = useState("Overall")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const handleSearch = () => {
    const player = players[searchTerm]
    setSelectedPlayer(player || null)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex justify-between items-center bg-yellow-400 p-4 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-black">1.9+ Pojav Tierlist</h1>
        <a href="https://discord.gg/gtNXVKJDx3" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/color/48/discord-logo.png" alt="Discord" className="h-8" />
        </a>
      </header>

      <div className="flex gap-4 mt-6">
        <button onClick={() => setMenu("Overall")} className={`px-4 py-2 rounded ${menu === "Overall" ? 'bg-yellow-400 text-black' : 'bg-gray-800'}`}>Overall</button>
        <button onClick={() => setMenu("Hall")} className={`px-4 py-2 rounded ${menu === "Hall" ? 'bg-yellow-400 text-black' : 'bg-gray-800'}`}>Hall of Fame</button>
      </div>

      {menu === "Overall" && (
        <div className="mt-6">
          <div className="mb-6">
            <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Enter exact player name..."
              className="p-2 rounded bg-gray-900 border border-gray-700 text-white w-full"
            />
            <button 
              onClick={handleSearch}
              className="mt-2 bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500"
            >
              Search
            </button>
          </div>

          {selectedPlayer && (
            <div className="mt-6 p-6 bg-black/70 rounded-xl backdrop-blur-md">
              <div className="flex flex-col items-center">
                <img 
                  src={`https://render.crafty.gg/3d/bust/${selectedPlayer.name}`} 
                  alt={selectedPlayer.name} 
                  className="w-40 h-40 mb-4"
                />
                <h2 className="text-3xl text-blue-400 font-bold mb-2">{selectedPlayer.name}</h2>
                <p className="italic text-gray-300 mb-4">{selectedPlayer.message}</p>

                <div className="grid grid-cols-2 gap-3 text-left w-full max-w-md text-blue-300">
                  {Object.entries(selectedPlayer.tiers).map(([mode, tier]) => (
                    <div key={mode} className="flex justify-between border-b border-blue-500 pb-1">
                      <span>{mode}</span>
                      <span className="font-bold">{tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {menu === "Hall" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {hallOfFame.map(player => (
            <div key={player.name} className="bg-yellow-200 text-black p-4 rounded-lg text-center shadow-xl">
              <img 
                src={`https://render.crafty.gg/3d/bust/${player.image}`} 
                alt={player.name} 
                className="w-28 h-28 mx-auto mb-3"
              />
              <h3 className="text-xl font-bold">{player.name}</h3>
              <p className="italic">{player.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App