import { Component } from 'react'
import { Layout } from '../components'
import APIService from '../utils/APIService'

export default class extends Component {
  componentDidMount () {
    APIService.getIntroLists()
      .then(res => console.log(res))
  }

  render () {
    return (
      <Layout>
        <div className='container'>example</div>
      </Layout>
    )
  }
}
