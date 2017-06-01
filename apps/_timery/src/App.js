import React, { Component } from 'react';
import moment from 'moment'
import queryString from 'query-string'
import './App.css';
import bg1 from './bg/IMG_5249.JPG'
import bg2 from './bg/IMG_8008.JPG'
import bg3 from './bg/IMG_8257.JPG'
import bg4 from './bg/IMG_9734.JPG'

const backgroundImagesPublic = [bg1, bg3, bg4]
const backgroundImagesWithJH = [...backgroundImagesPublic, bg2]

const getZeroPaddedNumber = num => num >= 10 ? num : '0' + num

class App extends Component {
  constructor(props) {
    super(props);

    const param = queryString.parse(window.location.search)
    param.dday =  (param.dday && moment(param.dday)) || undefined
    param.byDays = param.byDays !== undefined

    let backgroundImage

    if (param.bg) {
      backgroundImage = param.bg
    } else if (param.title && param.title.indexOf('지혜') >= 0) {
      backgroundImage = backgroundImagesWithJH[Math.floor(Math.random() * backgroundImagesWithJH.length)]
    } else {
      backgroundImage = backgroundImagesPublic[Math.floor(Math.random() * backgroundImagesPublic.length)]
    }

    backgroundImage = `url(${backgroundImage})`

    this.state = {param, backgroundImage};

    // Toggle the state every minute or every second
    setInterval(() => {
      this.forceUpdate()
    }, param.byDays ? 1000 * 60 : 1000)
  }

  render() {
    const now = moment()

    const { param } = this.state
    const { byDays, title, dday } = param

    let timeText1
    let timeText2

    if (dday) {
      let ddayMsec = now.diff(dday, 'milliseconds')
      let ddayTextBase
      if (ddayMsec !== null) {
        const passed = ddayMsec > 0
        ddayMsec = Math.abs(ddayMsec)
        const diffDays = Math.floor(ddayMsec / 1000 / 60 / 60 / 24)
        if (byDays) {
          ddayTextBase = diffDays
        } else {
          const diffHours = getZeroPaddedNumber(Math.floor(ddayMsec / 1000 / 60 / 60 % 24))
          const diffMinutes = getZeroPaddedNumber(Math.floor(ddayMsec / 1000 / 60 % 60))
          const diffSecs = getZeroPaddedNumber(Math.floor(ddayMsec / 1000 % 60))
          ddayTextBase = `${diffDays} ${diffHours}:${diffMinutes}:${diffSecs}`
        }
        timeText1 = (passed ? 'D+' : 'D-') + ddayTextBase
      }
    } else {
      timeText1 = now.format('YYYY:MM:DD')
      if (!byDays) {
        timeText2 = now.format('HH:mm:ss')
      }
    }

    return (
      <div className='App' style={{backgroundImage: this.state.backgroundImage}}>
        <div className='container'>
          <div className='display-3 p-3 rounded textBox'>
            {title &&
              <div>{title}</div>
            }
            <div className='datetime'>
              {timeText1}
            </div>
            {timeText2 &&
              <div className='datetime'>
                {timeText2}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
