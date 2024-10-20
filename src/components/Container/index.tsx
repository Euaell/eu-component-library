import { twMerge } from "tailwind-merge";

interface ContainerProps {
    children: React.ReactNode;
    background?: string;
    className?: string;
    [key: string]: any;
}


// TODO: 1. Accept an optional background image that is put as the background image of the container
export default function Container({ children, className, background, ...rest }: ContainerProps): React.ReactElement {
    return (
        <div className={twMerge(
                "container mx-auto px-4",
                className
            )}
            {...rest}
        >
            {children}
        </div>
    )
}
