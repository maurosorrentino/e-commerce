import '../styles/globals.css';
import ErrorBoundary from '../components/FormErrors';

function MyApp({ Component, pageProps }) {

  return (
  
    <Component {...pageProps} />

  )
}

export default MyApp;