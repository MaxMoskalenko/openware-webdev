import { Auth } from "@supabase/ui";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import KYC from "../components/KYC";
import { func } from "prop-types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)




const Container = (props) => {
  function handleSignOut() {
    props.supabaseClient.auth.signOut();
  }

  const session = supabase.auth.session();
  const { user } = Auth.useUser();

  // const { user, session, error } = await supabase.auth.signIn({
  //   email: 'example@email.com',
  //   password: 'example-password',
  // })

  if (user)
    return (
      <KYC key={session.user.id} session={session} handleSignOut={handleSignOut} />
    );
  return props.children;
};

export default function AuthComponent() {
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase}>
          <Auth providers={['google']} supabaseClient={supabase} />
        </Container>
      </Auth.UserContextProvider>
    </div>
  );
};