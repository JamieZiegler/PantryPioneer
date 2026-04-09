import { supabase } from "./supabaseClient";

async function reauthenticate(currentPassword) {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user?.email) {
        return { error: new Error("No authenticated user found.") };
    }
    return supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
    });
}

export async function updateAccountEmail(currentPassword, newEmail) {
    const { error } = await reauthenticate(currentPassword);
    if (error) {
        return { error };
    }
    return supabase.auth.updateUser({ email: newEmail });
}

export async function updateAccountPassword(currentPassword, newPassword) {
    const { error } = await reauthenticate(currentPassword);
    if (error) {
        return { error };
    }
    return supabase.auth.updateUser({ password: newPassword });
}

export async function requestAccountDeletion() {
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;

    if (!user?.email) {
        return { error: new Error("No authenticated user found.") };
    }

    return supabase.from("account_deletion_requests").insert({
        user_id: user.id,
        email: user.email,
        status: "pending",
    });
}