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
        <div className='row coin mb-4' key={list._id}>
          <div className='col-6 col-md-2 d-flex justify-content-between'>
            <strong>{list.name}</strong>
            {/* <span>|</span> */}
          </div>
          <div className='col-6 col-md-2 d-flex justify-content-between'>
            <Link href={`/coin?symbol=${list.symbol}`} prefetch>
              <a>{list.symbol}</a>
            </Link>
            {/* <span>|</span> */}
          </div>
          <div className='col-md-6'>
            <TldrItem
              key={list.submitted_definitions[0]._id}
              def_id={list.submitted_definitions[0]._id}
              coin_id={list.submitted_definitions[0].list_id}
              downvotes={list.submitted_definitions[0].downvotes}
              upvotes={list.submitted_definitions[0].upvotes}
              text={list.submitted_definitions[0].text}
              created_at={list.submitted_definitions[0].created_at}
              no={0}
              noNum
            />
            <Link href={`/coin?symbol=${list.symbol}`} prefetch>
              <a className='see-all'>See all...</a>
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
              font-size: 28px !important;
              color: #e74c3c;
            }
            .def-1 {
              font-size: 20px !important;
              color: #e67e22;
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
              {/* <span>|</span> */}
            </div>
            <div className='col-4 col-md-2 d-flex justify-content-between'>
              Symbol
              {/* <span>|</span> */}
            </div>
            <div className='col-4 col-md-6 d-flex justify-content-between'>
              TL;DR
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
