# TruthKenya: Empowering Citizen Oversight & Government Transparency 🇰🇪

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13.0+-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.0+-blue.svg)](https://www.postgresql.org/)

**An open-source platform that brings transparency to government spending, empowers citizens with critical data, and creates accountability mechanisms for public officials.**

<p align="center">
  <img src="docs/images/truthkenya-dashboard.png" alt="TruthKenya Dashboard" width="800"/>
</p>

---

## 📚 Table of Contents

1. [Overview](#-overview)
2. [Core Features](#-core-features)
3. [System Architecture](#-system-architecture)
4. [Tech Stack](#-tech-stack)
5. [Frontend Components](#-frontend-components)
6. [Backend Infrastructure](#-backend-infrastructure)
7. [Database Schema](#-database-schema)
8. [Installation Guide](#-installation-guide)
9. [API Documentation](#-api-documentation)
10. [Development Workflow](#-development-workflow)
11. [Current Challenges](#-current-challenges)
12. [Future Roadmap](#-future-roadmap)
13. [Contributing](#-contributing)
14. [License](#-license)
15. [Acknowledgments](#-acknowledgments)
16. [Team](#-team)

---

## 🌟 Overview

**TruthKenya** stands at the intersection of civic technology, data transparency, and citizen empowerment. Born from the need to demystify government operations and create accessible pathways for civic engagement, our platform transforms complex government data into actionable insights for everyday citizens.

### Mission Statement

> To empower Kenyan citizens with transparent access to government data, enabling informed civic participation and fostering accountability in public service.

### Project Vision

By 2027, we aim to:
- Reach 1 million active monthly users
- Track 100% of national government projects
- Enable citizens to monitor 5,000+ elected officials
- Create the most comprehensive open data portal for Kenyan governance

<p align="center">
  <img src="docs/images/user-growth-projection.png" alt="User Growth Projection" width="600"/>
</p>

---

## 🎯 Core Features

### 🔍 Interactive Dashboard

Real-time visualization of critical national metrics:
- National debt & budget allocation
- Unemployment & inflation rates
- Corruption index & financial losses
- Project completion rates by county

```jsx
// Dashboard KPI Component
const DashboardKPI = ({ title, value, change, trend, icon }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </p>
      </CardContent>
    </Card>
  )
}
```

### 🔥 Hot Topics Tracking

Dynamic tabs for trending national issues with fact-checked information:

<p align="center">
  <img src="docs/images/hot-topics-interface.png" alt="Hot Topics Interface" width="700"/>
</p>

**Implementation Details:**

```jsx
// Hot Topics Component Structure
const HotTopics = () => {
  const [activeTab, setActiveTab] = useState('shif');
  
  const topics = {
    shif: {
      title: 'SHIF Health Scheme',
      status: 'Controversial',
      stats: {
        enrollment: '2.1M Kenyans (17% of Target)',
        collected: 'KES 4.2B',
        utilized: 'KES 1.8B'
      },
      sentiment: {
        support: 28,
        oppose: 62,
        neutral: 10
      },
      updates: [
        { source: 'Daily Nation', title: 'NHIF Transition Deadline Extended to 2025' },
        { source: 'Citizen TV', title: 'Court Halts SHIF Deductions for Informal Sector' }
      ]
    },
    // Additional topics: minerals, housing, security, etc.
  };
  
  return (
    <div className="hot-topics-container">
      {Object.keys(topics).map(key => (
        <div 
          key={key}
          className={`topic-tab ${activeTab === key ? 'expanded' : 'collapsed'}`}
          onClick={() => setActiveTab(key)}
        >
          <div className="topic-header">
            <div className="topic-left">
              <TopicIcon name={key} />
              <h3>{topics[key].title}</h3>
              <StatusTag status={topics[key].status} />
            </div>
            <div className="topic-right">
              <span className="key-stat">{getKeyStatForTopic(key, topics)}</span>
              <TrendIndicator data={topics[key].sentiment} />
              <ChevronIcon direction={activeTab === key ? 'down' : 'right'} />
            </div>
          </div>
          
          {activeTab === key && (
            <div className="topic-content">
              <StatsSection data={topics[key].stats} />
              <NewsSection updates={topics[key].updates} />
              <SentimentChart data={topics[key].sentiment} />
              <ActionButtons topic={key} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

### 👤 Leader Accountability Center

Comprehensive profiles for elected officials with:
- Project completion metrics
- Attendance records
- Fund utilization
- Public approval ratings
- Impeachment petition capabilities

### 🚨 Citizen Alerts System

Real-time notification system for:
- New corruption scandals
- Budget approvals
- Service disruptions
- Public hearings

### 📊 Project Tracking Interface

Monitor government projects from initiation to completion:
- Budget allocation & utilization
- Timeline compliance
- Contractor information
- Environmental impact assessments
- Citizen feedback mechanisms

### 💬 TruthBot AI Assistant

AI-powered chatbot providing:
- Budget explanations in simple language
- Policy impact analysis
- Civic education on government processes
- Data interpretation assistance

---

## 🏗️ System Architecture

TruthKenya employs a modern, scalable architecture designed to handle varying loads and maintain responsiveness.

<p align="center">
  <img src="docs/images/system-architecture.png" alt="System Architecture Diagram" width="800"/>
</p>

### Key Architecture Components:

1. **Client Layer**
   - React/Next.js frontend
   - Progressive Web App capabilities
   - Server-side rendering for SEO optimization
   - Client-side data caching

2. **API Gateway**
   - Request routing and load balancing
   - Authentication and authorization
   - Rate limiting and DDoS protection
   - Response caching

3. **Microservices**
   - User management service
   - Data aggregation service
   - Notification service
   - Analytics service
   - Search service

4. **Data Processing**
   - ETL pipelines for government data
   - Data normalization and cleaning
   - Real-time data processing
   - Machine learning pipelines

5. **Persistence Layer**
   - PostgreSQL for structured data
   - MongoDB for unstructured data
   - Redis for caching
   - MinIO for object storage

6. **External Integrations**
   - Government APIs
   - Payment gateways
   - Social media platforms
   - SMS services

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 18, Next.js 13
- **State Management**: Redux Toolkit, React Query
- **Styling**: Tailwind CSS, Shadcn UI
- **Visualization**: D3.js, Recharts
- **PWA**: Next PWA

### Backend
- **Framework**: Node.js, Express.js
- **API**: RESTful + GraphQL
- **Authentication**: JWT, OAuth 2.0
- **Real-time**: Socket.IO

### Database
- **Primary**: PostgreSQL 14
- **NoSQL**: MongoDB
- **Caching**: Redis
- **Search**: Elasticsearch

### DevOps
- **CI/CD**: GitHub Actions
- **Containerization**: Docker, Kubernetes
- **Hosting**: Vercel (Frontend), AWS (Backend)
- **Monitoring**: Prometheus, Grafana

### AI/ML
- **NLP**: OpenAI API, Hugging Face
- **Data Analysis**: Python, Pandas, NumPy
- **ML Ops**: TensorFlow Serving

---

## 🎨 Frontend Components

### Component Library

TruthKenya uses a custom component library built on Shadcn UI and Tailwind CSS. This ensures consistent styling and interaction patterns across the platform.

```jsx
// Example of a reusable card component
export const DataCard = ({
  title,
  value,
  change,
  period = "vs. last period",
  trend = "neutral",
  icon,
  className,
}) => {
  const trendColors = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-500"
  };
  
  return (
    <div className={cn(
      "p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
      className
    )}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p className={`text-xs flex items-center mt-1 ${trendColors[trend]}`}>
            {trend === 'positive' && <ArrowUpIcon className="w-3 h-3 mr-1" />}
            {trend === 'negative' && <ArrowDownIcon className="w-3 h-3 mr-1" />}
            {change} {period}
          </p>
        )}
      </div>
    </div>
  );
};
```

### Responsive Design Strategy

TruthKenya employs a mobile-first design approach, ensuring the platform is accessible on all devices.

```jsx
// Responsive container example
const DashboardLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};
```

### Accessibility Focus

All components are developed with accessibility in mind, ensuring compliance with WCAG 2.1 guidelines.

```jsx
// Accessible button component
const AccessibleButton = ({ 
  children, 
  onClick, 
  disabled = false,
  ariaLabel
}) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
```

---

## 🔧 Backend Infrastructure

### API Structure

TruthKenya uses a RESTful API architecture with resource-based URL structure.

```javascript
// Example API routes
const router = express.Router();

// Projects endpoints
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.get('/projects/county/:countyId', projectController.getProjectsByCounty);
router.get('/projects/category/:category', projectController.getProjectsByCategory);

// Leaders endpoints
router.get('/leaders', leaderController.getAllLeaders);
router.get('/leaders/:id', leaderController.getLeaderById);
router.get('/leaders/performance', leaderController.getLeadersByPerformance);

// Citizen reporting endpoints
router.post('/reports', authenticateUser, reportController.createReport);
router.get('/reports', reportController.getReports);
router.get('/reports/trending', reportController.getTrendingReports);

module.exports = router;
```

### Authentication System

Secure authentication using JWT with refresh token rotation for enhanced security.

```javascript
// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Data Processing Pipelines

Automated ETL processes for integrating government data from various sources.

```javascript
// Example data processing job
const processGovernmentData = async () => {
  try {
    // 1. Extract data from sources
    const budgetData = await fetchFromSource('budget', API_ENDPOINTS.TREASURY);
    const projectData = await fetchFromSource('projects', API_ENDPOINTS.PROJECTS);
    
    // 2. Transform data
    const normalizedBudgetData = normalizeBudgetData(budgetData);
    const normalizedProjectData = normalizeProjectData(projectData);
    
    // 3. Validate data integrity
    validateData(normalizedBudgetData, 'budget');
    validateData(normalizedProjectData, 'projects');
    
    // 4. Load data into database
    await BudgetModel.bulkWrite(createBulkUpsertOperations(normalizedBudgetData));
    await ProjectModel.bulkWrite(createBulkUpsertOperations(normalizedProjectData));
    
    // 5. Update last sync timestamp
    await DataSyncModel.updateOne(
      { type: 'government_data' },
      { $set: { lastSyncAt: new Date() } },
      { upsert: true }
    );
    
    console.log('Government data processing completed successfully');
  } catch (error) {
    console.error('Error processing government data:', error);
    sendAlertToAdmins('data_processing_failure', error.message);
  }
};
```

---

## 📊 Database Schema

### Core Entities

<p align="center">
  <img src="docs/images/database-schema.png" alt="Database Schema Diagram" width="700"/>
</p>

### PostgreSQL Schemas

```sql
-- Projects Schema
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  county_id INTEGER REFERENCES counties(id),
  budget_allocation DECIMAL(15, 2) NOT NULL,
  funds_utilized DECIMAL(15, 2) DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE,
  completion_percentage INTEGER DEFAULT 0,
  contractor VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaders Schema
CREATE TABLE leaders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(100) NOT NULL,
  representing VARCHAR(100) NOT NULL,
  county_id INTEGER REFERENCES counties(id),
  party VARCHAR(100),
  election_date DATE,
  funds_allocated DECIMAL(15, 2) DEFAULT 0,
  funds_utilized DECIMAL(15, 2) DEFAULT 0,
  attendance_percentage INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  total_projects INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Citizen Reports Schema
CREATE TABLE citizen_reports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  location VARCHAR(255),
  county_id INTEGER REFERENCES counties(id),
  evidence_urls TEXT[],
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Ratings Schema
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  leader_id INTEGER REFERENCES leaders(id),
  project_id INTEGER REFERENCES projects(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB Collections

```javascript
// Hot Topics Schema
const HotTopicSchema = new Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Active', 'Resolved', 'Controversial'], 
    default: 'Active' 
  },
  description: { type: String, required: true },
  stats: { type: Map, of: String },
  sentiment: {
    support: { type: Number, default: 0 },
    oppose: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 }
  },
  updates: [{
    source: String,
    title: String,
    url: String,
    date: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true },
  priority: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Scandal Tracker Schema
const ScandalSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  institutions: [{ type: String }],
  counties: [{ type: String }],
  impactCalculations: [{
    sector: { type: String },
    lostOpportunities: { type: String },
    estimatedValue: { type: Number }
  }],
  status: { 
    type: String, 
    enum: ['Alleged', 'Under Investigation', 'In Court', 'Prosecuted', 'Acquitted'],
    default: 'Alleged'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

---

## 📥 Installation Guide

### Prerequisites
- Node.js (v16.0+)
- PostgreSQL (v14.0+)
- MongoDB (v5.0+)
- Redis (v6.0+)

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/kuriabyte/truthkenya.git
cd truthkenya

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed

# Start the development server
npm run dev
```

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📝 API Documentation

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
```

### Projects

```
GET /api/projects
GET /api/projects/:id
GET /api/projects/county/:countyId
GET /api/projects/category/:category
```

### Leaders

```
GET /api/leaders
GET /api/leaders/:id
GET /api/leaders/county/:countyId
GET /api/leaders/performance
```

### Reports

```
POST /api/reports
GET /api/reports
GET /api/reports/trending
```

### Example API Response

```json
{
  "status": "success",
  "data": {
    "projects": [
      {
        "id": 1,
        "title": "Nairobi Expressway",
        "description": "A 27km elevated highway connecting Jomo Kenyatta International Airport to Nairobi's Westlands area.",
        "category": "Infrastructure",
        "status": "Completed",
        "county": "Nairobi",
        "budget_allocation": 65000000,
        "funds_utilized": 65000000,
        "start_date": "2020-10-15",
        "end_date": "2022-04-30",
        "completion_percentage": 100,
        "contractor": "China Road and Bridge Corporation",
        "images": ["https://example.com/expressway1.jpg", "https://example.com/expressway2.jpg"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 250,
      "pages": 25
    }
  }
}
```

---

## 🛠️ Development Workflow

### Branching Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release branches

### Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
feat: add hot topics tracking component
fix: resolve leader profile loading issue
docs: update API documentation
style: format code with prettier
refactor: restructure data processing pipeline
test: add unit tests for authentication
chore: update dependencies
```

### Pull Request Process

1. Create a feature branch from `develop`
2. Implement your changes
3. Write or update tests
4. Submit a pull request to `develop`
5. Request code review
6. Address review comments
7. Merge after approval

### Testing Strategy

- Unit tests for individual components and functions
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Accessibility testing using axe-core
- Performance testing using Lighthouse

---

## 🚧 Current Challenges

### Technical Challenges

1. **Data Reliability**
   - Inconsistent data formats from government sources
   - Manual data entry requirements for some datasets
   - Data verification and fact-checking processes

2. **Scale & Performance**
   - Optimizing for low-bandwidth connections in rural areas
   - Managing database growth with increasing user reports
   - Ensuring real-time updates without excessive server load

3. **Security Concerns**
   - Protecting whistleblower identities
   - Preventing malicious reporting
   - Securing sensitive government data

### Operational Challenges

1. **User Verification**
   - Limited access to official voter registration APIs
   - Balancing verification with accessibility

2. **Legal Considerations**
   - Navigating defamation risks for corruption reporting
   - Compliance with data protection regulations
   - Managing official government responses

3. **Community Management**
   - Preventing platform misuse for political attacks
   - Maintaining factual accuracy in user-generated content
   - Building an effective moderation system

---

## 🔮 Future Roadmap

### Q2 2025
- Blockchain-based verification for corruption reports
- Advanced sentiment analysis for public opinion tracking
- Expanded vernacular language support (Swahili, Kikuyu, Luo, etc.)

### Q3 2025
- AR visualizations for physical project locations
- Integration with parliamentary voting records
- Community-led investigation features

### Q4 2025
- Candidate comparison tools for 2027 elections
- Expanded county-level data dashboards
- Verified community journalist program

### 2026
- Machine learning for corruption pattern detection
- Decentralized governance structure for platform oversight
- API ecosystem for third-party civic tech integration

---

## 👥 Contributing

We welcome contributions from developers, designers, data scientists, and civic activists.

### Getting Started

1. Review open issues or create a new one
2. Fork the repository
3. Create your feature branch
4. Submit a pull request

### Contributor Guidelines

- Follow code style and testing requirements
- Update documentation for any new features
- Respect our code of conduct

### Areas We Need Help

- Data visualization specialists
- Kenyan language translators
- Government data experts
- UX researchers
- Backend developers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- The **Code for Kenya** community for their civic tech inspiration
- **Transparency International Kenya** for data sources
- **Open Government Partnership** for best practices
- All the citizens who have contributed reports and feedback

---

## 👨‍💻 Team

### Core Team

**Ian Kuria** - Lead Developer & Project Architect  
[GitHub](https://github.com/kuriabyte) | [LinkedIn](https://linkedin.com/in/iankuria) | [Website](https://kuria.pro)

**Contributors**
- David Mwangi - Backend Developer
- Jane Njeri - UX/UI Designer
- Peter Omondi - Data Scientist

### Contact Us

📧 Email: info@truthkenya.org  
🐦 Twitter: [@TruthKenyaOrg](https://twitter.com/TruthKenyaOrg)  
📱 Telegram: [t.me/TruthKenya](https://t.me/TruthKenya)

---

<p align="center">
  <b>TruthKenya</b> - Empowering citizens, ensuring transparency, building a better Kenya 🇰🇪
</p>
