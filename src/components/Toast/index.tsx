
interface ToastProps {
    children: Readonly<React.ReactNode>;
    className?: string;
}

export default function Toast({ children, className }: ToastProps): React.ReactElement {
    return (
        <div className="">
            <h1 className="underline ">Toast</h1>
            {children}
        </div>
    )
}
