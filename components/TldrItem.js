import { Component } from 'react'

export default class extends Component {
  state = {
    upvotes: 0,
    downvotes: 0,
    localScore: 0,
    maxCap: 20,
  }

  vote = (vote) => {
    const { localScore, maxCap } = this.state

    if (vote === 'up') {
      if (localScore+1 > maxCap) {
        alert('Come on.. really?')
        return
      }
      this.setState(prev => ({ upvotes: prev.upvotes + 1, localScore: prev.localScore + 1 }))
    } else {
      if (localScore-1 < -maxCap) {
        alert('Come on.. really?')
        return
      }
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
      <li className='list-group-item d-flex justify-content-between align-items-stretch'>
        <div className='text'>
          sdfjsdfkjsdkfskdfj
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
          .list-group-item {
            padding: 0;
          }
          .text {
            padding: 15px;
          }
          .vote-wrapper {
            width: 25%;
            maxWidth: 150px;
          }
          .vote {
            width: 50%;
            height: 100%;
            border-left: 1px solid #ddd;
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
        `}</style>
      </li>
    )
  }
}
