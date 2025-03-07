# AntiGlow Simulations

<img src="./2d-simulation/src/assets/logo.png" alt="AntiGlow Technology" width="300" />

## Overview

This repository contains two different simulations that demonstrate the AntiGlow anti-glare technology concept:

1. **2D Simulation** - A React-based interactive visualization
2. **3D Simulation** - A Three.js-based spatial demonstration

Both simulations show how adaptive LCD technology in a windshield could selectively block headlight glare while maintaining clear visibility for drivers.

## Live Demos

- **2D Simulation**: [https://antiglow.lukhausen.de/](https://antiglow.lukhausen.de/)
- **3D Simulation**: [https://windshieldsimulation.lukhausen.de/](https://windshieldsimulation.lukhausen.de/)

## Folder Structure

```
antiglow-simulations/
│
├── 2d-simulation/            # React application
│   ├── src/                  # Source code
│   └── public/               # Static assets
│
├── 3d-simulation/            # Standalone HTML/JS application
    ├── js/                   # JavaScript files
    ├── css/                  # Stylesheets
    └── index.html            # Entry point
```

## Using the 2D Simulation

### Setup
```
cd 2d-simulation
npm install
npm run dev
```

### Features
- Drag-and-drop interface for headlights and driver position
- Step-by-step visualization of the technology
- Interactive controls to demonstrate how the technology works
- **Live Demo**: [https://antiglow.lukhausen.de/](https://antiglow.lukhausen.de/)

## Using the 3D Simulation

### Setup
Simply open `3d-simulation/index.html` in any modern web browser.

### Features
- Interactive 3D scene showing:
  - Headlights (yellow spheres)
  - Windshield (blue plane)
  - Driver's eyes (green sphere) 
  - LCD shade elements (black circles)
- Controls to add/remove light sources
- Drag-and-drop functionality to reposition elements
- **Live Demo**: [https://windshieldsimulation.lukhausen.de/](https://windshieldsimulation.lukhausen.de/)

## Technologies

- **2D Simulation**: React, Vite, SVG
- **3D Simulation**: Three.js, HTML5/CSS3

## Purpose

These simulations demonstrate how selective LCD shading can block dangerous headlight and sun glare without reducing overall visibility, potentially improving driving safety.

## License

All rights reserved.