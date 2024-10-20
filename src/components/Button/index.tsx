
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    className?: string;
    children: Readonly<React.ReactNode>;
};

export default function Button({ children, className }: ButtonProps): React.ReactElement {
    return (
        <button className={twMerge(
            "p-2 px-4 text-sm rounded-md shadow-sm",
            className
        )}>
            {children}
        </button>
    );
}
