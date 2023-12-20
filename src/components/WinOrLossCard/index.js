import './index.css'

const WinOrLossCard = props => {
  const {topScore, resetGame} = props

  const playGame = () => {
    resetGame()
  }

  return (
    <div className="bg-container">
      <div className="loose-card">
        <div className="trophy-container">
          <img
            className="trophy"
            alt="trophy"
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          />
        </div>
        <p className="score-head">YOUR SCORE</p>
        <p className="count">{topScore}</p>
        <button className="play-again" type="button" onClick={playGame}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset"
          />
          PLAY AGAIN
        </button>
      </div>
    </div>
  )
}

export default WinOrLossCard
