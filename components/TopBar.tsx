"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; // Importing the Shadcn Button component
import { LogIn, LogOut } from "lucide-react"
import Link from "next/link";
export default function TopBar() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const showConvertButton = (pathname === '/' || pathname.startsWith('/video/')) && session.data?.user;

  const handleSignIn = async () => {
    await signIn(undefined, { callbackUrl: '/convert' });
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="px-8 h-14 flex items-center bg-muted">
      <Link href="/" className="flex items-center justify-center text-xl font-bold">
        YT Digest
      </Link>


      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        {showConvertButton && pathname !== '/convert' && (
          <Button
            onClick={() => router.push('/convert')}
            variant="ghost"
            className="text-sm font-medium p-2"
          >
            Convert
          </Button>
        )}
        {!session?.data ? (
          <Button
            variant="ghost"
            onClick={handleSignIn}
            title="Sign In"
            className="p-0"
          >
            <LogIn className="h-5 w-5" />
            <span className="sr-only">Sign In</span>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.data?.user?.image || ''} alt={session.data?.user?.name || 'User'} />
              <AvatarFallback>{session.data?.user?.name || 'U'}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              title="Sign Out"
              className="p-0"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign Out</span>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
