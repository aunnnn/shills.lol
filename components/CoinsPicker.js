import { Component } from 'react'
import Router from 'next/router'
import axios from 'axios'
import moment from 'moment'
import fuzzy from '../utils/fuzzy'
import API from '../utils/APIService'

const COIN_LIST_CACHED_KEY = 'coins'

export default class CoinsPicker extends Component {
  state = {
    coins: null,
    inputCoin: '',
    fetchingCoins: false,
    focused: false,
  }

  prepareCoinListsForSearch = () => {
    const cached = localStorage.getItem(COIN_LIST_CACHED_KEY)

    if (cached) {
      const cachedObject = JSON.parse(cached)
      // check cache format
      if (cachedObject && cachedObject["coins"] !== "undefined" && cachedObject["cachedDate"] !== "undefined") {
        if (moment.duration(moment().diff(cachedObject.cachedDate)).asDays > 7) {
          // more than 7 days cache-> refetch
          console.log('Outdated cache, update')
          this.fetchCoinListsAndUpdateCache()
        } else {
          // Use cache
          this.setState({
            coins: cachedObject.coins,
            fetchingCoins: false,
          })
          this.nameInput.focus()
          console.log('Use cached.')
        }
      } else {
        console.log('Invalid cached format.')
        // invalid cache
        this.fetchCoinListsAndUpdateCache()
      }
    } else {
      console.log('No cache.')
      // No cache
      this.fetchCoinListsAndUpdateCache()
    }
  }

  fetchCoinListsAndUpdateCache = () => {
    API.getAllLists().then((res) => {
      const lists = res.data.all_lists
      localStorage.setItem(COIN_LIST_CACHED_KEY, JSON.stringify({
        coins: lists,
        cachedDate: moment(),
      }))
      this.setState({
        coins: lists,
        fetchingCoins: false,
      })
      this.nameInput.focus()
    })
  }

  onClickInputBox = (e) => {
    if (!this.state.coins && !this.state.fetchingCoins) {
      this.setState({
        fetchingCoins: true,
      })
      this.prepareCoinListsForSearch()
    }
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

          return fuzzy(inputCoin, `${name} ${symbol}`)
        })
        .slice(0, 20)
        .map(coin => (
          <li
            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
            onClick={() => this.selectCoin(coin.symbol)}
            key={coin.cmc_id}
            style={{ cursor: 'pointer' }}
          >
            {coin.name}
            <span
              className="badge badge-primary badge-pill">{coin.symbol}
            </span>
            <style jsx>{`
              .badge {
                margin-left: 10px;
              }
            `}</style>
          </li>
        ))
    }
  }

  render() {
    return (
      <div>
        <div className='input-group' onClick={this.onClickInputBox}>
          <div className='input-group-prepend'>
            <div className='input-group-text'>🔎</div>
          </div>
          <input
            ref={(input) => { this.nameInput = input; }} 
            type='text' className='form-control'
            placeholder={this.state.fetchingCoins ? "Loading coins..." : "Search coin"}
            value={this.state.inputCoin}
            onChange={this.changeText}
            onFocus={() => this.setState({ focused: true })}
            disabled={this.state.fetchingCoins}
          />
        </div>

        <ul className='list-group'>
          {this.renderCoins()}
        </ul>

        <style jsx>{`
          .list-group {
            min-width: 250px;
            position: absolute;
            z-index: 999;
          }
          .list-group-item {
            cursor: pointer !important;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
