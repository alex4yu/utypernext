import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";


const NotFound = () => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 3000)
    }, [])
    return ( 
        <div className = "notFound">
            <h1 >Error</h1>
            <h2>Page could not be found</h2>
            <p>Back to <Link href = "/">Homepage</Link></p>
        </div>
    )
}


export default NotFound;