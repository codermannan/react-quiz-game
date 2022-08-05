import React from 'react'

export default function ScoreCard({totalScore, resetQuiz}) {
  return (
    <div className='result'>
        <h3>Result Page</h3>
        <p>Score : {totalScore}</p>
        <button onClick={resetQuiz} className='btn restart-btn'>
        Reset Quiz
      </button>
    </div>
  )
}
