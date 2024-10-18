import { twMerge } from "tailwind-merge";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    [x: string]: any;
}

export default function Card({ children, className, ...rest }: CardProps) {
    return (
        <div className={twMerge('inline-flex', className)} {...rest}>
            {children}
        </div>
    )
}