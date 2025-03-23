import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";


export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Get Started Section */}
            <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted px-4 text-center pt-14">
                <div className="space-y-6 max-w-4xl">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        Duck Duck Code
                    </h1>
                    <p className="text-muted-foreground text-lg sm:text-xl max-w-[900px] mx-auto">
                        Code smarter, not harder. Effortless coding is here. <br />
                        Our AI DevTool simplifies coding for everyone, tech or not. <br />
                        Connect your Git repo, let it work its magic, and review changes before committing. <br />
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link href="/chat">
                                Get Started
                            </Link>
                        </Button>
                        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link href="/hello">
                                Say Hello
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* About Section*/}
            <section className="py-20 px-4 bg-background" id="about">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-10 text-center">
                        About Our Platform
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center text-center space-y-4 w-full">
                            <div className="bg-primary/20 p-4 rounded-full">
                                <span className="text-primary font-bold text-xl">1</span>
                            </div>
                            <h3 className="text-xl font-bold">Code Smarter, Ship Faster</h3>
                            <p className="text-muted-foreground"> The AI-powered devtool that accelerates product development.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 w-full">
                            <div className="bg-primary/20 p-4 rounded-full">
                                <span className="text-primary font-bold text-xl">2</span>
                            </div>
                            <h3 className="text-xl font-bold">PRs at the Speed of Thought</h3>
                            <p className="text-muted-foreground"> Login, select a repo, and use human language to instantly generate pull requests.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 w-full">
                            <div className="bg-primary/20 p-4 rounded-full">
                                <span className="text-primary font-bold text-xl">3</span>
                            </div>
                            <h3 className="text-xl font-bold">Stop the Wild Goose Chase</h3>
                            <p className="text-muted-foreground"> Quit ducking around chasing geese, use DuckDuckCode.</p>
                        </div>
                    </div>
                </div>
            </section>

        {/* Footer */}
        <footer className="py-10 px-4 border-t">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-sm text-muted-foreground">© 2025 DuckDuckGo. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
  )
}