# Cognizant Neuro AI Transition Platform

A comprehensive React web application for managing AI transition frameworks with professional agentic AI chat integration across all phases, powered by Cognizant Neuro AI technology.

## Features

### 🎯 Core Functionality
- **Sidebar Navigation**: All transition phases accessible via collapsible sidebar menu with loading indicators
- **Detailed Phase Analysis**: In-depth analysis for each phase with multiple tabs
- **Responsive Design**: Mobile-friendly with adaptive sidebar
- **Professional UI**: Modern design using Tailwind CSS
- **Loading States**: Smooth loading animations and progress indicators during navigation

### 🤖 AI Integration
- **Agentic AI Chat**: Context-aware Cognizant Neuro AI assistant available on every phase
- **Phase-Specific Guidance**: AI provides targeted assistance based on current phase
- **Intelligent Insights**: Cognizant Neuro AI-powered recommendations and analysis
- **File Upload & Risk Analysis**: Upload files for enhanced risk analysis with AI-powered mitigation suggestions

### 📊 Transition Phases
1. **AI Transition Dashboard** - Cognizant Neuro AI-powered dashboard and monitoring
2. **Due Diligence** - Comprehensive risk assessment with specialized AI-powered risk analysis, mitigation planning, and timeline management
3. **Knowledge Dashboard** - Cognizant Neuro AI-driven knowledge extraction with specialized AI assistant capabilities
4. **Shadow & Reverse Shadow** - Parallel operations monitoring
5. **Stabilization** - System optimization and stabilization
6. **Steady Support** - Ongoing Cognizant Neuro AI-driven support
7. **Reports & Analytics** - Automated reporting and insights
8. **Client Survey** - Cognizant Neuro AI-powered feedback analysis
9. **API Endpoints** - Intelligent API management
10. **Data Cleanup** - Cognizant Neuro AI-driven data quality improvement

### 📈 Analytics & Insights
- **Overview Dashboard**: High-level metrics and progress tracking
- **Detailed Metrics**: Comprehensive KPIs for each phase
- **AI Implementation Analysis**: Impact assessment of AI solutions
- **Risk Assessment**: Automated risk evaluation and mitigation
- **Timeline Tracking**: Project milestones and progress visualization

### 🎯 Due Diligence Features
The **Due Diligence** phase includes specialized functionality:

#### **Risk Agentic AI Tab** (Primary Tab)
- **Enhanced Risk Analysis**: Prominently positioned upload section with button-based interface for comprehensive document analysis
- **Smart Upload Button**: Intuitive file upload functionality with enhanced styling and clear action states
- **Real-time Risk Identification**: AI analyzes uploaded files and identifies potential risks
- **Risk Categorization**: Automatic classification into Technical, Operational, Compliance, Security, Financial, and Timeline risks
- **Risk Scoring**: Dynamic risk assessment with severity levels and impact analysis
- **Visual Analytics**: Interactive charts and metrics showing risk distribution and trends

#### **Mitigation Plan Tab**
- **Comprehensive Mitigation Strategies**: Detailed action plans for each identified risk
- **Priority-based Planning**: Risk mitigation organized by priority levels (Critical, High, Medium, Low)
- **Owner Assignment**: Clear responsibility assignment for each mitigation task
- **Timeline Management**: Specific timelines and deadlines for mitigation activities
- **Download Functionality**: Export complete mitigation plans as structured reports
- **Status Tracking**: Monitor progress of mitigation efforts with status indicators

#### **Timeline Tab**
- **Phase-specific Timeline**: Detailed timeline for Due Diligence activities
- **Milestone Tracking**: Key deliverables and checkpoint monitoring
- **Progress Visualization**: Visual representation of phase progress and completion status

### 🧠 Knowledge Dashboard Features
The **Knowledge Dashboard** phase includes specialized **Knowledge Dashboard** functionality:

