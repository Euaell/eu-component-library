# EU React Component Library

[![npm version](https://img.shields.io/npm/v/@euael/eu-react)](https://www.npmjs.com/package/@euael/eu-react)
[![license](https://img.shields.io/npm/l/@euael/eu-react)](https://github.com/Euaell/euael-component-library/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/@euael/eu-react)](https://www.npmjs.com/package/@euael/eu-react)

Welcome to the EU React Component Library! This library provides a collection of reusable, customizable React components to help you build your applications faster and with consistent styling.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Components](#components)
	- [Badge](#badge)
	- [Banner](#banner)
	- [Card](#card)
	- [Testimonials](#testimonials)
	- [Charts](#charts)
		- [LineChart](#linechart)
		- [AreaChart](#areachart)
		- [BarChart](#barchart)
		- [PieChart](#piechart)
		- [ScatterPlot](#scatterplot)
	- [Toast](#toast)
	- [Navbar](#navbar)
- [License](#license)

## Installation

To use this component library in your React project, you can install it via npm or yarn. Make sure you have `react` and `react-dom` installed in your project as they are peer dependencies.

```bash
# Using npm
npm install @euael/eu-react

# Using yarn
yarn add @euael/eu-react
```

## Getting Started

To start using the components, import them into your project as follows:

```jsx
import React from 'react';
import '@euael/eu-react/index.css'; // Import the CSS styles
import { Badge } from '@euael/eu-react';

function App() {
	return (
		<div>
			<h1>Hello, World!</h1>
			<Badge color="green">Success</Badge>
		</div>
	);
}

export default App;
```

**Note:** It's important to import the CSS file `@euael/eu-react/index.css` to ensure that the components are styled correctly.

## Components

### Badge

A badge component that displays a label or count. Useful for notifications or status indicators.

#### Import

```jsx
import { Badge } from '@euael/eu-react';
```

#### Props

- `children` (string, required): The text to display inside the badge.
- `color` (string, optional): Determines the background and text colors. Options:
  - `'gray'` (default)
  - `'red'`
  - `'yellow'`
  - `'green'`
  - `'blue'`
  - `'indigo'`
  - `'purple'`
  - `'pink'`
- `variant` (string, optional): The shape of the badge. Options:
  - `'square'` (default): Rounded corners.
  - `'pill'`: Fully rounded edges.
- `className` (string, optional): Custom CSS classes for additional styling.

#### Usage

```jsx
<Badge color="green">Active</Badge>
<Badge color="red" variant="pill">Error</Badge>
```

### Banner

Displays important alerts and notifications at the top of the page or section.

#### Import

```jsx
import { Banner } from '@euael/eu-react';
```

#### Props

- `title` (string, required): The title text of the banner.
- `status` (string, optional): Determines the color scheme and icon. Options:
	- `'info'` (default)
	- `'success'`
	- `'warning'`
	- `'error'`
- `children` (string or ReactNode, optional): Additional content to display in the banner.
- `className` (string, optional): Custom CSS classes for additional styling.

#### Usage

```jsx
<Banner status="success" title="Operation Successful">
	Your operation was completed successfully.
</Banner>
```

### Card

A flexible card component for displaying content in a structured format.

#### Import

```jsx
import { Card } from '@euael/eu-react';
```

#### Props

- `title` (string, required): The title of the card.
- `children` (ReactNode, required): The content inside the card.
- `icon` (ReactNode, optional): An icon displayed at the top of the card.
- `iconBgColor` (string, optional): Background color for the icon container.
- `className` (string, optional): Custom CSS classes for additional styling.

#### Usage

```jsx
<Card title="Welcome" icon={<YourIconComponent />}>
	<p>This is an example of a card content.</p>
</Card>
```

### Testimonials

Display user feedback or quotes in an attractive format.

#### Import

```jsx
import { Testimonials } from '@euael/eu-react';
```

#### Props

- `image` (string, required): URL or import of the image to display.
- `quote` (string, required): The testimonial text.
- `author` (string, required): Name of the person giving the testimonial.
- `position` (string, required): Position or title of the person.
- `bgColor` (string, optional): Background color of the testimonial card.
- `className` (string, optional): Custom CSS classes for additional styling.

#### Usage

```jsx
<Testimonials
	image="path/to/image.jpg"
	quote="This product exceeded my expectations."
	author="Jane Doe"
	position="CEO of Company"
/>
```

### Charts

A set of chart components for data visualization, powered by [VisX](https://github.com/airbnb/visx).

#### Common Props for Charts

All chart components accept the following common props:

- `data` (array, required): Data to be visualized.
- `width` (number, required): Width of the chart in pixels.
- `height` (number, required): Height of the chart in pixels.
- `margin` (object, optional): Margins around the chart. Default is `{ top: 20, right: 30, bottom: 50, left: 40 }`.
- `className` (string, optional): Custom CSS classes for additional styling.

#### LineChart

Displays line charts for time series or continuous data.

##### Import

```jsx
import { LineChart } from '@euael/eu-react';
```

##### Props

- `xAccessor` (function, optional): Accessor function for the x-axis values.
- `yAccessor` (function, optional): Accessor function for the y-axis values.
- `xScaleType` (string, optional): Type of x-axis scale. Options are `'time'` or `'linear'`. Default is `'linear'`.
- `strokeColor` (string, optional): Color of the line. Default is `'#2563EB'` (Tailwind blue-600).
- `strokeWidth` (number, optional): Width of the line. Default is `2`.
- `curveType` (string, optional): Curve interpolation type. Options are `'linear'`, `'monotoneX'`, `'cardinal'`, `'basis'`. Default is `'linear'`.
- `showGrid` (boolean, optional): Whether to display grid lines. Default is `true`.
- `tooltipContent` (function, optional): Custom function to render tooltip content.

##### Usage

```jsx
const data = [
	{ x: new Date(2023, 0, 1), y: 50 },
	{ x: new Date(2023, 0, 2), y: 30 },
	// ...
];

<LineChart
	data={data}
	width={600}
	height={400}
	xScaleType="time"
	strokeColor="#10B981" // Tailwind green-500
	curveType="monotoneX"
/>
```

#### AreaChart

Displays area charts for cumulative data visualization.

##### Import

```jsx
import { AreaChart } from '@euael/eu-react';
```

##### Props

Inherits all `LineChart` props with the addition of:

- `areaColor` (string, optional): Color of the area fill. Default is `'#2563EB'`.

##### Usage

```jsx
<AreaChart
	data={data}
	width={600}
	height={400}
	xScaleType="time"
	areaColor="#3B82F6" // Tailwind blue-500
/>
```

#### BarChart

Displays grouped bar charts for categorical data comparison.

##### Import

```jsx
import { BarChart } from '@euael/eu-react';
```

##### Props

- `keys` (array, required): Keys of the data to display.
- `x0Accessor` (function, required): Accessor function for the grouping variable.
- `x0ScalePadding` (number, optional): Padding between groups. Default is `0.2`.
- `colors` (array, optional): Array of colors for the bars.

##### Usage

```jsx
const data = [
	{ category: 'A', value1: 30, value2: 20 },
	{ category: 'B', value1: 20, value2: 80 },
	// ...
];

<BarChart
	data={data}
	keys={['value1', 'value2']}
	x0Accessor={(d) => d.category}
	width={600}
	height={400}
/>
```

#### PieChart

Displays pie charts for proportional data.

##### Import

```jsx
import { PieChart } from '@euael/eu-react';
```

##### Props

- `innerRadius` (number, optional): Inner radius for donut charts. Default is `0`.
- `outerRadius` (number, optional): Outer radius of the pie. Default is calculated based on width and height.
- `colors` (array, optional): Array of colors for the slices.

##### Usage

```jsx
const data = [
	{ label: 'Apples', value: 10 },
	{ label: 'Bananas', value: 20 },
	// ...
];

<PieChart
	data={data}
	width={400}
	height={400}
/>
```

#### ScatterPlot

Displays scatter plots for irregular data distributions.

##### Import

```jsx
import { ScatterPlot } from '@euael/eu-react';
```

##### Props

- `xAccessor` (function, optional): Accessor function for the x-axis values.
- `yAccessor` (function, optional): Accessor function for the y-axis values.
- `xScaleType` (string, optional): Type of x-axis scale. Options are `'time'` or `'linear'`. Default is `'linear'`.
- `pointColor` (string, optional): Color of the data points. Default is `'#EF4444'` (Tailwind red-500).
- `pointSize` (number, optional): Size of the data points. Default is `5`.

##### Usage

```jsx
const data = [
	{ x: 10, y: 20 },
	{ x: 15, y: 10 },
	// ...
];

<ScatterPlot
	data={data}
	width={600}
	height={400}
/>
```

### Toast

Displays temporary notifications or messages to the user.

#### Import

```jsx
import { Toast } from '@euael/eu-react';
```

#### Props

- `children` (ReactNode, required): The content to display inside the toast.
- `className` (string, optional): Custom CSS classes for additional styling.

#### Usage

```jsx
<Toast>
	<p>This is a toast message.</p>
</Toast>
```

**Note:** For advanced usage, consider integrating with a state management solution or context to control the display of toasts globally.

### Navbar
A responsive navigation bar component that supports dropdown menus and mobile navigation.

#### Import

```jsx
import { NavBar, NavMenu, NavItem, NavDropdown } from '@euael/eu-react';
```

#### Props

- `children` (ReactNode, required): The content to display inside the navbar.
- `className` (string, optional): Custom CSS classes for additional styling.

#### Usage

```jsx
// In your component or App.js
import React from 'react';
import { NavBar, NavMenu, NavItem, NavDropdown } from '@euael/eu-react';
import Logo from './path-to-your-logo.svg';

function App() {
	return (
		<NavBar logo={<img src={Logo} alt="Logo" />}>
			<NavMenu>
				<NavItem href="/">Home</NavItem>
				<NavDropdown title="About Us">
					<NavItem href="/about/mission">Our Mission</NavItem>
					<NavItem href="/about/team">Team</NavItem>
					<NavDropdown title="More">
						<NavItem href="/about/faq">FAQ</NavItem>
						<NavItem href="/about/contact">Contact</NavItem>
					</NavDropdown>
				</NavDropdown>
				<NavItem href="/contact">Contact</NavItem>
			</NavMenu>
		</NavBar>
	)
}

export default App;
```

#### Props

##### `NavBar` Props

- `logo` (ReactNode, optional): The logo or branding element displayed on the left side.
- `children` (ReactNode, optional): Typically a `NavMenu` component containing navigation items.
- `className` (string, optional): Custom CSS classes for additional styling.

##### `NavMenu` Props

- `children` (ReactNode, required): One or more `NavItem` or `NavDropdown` components.
- `className` (string, optional): Custom CSS classes for additional styling.

##### `NavItem` Props

- `href` (string, required): The URL or route the item should link to.
- `children` (ReactNode, required): The text or content of the navigation item.
- `className` (string, optional): Custom CSS classes for additional styling.
- `onClick` (function, optional): Click handler function.

##### `NavDropdown` Props

- `title` (string, required): The text displayed on the dropdown trigger.
- `children` (ReactNode, required): One or more `NavItem` components.
- `buttonClassName` (string, optional): Custom CSS classes for the trigger button.
- `className` (string, optional): Custom CSS classes for the dropdown menu.

#### Customization

- **Styling:** Uses Tailwind CSS classes for styling. You can override styles using the `className` props.
- **Responsive Behavior:** The navigation bar is responsive out of the box. On mobile devices, it displays a hamburger menu that toggles the navigation links.


#### Important Notes:

- Remember to import `@euael/eu-react/index.css` in your main entry file to include the necessary styles.



## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Additional Resources

- **Repository:** [GitHub - Euaell/eu-component-library](https://github.com/Euaell/eu-component-library)
- **Issues:** Please report any issues on the [GitHub Issues](https://github.com/Euaell/eu-component-library/issues) page.

---

Thank you for choosing the EU React Component Library! We hope these components help you build your applications more efficiently. If you have any questions or need assistance, feel free to reach out.
