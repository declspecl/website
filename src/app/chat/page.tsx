import { cookies } from "next/headers";

export default async function ChatPage() {
    const accessToken = (await cookies()).get("accessToken")!.value;

    return (
        <div>
            {accessToken}
        </div>
    )
}