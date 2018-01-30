import { Component } from 'react'

export default class extends Component {
  state = {
    upvotes: 0,
    downvotes: 0,
    localScore: 0,
    hitMaxTimes: 0,
    maxCap: 20,
  }

  vote = (vote) => {
    const { localScore, maxCap } = this.state

    if (this.state.upvotes + this.state.downvotes >= 20) {
      this.setState(prev => ({ hitMaxTimes: prev.hitMaxTimes }))
      if (this.state.hitMaxTimes <= 3) {
        alert('Vote up to 20 votes.')
      } else {
        alert('Come on.. really?')
      }
      return
    }

    if (vote === 'up') {
      this.setState(prev => ({ upvotes: prev.upvotes + 1, localScore: prev.localScore + 1 }))
    } else {
      this.setState(prev => ({ downvotes: prev.downvotes + 1, localScore: prev.localScore - 1 }))
    }
  }

  kFormatter = (num) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num
  }

  render () {
    const { upvotes, downvotes, localScore, maxCap } = this.state
    const upOpacity = localScore > 0 ? localScore/maxCap : 0
    const downOpacity = localScore < 0 ? (-localScore)/maxCap : 0

    return (
      <div className='item'>
        <div className={`def def-${this.props.no}`}>
          {this.props.no + 1}. {this.props.text}
        </div>
        <div className='vote-wrapper d-flex flex-row align-items-stretch'>
          <a
            className='vote up'
            onClick={() => this.vote('up')}
            style={{ backgroundColor: `rgba(39, 174, 96, ${upOpacity})`}}
          >👍 {this.state.upvotes !== 0 && '+'}{this.kFormatter(this.state.upvotes)}</a>
          <a
            className='vote down'
            onClick={() => this.vote('down')}
            style={{ backgroundColor: `rgba(231, 76, 60, ${downOpacity})`}}
          >👎 {this.state.downvotes !== 0 && '-'}{this.kFormatter(this.state.downvotes)}</a>
        </div>
        <style jsx>{`
          .item {
            margin-bottom: 15px;
          }
          .vote-wrapper {
            width: 100%;
            max-width: 200px;
          }
          .vote {
            width: 50%;
            height: 100%;
            cursor: pointer;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            user-select: none;
            transition: background-color 0.2s;
          }
          .vote.up:hover {
            background-color: #2ecc71;
          }
          .vote.down:hover {
            background-color: #e74c3c;
          }
          .def {
            font-size: 15px;
          }
          .def {
            margin-bottom: 5px;
            font-size: 15px;
          }
          .def-0 {
            font-size: 28px !important;
            color: #e74c3c;
          }
          .def-1 {
            font-size: 20px !important;
            color: #e67e22;
          }
        `}</style>
      </div>
    )
  }
}
