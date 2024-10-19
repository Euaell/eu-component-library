import { twMerge } from "tailwind-merge";

interface TestimonialsProps {
  children: Readonly<React.ReactNode>;
  className?: string;
  [key: string]: any;
}

export default function Testimonials({ children, className, ...rest}: TestimonialsProps): React.ReactElement {
	return (
		<div className={twMerge(
				'',
				className
			)}
			{...rest}
		>
			<div className="flex flex-col md:flex-row">
				{/* TODO: Image if available */}
				

				{/* TODO: the rest of the text testimonial */}
			</div>
			{children}
		</div>
	)
}
