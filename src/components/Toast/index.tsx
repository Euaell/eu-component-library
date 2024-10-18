
interface ToastProps {
    children: Readonly<React.ReactNode>;
    className?: string;
}

export default function Toast({ children, className }: ToastProps): React.ReactElement {
    return (
        <div className="text-3xl">
            <h1 className="text-red-500">Toast</h1>
            {children}
        </div>
    )
}
