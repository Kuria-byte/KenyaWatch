# UwaziHub: Kenya's Transparency & Citizen Empowerment Platform 🇰🇪  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
**Open-source platform for tracking government spending, holding leaders accountable, and driving civic action.**  

---

## **Table of Contents**  
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Contributing](#contributing)  
7. [License](#license)  
8. [Acknowledgments](#acknowledgments)  
9. [Contact](#contact)  

---

## **Project Overview**  
**UwaziHub** (Swahili for "Transparency Hub") is an open-source platform empowering Kenyan citizens to:  
- 📊 **Track government spending** (budgets, debt, projects).  
- 🕵️ **Expose corruption** and see its real-world impact.  
- 🗳️ **Hold leaders accountable** with impeachment petitions and approval ratings.  
- 🤖 **Learn civics** via an AI chatbot.  
- 📢 **Amplify social issues** (strikes, stalled projects).  

Built ahead of Kenya’s 2027 elections, this project aims to foster transparency and civic engagement.  

---

## **Features**  
### **1. Interactive Dashboard**  
- **Key Stats**: National debt, unemployment, inflation, corruption losses.  
- **Data Visualizations**: Filter budgets by county, year, or sector.  
  ![Dashboard Preview](link-to-screenshot.png)  

### **2. Corruption Impact CTAs**  
- **Scandal Spotlight**: "KES 1B stolen = 10 hospitals or 500km of roads lost."  
- **Report Fraud**: Upload evidence, tag location, and submit.  

### **3. Leader Accountability**  
- **Searchable Profiles**: Track MPs, Governors, and MCAs’ project execution, audit scores, and ratings.  
- **Impeachment Petitions**: Collect signatures to remove underperforming leaders.  

### **4. Social Action Tools**  
- **Citizen Alerts**: Shareable links for strikes, protests, or petitions.  
- **Worst/Best Performers**: County leaderboards by project completion and public ratings.  

### **5. AI Chatbot (UwaziBot)**  
- Ask questions like:  
  - "What is the 2024 health budget?"  
  - "How does GDP affect my daily life?"  

---

## **Tech Stack**  
- **Frontend**: React, Next.js, D3.js, Material-UI  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL (budgets/leaders), MongoDB (user reports)  
- **APIs**: OpenAI (chatbot), Kenyan National Treasury, KNBS  
- **Hosting**: Vercel (Frontend), AWS EC2 (Backend)  

---

## **Installation**  
1. **Clone the repo**:  
   ```bash  
   git clone https://github.com/yourusername/UwaziHub.git  
   cd UwaziHub  

 Install dependencies:

bash
Copy
cd client && npm install  
cd ../server && npm install  
Set up environment variables:

env
Copy
# .env (Server)  
DATABASE_URL=postgresql://user:password@localhost:5432/uwazihub  
OPENAI_API_KEY=your_key  
TWILIO_AUTH_TOKEN=your_token  
Run the app:

bash
Copy
# Start backend  
cd server && npm start  

# Start frontend  
cd client && npm run dev  
  

  Usage
Explore the Dashboard:

Filter budgets by county or sector.

Click "Scandal Spotlight" to see corruption impacts.

Report Corruption:

Click "Report Fraud", upload evidence, and submit.

Impeach a Leader:

Search for a leader → Click "Impeach Now" → Submit your signature.

Ask UwaziBot:

Type "What’s Makueni County’s health budget?" in the chatbot.


---
Contributing
We welcome contributions!

Fork the repository.

Create a branch: git checkout -b feature/your-feature.

Commit changes: git commit -m 'Add your feature'.

Push: git push origin feature/your-feature.

Open a Pull Request.

Guidelines:

Add tests for new features.

Update documentation (README, code comments).

License
Distributed under the MIT License. See LICENSE for details.

Acknowledgments
Data sources: Kenya National Treasury, KNBS.

Tools: React, OpenAI, Twilio.

Contact
Your Name

📧 Email: your.ianmwitumi.com

🌐 GitHub: @kuriabyte



---

### **Project Summary**  
**UwaziHub** is an open-source platform designed to combat corruption and empower Kenyan citizens through transparency. It features:  
- **Real-time tracking** of government budgets, projects, and debt.  
- **Leader profiles** with performance metrics and impeachment tools.  
- **AI-driven civic education** and corruption impact visualizations.  
- **Social action CTAs** to amplify citizen voices.  

**Tech**: React, Next.js, Node.js, PostgreSQL, OpenAI.  
**Goal**: Prepare citizens for the 2027 elections with data-driven accountability.  

**Get Involved**: Contribute on GitHub to help build a more transparent Kenya! 🌍✨  

Let's make Kenya work! 🚀
