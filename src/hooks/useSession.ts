import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import { getUserSession } from '@/utils/supabase/authServer';

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [load, setLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await getUserSession();
      if (!userSession) {
        router.push('/login');
      } else {
        setSession(userSession);
      }
      setLoad(false);
    };
    checkSession();
  }, [router]);

  return { session, load };
};

export default useSession;
