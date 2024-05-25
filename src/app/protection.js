"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function withAuth(Component) {
    const displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

    const WithAuthComponent = (props) => {
        const [indi, setIndi] = useState(false);
        const router = useRouter();

        useEffect(() => {
            if (typeof window !== 'undefined') {
                const token = window.localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                } else {
                    setIndi(true)
                }
            }
        }, [router]);
        if (indi) {
            return <Component {...props} />;
        } else {
            return null;
        }

    };

    WithAuthComponent.displayName = displayName;

    return WithAuthComponent;
}