#### **Knowledge AI Assist Tab**
- **Smart Documentation**: Automated extraction and organization of knowledge from legacy systems
- **Intelligent Q&A System**: AI-powered question answering based on organizational knowledge base
- **Process Mining**: Automatic discovery and mapping of business processes from system logs
- **Knowledge Graph Generation**: Automated creation of interconnected knowledge structures
- **Context-Aware Responses**: Natural language queries with source attribution
- **Real-time Knowledge Statistics**: Progress tracking for extraction accuracy and processing efficiency

#### **AI-Powered Capabilities**
- **Document Parsing & Analysis**: Intelligent extraction from various document formats
- **Workflow Discovery**: Automated business process identification and optimization
- **Dependency Mapping**: Understanding of system and process interdependencies
- **Knowledge Base Queries**: Natural language interface for knowledge retrieval
- **Interactive AI Chat**: Real-time chat interface for knowledge base queries and assistance
- **Smart Question Suggestions**: Pre-configured queries for common knowledge requests
- **Contextual Responses**: AI-powered answers with source attribution and accuracy tracking

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Router** for navigation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd AI_Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Navigation
- Use the **sidebar** to navigate between different phases
- Click the **menu button** to toggle sidebar visibility
- On mobile, tap the menu icon to access the sidebar

### Phase Analysis
- Click any phase in the sidebar or overview cards to view detailed analysis
- Use the **tabs** within each phase for different types of analysis:
  - **Overview**: Key metrics and summary
  - **Detailed Metrics**: Comprehensive performance data
  - **Agentic AI Analysis**: Cognizant Neuro AI implementation details and impact
  - **Risk Assessment**: Risk evaluation and mitigation strategies
  - **Timeline**: Project milestones and progress

### Cognizant Neuro AI Chat Assistant
- The **Cognizant Neuro AI chat** button is available in the bottom-right corner
- Chat provides context-aware assistance based on the current phase
- Ask questions about metrics, Cognizant Neuro AI implementations, best practices, or get general guidance

## Key Features Explained

### Sidebar Navigation
- **Collapsible design** for desktop users
- **Mobile-responsive** overlay for smaller screens
- **Visual indicators** showing phase status and progress
- **Quick stats** showing completion status and AI implementation count

### Detailed Phase Analysis
Each phase includes:
- **Progress tracking** with visual indicators
- **Key metrics** with trend analysis
- **Cognizant Neuro AI implementation showcase** with impact assessment
- **Risk management** with mitigation strategies
- **Timeline visualization** with milestone tracking

### Agentic AI Chat
- **Context-aware responses** based on current phase
- **Professional guidance** for transition management
- **Real-time assistance** with metrics interpretation
- **Best practices recommendations** for Cognizant Neuro AI implementation

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── AgenticChat.tsx     # AI chat component
│   ├── Dashboard.tsx       # Main dashboard
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── PhaseCard.tsx       # Phase overview cards
│   └── DetailedPhaseAnalysis.tsx  # Detailed phase view
├── data/               # Mock data and types
├── types/              # TypeScript type definitions
└── index.css          # Global styles
```

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Customization

### Adding New Phases
1. Update the `mockPhases` array in `src/data/mockData.ts`
2. Add appropriate icons in the `getPhaseIcon` function in `Sidebar.tsx`
3. Update AI chat responses in `AgenticChat.tsx`

### Modifying Metrics
- Edit the `keyMetrics` property in phase objects
- Customize metric calculations in `DetailedPhaseAnalysis.tsx`

### Styling
- Tailwind classes can be customized in `tailwind.config.js`
- Global styles are in `src/index.css`

## Future Enhancements

- Real-time data integration
- Advanced analytics and reporting
- User authentication and role management
- Export functionality for reports
- Integration with external AI services
- Advanced charting and visualization

## License

MIT License - feel free to use this project as a foundation for your own Cognizant Neuro AI transition platform.
