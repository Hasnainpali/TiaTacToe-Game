import React, { useState ,useEffect} from 'react'
import Board from './Board'
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';

const PLAYER_X = "X";
const PLAYER_0 = "0"
 
const winningCombination = [
    //Row
    {combo:[0,1,2]},
    {combo:[3,4,5]},
    {combo:[6,7,8]},
    
    //columns
    {combo:[0,3,6]},
    {combo:[1,4,7]},
    {combo:[2,5,8]},

     //Diagonals
    {combo:[0,4,8]},
    {combo:[2,4,6]},
    
]
function checkWinner(tiles , setGameSate){
    for(const { combo } of winningCombination){
        const tileValue1 = tiles[combo[0]]
        const tileValue2 = tiles[combo[1]]
        const tileValue3 = tiles[combo[2]]
        
     if(tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3){
        if(tileValue1 === PLAYER_X){
            setGameSate(GameState.playerXWins)
          }
          else {
            setGameSate(GameState.playerOWins)
          }  
          return;
     }
     const AlltilesFilledIn = tiles.every((tile)=> tile !== null);
      if(AlltilesFilledIn){
        setGameSate(GameState.draw)
      }
    }
}
export default function TiaTacTae() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X)
    const [gameState, setGameSate] = useState(GameState.notStarted)

    const handleGameStart =()=>{
      setGameSate(GameState.inProgress)
    }

    const handleTilesClick =(index)=>{
        if(gameState !== GameState.inProgress){
            return;
        }
        if(tiles[index] !== null){
            return;
        }
      const newTiles = [...tiles];
      newTiles[index] = playerTurn;
      setTiles(newTiles);
      if(playerTurn === PLAYER_X){
        setPlayerTurn(PLAYER_0)
      }else{
        setPlayerTurn(PLAYER_X)
      }
    }

    const handleReset =()=>{
       setGameSate(GameState.inProgress)
       setTiles(Array(9).fill(null))
       setPlayerTurn(PLAYER_X)
    }

    useEffect(()=>{

        checkWinner(tiles,setGameSate)

       },[tiles])

  return (
    <div className='flex flex-col justify-center items-center bg-purple-400    w-full  h-screen ' >
       {gameState === GameState.notStarted ?(
             <div className="bg-slate-300 shadow-md rounded-lg w-full max-w-72 p-2   md:w-full  md:max-w-80 ">
             <h1 className='font-semibold text-xl'>  </h1>
             <div className=" flex justify-center mt-3 ">
                <button onClick={handleGameStart} className='text-xl rounded-lg bg-blue-500 p-2 w-20 hover:translate-x-6'>Start</button>
             </div>
        </div>
       ):(
        <>
            <h1 className=' font-semibold text-5xl mt-4'> Tic Tac Toe</h1>
            <p className='text-2xl mt-3 '>{`Hey ${playerTurn } it's your Turn`}</p>
             <Board tiles={tiles} playerTurn={playerTurn} onTileClick={handleTilesClick} />
             <GameOver gameState={gameState} />
             <Reset gameState={gameState} onReset={handleReset}/>
        </>
       )}
    </div>
  )
}
