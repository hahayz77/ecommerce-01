import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Layout } from "./components"
import { StateContext } from "./context/StateContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout> 
        <Component {...pageProps} />
      </Layout>
      <Toaster/>
    </StateContext>
  )
}
