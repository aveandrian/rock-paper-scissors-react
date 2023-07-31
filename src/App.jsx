
import { useEffect, useState } from 'react';
import './App.css'
import { Spinner } from '@chakra-ui/react';

const moves = [
  'paper',
  'scissors',
  'rock'
]

const results = [
  'You lose',
  'You win',
  'Draw'
]

function App() {
  const [playerMove, setPlayerMove] = useState(null)
  const [houseMove, setHouseMove] = useState(null)
  const [result, setResult] = useState(null)
  const [winsCount, setWinsCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  function toggleModal(){
    setShowModal(prev => !prev)
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function restart(){
    setPlayerMove(null)
    setHouseMove(null)
    setResult(null)
  }

  useEffect(()=>{
    let savedScore = window.localStorage.getItem('score')
    if(JSON.parse(savedScore) > 0){
      setWinsCount(savedScore)
    }
  },[])

  useEffect(()=>{
    if(winsCount > 0)
      window.localStorage.setItem('score', winsCount)
  }, [winsCount])
  
  useEffect(()=>{
    if(houseMove != null){
      if(playerMove == houseMove) 
        setResult(2)
      else if(playerMove == 2){
        if(houseMove == 0){
            setResult(0)
        }else{
            setResult(1)
            setWinsCount(prev => Number(prev)+1)
        }
      }
      else if(playerMove == 1){
          if(houseMove == 2){
            setResult(0)
          }else{
            setResult(1)
            setWinsCount(prev => Number(prev)+1)
          }
      }
      else if(playerMove == 0){
          if(houseMove == 1){
            setResult(0)
          }else{
            setResult(1)
            setWinsCount(prev => Number(prev)+1)
          }
      }
    }
  }, [houseMove])

  useEffect(()=>{
    
    if(playerMove !=null){
      setIsLoading(true)
      const timer = setTimeout(() => {
        setHouseMove(getRandomInt(3))
        setIsLoading(false)
      }, 3000);
      

      return () => clearTimeout(timer);
    }
  },[playerMove])
  return (
    <main>
      <div className='header'>
        <div className='title-wrapper'>
          <h1 className='title'>Rock</h1>
          <h1 className='title'>Paper</h1>
          <h1 className='title'>Scissors</h1>
        </div>
        <div className='score-wrapper'>
          <p className='score-text'>Score</p>
          <h1 className='score-value'>{winsCount}</h1>
        </div>
      </div>


      {playerMove == null && houseMove == null &&<div className='start-screen'>
        <div className={`move-container paper ${playerMove == 0 ? "actove" : ""}`} onClick={() => setPlayerMove(0)}>
          <div className='move-wrapper paper'>
            <img className='move-icon' src='/images/icon-paper.svg' alt='Paper icon' />
          </div>
        </div>
        <div className='move-container scissors' onClick={() => setPlayerMove(1)}>
          <div className='move-wrapper scissors'>
            <img className='move-icon' src='/images/icon-scissors.svg' alt='Scissors icon'/>
          </div>
        </div>
        <div className='move-container rock' onClick={() => setPlayerMove(2)}>
          <div className='move-wrapper rock'>
            <img className='move-icon' src='/images/icon-rock.svg'  alt='Rock icon'/>
          </div>
        </div>
      </div>}
      {playerMove != null && <div className={`game-screen ${result ? "finished" : ""} `}>
        <div className='player-pick pick-wrapper'>
          <h1 className='player-pick-text pick-text'>You picked</h1>
          <div className={`move-container ${moves[playerMove]} ${result == 1 ? "winner" : ""}`}>
            <div className='move-wrapper paper'>
              <img className='move-icon' src={`/images/icon-${moves[playerMove]}.svg`} alt="Player's pick icon"/>
            </div>
          </div>
        </div>
        <div className={`game-result ${result != null ? "finished" : ""} `}>
          <h1 className='game-result-text'>{results[result]}</h1>
          <button className='restart-button' onClick={restart}>Play again</button>
        </div>
        <div className='house-pick pick-wrapper'>
          <h1 className='house-pick-text pick-text'>The House picked</h1>
          {houseMove != null ? <div className={`move-container ${moves[houseMove]} ${result == 0 ? "winner" : ""}`}>
            <div className='move-wrapper paper'>
              <img className='move-icon' src={`/images/icon-${moves[houseMove]}.svg`} alt="House's pick icon" />
            </div>
          </div> : (
            <div className='house-pick-waiter'>{isLoading && <Spinner color='grey.500' size='xl'/>}</div>
          )}
        </div>
      </div>}

      <button className='rules-btn' onClick={toggleModal}>Rules</button>

      {showModal && <div className='rules-modal'>
        <div className='rules-modal-wrapper'>
          <h1 className='rules-modal-title'>Rules</h1>
          <img className='close-icon' src='/images/icon-close.svg' onClick={toggleModal} alt='Close icon'/>
          <img className='rules-img' src='/images/image-rules.svg' alt='Rules image'></img>
        </div>
      </div>}

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
      </div>
     
    </main>
  )
}

export default App
