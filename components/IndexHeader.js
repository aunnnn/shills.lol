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
          <h1
            onMouseEnter={() => this.setState({ mouseOver: true })}
            onMouseLeave={() => this.setState({ mouseOver: false })}
          >
            Coin Shills LOL
          </h1>
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
          }
        `}</style>
      </div>
    )
  }
}
