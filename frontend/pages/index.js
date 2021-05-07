import Head from 'next/head'
import React from 'react';

import Shop from '../components/Shop';

export default function Home() {
  
  return (

    <>
    
      <Head>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>My Shop</title>
        
      </Head>

      <Shop />

    </>
  )
}