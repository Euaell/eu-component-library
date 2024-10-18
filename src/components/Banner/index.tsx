import { twJoin, twMerge } from "tailwind-merge";
import info from './info.svg';
import error from './error.svg';
import success from './success.svg';
import warning from './warning.svg';

interface BannerProps {
	title: string;
	children?: string;
	className?: string;
	status?: 'info' | 'success' | 'warning' | 'error';
    [x: string]: any;
}

const colors = {
	error: {
		main_container: 'bg-[#FEF2F2] text-[#B45309]',
		title_container: 'text-[#92400E]',
		icon: error,
	},
	warning: {
		main_container: 'bg-[#FFFBEB] text-[#B45309]',
		title_container: 'text-[#92400E]',
		icon: warning,
	},
	success: {
		main_container: 'bg-[#ECFDF5] text-[#047857]',
		title_container: 'text-[#065F46]',
		icon: success,
	},
	info: {
		main_container: 'bg-[#EFF6FF] text-[#1C51B9]',
		title_container: 'text-[#1E40AF]',
		icon: info,
	},
}

export default function Banner({ title, children, className, status = 'info', ...rest }: BannerProps): React.ReactElement {

	return (
		<div className={twMerge(
			twJoin(
				"p-2 px-4 text-sm w-fit max-w-lg m-3 flex-wrap rounded-sm shadow-sm",
				colors[status].main_container,
			),
			className
		)} {...rest}>
			<div className={twJoin(
				"text-base font-semibold",
				colors[status].title_container,
			)}>
				{/* icon */}
				<img src={colors[status].icon} alt={`${status} icon`} className="w-4 h-4 inline-block mr-1 mb-1" />
				<h1 className="inline-block">
					{title}
				</h1>
			</div>
			{children}
		</div>
	)
}
