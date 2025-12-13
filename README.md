# 🌍 Trip Recommender

An AI-powered travel destination finder that helps users discover their perfect vacation spots. Built with React, TypeScript, and Tailwind CSS, this application uses Google's Gemini AI to analyze free-text travel preferences and suggest matching destinations displayed on an interactive map.

![Trip Recommender](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)

## ✨ Features

- **🤖 AI-Powered Recommendations**: Uses Google Gemini AI to understand natural language travel preferences
- **🗺️ Interactive Map**: View all recommended destinations on a Leaflet-powered map
- **📱 Mobile-First Design**: Fully responsive layout optimized for smartphones, tablets, and desktops
- **♿ Accessible**: Built with accessibility in mind - keyboard navigation, ARIA labels, focus states
- **🐳 Docker Ready**: Easy deployment with Docker and docker-compose

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- A [Google Gemini API Key](https://makersuite.google.com/app/apikey)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TripRecommender
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Add your Gemini API Key**
   
   Edit `.env` and add your API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run with Docker**

   **For Development** (with hot reload):
   ```bash
   docker-compose --profile dev up --build
   ```
   Access the app at: http://localhost:5173

   **For Production**:
   ```bash
   docker-compose --profile prod up --build
   ```
   Access the app at: http://localhost:8080

## 🛠️ Development Without Docker

If you prefer to run without Docker (requires Node.js 18+):

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
TripRecommender/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with branding
│   │   ├── SearchInput.tsx  # Free-text search input
│   │   ├── DestinationCard.tsx    # Individual destination card
│   │   ├── DestinationList.tsx    # List of destination cards
│   │   ├── MapView.tsx      # Interactive Leaflet map
│   │   ├── LoadingSpinner.tsx     # Loading state component
│   │   ├── ErrorMessage.tsx       # Error display component
│   │   └── index.ts         # Component exports
│   ├── hooks/
│   │   └── useDestinationSearch.ts  # Custom hook for search logic
│   ├── services/
│   │   └── geminiService.ts # Gemini AI integration
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles with Tailwind
├── public/                  # Static assets
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx config for production
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## 🎯 How It Works

1. **User Input**: Enter your travel preferences in natural language (e.g., "Beach vacation with great food in Southeast Asia")

2. **AI Processing**: The Gemini AI analyzes your input and identifies 3-5 matching destinations

3. **Results Display**: Destinations are shown as cards with:
   - Name and country
   - AI-generated description
   - Key highlights
   - Best time to visit
   - Estimated budget level

4. **Map Interaction**: Click on cards or map markers to explore destinations

## 🎨 Design Principles

### Mobile-First Approach
- Touch-friendly interface elements
- Responsive grid layout (stacked on mobile, side-by-side on desktop)
- Appropriately sized tap targets

### Accessibility Features
- Skip navigation link
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Screen reader friendly
- Sufficient color contrast

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy and add it to your `.env` file

## 📦 Docker Commands

```bash
# Build and run development
docker-compose --profile dev up --build

# Build and run production
docker-compose --profile prod up --build

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

