import Layout from '../components/Layout'
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar"
import { StateContext } from "../context/StateContext"
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {

  

  
  return (
    <>
      <NextNProgress height={3} />
      <Toaster/>
      <StateContext><Layout><Component {...pageProps} /></Layout>
      </StateContext>
    </>
  )
}

export default MyApp
