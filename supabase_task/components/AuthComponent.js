import { Auth, Typography, Button } from "@supabase/ui";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


const { Text } = Typography


const Container = (props) => {

    const { user, session, error } = await supabase.auth.signIn({
        email: 'example@email.com',
        password: 'example-password',
      })
    if (user)
        return (
            <>
                <Text>Signed in: {user.email}</Text>
                <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </>
        );
    return props.children;
};

export default function AuthComponent() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Auth providers={['google']} supabaseClient={supabase} />
        </Auth.UserContextProvider>
    );
};