import { Component } from 'react'
import Link from 'next/link';
import APIService from '../utils/APIService';
import { debounce } from 'lodash';
import moment from 'moment';

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userUpvotes: 0,
      userDownvotes: 0,
      localScore: 0,
      hitMaxTimes: 0,
      maxCap: 20,
    }
    // Decrease amount of API calls by aggregating amount and call once.
    this.callUpvoteAPI = debounce(this._callVoteAPI('up'), 800)
    this.callDownvoteAPI = debounce(this._callVoteAPI('down'), 800)
  }

  numberOfUpvoteActionsLeftToServer = 0
  numberOfDownvoteActionsLeftToServer = 0

  _callVoteAPI = (vote_type) => () => {
    const vote_amount = vote_type === 'up' ? this.numberOfUpvoteActionsLeftToServer : this.numberOfDownvoteActionsLeftToServer
    if (vote_type === 'up') {
      this.numberOfUpvoteActionsLeftToServer = 0
    } else {
      this.numberOfDownvoteActionsLeftToServer = 0
    }
    APIService.voteDefinition(this.props.def_id, vote_type, vote_amount)
  }

  vote = (vote_type) => {
    const { localScore, maxCap } = this.state

    if (this.state.userUpvotes + this.state.userDownvotes >= 20) {
      this.setState(prev => ({ hitMaxTimes: prev.hitMaxTimes + 1 }))

      if (this.state.hitMaxTimes <= 3) {
        alert('Vote up to 20 votes.')
      } else {
        alert('Come on.. really?')
      }
      return
    }

    if (vote_type === 'up') {
      this.numberOfUpvoteActionsLeftToServer += 1
      this.setState(prev => ({ userUpvotes: prev.userUpvotes + 1, localScore: prev.localScore + 1 }))
      this.callUpvoteAPI()
    } else if (vote_type === 'down') {
      this.numberOfDownvoteActionsLeftToServer += 1
      this.setState(prev => ({ userDownvotes: prev.userDownvotes + 1, localScore: prev.localScore - 1 }))
      this.callDownvoteAPI()
    }
  }

  kFormatter = (num) => {
    return num > 999 ? (num/1000).toFixed(1) + 'k' : num
  }

  render () {
    const { userUpvotes, userDownvotes, localScore, maxCap } = this.state

    const sumVotes = this.props.upvotes - this.props.downvotes
    const sumUserVotes = this.state.userUpvotes - this.state.userDownvotes

    const total = this.props.upvotes + this.props.downvotes + this.state.userDownvotes + this.state.userUpvotes
    const totalUpvotes = this.props.upvotes + this.state.userUpvotes
    const totalDownvotes = this.props.downvotes + this.state.userDownvotes

    let upvotesPercent = (totalUpvotes / total) * 100
    let downvotesPercent = (totalDownvotes / total) * 100

    if (!upvotesPercent && !downvotesPercent) {
      upvotesPercent = 50
      downvotesPercent = 50
    }

    return (
      <div className='mb-3 pl-2'>
        <div className="d-flex flex-row align-items-center mb-2">
          <a onClick={() => this.vote('up')}>
            👍
          </a>
          <div className="progress mr-1">
            <div className="progress-bar bg-success" role="progressbar" style={{ width: `${upvotesPercent}%` }}>
              {this.kFormatter(totalUpvotes)}
            </div>
            <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${downvotesPercent}%` }}>
              {this.kFormatter(totalDownvotes)}
            </div>
          </div>
          <a onClick={() => this.vote('down')}>
            👎
          </a>
        </div>
        <h3>
          "{this.props.text}"
        </h3>
        <label className="created-at">{moment(this.props.created_at).fromNow()}</label>
        <style jsx>{`
          a {
            cursor: pointer;
          }
          h3 {
            margin: 0;
          }
          .progress {
            width: 200px;
          }
          .total {
            margin-right: 5px;
          }
          .created-at {
            font-size: 12px;
          }
        `}</style>
      </div>
    )
  }
}
