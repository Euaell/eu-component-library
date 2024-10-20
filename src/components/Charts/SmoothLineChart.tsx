import React from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { twMerge } from 'tailwind-merge';
import { curveMonotoneX } from '@visx/curve';

interface DataPoint {
	x: number | Date;
	y: number;
	[key: string]: any;
}

interface SmoothLineChartProps {
	data: DataPoint[];
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
	xAccessor?: (d: DataPoint) => number | Date;
	yAccessor?: (d: DataPoint) => number;
	xScaleType?: 'time' | 'linear';
	strokeColor?: string;
	strokeWidth?: number;
	className?: string;
	showGrid?: boolean;
	children?: React.ReactNode;
}

export default function SmoothLineChart({
	data,
	width,
	height,
	margin = { top: 20, right: 30, bottom: 50, left: 40 },
	xAccessor = (d) => d.x,
	yAccessor = (d) => d.y,
	xScaleType = 'linear',
	strokeColor = '#2563EB', // Default Tailwind blue-600
	strokeWidth = 2,
	className,
	showGrid = true,
	children,
}: SmoothLineChartProps): React.ReactElement {
	// Calculate inner width and height
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Define scales
	const xScale =
		xScaleType === 'time'
		? scaleTime<number>({
				range: [0, innerWidth],
				domain: [
					Math.min(...data.map((d) => +xAccessor(d))),
					Math.max(...data.map((d) => +xAccessor(d))),
				],
			})
		: scaleLinear<number>({
				range: [0, innerWidth],
				domain: [
					Math.min(...data.map((d) => +xAccessor(d))),
					Math.max(...data.map((d) => +xAccessor(d))),
				],
			});

	const yScale = scaleLinear<number>({
		range: [innerHeight, 0],
		domain: [
			Math.min(...data.map(yAccessor)) - 1,
			Math.max(...data.map(yAccessor)) + 1,
		],
		nice: true,
	})

	return (
		<svg width={width} height={height} className={twMerge('overflow-visible', className)}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				{/* Optional Grid */}
				{showGrid && (
					<>
						<GridRows
							scale={yScale}
							width={innerWidth}
							height={innerHeight}
							stroke="#e5e7eb"
						/>
						<GridColumns
							scale={xScale}
							width={innerWidth}
							height={innerHeight}
							stroke="#e5e7eb"
						/>
					</>
				)}

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

				{/* Smooth Line */}
				<LinePath<DataPoint>
					data={data}
					x={(d) => xScale(+xAccessor(d)) ?? 0}
					y={(d) => yScale(yAccessor(d)) ?? 0}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					curve={curveMonotoneX}
				/>

				{/* Additional children (e.g., tooltips) */}
				{children}
			</g>
		</svg>
	)
}
