import { Component } from 'react'
import axios from 'axios'

export default class extends Component {
  state = {
    coins: null,
    inputCoin: '',
    fetchingCoins: true
  }

  componentDidMount () {
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=0')
      .then(res => this.setState({
        coins: res.data,
        fetchingCoins: false
      }))
  }

  changeText = (e) => {
    this.setState({ inputCoin: e.target.value })
  }

  renderCoins = () => {
    if (this.state.inputCoin) {
      return this.state.coins
        .filter(coin => (
          coin.name.indexOf(this.state.inputCoin) >= 0 || coin.symbol.indexOf(this.state.inputCoin) >= 0
        ))
        .map(coin => (
          <li
            key={coin.name}
          >
            <a>{coin.name}</a>
          </li>
        ))
    }
  }

  render () {
    if (this.state.fetchingCoins) {
      return 'Fetching those coins..'
    }

    return (
      <div>
        <div className='col-auto'>
          <div className='input-group mb-2'>
            <div className='input-group-prepend'>
              <div className='input-group-text'>🔎</div>
            </div>
            <input
              type='text' className='form-control'
              id='inlineFormInputGroup' placeholder="What's the name of THAT COIN"
              value={this.state.inputCoin}
              onChange={this.changeText}
            />
          </div>
        </div>

        <ul>
          {this.renderCoins()}
        </ul>
        
        <style jsx>{`
          .list-group {
            position: absolute;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
