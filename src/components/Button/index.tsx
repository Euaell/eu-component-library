
interface ButtonProps {
    children: Readonly<React.ReactNode>;
}

export default function Button({ children }: ButtonProps): React.ReactElement {
    return (
        <button>
            {children}
        </button>
    )
}
