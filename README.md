# Geek React Component Library

Welcome to the Geek React Component Library! This is a collection of reusable React components designed to help streamline the development process by providing pre-built, customizable UI components.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
	- [Badge](#badge)
	- [Banner](#banner)
	- [Card](#card)
	- [Testimonial](#testimonial)
	- [Tooltip](#tooltip)
	- [Toast](#toast)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use this component library in your React project, you can install it via npm. Make sure you have `react` and `react-dom` installed in your project as they are peer dependencies.

```bash
npm install geek-react
```

or

```bash
yarn add geek-react
```

## Usage

Here's a quick example of how to use a component from the library. Please refer to the documentation for each individual component for more detailed usage instructions.

```jsx
import React from 'react';
import { Badge } from 'geek-react';

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

## Components

### Badge

A badge component that displays a label or count. You can pass a `color` prop to change the appearance.

#### Props

- `color` (string): Determines the background and text colors. Example: `"green"`, `"red"`.

```jsx
<Badge color="green">Active</Badge>
```

### Banner

A banner for displaying important alerts and notifications. You can customize it with different statuses.

#### Props

- `status` (string): The status determines the color scheme (e.g., `"success"`, `"warning"`).
- `title` (string): The title text.
- `children` (node): Any additional content to display in the banner.

```jsx
<Banner status="success" title="Operation Successful">
	Your operation was completed successfully.
</Banner>
```

### Card

A flexible card component that can display different types of content.

#### Props

- `icon` (element): An icon displayed at the top of the card.
- `children` (node): The content of the card.

```jsx
<Card icon={<CustomIcon />}>
	<p>This is a card content area.</p>
</Card>
```

### Testimonial

A testimonial component for displaying user feedback.

#### Variations

- `TestimonialWithImage`
- `TestimonialWithoutImage`

Choose the variant based on whether you need to display an accompanying image.

```jsx
<TestimonialWithImage image={<SomeImage />}>
	<p>This product is amazing!</p>
</TestimonialWithImage>
```

### Tooltip

A simple tooltip component to provide additional context on hover.

#### Props

- `text` (string): The tooltip text to display.

```jsx
<Tooltip text="More information">
	<button>Hover me</button>
</Tooltip>
```

### Toast

Toasts are used for displaying notifications. Consider using React Portals for positioning.

#### Usage

Integrate the toast using the `useToast` hook or via a global context.

```jsx
import { useToast } from 'geek-react';

function SomeComponent() {
  const { notify } = useToast();

  return (
    <button onClick={() => notify("This is a toast message!")}>
      Show Toast
    </button>
  );
}
```

## Contributing

We welcome contributions to our library. Please read our [Contributing Guide](CONTRIBUTING.md) to learn about the process.

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
