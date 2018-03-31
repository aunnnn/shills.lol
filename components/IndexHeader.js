import { Component } from 'react'
import Link from 'next/link'
import { CoinsPicker } from '../components';

export default class extends Component {
  state = {
    mouseOver: false
  }

  render () {
    return (
      <div className="bg d-flex px-3 py-1 align-items-center justify-content-between">
        <Link href='/'>
          <div className="d-flex align-items-center">
            <img src="/static/lol.png" width="30" height="30" className="mr-1" />
            <h1
              onMouseEnter={() => this.setState({ mouseOver: true })}
              onMouseLeave={() => this.setState({ mouseOver: false })}
            >
              Coin Shills LOL
            </h1>
          </div>
        </Link>
        <CoinsPicker />
        <style jsx>{`
          .bg {
            background-color: #55007F;
          }
          h1 {
            font-size: 16px;
            color: #fff;
            margin: 0;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}
