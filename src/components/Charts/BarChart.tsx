
import React from 'react';
import { BarGroup } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { twMerge } from 'tailwind-merge';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { BarGroupBar,
	// import `BarGroup` from '@visx/shape/lib/types' to get the types with a different name
	BarGroup as BarGroupType,
	 } from '@visx/shape/lib/types';

interface BarChartProps {
	data: any[];
	keys: string[]; // keys to display (e.g., ['value1', 'value2'])
	width: number;
	height: number;
	margin?: { top: number; right: number; bottom: number; left: number };
	x0Accessor: (d: any) => string; // accessor for the grouping variable
	x0ScalePadding?: number;
	colors?: string[];
	className?: string;
}

export default function BarChart({
	data,
	keys,
	width,
	height,
	margin = { top: 20, right: 30, bottom: 50, left: 40 },
	x0Accessor,
	x0ScalePadding = 0.2,
	colors = ['#34D399', '#60A5FA', '#F472B6'], // Tailwind colors
	className
}: BarChartProps): React.ReactElement {
	// Calculate inner width and height
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	// Scales
	const x0Scale = scaleBand<string>({
		domain: data.map(x0Accessor),
		padding: x0ScalePadding,
		range: [0, innerWidth],
	})

	const x1Scale = scaleBand<string>({
		domain: keys,
		padding: 0.1,
		range: [0, x0Scale.bandwidth()],
	})

	const yScale = scaleLinear<number>({
		domain: [0, Math.max(...data.flatMap((d) => keys.map((key) => d[key])))],
		nice: true,
		range: [innerHeight, 0],
	})

	// Tooltip state
	const {
		showTooltip,
		hideTooltip,
		tooltipData,
		tooltipLeft,
		tooltipTop,
	} = useTooltip<{
		key: string;
		value: number;
		x: number;
		y: number;
		x0: string;
	}>()
	// FIXME: The tooltip is not showing up
	function handleMouseMove(event: React.MouseEvent<SVGRectElement>, bar: BarGroupBar<string>, barGroup: BarGroupType<string>) {
		const coords = localPoint(event) || { x: 0, y: 0 };
		const x = coords.x - margin.left;
		const y = coords.y - margin.top;

		showTooltip({
			tooltipData: {
				key: bar.key,
				value: bar.value,
				x: coords.x,
				y: coords.y,
				x0: barGroup.x0.toString(),
			},
			tooltipLeft: x + margin.left,
			tooltipTop: y + margin.top,
		});
	}

	return (
		<div className={twMerge('relative overflow-visible', className)}>
			<svg width={width} height={height}>
				<Group left={margin.left} top={margin.top}>
					{/* Axes */}
					<AxisBottom
						top={innerHeight}
						scale={x0Scale}
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

					{/* Bars */}
					<BarGroup
						data={data}
						keys={keys}
						height={innerHeight}
						x0={(d) => x0Accessor(d)}
						x0Scale={x0Scale}
						x1Scale={x1Scale}
						yScale={yScale}
						color={(_, index) => colors[index % colors.length]}
					>
						{(barGroups) => barGroups.map((barGroup) => (
							<Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
								{barGroup.bars.map((bar) => (
									<rect
										key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.key}`}
										x={bar.x}
										y={bar.y}
										width={bar.width}
										height={bar.height}
										fill={bar.color}
										onMouseMove={(event) => handleMouseMove(event, bar, barGroup)}
										onMouseLeave={() => hideTooltip()}
									>
										<text
											x={bar.x + bar.width / 2}
											y={bar.y - 5} // Position above the bar
											fill="#000"
											fontSize={10}
											textAnchor="middle"
											z={9999} // FIXME: Ensure the text is on top, but it's not working
										>
											{bar.value}
										</text>
									</rect>
								))}
							</Group>
						))}
					</BarGroup>
					
					{/* Tooltip */}
					{tooltipData && (
						<TooltipWithBounds
							top={tooltipTop}
							left={tooltipLeft}
							style={{ ...defaultStyles, backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff' }}
						>
							<div>
								<strong>{tooltipData.x0}</strong>
							</div>
							<div>{`${tooltipData.key}: ${tooltipData.value}`}</div>
						</TooltipWithBounds>
					)}
				</Group>
			</svg>
		</div>
	)
}
