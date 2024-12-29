export const signInWithEmail = async ({
    email,
    supabase,
    redirect
}: {
    email: string;
    supabase: App.Supabase;
    redirect?: string | null
}) => {
    let url = ''

    if (redirect) {
        let urlParams = new URLSearchParams({
            'redirect': redirect
        })

        url = `${window.location.origin}/sign-in/callback?${urlParams.toString()}`

    } else {
        url = `${window.location.origin}/sign-in/callback`

    }

    return supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: url
        }
    });
}

export const signOut = async (supabase: App.Supabase) => {
    await supabase.auth.signOut();
};

export const getAllProducts = async (supabase: App.Supabase) => {
    const { data, error } = await supabase.from('products').select('*,reviews(*)').eq('live', true).order('id');

    if (error) {
        throw error;
    }    
    
    return data;
};

export const updateEmail = async (supabase: App.Supabase, email: string) => {
    const { data, error } = await supabase.auth.updateUser({
        email
    })

    if (error) {

        return { data: {}, error: error.message }
    }

    return { data, error: null }
}

export const verifyOtp = async (supabase: App.Supabase, otp: string, email: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
        type: "email_change",
        token: otp,
        email: email
    })

    return {
        data, error
    }
}

export const resendOtp = async (supabase: App.Supabase, email: string, type: any = 'email_change') => {
    const { data, error } = await supabase.auth.resend({
        type,
        email
    })

    return {
        data, error
    }
}

export const verifyOtpForAuth = async (supabase: App.Supabase, otp: string, email: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
        type: "magiclink",
        token: otp,
        email
    })

    return {
        data, error
    }
}