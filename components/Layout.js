import Head from 'next/head'
import { IndexHeader, CoinsPicker } from '../components'

export default ({ children }) => (
  <div>
    <Head>
      <title>What's THAT COIN?</title>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous' />
    </Head>
    <div className='py-5'>
      <div className='container'>
        <IndexHeader />

        <div className='row justify-content-center'>
          <div className='col-6'>
            <CoinsPicker />
          </div>
        </div>
      </div>

      {children}
    </div>
  </div>
)