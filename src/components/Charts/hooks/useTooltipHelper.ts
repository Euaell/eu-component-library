import { useTooltip } from '@visx/tooltip';
import { bisector } from 'd3-array';
import { localPoint } from '@visx/event';
import { ScaleTime, ScaleLinear } from 'd3-scale';

interface DataPoint {
    x: number | Date;
    y: number;
    [key: string]: any;
}

interface UseTooltipHelperProps {
    data: DataPoint[];
    xAccessor: (d: DataPoint) => number | Date;
    yAccessor: (d: DataPoint) => number;
    xScale: ScaleTime<number, number> | ScaleLinear<number, number>;
    yScale: ScaleLinear<number, number>;
    margin: { top: number; right: number; bottom: number; left: number };
}

export function useTooltipHelper({
    data,
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    margin,
}: UseTooltipHelperProps) {
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        showTooltip,
        hideTooltip,
    } = useTooltip<DataPoint>();

    // Use bisector to find the closest data point
    const bisectX = bisector<DataPoint, number | Date>((d) => xAccessor(d)).left;

    function handleTooltip(event: React.MouseEvent<SVGRectElement, MouseEvent>) {
        const { x } = localPoint(event) || { x: 0 };
        const x0: any = xScale.invert(x - margin.left);
        const index = bisectX(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;

        if (d1 && xAccessor(d1)) {
            d = Math.abs((xAccessor(d0) as any) - x0) > Math.abs((xAccessor(d1) as any) - x0) ? d1 : d0;
        }

        showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(xAccessor(d)) + margin.left,
        tooltipTop: yScale(yAccessor(d)) + margin.top,
        })
    }

    return {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        handleTooltip,
        hideTooltip,
    }
}
