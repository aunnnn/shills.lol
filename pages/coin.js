import { Component } from 'react'
import { Layout, TldrItem, TldrInput } from '../components'
import APIService from '../utils/APIService'

export default class extends Component {
  state = {
    coin: null
  }

  componentDidMount () {
    APIService.getList(this.props.url.query.symbol)
      .then(res => {
        this.setState({ coin: res.data.list })
      })
  }

  renderTldr = () => {
    return this.state.coin.submitted_definitions.map((d, i) => {
      return <div key={d._id}>- {d.text}</div>
    })
  }

  render () {
    if (!this.state.coin) {
      return (
        <div>Fetching {this.props.url.query.symbol} data..</div>
      )
    }

    console.log(this.state.coin)
    return (
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <h1>{this.state.coin.name}</h1>
            </div>
            <div className='col-md-9'>
              <TldrInput id={this.state.coin._id} />
              <ul className="list-group">
                {this.renderTldr()}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
