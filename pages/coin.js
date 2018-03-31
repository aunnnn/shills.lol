import { Component } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore, getList } from '../store'
import { Layout, TldrItem, TldrInput } from '../components'
import APIService from '../utils/APIService'

class CoinPage extends Component {

  static async getInitialProps ({ store, query }) {
    await store.dispatch(getList(query.symbol))
    return {}
  }

  componentDidMount() {
    const jquery = document.createElement("script");
    jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    jquery.async = false;

    const script = document.createElement("script");
    script.src = "https://files.coinmarketcap.com/static/widget/currency.js";
    script.async = false;

    document.body.appendChild(jquery);
    document.body.appendChild(script);
  }
  
  renderTickerWidget = () => {
    return (
      <div 
        className="coinmarketcap-currency-widget" 
        data-currencyid={this.props.coin.cmc_asset_id}
        data-base="USD" 
        data-secondary="" 
        data-ticker="true" 
        data-rank="true" 
        data-marketcap="true" 
        data-volume="true" 
        data-stats="USD" 
        data-statsticker="true">
      </div>
    )
  }

  renderStatus = () => {
    return (
      <div>
        <div className='d-flex flex-row justify-content-start align-items-center'>
          <h1 className='coin-name'>{this.props.coin.name}</h1>
          <h2 className='coin-symbol'>{this.props.coin.symbol}</h2>
        </div>
        <div>
          {this.renderTickerWidget()}
        </div>
        <a href={this.props.coin.cmc_url}>coinmarketcap</a>
      </div>
    )
  }

  renderTldr = () => {
    if (!this.props.coin.submitted_definitions.length) {
      return (
        <div>
          <div className="no-tldr">There's no shill added yet. You can be the first!</div>
          <style jsx>{`
            .no-tldr {
              color: gray;
              font-size: 20px;
              font-style: italic;
              font-weight: 300;
              margin-top: 40px;
            }
          `}</style>
        </div>
      )
    }
    return this.props.coin.submitted_definitions.map((def, i) => {
      return <TldrItem
        key={def._id}
        def_id={def._id}
        coin_id={def.list_id}
        downvotes={def.downvotes}
        upvotes={def.upvotes}
        text={def.text}
        created_at={def.created_at}
        no={i}
      />
    })
  }

  render () {
    return (
      <Layout>
        <div className='container-fluid'>
          {(!this.props.coin || this.props.fetchingCoin) ?
            <div>Fetching {this.props.url.query.symbol} data..</div>
            :
            <div className='row'>
              {/* detail */}
              <div className='col-md-4'>
                {this.renderStatus()}
              </div>
              <div className='col-md-8 pt-2'>
                <TldrInput id={this.props.coin._id} coin_symbol={this.props.coin.symbol} />
                {this.renderTldr()}
              </div>
            </div>
          }
        </div>
        <style jsx>{`
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

const mapStateToProps = (state) => {
  return {
    coin: state.currentList,
    fetchingCoin: state.loadingCurrentList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getList: bindActionCreators(getList, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(CoinPage)
