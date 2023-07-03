import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Provider } from 'next-auth/client'
import { SupabaseProvider } from '@supabase/supabase-js'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <SupabaseProvider client={supabase}>
      <Provider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </SupabaseProvider>
  )
}

export default MyApp