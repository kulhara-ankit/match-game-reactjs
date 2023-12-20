import './index.css'

const TabItems = props => {
  const {tabDetails, isActiveTab, onClickTabId} = props
  const {tabId, displayText} = tabDetails

  const onTabSwitch = () => {
    onClickTabId(tabId)
  }

  const colorId = isActiveTab ? 'color tab-button' : 'tab-button'

  return (
    <li className="tab-item">
      <button type="button" className={colorId} onClick={onTabSwitch}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItems
