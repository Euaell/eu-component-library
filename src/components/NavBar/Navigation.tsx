
import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface NavMenuProps {
	children: React.ReactNode;
	className?: string;
}

export function NavMenu({ children, className }: NavMenuProps): React.ReactElement {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	function toggleMobileMenu(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();
		setIsMobileMenuOpen((prev) => !prev);
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
		document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [])

	return (
		<div className={twMerge(className)}>
			<div className="flex items-center justify-between p-4 uppercase font-medium">
				{/* Hamburger Button */}
				<button
					type="button"
					className="inline-flex items-center p-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
					aria-controls="mobile-menu"
					aria-expanded={isMobileMenuOpen}
					onClick={toggleMobileMenu}
				>
					<span className="sr-only">Open main menu</span>
					{isMobileMenuOpen ? (
						/* "X" Icon */
						<svg
							className="w-6 h-6 pointer-events-none"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 
								0L10 8.586l4.293-4.293a1 1 0 011.414
								1.414L11.414 10l4.293
								4.293a1 1 0 01-1.414 1.414L10
								11.414l-4.293 4.293a1 1 0
								01-1.414-1.414L8.586 10 4.293
								5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						/* Hamburger Icon */
						<svg
							className="w-6 h-6 pointer-events-none"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M3 5h14a1 1 0
								100-2H3a1 1 0 000
								2zm14 4H3a1 1 0
								000 2h14a1 1 0 100-2zm0
								6H3a1 1 0 000 2h14a1 1 0 100-2z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</button>

				{/* Navigation Links */}
				<div
					id="mobile-menu"
					ref={mobileMenuRef}
					className={twMerge(
						'w-full md:flex md:items-center md:w-auto',
						isMobileMenuOpen ? 'block' : 'hidden',
					)}
				>
					<ul className="flex flex-col mt-4 md:flex-row md:mt-0 md:space-x-4">
						{children}
					</ul>
				</div>
			</div>
		</div>
	)
}

interface NavItemProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function NavItem({ href, children, className, onClick }: NavItemProps): React.ReactElement {
	return (
		<li>
			<a
				href={href}
				className={twMerge(
					'block py-2 px-3 text-sky-700 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-600',
					'border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0',
					'dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700',
					className,
				)}
				onClick={onClick}
			>
				{children}
			</a>
		</li>
	)
}

interface NavDropdownProps {
	title: string;
	children: React.ReactNode;
	buttonClassName?: string;
	className?: string;
}

export function NavDropdown({ title, children, buttonClassName, className }: NavDropdownProps): React.ReactElement {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement>(null);

	function toggleDropdown(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		}
	}, [])

	return (
		<li className='relative' ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className={twMerge(
					'flex items-center justify-between w-full md:w-auto py-2 px-3',
					'text-sky-700 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-600',
					'border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0',
					'md:p-0 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700',
					buttonClassName
				)}
			>
				{title}
				<svg
					className={twMerge('w-2.5 h-2.5 ms-3 transition-transform', isOpen ? 'rotate-180' : '')}
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>
			{isOpen && (
				<div
					className={twMerge(
						'absolute z-10 left-0 mt-2 w-auto min-w-max text-sm bg-white rounded-md shadow-md',
						'dark:border-gray-700 dark:bg-gray-700',
						className,
					)}
				>
					<div className="p-4">
						<ul className="space-y-2">
							{children}
						</ul>
					</div>
				</div>
			)}
		</li>
	)
}
