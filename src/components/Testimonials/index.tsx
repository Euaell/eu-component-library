import React from 'react';
import { twMerge } from "tailwind-merge";

interface TestimonialProps {
    image: string;
    quote: string;
    author: string;
    position: string;
    className?: string;
    bgColor?: string;
    [key: string]: any;
}

export default function Testimonial({ image, quote, author, position, className, bgColor = '#2563EB', ...rest }: TestimonialProps): React.ReactElement {
    return (
        <div className={twMerge(
                "relative m-2 flex flex-col md:flex-row overflow-hidden min-w-fit max-w-2xl",
                className
            )}
            style={{ backgroundColor: bgColor }}
            {...rest}
        >
            <div className="md:w-1/3 z-10">
                <img 
                    src={image} 
                    alt={author} 
                    className="w-full h-auto md:absolute md:top-0 md:left-0 md:h-full md:w-auto object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
                <blockquote className="text-white text-lg md:text-xl mb-4 relative">
                    <span className="absolute -left-4 -top-2 text-4xl opacity-50">"</span>
                    {quote}
                </blockquote>
                <div>
                    <p className="text-white font-bold">{author}</p>
                    <p className="text-white opacity-75">{position}</p>
                </div>
            </div>
        </div>
    )
}
