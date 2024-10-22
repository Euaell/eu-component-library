# Developer Documentation

This document provides information for developers working on the EU React Component Library. It includes setup instructions, testing, and deployment guidelines.

## Table of Contents

- [Project Setup](#project-setup)
- [Development](#development)
- [Testing](#testing)
- [Project Indexing](#project-indexing)
- [Deployment to npm](#deployment-to-npm)
- [Contributing](#contributing)
- [License](#license)

## Project Setup

To set up the project locally for development:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Euaell/eu-component-library.git
   cd eu-component-library
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

## Development

This project uses **Vite** for development and **Rollup** for building the library.

- **Start the Development Server**

  ```bash
  yarn dev
  ```

  This will start a Vite development server for testing components locally.

- **Linting**

  ```bash
  yarn lint
  ```

  Ensures code quality and consistency using ESLint.

- **Build the Library**

  ```bash
  yarn build
  ```

  Uses Rollup to build the library for production, outputting files to the `dist` directory.

## Testing

To test the exported library in a separate project:

1. **Build and Publish Locally with `yalc`**

   ```bash
   yarn global add yalc
   yarn build
   yalc publish
   ```

2. **Create a New React Project**

   ```bash
   npx create-react-app test-app
   cd test-app
   ```

3. **Install the Library via `yalc`**

   ```bash
   yalc add @euael/eu-react
   yarn install
   ```

4. **Use the Components**

   ```jsx
   // In your App.js or App.tsx
   import React from 'react';
   import '@euael/eu-react/index.css';
   import { Badge, LineChart } from '@euael/eu-react';

   function App() {
     const data = [
       { x: 1, y: 10 },
       { x: 2, y: 5 },
       { x: 3, y: 15 },
       { x: 4, y: 10 },
       { x: 5, y: 20 },
     ];

     return (
       <>
         <Badge variant="square">Primary</Badge>
         <LineChart data={data} width={400} height={400} />
       </>
     );
   }

   export default App;
   ```

## Project Indexing

To generate an index of the project files, use the provided `script.py`.

```bash
python script.py -d . -o project_content.txt
```

This script collects all the non-binary, non-excluded files and writes their contents to `project_content.txt`.

## Deployment to npm

To deploy the library to npm, follow these steps:

### Prerequisites

- Ensure you have an npm account. You can create one at [https://www.npmjs.com/signup](https://www.npmjs.com/signup).
- You must have access rights to publish packages under the `@euael` scope, or you can publish it under your own scope.

### Steps

1. **Update the Version**

   Increment the version number in `package.json` according to semantic versioning (e.g., from `1.0.0` to `1.0.1`).

2. **Build the Package**

   ```bash
   yarn build
   ```

   Ensure that the `dist` directory is correctly generated and includes all necessary files.

3. **Login to npm**

   ```bash
   npm login
   ```

   Provide your npm username, password, and email.

4. **Publish the Package**

   - **If Publishing Under Your Own Scope or Public Package**

     ```bash
     npm publish --access public
     ```

     Make sure the `name` field in `package.json` reflects the correct package name, e.g., `"name": "eu-react"`.

   - **If Publishing Under the `@euael` Scope**

     Ensure that you have access rights to the `@euael` scope on npm.

     ```bash
     npm publish --access public
     ```

     The `--access public` flag is necessary for scoped packages to be publicly accessible.

5. **Verify the Publication**

   Check the npm registry to verify that your package is published:

   [https://www.npmjs.com/package/@euael/eu-react](https://www.npmjs.com/package/@euael/eu-react)

6. **Update Documentation**

   Update the `README.md` and other documentation to reflect any changes.

### Notes

- **`.npmignore` and `files` Field**

  Ensure that your `.npmignore` file and the `files` field in `package.json` include all necessary files and exclude unwanted ones.

- **Package Access**

  By default, npm publishes scoped packages as private. Using the `--access public` flag ensures it's publicly available.

- **Testing Before Publishing**

  It's a good practice to test the package locally using `yalc` or `npm pack` to simulate the published package.

  - First export the library using yalc 
  - install yalc globally if you haven't already
    ```bash
    yarn global add yalc
    yalc publish
    ```
    - Then in the new project, install the library using yalc
    ```bash
    yalc add @euael/eu-react
    yarn install
```

## Contributing

Contributions to the library welcomed. Please follow these guidelines:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Describe your changes"
   ```

4. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Create a Pull Request**

   Submit your pull request for review.

### Guidelines

- Follow the existing code style and conventions.
- Write clear, concise commit messages.
- Include documentation and tests when adding new features.

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
