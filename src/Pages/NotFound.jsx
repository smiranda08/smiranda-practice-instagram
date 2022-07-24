import { useEffect } from 'react'

export default function NotFound() {
    useEffect(() => {
        document.title = '404 | Page Not Found'
    }, [])

    return (
        <div className="mx-auto max-w-screen-lg">
            <p className="text-center text-2xl">Not Found</p>
        </div>
    )
}
