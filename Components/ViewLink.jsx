'use client';
import Link from 'next/link';

export default function ViewLink({ href, children, ...props }) {
    return (
        <Link href={href} prefetch={false} {...props}>
            {children}
        </Link>
    );
}
