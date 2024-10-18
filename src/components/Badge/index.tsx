import { twJoin, twMerge } from "tailwind-merge";

interface BadgeProps {
    children: string;
    className?: string;
    variant?: 'square' | 'pill';
    color?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
}

const colors = {
    gray: 'bg-[#F3F4F6] text-[#1F2937]',
    red: 'bg-[#FEE2E2] text-[#991B1B]',
    yellow: 'bg-[#FEF3C7] text-[#92400E]',
    green: 'bg-[#D1FAE5] text-[#065F46]',
    blue: 'bg-[#DBEAFE] text-[#1E40AF]',
    indigo: 'bg-[#E0E7FF] text-[#3730A3]',
    purple: 'bg-[#EDE9FE] text-[#5B21B6]',
    pink: 'bg-[#FCE7F3] text-[#9D174D]',
}

export default function Badge({ children, className, variant = 'square', color = 'gray' }: BadgeProps): React.ReactElement {
    return (
        <div className={twMerge(
            twJoin(
                "p-1 px-2 text-sm min-w-fit m-1 inline-block",
                variant === 'square' ? 'rounded-md' : 'rounded-l-full rounded-r-full',
                colors[color],
            ),
            className
        )}>
            {children}
        </div>
    )
}
