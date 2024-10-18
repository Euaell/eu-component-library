import './App.css'
import { Badge, Banner, Toast } from './components'

function App() {
	
	return (
		<>
			<Toast>Hello Toast!!</Toast>
			<Badge color='red'>Badge</Badge>
			<Badge color='yellow'>Badge</Badge>
			<Badge color='green'>Badge</Badge>
			<Badge>Badge</Badge>
			<Badge color='blue' variant='square'>Badge</Badge>
			<Badge color='blue' variant='pill'>Badge</Badge>

			<Badge>Ba</Badge>

			<Banner title='Info' status='info'>This is an info banner</Banner>
			<Banner title='Error' status='error'>This is an error banner</Banner>
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

export default App
