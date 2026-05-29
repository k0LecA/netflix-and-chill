import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function SignoutButton() {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [isPending,setIsPending] = useState(false)

    const handleSignout=async() => {
        setIsPending(true);
        await signOut();
        navigate("/login", { replace: true });
        setIsPending(false);
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleSignout}
            disabled={isPending}
        >
            {isPending ? "Signing out..." : "Log out"}
        </Button>
    )
}