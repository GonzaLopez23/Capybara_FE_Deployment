import { useRouter } from 'next/router';
import React, { ReactElement } from 'react'

const Index = ():ReactElement => {
  
    const router = useRouter();

    const handleToekn = () => {
        if (!sessionStorage.getItem('auth-token')) {
        console.log('no auth token set');
        router.push("/login");
        } else {
            const authToken = '123456abcdef';
            if (sessionStorage.getItem('auth-token') == authToken) {
                alert('good token. Log in.')
            } else {
                console.log('bad token.')
                router.push("/login");
            }
        }
    }
  
    return (
    <div>index</div>
  )
}

export default Index