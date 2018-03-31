import Head from 'next/head'
import { IndexHeader, CoinsPicker } from '../components'

export default ({ children }) => (
  <div>
    <Head>
      <title>Coin Shills LOL</title>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous' />
    </Head>
    <div className='py-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <IndexHeader />
          </div>
        </div>

        {children}
      </div>
      <style jsx global>{`
        body {
          background-color: #fafafa;
        }
      `}
      </style>
    </div>
  </div>
)
