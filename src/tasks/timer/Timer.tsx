import { useEffect, useState } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: number | undefined

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning((prev) => !prev)
  }

  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h2>{formatTime(seconds)}</h2>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Timer
