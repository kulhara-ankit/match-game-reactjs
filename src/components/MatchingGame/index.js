import {Component} from 'react'
import Navbar from '../Navbar'
import TabItems from '../TabItems'
import Thumbnails from '../ThumbnailsItems'
import WinOrLossCard from '../WinOrLossCard'
import './index.css'

class MatchingGame extends Component {
  constructor(props) {
    super(props)
    const {imagesList, tabsList} = this.props
    this.state = {
      isGameInProgress: true,
      topScore: 0,
      time: 60,
      showedImage: imagesList[0],
      activeTab: tabsList[0].tabId,
    }
  }

  componentDidMount = () => {
    this.timerID = setInterval(this.time, 1000)
  }

  componentWillUnmount = () => {
    this.clearIntervalId()
  }

  clearIntervalId = () => clearInterval(this.timerId)

  time = () => {
    const {time} = this.state
    if (time === 0) {
      this.clearIntervalId()
      this.setState(prev => ({isGameInProgress: !prev.isGameInProgress}))
      this.setState({time: 60})
    } else {
      this.setState(prev => ({time: prev.time - 1}))
    }
  }

  statusChange = () => {
    const {imagesList} = this.props
    this.setState(prev => ({isGameInProgress: !prev.isGameInProgress}))
    this.setState({topScore: 0, time: 60, showedImage: imagesList[0]})
    this.componentDidMount()
  }

  onClickTabId = tabId => {
    this.setState({activeTab: tabId})
  }

  filterList = () => {
    const {activeTab} = this.state
    const {imagesList} = this.props
    const filterImage = imagesList.filter(
      eachImages => eachImages.category === activeTab,
    )
    return filterImage
  }

  imageTab = category => {
    const {imagesList} = this.props
    const {showedImage} = this.state
    const {id} = showedImage
    if (id === category) {
      this.setState(prevState => ({topScore: prevState.topScore + 1}))
      this.setState({
        showedImage: imagesList[Math.floor(Math.random() * imagesList.length)],
      })
    } else {
      this.setState(prevState => ({
        isGameInProgress: !prevState.isGameInProgress,
      }))
    }
  }

  renderImageList = () => {
    const {tabsList} = this.props
    const {showedImage, activeTab} = this.state
    const {imageUrl} = showedImage
    const filteredList = this.filterList()
    // const shuffledEmojisList = this.getShuffledEmojisList()
    return (
      <div className="game-container">
        <img src={imageUrl} alt="match" className="main-image" />
        {/* tab-items */}
        <ul className="tab-container">
          {tabsList.map(eachTabDetails => (
            <TabItems
              tabDetails={eachTabDetails}
              key={eachTabDetails.tabId}
              onClickTabId={this.onClickTabId}
              isActiveTab={activeTab === eachTabDetails.tabId}
            />
          ))}
        </ul>
        {/* Image-List thumbnails */}
        <ul className="images-list">
          {filteredList.map(eachImage => (
            <Thumbnails
              imagesList={eachImage}
              key={eachImage.id}
              imageTab={this.imageTab}
            />
          ))}
        </ul>
      </div>
    )
  }

  scoreCardWinOrLoss = () => {
    const {topScore} = this.state

    return <WinOrLossCard topScore={topScore} resetGame={this.statusChange} />
  }

  render() {
    // const {imagesList, tabsList} = this.props
    const {isGameInProgress, topScore, time} = this.state
    return (
      <ul className="list-style">
        <li>
          <Navbar topScore={topScore} timeRemaining={time} />
        </li>
        <li>
          {/* isGameStarted is true */}
          {isGameInProgress
            ? this.renderImageList()
            : this.scoreCardWinOrLoss()}
        </li>
      </ul>
    )
  }
}

export default MatchingGame
