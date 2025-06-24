'use client';
import { useRouter } from 'next/navigation';

export default function ViewLink({ href, children, delay, ...props }) {
    const router = useRouter();

    const handleClick = async (e) => {
        e.preventDefault(); // Stop default navigation
        if (delay) {
            setTimeout(async () => {
                if (document.startViewTransition) {
                    const transition = document.startViewTransition(() => {
                        router.push(href);
                    });

                    await transition.finished;
                } else {
                    router.push(href);
                }
            }, delay);
        } else {
            if (document.startViewTransition) {
                const transition = document.startViewTransition(() => {
                    router.push(href);
                });

                await transition.finished;
            } else {
                router.push(href);
            }
        }
    };

    return (
        <a href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}
