import { Component } from 'react'
import { Layout, TldrItem } from '../components'

export default class extends Component {
  renderTldr = () => {
    return [
      <TldrItem />,<TldrItem />,<TldrItem />,<TldrItem />
    ]
  }

  render () {
    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <h1>{this.props.url.query.symbol}</h1>
            </div>
            <div className='col-md-9'>
              {this.renderTldr()}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
