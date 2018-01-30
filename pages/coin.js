import { Component } from 'react'
import { Layout, TldrItem, TldrInput } from '../components'
import APIService from '../utils/APIService'

export default class extends Component {
  state = {
    coin: null,
    fetchingCoin: true
  }

  fetchCoin = () => {
    this.setState({ fetchingCoin: true })
    APIService.getList(this.props.url.query.symbol)
      .then(res => {
        this.setState({ coin: res.data.list, fetchingCoin: false })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url.query.symbol !== this.props.url.query.symbol) {
      this.fetchCoin()
    }
  }

  componentDidMount () {
    this.fetchCoin()
  }

  renderTldr = () => {
    return this.state.coin.submitted_definitions.map((def, i) => {
      return <TldrItem
        key={def._id}
        def_id={def._id}
        coin_id={def.list_id}
        downvotes={def.downvotes}
        upvotes={def.upvotes}
        text={def.text}
        no={i}
      />
    })
  }

  render () {
    return (
      <Layout>
        <div className='container-fluid'>
          <div className='row header mb-4' />
          {!this.state.coin || this.state.fetchingCoin ?
            <div>Fetching {this.props.url.query.symbol} data..</div>
            :
            <div className='row'>
              {/* detail */}
              <div className='col-md-4'>
                <div className='d-flex flex-row justify-content-start align-items-center'>
                  <h1 className='coin-name'>{this.state.coin.name}</h1>
                  <h2 className='coin-symbol'>{this.state.coin.symbol}</h2>
                </div>
                <p>
                  {this.state.coin.price_usd} USD
                  {` `}
                  <span
                    style={{
                      color: this.state.coin.percent_change_24h >= 0 ? 'green' : 'red'
                    }}
                  >
                    ({this.state.coin.percent_change_24h}%)
                  </span>
                </p>
                <p>{this.state.coin.price_btc} BTC</p>
              </div>
              <div className='col-md-8 pt-2'>
                <TldrInput id={this.state.coin._id} />
                {this.renderTldr()}
              </div>
            </div>
          }
        </div>
        <style jsx>{`
          .header {
            border-bottom: 1px dashed #000;
          }
          .coin-name {
            margin-right: 15px;
          }
          .coin-symbol {
            color: grey;
          }
        `}</style>
      </Layout>
    )
  }
}
