import "server-only";

import { LucideGithub } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function LoginPage() {
    const clientId = "Iv23liqvu5cGEtM5aQcC";

    return (
        <div className="w-full h-[100dvh] flex flex-col items-center justify-center">
            <Card className="w-1/2 flex flex-col items-center justify-center gap-4 p-8">
                <h1 className="text-4xl font-semibold">Login to DuckDuckCode</h1>

                <Button className="inline-flex flex-row gap-2" asChild>
                    {/*<a href="https://github.com/apps/duckduckcode-tech/installations/new">*/}
                    <a href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}>
                        <LucideGithub className="w-4 h-4" />
                        <p>Login with Github</p>
                    </a>
                </Button>
            </Card>
        </div>
    );
}
