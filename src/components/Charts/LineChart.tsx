
import React from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { twMerge } from 'tailwind-merge';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';

import { useTooltipHelper } from './hooks/useTooltipHelper';

interface DataPoint {
	x: number | Date;
	y: number;
	[key: string]: any;
}

interface LineChartProps {
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
	children?: Readonly<React.ReactNode>;
}

export default function LineChart({
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
}: LineChartProps): React.ReactElement {
	// Calculate inner width and height
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Define scales
	const xScale =
		xScaleType === 'time'
		? scaleTime<number>({
				range: [0, innerWidth],
				domain: [Math.min(...data.map(d => xAccessor(d) as number)), Math.max(...data.map(d => xAccessor(d) as number))],
			})
		: scaleLinear<number>({
				range: [0, innerWidth],
				domain: [Math.min(...data.map(d => xAccessor(d) as number)), Math.max(...data.map((d) => xAccessor(d) as number))],
			});

	const yScale = scaleLinear<number>({
		range: [innerHeight, 0],
		domain: [Math.min(...data.map(d => yAccessor(d) as number)), Math.max(...data.map(d => yAccessor(d) as number))],
		nice: true,
	});

	// Use the custom hook for tooltip
	const { tooltipData, tooltipLeft, tooltipTop, handleTooltip, hideTooltip } =
		useTooltipHelper({
			data,
			xAccessor,
			yAccessor,
			xScale,
			yScale,
			margin,
		});

	return (
		<>
			<svg width={width} height={height} className={twMerge('overflow-visible', className)}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					{/* Optional Grid */}
					{showGrid && (
						<>
							<GridRows scale={yScale} width={innerWidth} height={innerHeight} stroke="#e5e7eb" />
							<GridColumns scale={xScale} width={innerWidth} height={innerHeight} stroke="#e5e7eb" />
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

					{/* Line */}
					<LinePath<DataPoint>
						data={data}
						x={(d) => xScale(xAccessor(d)) ?? 0}
						y={(d) => yScale(yAccessor(d)) ?? 0}
						stroke={strokeColor}
						strokeWidth={strokeWidth}
					/>

					{/* Additional children (e.g., tooltips) */}
					{children}
				</g>

				{/* Overlay to capture mouse events */}
				<rect
					width={innerWidth}
					height={innerHeight}
					fill="transparent"
					transform={`translate(${margin.left},${margin.top})`}
					onMouseMove={handleTooltip}
					onMouseLeave={() => hideTooltip()}
				/>
			</svg>

			{/* Tooltip */}
			{tooltipData && (
				<TooltipWithBounds
					top={tooltipTop}
					left={tooltipLeft}
					style={{
						...defaultStyles,
						backgroundColor: 'rgba(0, 0, 0, 0.75)',
						color: 'white',
					}}
				>
					<div>
						<strong>
							x:{' '}
							{xAccessor(tooltipData) instanceof Date
								? (xAccessor(tooltipData) as Date).toLocaleDateString()
								: xAccessor(tooltipData) as number
							}
						</strong>
					</div>
					<div>y: {yAccessor(tooltipData)}</div>
				</TooltipWithBounds>
			)}
		</>
	)
}