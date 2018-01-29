import { Component } from 'react'
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
        <div className='row coin'>
          <div className='col-2 d-flex justify-content-between'>
            <strong>{list.name}</strong>
            <span>|</span>
          </div>
          <div className='col-2 d-flex justify-content-between'>
            {list.symbol}
            <span>|</span>
          </div>
          <div className='col-6'>
            {list.submitted_definitions[0].text}
          </div>
          <style jsx>{`
            .coin {
              font-size: 14px;
            }
          `}</style>
        </div>
      ))
  }

  render () {
    return (
      <Layout>
        <div className='container'>
          <div className='row header pb-2 mb-2'>
            <div className='col-2 d-flex justify-content-between'>
              Name
              <span>|</span>
            </div>
            <div className='col-2 d-flex justify-content-between'>
              Symbol
              <span>|</span>
            </div>
            <div className='col-6 d-flex justify-content-between'>
              TLDR.
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
