import { Component } from 'react'
import Link from 'next/link'

export default class extends Component {
  state = {
    mouseOver: false
  }

  render () {
    return (
      <div>
        <div className='text-center py-4'>
          <Link href='/'>
            <h1
              onMouseEnter={() => this.setState({ mouseOver: true })}
              onMouseLeave={() => this.setState({ mouseOver: false })}
            >
              It takes too long to know the coin {this.state.mouseOver ? '😫' : '😩'}
            </h1>
          </Link>
          <p>
            <span>Can we TL;DR it?</span>
            &nbsp;🤔
          </p>
        </div>
        <style jsx>{`
          h1 {
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}
