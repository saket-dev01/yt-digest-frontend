"use client";
import { signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation';
import { useSession } from "next-auth/react";
export default function Page() {
    const session = useSession();

    if (session.data?.user) {
        redirect('/convert');
    }

    return <div>
        <button onClick={() => signIn()}>Signin</button>
        <button onClick={() => signOut()}>Sign out</button>
        <div>
            Welcome {session.data?.user ? session.data?.user.name : "User!"}
        </div>
    </div>
}