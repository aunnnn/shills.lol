import { Component } from 'react'
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
    const upOpacity = localScore > 0 ? localScore/maxCap : 0
    const downOpacity = localScore < 0 ? (-localScore)/maxCap : 0

    return (
      <div className='item'>
        <div className={`def def-${this.props.no}`}>
          {!this.props.noNum && `${this.props.no + 1}. `}
          "{this.props.text}" <span className="created-at">{moment(this.props.created_at).fromNow()}</span>
        </div>
        <div className='vote-wrapper d-flex flex-row align-items-stretch'>
          <a
            className='vote up'
            onClick={() => this.vote('up')}
            style={{ backgroundColor: `rgba(39, 174, 96, ${upOpacity})`}}
          >👍 {this.state.userUpvotes !== 0 && '+'}{this.kFormatter(this.state.userUpvotes + this.props.upvotes)}</a>
          <a
            className='vote down'
            onClick={() => this.vote('down')}
            style={{ backgroundColor: `rgba(231, 76, 60, ${downOpacity})`}}
          >👎 {this.state.userDownvotes !== 0 && '-'}{this.kFormatter(this.state.userDownvotes + this.props.downvotes)}</a>
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
            margin-bottom: 5px;
            font-size: 18px;
          }
          .def .created-at {
            display:block;
            font-size: 10px;
            color: gray;
            margin: 0 0 0 8px;
          }
          .def-0 {
            font-size: 28px !important;
            font-weight: bold;
            // color: #e74c3c;
          }
          // .def-1 {
          //   font-size: 20px !important;
          //   color: #e67e22;
          // }
        `}</style>
      </div>
    )
  }
}
