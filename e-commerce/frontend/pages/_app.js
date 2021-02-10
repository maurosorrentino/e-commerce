import '../styles/globals.css';
import { InMemoryCache, ApolloClient } from '@apollo/client';
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({

  uri: `http://localhost:8080`,
  cache: new InMemoryCache(),

});

function MyApp({ Component, pageProps }) {

  return (
  
    <ApolloProvider client={client}>
  
      <Component {...pageProps} />

    </ApolloProvider>

  )
}

export default MyApp;