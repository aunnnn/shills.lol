import { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { initStore, getIntroLists } from '../store'
import { Layout, TldrItem } from '../components'

class Index extends Component {

  static async getInitialProps ({ store, query }) {
    await store.dispatch(getIntroLists())
    return {}
  }

  componentDidMount () {
    this.props.getIntroLists()
  }

  renderIntroLists () {
    return this.props.introLists
      .map((list, ind) => {
        if (list.submitted_definitions && list.submitted_definitions.length) {
          const topShill = list.submitted_definitions[0]
          const latestShill = list.submitted_definitions[list.submitted_definitions.length - 1]
          // console.log(topShill)
          return (
            <li key={`intro-${ind}`} className="mb-1">
              <Link href={`/coin?symbol=${list.symbol}`} prefetch>
                <a className="link">
                  <img
                    src={list.cmc_icon} width="30" height="30"
                    className="d-inline-block align-top mr-2"
                  />
                  <div className="d-inline-block align-top">
                    <h2 className="text">
                      {list.name}{' '}
                      <span className="symbol">{list.symbol}</span>: "{topShill.text}"
                    </h2>
                    <p className="label">{list.definitions_count} shills | latest shill {moment(latestShill.updatedAt).fromNow()}</p>
                  </div>
                </a>
              </Link>
              <style jsx>{`
                .link {
                  text-decoration: none;
                }
                .text {
                  color: #000;
                  margin: 0 !important;
                  padding: 0;
                  font-size: 15px;
                }
                .label {
                  color: #999;
                  font-size: 10px;
                  margin-bottom: 5px;
                }
                .symbol {
                  color: grey;
                }
              `}</style>
            </li>
          )
        }

        return (
          <li key={`intro-${ind}`} className="mb-1">
            <Link href={`/coin?symbol=${list.symbol}`} prefetch>
              <a className="link">
                <img
                  src={list.cmc_icon} width="30" height="30"
                  className="d-inline-block align-top mr-2"
                />
                <div className="d-inline-block align-top">
                  <h2 className="text">
                    {list.name}{' '}
                    <span className="symbol">{list.symbol}</span>: <span className="insert-shill">-</span>
                  </h2>
                  <p className="label">No shills yet, insert shill</p>
                </div>
              </a>
            </Link>
            <style jsx>{`
              .link {
                text-decoration: none;
              }
              .text {
                color: #000;
                margin: 0 !important;
                padding: 0;
                font-size: 15px;
              }
              .label {
                color: #999;
                font-size: 10px;
                margin-bottom: 5px;
              }
              .insert-shill {
                color: #999;
              }
              .symbol {
                color: grey;
              }
            `}</style>
          </li>
        )
      })
  }

  render () {
    return (
      <Layout>
        <ol className="bg py-2">
          {this.renderIntroLists()}
        </ol>
        <style jsx>{`
          .bg {
            background-color: #fff;
          }
        `}</style>
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    introLists: state.introLists
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getIntroLists: bindActionCreators(getIntroLists, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
