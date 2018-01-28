import { Component } from 'react'
import Router from 'next/router'
import axios from 'axios'

export default class extends Component {
  state = {
    coins: null,
    inputCoin: '',
    fetchingCoins: true,
    focused: false
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

  selectCoin = (symbol) => {
    Router.push(`/coin?symbol=${symbol}`)
    this.setState({ focused: false })
  }

  renderCoins = () => {
    if (this.state.inputCoin && this.state.focused) {
      return this.state.coins
        .filter(coin => {
          const name = coin.name.toLowerCase()
          const symbol = coin.symbol.toLowerCase()
          const inputCoin = this.state.inputCoin.toLowerCase()

          return name.indexOf(inputCoin) >= 0 || symbol.indexOf(inputCoin) >= 0
        })
        .map(coin => (
          <li
            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
            onClick={() => this.selectCoin(coin.symbol)}
            key={coin.id}
          >
            {coin.name}
            <span className="badge badge-primary badge-pill">{coin.symbol}</span>
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
              onFocus={() => this.setState({ focused: true })}
            />
          </div>
        </div>

        <ul className='list-group mb-5'>
          {this.renderCoins()}
        </ul>
        
        <style jsx>{`
          .list-group-item {
            cursor: pointer !important;
          }
        `}</style>
      </div>
    )
  }
}
