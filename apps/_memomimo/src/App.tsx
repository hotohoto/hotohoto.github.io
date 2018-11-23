import * as _ from "lodash"
import * as React from 'react'
import './App.css'

const originalText = `
🌑
안녕
어둠속에서 울고있니?
눈물이 앞을 가려서 어둠이 보이니?

🐚
동굴처럼 외롭고 또 외롭니?
누군가가 다가와주길 기다리는 순간이니?

👂🏼
너의 이야기를 들어줄 사람
귀 기울여줄 사람 말할 사람 있니?

👨‍👦
너에게 무엇을 해 줄 수 있을까
어른은 아이에게 무엇일까
누가 어른일까

🎁
내 말이 너에게 위로가 된다면
내 말이 너에게 선물이라면
그렇게 위로해주고 싶다

⏳
그 시간 속에서 같이 있고
같이 여행하고 웃다보면
어느새 어두운 동굴 속을 빠져나와있겠지
나와 함께

🌸
무궁화 꽃이 피었습니다
(6개동작)
(마지막 천천히 하면서)
무궁화 꽃이 피었다
`
const SPACE = " "
const ARROW_LEFT = "ArrowLeft"
const ARROW_RIGHT = "ArrowRight"

const textArray = originalText.split("\n").map(x => x.trim()).filter(x => x)
const levels = [0, 0.4, 0.55, 0.7, 1]

interface IAppState {
  currentHidden: boolean[]
  levelIndex: number
}

class App extends React.Component<any, IAppState> {
  public static getInstance(): App {
    return App.app
  }
  private static app: App

  constructor(props: any) {
    super(props)
    App.app = this
    const currentHidden = new Array(textArray.length)
    _.fill(currentHidden, false)
    this.state = {
      currentHidden,
      levelIndex: 0,
    }
  }

  public render() {
    const { currentHidden } = this.state
    return (
      <div className="App" onMouseUp={this.onMouseUp} >
        {textArray.map((x, idx) => {
          let text: string
          if (currentHidden[idx]) {
            text = "_".repeat(textArray[idx].length)
          } else {
            text = textArray[idx]
          }
          return (
            <div key={idx}>
              {text}
            </div>
          )
        })}
      </div>
    )
  }

  public changeLevel(d: number) {
    const { levelIndex } = this.state
    let newLevelIndex
    switch (d) {
      case 0:
        newLevelIndex = levelIndex
        break
      case -1:
        newLevelIndex = Math.max(levelIndex - 1, 0)
        break
      case 1:
        newLevelIndex = Math.min(levelIndex + 1, levels.length - 1)
        break
      default:
        return
    }
    const len = textArray.length
    const currentHidden = new Array(len).map(x => false)

    const level = levels[newLevelIndex]
    const numToHide:number = Math.round(textArray.length * level)
    _.shuffle(_.range(len))
      .slice(0, numToHide)
      .forEach((x:number) => {currentHidden[x] = true})
    this.setState({ levelIndex: newLevelIndex, currentHidden })
  }

  private onMouseUp = (evt: any) => {
    const screenW = window.innerWidth
    const { pageX } = evt
    if (pageX < screenW * (1 / 3)) {
      this.changeLevel(-1)
    } else if (pageX < screenW * (2 / 3)) {
      this.changeLevel(0)
    } else {
      this.changeLevel(1)
    }
  }
}

export default App

document.onkeyup = event => {
  switch (event.key) {
    case SPACE:
      App.getInstance().changeLevel(0)
      break
    case ARROW_LEFT:
      App.getInstance().changeLevel(-1)
      break
    case ARROW_RIGHT:
      App.getInstance().changeLevel(1)
      break
    default:
      return
  }
}
