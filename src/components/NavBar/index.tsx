import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export interface NavBarProps {
	logo?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
}

export default function NavBar({ logo, className, children }: NavBarProps): React.ReactElement {
	const [isTransparent, setIsTransparent] = useState(true);

	useEffect(() => {
		// Adjust this logic based on your needs
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsTransparent(scrollPosition < 100);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [])

	return (
		<nav
			className={twMerge(
				'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
				isTransparent ? 'bg-transparent text-white' : 'bg-white dark:bg-gray-800 text-black shadow-md',
				className,
			)}
		>
			{/* Gradient Shadow Effect */}
			{isTransparent && (
				<div
					className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent pointer-events-none"
				></div>
			)}
			<div className="relative container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{logo && (
						<div className="flex items-center">
							{logo}
						</div>
					)}
					<div className="flex items-center">
						{children}
					</div>
				</div>
			</div>
		</nav>
	)
}
