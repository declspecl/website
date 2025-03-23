import { LucideGithub } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
    const clientId = "Iv23liqvu5cGEtM5aQcC";

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-8">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome to DuckDuckCode</h1>
                    <p className="text-sm text-muted-foreground">Login with your GitHub account to continue.</p>
                </div>

                    {/*href="https://github.com/apps/duckduckcode-tech/installations/new"*/}
                <a
                    href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}
                    className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                    <LucideGithub className="mr-2 h-4 w-4" />
                    Login with GitHub
                </a>
            </Card>
        </div>
    );
}
