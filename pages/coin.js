import { Component } from 'react'
import { Layout } from '../components'

export default class extends Component {
  render () {
    return (
      <Layout>
        <h1>{this.props.url.query.symbol}</h1>
      </Layout>
    )
  }
}
