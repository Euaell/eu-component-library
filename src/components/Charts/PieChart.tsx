
import React from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { twMerge } from 'tailwind-merge';

interface PieChartProps {
	data: { label: string; value: number }[];
	width: number;
	height: number;
	innerRadius?: number;
	outerRadius?: number;
	colors?: string[];
	className?: string;
	children?: React.ReactNode;
}

export default function PieChart({
	data,
	width,
	height,
	innerRadius = 0,
	outerRadius = Math.min(width, height) / 2 - 10,
	colors = ['#EF4444', '#10B981', '#3B82F6', '#FBBF24', '#8B5CF6'], // Tailwind colors
	className,
	children,
}: PieChartProps): React.ReactElement {
	// Positions
	const centerX = width / 2;
	const centerY = height / 2;

	// Total value (for calculating percentages)
	const total = data.reduce((acc, d) => acc + d.value, 0);

	return (
		<svg width={width} height={height} className={twMerge('overflow-visible', className)}>
			<Group top={centerY} left={centerX}>
				<Pie
					data={data}
					pieValue={(d) => d.value}
					outerRadius={outerRadius}
					innerRadius={innerRadius}
					cornerRadius={3}
					padAngle={0.005}
				>
					{(pie) => pie.arcs.map((arc, index) => {
						const [centroidX, centroidY] = pie.path.centroid(arc);
						const arcPath = pie.path(arc) || undefined;
						const color = colors[index % colors.length];

						return (
							<g key={`pie-arc-${index}`}>
								<path d={arcPath} fill={color} />
								{/* Labels */}
								<text
									x={centroidX}
									y={centroidY}
									dy=".33em"
									fill="#fff"
									fontSize={9}
									textAnchor="middle"
									pointerEvents="none"
								>
									{((arc.data.value / total) * 100).toFixed(1)}%
								</text>
							</g>
						);
					})}
				</Pie>

				{/* Additional children (e.g., legends) */}
				{children}
			</Group>
		</svg>
	)
}
