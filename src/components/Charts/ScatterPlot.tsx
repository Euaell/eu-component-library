import React from 'react';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { twMerge } from 'tailwind-merge';
import { Circle } from '@visx/shape';

interface DataPoint {
	x: number | Date;
	y: number;
	[key: string]: any;
}

interface ScatterPlotProps {
	data: DataPoint[];
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
	xAccessor?: (d: DataPoint) => number | Date;
	yAccessor?: (d: DataPoint) => number;
	xScaleType?: 'time' | 'linear';
	pointColor?: string;
	pointSize?: number;
	className?: string;
	children?: React.ReactNode;
}

export default function ScatterPlot({
	data,
	width,
	height,
	margin = { top: 20, right: 30, bottom: 50, left: 40 },
	xAccessor = (d) => d.x,
	yAccessor = (d) => d.y,
	xScaleType = 'linear',
	pointColor = '#EF4444', // Tailwind red-500
	pointSize = 5,
	className,
	children,
}: ScatterPlotProps): React.ReactElement{
	// Calculate inner width and height
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Define scales
	const xScale =
		xScaleType === 'time'
		? scaleTime<number>({
				range: [0, innerWidth],
				domain: [Math.min(...data.map((d) => xAccessor(d) as number)), Math.max(...data.map((d) => xAccessor(d) as number))],
			})
		: scaleLinear<number>({
				range: [0, innerWidth],
				domain: [Math.min(...data.map((d) => xAccessor(d) as number)), Math.max(...data.map((d) => xAccessor(d) as number))],
				nice: true,
			});

	const yScale = scaleLinear<number>({
		range: [innerHeight, 0],
		domain: [Math.min(...data.map(yAccessor)), Math.max(...data.map(yAccessor))],
		nice: true,
	})

	return (
		<svg width={width} height={height} className={twMerge('overflow-visible', className)}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				{/* Axes */}
				<AxisBottom
					top={innerHeight}
					scale={xScale}
					numTicks={width > 520 ? 10 : 5}
					stroke="#6b7280"
					tickStroke="#6b7280"
					tickLabelProps={() => ({
						fill: '#6b7280',
						fontSize: 11,
						textAnchor: 'middle',
					})}
				/>
				<AxisLeft
					scale={yScale}
					numTicks={height > 400 ? 10 : 5}
					stroke="#6b7280"
					tickStroke="#6b7280"
					tickLabelProps={() => ({
						fill: '#6b7280',
						fontSize: 11,
						textAnchor: 'end',
						dx: '-0.25em',
						dy: '0.25em',
					})}
				/>

				{/* Points */}
				{data.map((d, i) => {
					const cx = xScale(xAccessor(d)) ?? 0;
					const cy = yScale(yAccessor(d)) ?? 0;
					return <Circle key={`point-${i}`} cx={cx} cy={cy} r={pointSize} fill={pointColor} />;
				})}

				{/* Additional children (e.g., tooltips) */}
				{children}
			</g>
		</svg>
	)
}
