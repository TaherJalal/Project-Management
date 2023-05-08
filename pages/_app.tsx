import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ParallaxProvider } from 'react-scroll-parallax';
import {QueryClientProvider , QueryClient} from "@tanstack/react-query"

export default function App({ Component, pageProps }: AppProps) {
  const clientProvider = new QueryClient()
  return (
    <QueryClientProvider client={clientProvider}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
