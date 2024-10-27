import { supabase } from './client';

export const getUserSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
  if (error) console.error('Error de autenticación:', error.message);
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut({});
  if (error) {
    console.error('Error al cerrar sesión:', error.message);
    return false;
  }
  return true;
};

