import { Component } from 'react'
import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import { initStore, getIntroLists } from '../store'
import { Layout, TldrItem } from '../components'

class Index extends Component {
  componentDidMount () {
    this.props.getIntroLists()
  }

  renderIntroLists () {
    return this.props.introLists
      .filter(list => !!list.submitted_definitions.length)
      .map(list => (
        <div className='row coin mb-4'>
          <div className='col-6 col-md-2 d-flex justify-content-between'>
            <strong>{list.name}</strong>
            <span>|</span>
          </div>
          <div className='col-6 col-md-2 d-flex justify-content-between'>
            <Link href={`/coin?symbol=${list.symbol}`} prefetch>
              {list.symbol}
            </Link>
            <span>|</span>
          </div>
          <div className='col-md-6'>
            {list.submitted_definitions.map((def, i) => (
              <div className={`row def def-${i}`}>
                <div className='col-12'>
                  {i + 1}. {def.text}
                </div>
              </div>
            ))}
            <Link href={`/coin?symbol=${list.symbol}`} prefetch>
              <a className='see-all'>See all {list.symbol}'s TL;DRs..</a>
            </Link>
          </div>
          <style jsx>{`
            .coin {
              font-size: 18px;
            }
            .def {
              margin-bottom: 5px;
              font-size: 15px;
            }
            .def-0 {
              font-size: 26px !important;
              color: #c0392b;
            }
            .def-1 {
              font-size: 20px !important;
              color: #8e44ad;
            }
            .see-all {
              font-size: 15px;
            }
          `}</style>
        </div>
      ))
  }

  render () {
    return (
      <Layout>
        <div className='container-fluid'>
          <div className='row header pb-2 mb-2'>
            <div className='col-4 col-md-2 d-flex justify-content-between'>
              Name
              <span>|</span>
            </div>
            <div className='col-4 col-md-2 d-flex justify-content-between'>
              Symbol
              <span>|</span>
            </div>
            <div className='col-4 col-md-6 d-flex justify-content-between'>
              Top 5 TL;DRs
            </div>
          </div>
          {this.renderIntroLists()}
        </div>
        <style jsx>{`
          .header {
            font-weight: bold;
            border-bottom: 1px dashed #000;
            font-size: 14px;
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
