import { Component } from 'react'
import { IndexHeader, Layout, CoinsPicker } from '../components'

export default class extends Component {
  render () {
    return (
      <Layout>
        <div className='container'>
          <IndexHeader />

          <div className='row justify-content-center'>
            <div className='col-6'>
              <CoinsPicker />
            </div>
          </div>

        </div>
      </Layout>
    )
  }
}
