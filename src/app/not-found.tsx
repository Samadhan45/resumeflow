import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground space-y-4">
            <h2 className="text-2xl font-bold">Not Found</h2>
            <p className="text-muted-foreground">Could not find requested resource</p>
            <Link href="/">
                <Button variant="default">Return Home</Button>
            </Link>
        </div>
    )
}
