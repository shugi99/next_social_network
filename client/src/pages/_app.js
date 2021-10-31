import Layout from '../components/layout'
import NextNProgress from 'nextjs-progressbar'
import '../styles/globals.scss'
import DataProvider from '@context/store/store'
import Alert from '@components/alert'
import Init from '@components/init'

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <NextNProgress
        color="#6366f1"
        height={4}
        options={{
          easing: 'ease',
          speed: 200,
          minimum: 0.4,
          trickleRate: 0.02,
          trickleSpeed: 800,
        }}
      />

      <Layout>
        <Init>
          <Alert />
          <Component {...pageProps} />
        </Init>
      </Layout>
    </DataProvider>
  )
}

export default MyApp
