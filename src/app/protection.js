import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(Component) {
    const displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

    const WithAuthComponent = (props) => {
        const router = useRouter();

        useEffect(() => {
            if (typeof window !== 'undefined') {
                const token = window.localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                }
            }
        }, []);

        if (typeof window === 'undefined') {
            return  <div className="max-w-[2000px] relative mx-auto"></div>;
        }

        const token = window.localStorage.getItem('token');
        if (!token) return null;
        return <Component {...props} />;
    };

    WithAuthComponent.displayName = displayName;

    return WithAuthComponent;
}
