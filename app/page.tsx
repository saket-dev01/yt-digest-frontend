"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useSession } from "next-auth/react";
export default function Component() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleClick = async  (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (status === "authenticated") {
            router.push("/convert");
        } else {
            await signIn(undefined, { callbackUrl: '/convert' });
        }
    };
    return (
        <div className="flex flex-col min-h-[100dvh]">

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Unlock the Power of YouTube for Studying
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        YT Digest helps students create concise notes from YouTube videos, making it easier to study and
                                        retain information.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        onClick={handleClick}
                                    >
                                        Get Started
                                    </Button>
                                    <Link
                                        href="#"
                                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                        prefetch={false}
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            {/* <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              /> */}
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Streamline Your Studying with YT Digest
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    YT Digest makes it easy to create concise notes from YouTube videos, so you can focus on learning and
                                    retaining information.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <ul className="grid gap-6">
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Effortless Note-Taking</h3>
                                            <p className="text-muted-foreground">
                                                Quickly create concise notes from any YouTube video with our easy-to-use interface.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Personalized Summaries with Quizzes</h3>
                                            <p className="text-muted-foreground">
                                                At the end of each summary, you will find a quiz designed to test your understanding.
                                            </p>

                                        </div>
                                    </li>
                                    <h3 className="text-xl font-bold">AI-Powered Notes</h3>
                                    <p className="text-muted-foreground">
                                        Get smart, AI-generated summaries that focus on what matters most.
                                    </p>
                                </ul>
                            </div>
                            {/* <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              /> */}
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Hear from students who have used YT Digest to streamline their studying and improve their academic
                                    performance.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">YT Digest has been a game-changer for my studies.</h3>
                                    <p className="text-muted-foreground">
                                        I used to struggle to retain information from YouTube videos, but YT Digest has made it so much
                                        easier. Then ability to quickly create concise notes has really improved my understanding and
                                        recall.
                                    </p>
                                    <p className="text-muted-foreground">- Sarah, College Student</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">YT Digest is a must-have for any student.</h3>
                                    <p className="text-muted-foreground">
                                        I have been using YT Digest for the past semester, and it has been a game-changer. The platform is
                                        so intuitive and user-friendly, and the notes I have created have really helped me ace my exams.
                                    </p>
                                    <p className="text-muted-foreground">- Michael, High School Student</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Start Streamlining Your Studying Today
                            </h2>
                            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Sign up for YT Digest and unlock the power of YouTube for your studies.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <Button onClick={handleClick}>Get Started</Button>

                            <p className="text-xs text-muted-foreground">
                                Sign up to start creating your first note.{" "}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
                <p className="text-xs text-muted-foreground">&copy; 2024 YT Digest. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Terms of Service
                    </Link>
                    <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

function YoutubeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
        </svg>
    )
}