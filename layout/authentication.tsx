import { useAuth } from '@/hooks/useAuth';
import React from 'react';

export default function Authentication({ children }: { children: React.ReactNode }) {
    const { isLoading, isAuthenticated } = useAuth()

    if (isLoading) {
        <div>Loading...</div>
    }

    return isAuthenticated ? <>{children}</> : null
}