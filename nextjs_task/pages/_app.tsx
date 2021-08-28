import type { AppProps } from 'next/app'

import '../styles/signin.css';
import '../styles/forecast.css';
import '../styles/landing.css';
import '../styles/landing-dropdown.css';
import '../styles/landing-form.css';
import '../styles/landing-header.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
