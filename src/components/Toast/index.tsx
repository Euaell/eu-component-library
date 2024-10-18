import { twMerge } from "tailwind-merge";

interface ToastProps {
    children: Readonly<React.ReactNode>;
    className?: string;
    
}

export default function Toast({ children, className }: ToastProps): React.ReactElement {
    return (
        <div className={twMerge(
            "rounded-md border border-gray-300 bg-white p-4 min-w-fit w-56 m-3",
            className
        )}>
            <h1 className="underline ">Toast</h1>
            {children}
        </div>
    )
}
