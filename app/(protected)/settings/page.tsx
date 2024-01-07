import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
    const session = await auth();
    return (
        <div>
            <code>
                {JSON.stringify(session)}
            </code>
            <form action={async () => {
                "use server"
                await signOut();
            }}>
                <Button type="submit" size={"lg"} variant={"destructive"}>Sair</Button>
            </form>
        </div>
    );
}

export default SettingsPage;