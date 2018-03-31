import Head from 'next/head'
import { IndexHeader, CoinsPicker } from '../components'
import withAnalytics from './hocs/withAnalytics';

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Coin Shills LOL</title>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous' />
      <link rel="icon" type="image/png" href="/static/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/static/favicon-16x16.png" sizes="16x16" />
      <meta property="og:url" content="https://shills.lol" />
      <meta property="og:image" content="https://shills.lol/static/lol.png" />
    </Head>
    <div className='py-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <IndexHeader />
          </div>
        </div>
        <div className='dashed' />

        {children}
      </div>
      <style jsx global>{`
        body {
          background-color: #fafafa;
        }
        .dashed {
            border-bottom: 1px dashed #000;
          }
      `}
      </style>
    </div>
  </div>
)

export default withAnalytics(Layout)
