import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { RouterProvider } from 'react-aria-components'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider navigate={router.push}>
        <Component {...pageProps} />
      </RouterProvider>
    </QueryClientProvider>
  )
}

export default MyApp
