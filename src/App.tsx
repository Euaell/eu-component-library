import './App.css'
import { Badge, Banner, Card, Toast } from './components'
import testSvg from './test.svg'

function App() {
	
	return (
		<>
		
			{/* <BannerAndBadge /> */}

			<CardDisplay />
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
		<div className='bg-gray-200'>
			
			<Card title='First Title' icon={<img src={testSvg} alt='test svg' />}>
				<p>This is a card</p>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ad quidem labore architecto maiores possimus, porro cum placeat eligendi eius necessitatibus doloremque iure minima perferendis minus alias. Suscipit, aspernatur atque?</p>
			</Card>

			<Card title='Awesome Title' icon={<img src={testSvg} alt='test svg' />}>
				<p>This is a card</p>
				<p>Lorem iplaceat eligendi eius necessitatibus doloremque iure minima perferendis minus alias. </p>
			</Card>
		</div>
	)
}

export default App
