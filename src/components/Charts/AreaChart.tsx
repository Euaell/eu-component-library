import React from 'react';
import { AreaClosed, LinePath } from '@visx/shape';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { twMerge } from 'tailwind-merge';
import { curveMonotoneX } from '@visx/curve';
import { useTooltipHelper } from './hooks/useTooltipHelper';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';


interface DataPoint {
	x: number | Date;
	y: number;
	[key: string]: any;
}

interface AreaChartProps {
	data: DataPoint[];
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
	xAccessor?: (d: DataPoint) => number | Date;
	yAccessor?: (d: DataPoint) => number;
	xScaleType?: 'time' | 'linear';
	areaColor?: string;
	strokeColor?: string;
	strokeWidth?: number;
	className?: string;
	showGrid?: boolean;
	children?: Readonly<React.ReactNode>;
	showTooltip?: boolean;
	tooltipContent?: (data: DataPoint) => React.ReactNode;
}

export default function AreaChart({
	data,
	width,
	height,
	margin = { top: 20, right: 30, bottom: 50, left: 40 },
	xAccessor = (d) => d.x,
	yAccessor = (d) => d.y,
	xScaleType = 'linear',
	areaColor = '#2563EB', // Default Tailwind blue-600
	strokeColor = '#2563EB',
	strokeWidth = 2,
	className,
	showGrid = true,
	children,
	showTooltip = true,
	tooltipContent,
}: AreaChartProps): React.ReactElement {
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
			domain: [Math.min(...data.map(d => xAccessor(d) as number)), Math.max(...data.map(d => xAccessor(d) as number))],
			});

	const yScale = scaleLinear<number>({
		range: [innerHeight, 0],
		domain: [0, Math.max(...data.map(yAccessor))],
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

	// Tooltip Content
	// Default tooltip content function
	function defaultTooltipContent(d: DataPoint) {
		return (
			<div>
				<strong>
					x:{' '}
					{xAccessor(d) instanceof Date
					? (xAccessor(d) as Date).toLocaleDateString()
					: xAccessor(d) as number}
				</strong>
				<div>y: {yAccessor(d)}</div>
			</div>
		)
	}

	const tooltipRenderer = tooltipContent || defaultTooltipContent;

	const gradientId = `area-gradient-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div className={twMerge('relative overflow-visible', className)}>
			<svg width={width} height={height}>
				{/* Gradient Definition */}
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor={areaColor} stopOpacity={0.8} />
						<stop offset="100%" stopColor={areaColor} stopOpacity={0.1} />
					</linearGradient>
				</defs>

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

					{/* Area */}
					<AreaClosed<DataPoint>
						data={data}
						x={(d) => xScale(xAccessor(d)) ?? 0}
						y={(d) => yScale(yAccessor(d)) ?? 0}
						yScale={yScale}
						stroke="none"
						fill={`url(#${gradientId})`}
						curve={curveMonotoneX}
					/>

					{/* Line */}
					<LinePath<DataPoint>
						data={data}
						x={(d) => xScale(xAccessor(d)) ?? 0}
						y={(d) => yScale(yAccessor(d)) ?? 0}
						stroke={strokeColor}
						strokeWidth={strokeWidth}
						curve={curveMonotoneX}
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
			{showTooltip && tooltipData && (
				<TooltipWithBounds
					top={tooltipTop}
					left={tooltipLeft}
					style={{
						...defaultStyles,
						backgroundColor: 'rgba(0, 0, 0, 0.75)',
						color: 'white',
					}}
				>
					{tooltipRenderer(tooltipData)}
				</TooltipWithBounds>
			)}
		</div>
	)
}
