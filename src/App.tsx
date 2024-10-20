import './App.css'
import { AreaChart, Badge, Banner, BarChart, Card, LineChart, PieChart, ScatterPlot, SmoothAreaChart, SmoothLineChart, Testimonials, Toast } from './components'
import testSvg from './test.svg'
import testimonialImg from './testimonial-image.png'

function App() {
	
	return (
		<>
		
			{/* <BannerAndBadge /> */}

			{/* <CardDisplay /> */}

			{/* <TestimonialDisplay /> */}

			{/* <LineChartDisplay /> */}

			{/* <AreaChartDisplay /> */}

			{/* <BarChartDisplay /> */}

			{/* <PieChartDisplay /> */}

			{/* <ScatterPlotDisplay /> */}

			{/* <SmoothLineChartDisplay /> */}

			<SmoothAreaChartDisplay />
		</>
	)
}

function BannerAndBadge() {
	return (
		<>
			<Toast>Hello Toast!!</Toast>
			<Badge color='red' className='cursor-pointer' onClick={() => console.log("badge clicked")}>Badge</Badge>
			<Badge color='yellow'>Badge</Badge>
			<Badge color='green'>Badge</Badge>
			<Badge>Badge</Badge>
			<Badge color='blue' variant='square'>Badge</Badge>
			<Badge color='blue' variant='pill'>Badge</Badge>

			<Badge>Ba</Badge>

			<Banner title='Info' status='info'>This is an info banner</Banner>
			<Banner title='Error' status='error'>This is an error banner</Banner>
			<Banner title='with no content' status='error' />
			<Banner title='with no content' status='warning' />
			<Banner title='with no content' status='success' />
			<Banner title='with no content' />

			<Banner title='Success' status='success' className='inline-block'>This is a success banner</Banner>
			<Banner title='Warning' status='warning' className='inline-block'>This is a warning banner</Banner>
			{/* A banner with a longer text */}
			<Banner title='Warning' status='warning'>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam quam placeat esse, ea accusantium quaerat necessitatibus impedit ipsam facere cumque incidunt ad, cupiditate ab modi est laboriosam quae sit nemo.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam quam placeat esse, ea accusantium quaerat necessitatibus impedit ipsam facere cumque incidunt ad, cupiditate ab modi est laboriosam quae sit nemo.
			</Banner>
		</>
	)
}

function CardDisplay() {
	return (
		<div className='bg-gray-200 p-8'>
			
			<Card title='First Title' icon={<img src={testSvg} alt='test svg' />} iconBgColor='#E30313'>
				<p>This is a card</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ad quidem labore architecto maiores possimus, porro cum placeat eligendi eius necessitatibus doloremque iure minima perferendis minus alias. Suscipit, aspernatur atque?</p>
			</Card>

			<Card title='Awesome Title' icon={<img src={testSvg} alt='test svg' />}>
				<p>This is a card</p>
				<p>Lorem iplaceat eligendi eius necessitatibus doloremque iure minima perferendis minus alias. </p>
			</Card>

			<Card title='Title'>
				<p>Simpler card</p>
			</Card>
		</div>
	)
}

function TestimonialDisplay() {
	return (
		<div className='bg-gray-200 h-max'>
			<Testimonials
				image={testimonialImg}
				quote='This is a testimonial quote'
				author='John Doe'
				position='CEO'
			/>
		</div>
	)
}

function LineChartDisplay() {
	
	const sampleData = [
		{ x: new Date(2023, 0, 1), y: 50 },
		{ x: new Date(2023, 0, 2), y: 10 },
		{ x: new Date(2023, 0, 3), y: 20 },
		{ x: new Date(2023, 0, 4), y: 80 },
		{ x: new Date(2023, 0, 5), y: 30 },
	]

	return (
		<div className="p-4">
			<LineChart
				data={sampleData}
				width={600}
				height={400}
				xScaleType="time"
				strokeColor="#10B981" // Tailwind green-500
			/>
		</div>
	)

}

function AreaChartDisplay() {
	const sampleData = [
		{ x: new Date(2023, 0, 1), y: 50 },
		{ x: new Date(2023, 0, 2), y: 30 },
		{ x: new Date(2023, 0, 3), y: 80 },
		{ x: new Date(2023, 0, 4), y: 20 },
		{ x: new Date(2023, 0, 5), y: 60 },
		{ x: new Date(2023, 0, 6), y: 50 },
		{ x: new Date(2023, 0, 7), y: 30 },
		{ x: new Date(2023, 0, 8), y: 80 },
		{ x: new Date(2023, 0, 9), y: 20 },
		{ x: new Date(2023, 0, 10), y: 60 },
	]
	  
	return (
		<div className="p-4">
			<AreaChart
				data={sampleData}
				width={600}
				height={400}
				xScaleType="time"
				areaColor="#3B82F6" // Tailwind blue-500
			/>
		</div>
	);
}

function BarChartDisplay() {
	const sampleData = [
		{ category: 'A', value1: 30, value2: 20 },
		{ category: 'B', value1: 20, value2: 80 },
		{ category: 'C', value1: 50, value2: 40 },
		{ category: 'D', value1: 70, value2: 30 },
		{ category: 'E', value1: 10, value2: 60 },
	]

	return (
		<div className="p-4">
			<BarChart
				data={sampleData}
				keys={['value1', 'value2']} // The data keys to display
				x0Accessor={(d) => d.category} // Accessor for the grouping variable
				width={600}
				height={400}
			/>
		</div>
	)
}

function PieChartDisplay() {
	const sampleData = [
		{ label: 'Apples', value: 10 },
		{ label: 'Bananas', value: 20 },
		{ label: 'Cherries', value: 30 },
		{ label: 'Dates', value: 15 },
		{ label: 'Elderberries', value: 25 },
	]

	return (
		<div className="p-4">
			<PieChart data={sampleData} width={400} height={400} />
		</div>
	);
}

function ScatterPlotDisplay() {
	const sampleData = Array.from({ length: 50 }, () => ({
		x: Math.random() * 100,
		y: Math.random() * 100,
	}))
	  
	return (
		<div className="p-4">
			<ScatterPlot data={sampleData} width={600} height={400} />
		</div>
	)
}

function SmoothLineChartDisplay() {
	const sampleData = [
		{ x: new Date(2023, 0, 1), y: 50 },
		{ x: new Date(2023, 0, 2), y: 10 },
		{ x: new Date(2023, 0, 3), y: 20 },
		{ x: new Date(2023, 0, 4), y: 80 },
		{ x: new Date(2023, 0, 5), y: 30 },
	]

	return (
		<div className="p-4">
			<SmoothLineChart
				data={sampleData}
				width={600}
				height={400}
				xScaleType="time"
				strokeColor="#3B82F6"
			/>
		</div>
	)
}

function SmoothAreaChartDisplay() {
	const sampleData = [
		{ x: new Date(2023, 0, 1), y: 50 },
		{ x: new Date(2023, 0, 2), y: 30 },
		{ x: new Date(2023, 0, 3), y: 80 },
		{ x: new Date(2023, 0, 4), y: 20 },
		{ x: new Date(2023, 0, 5), y: 60 },
	]

	return (
		<div className="p-4">
			<SmoothAreaChart
				data={sampleData}
				width={600}
				height={400}
				xScaleType="time"
				// areaColor="#10B981" // Tailwind green-500
				// Tailwind sky-700
				areaColor="#1533FB"
				// strokeColor="#10B981"
				strokeColor="#2563EB"
			/>
		</div>
	)
}

export default App
