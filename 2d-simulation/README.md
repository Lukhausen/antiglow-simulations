# AntiGlow 2D Simulation

## Project Overview

This interactive 2D simulation demonstrates the innovative AntiGlow anti-glare technology that protects drivers from dangerous headlight and sun glare. The technology uses real-time camera detection and dynamic LCD masking to provide optimal visibility and safety.

<img src="./src/assets/logo.png" alt="AntiGlow Simulation" width="300" />

## Live Demo

**Try it now**: [https://antiglow.lukhausen.de/](https://antiglow.lukhausen.de/)

## Features

- Interactive drag-and-drop interface to position headlights and driver
- Step-by-step visualization of the anti-glare technology
- Responsive design that adapts to different screen sizes
- Dynamic calculations for light paths, angles, and shade projections
- Visual representations of the technology's underlying physics

## Technology Explanation

The simulation walks users through the following steps of the technology:

1. **Problem Identification**: Visualizes how headlights and sunlight can cause dangerous glare
2. **Eye Position Detection**: Demonstrates how the camera system detects driver eye position
3. **Light Source Detection**: Shows how the system maps incoming light sources
4. **Triangulation**: Illustrates the angle and distance calculations for determining the glare path
5. **Intersection Calculation**: Computes the exact point where glare intersects the windshield
6. **Dynamic LCD Masking**: Demonstrates how the precise shadow mask blocks only the glare while maintaining maximum visibility

## Getting Started

### Prerequisites

- Node.js (version 16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/antiglow-simulations.git
   cd antiglow-simulations/2d-simulation
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

The project follows a clean, modular code structure:

```
2d-simulation/
│
├── src/
│   ├── assets/           # Static assets like images
│   ├── components/       # React components
│   │   ├── icons/        # SVG icon components
│   │   └── simulation/   # Simulation-specific components
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── App.css           # Main application styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
│
├── public/               # Public assets
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite configuration
```

## Usage

- **Drag the headlight or driver icons** to see how the anti-glare technology adapts
- Use the **arrow buttons** to navigate through each step of the technology
- Observe how the dynamic shade adjusts based on the positions of the light source and driver

## Building for Production

To create a production build:

```
npm run build
```
or
```
yarn build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 19
- Vite 6
- Modern JavaScript (ES6+)
- SVG for vector graphics
- CSS for styling

## License

This project is proprietary and confidential.

## Credits

Developed as part of the AntiGlow technology demonstration platform.
