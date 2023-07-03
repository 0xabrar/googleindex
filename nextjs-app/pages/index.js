```javascript
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar session={session} />
      <main className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Next.js App
          </h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('id', { ascending: false });

  if (error) console.log('Error: ', error);

  return {
    props: {
      posts,
    },
  };
}
```