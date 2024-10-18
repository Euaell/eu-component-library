import { twJoin, twMerge } from "tailwind-merge";

interface CardProps {
	children: Readonly<React.ReactNode>;
	title: Readonly<string>;
	icon?: Readonly<React.ReactNode>;
	// iconPosition?: 'top' | 'bottom' | 'left' | 'right';
	iconBgColor?: string;
	className?: string;
	[x: string]: any;
}

export default function Card({ children, className, title, icon, iconBgColor = '#3F75FE', ...rest }: CardProps) {
	return (
		<div className={twMerge(
				'relative inline-flex flex-col p-8 m-7 bg-white min-w-56 max-w-96 rounded-lg shadow-sm transition-shadow duration-200 hover:shadow-xl',
				className
			)} 
			{...rest}
		>
			{/* An absolutely positioned rectangular container for the icon */}
			{icon && 
				<div className="absolute flex items-center justify-center left-0 top-0 w-full h-fit">
					<div
                        className='relative p-2 w-12 h-12 flex items-center justify-center rounded-lg -top-6 shadow-xl'
                        style={{ backgroundColor: iconBgColor}}
                    >
						{icon}
					</div>
				</div>
			}

			<div className={twJoin('flex items-center py-5', icon ? '' : 'pt-0')}>
				<h1 className='text-xl font-bold text-[#111827] w-full text-center'>{title}</h1>
			</div>
			<div className="text-[#6B7280] text-center">
				{children}
			</div>
		</div>
	)
}
