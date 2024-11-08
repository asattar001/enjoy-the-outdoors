# Capstone 2: Enjoy the Outdoors

A dynamic website showcasing America's national parks and mountains. Built with HTML, CSS, and JavaScript, this interactive platform allows users to explore various parks and mountains while providing detailed information about each location.

## Features

### Home Page
- Hero section with a striking landscape image
- Information cards highlighting:
  - National Parks
  - Mountains
  - Wildlife Observation

### Park Explorer
- Interactive filtering system with dual dropdown menus
- Dynamic table display of park information
- Features include:
  - Individual filter functionality
  - Combined filtering capabilities

### Mountain Information
- Interactive mountain selection dropdown
- Detailed mountain card displaying:
  - Mountain image
  - Comprehensive mountain details
  - Real-time sunrise and sunset data via API integration

## Technologies Used
- HTML5
- CSS3
- JavaScript
- API integration
- Bootstrap 5

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/asattar001/enjoy-the-outdoors.git
```
2. Open the project
- Navigate to where you cloned the project
- Open `index.html` in your web browser

## API Integration
This project utilizes the Sunrise-Sunset API to provide accurate astronomical data for each mountain location. The API is called dynamically based on the mountain's coordinates.

## Project Structure
```
enjoy-the-outdoors/
├── index.html
├── mountains.html
├── national-parks.html
├── css/
│   └── styles.css
├── js/
│   ├── locationData.js
│   ├── mountainData.js
|   ├── mountains.js
│   ├── national-parks.js
|   ├── nationalParkData.js
│   └── parkTypeData.js
└── images/
```

## Acknowledgments
- National Park Service for inspiration and information
- Sunrise-Sunset API for astronomical data
- All contributors who have helped to enhance this project
