# Twist-Tac-Toe

A modern web application built using React and Vite. Basically, a TicTacToe game with a twist, there is no chance for draw.

## Table of Contents

1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Contributing](#contributing)

### Installation

To set-up the project **_locally_** follow the instructions below.

1. Clone the repository:

```bash
git clone <repo-url>
cd Twist-Tac-Toe
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

### Project Structure

```
├── public/          // Static assets
├── src/             // Application source code
│   ├── assets/      // Images, styles, etc.
│   ├── components/  // Reusable components
│   ├── App.css      // Root component styles
│   ├── App.jsx      // Root component
│   └── main.jsx     // Application entry point
├── .gitignore       // Files to be ignored by git
├── package.json     // Project metadata and dependencies
├── vite.config.js   // Vite configuration
└── README.md        // Documentation
```

### Contributing

We always welcome new contributions! In case you are looking to contribute, please follow the steps below.

1. Fork repo. On top right of this repo, click **'Fork'** to create a copy on your account.

2. Navigate to your Github account and locate the forked repo. Click on **'Code'** button on top right of your screen and copy the url that is provided to you. The url should look like this:

```bash
https://github.com/your-username/your-forked-repo.git
```

3. Create a new folder on your machine and navigate to it, using:

```bash
cd your-folder-name
```

4. Then run the following command to clone it locally:

```bash
git clone <your-recently-copied-url>
cd twist-tac-toe
```

5. Create a new branch and switch to it:

```bash
git switch -c <your-branch-name>
```

6. Implement your changes or features.

7. When you are ready, add your changes:

```bash
git add .
```

8. Then commit your changes, using a descriptive commit message:

```bash
git commit -m "Your commit message"
```

9. Push your branch to your forked repo:

```bash
git push -u origin <your-branch-name>
```

10. Navigate to your forked repo and click on **'Compare & pull request'** to open a new pull request. Provide a clear and concise description of your changes in the PR and don't forget to mention which issue solves. For example, if your PR solves issue #39, then on description you type Fixes #39. Finally, kindly wait for the feedback of your PR. Happy coding!
