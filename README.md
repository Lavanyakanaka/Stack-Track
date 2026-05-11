# STACK TRACK - Power Apps Application

A modern, cloud-based application for tracking student coding practice across multiple platforms (LeetCode, GeeksforGeeks, CodeChef).

## Team Members

| Name | Roll Number |
|------|-------------|
| Kella Lavanya | 23A91A1228 |
| Killamsetty Keerthika | 23A91A1229 |
| Kankatala Madhurima | 23A91A1226 |
| Kurru Jayavardhan | 23MH1A4465 |
| Appanapalli Sunitha | 23MH1A05P9 |
| Sudarsanam Pavan | 23P31A05I9 |

## Project Overview

Purpose: Enable students to track coding practice and receive personalized AI-driven recommendations for skill improvement.

Target Users:
- Students (primary users)
- Faculty members (analytics dashboard)
- Administrators

Scale: Designed for 500+ concurrent users.

## Key Features

### 1. Student Dashboard
- Total problems solved across all platforms
- Platform-specific statistics (LeetCode, GFG, CodeChef)
- Quick stats cards showing total solved, difficulty split, streak, and topic proficiency

### 2. Platform-Specific Views
- Dedicated screens for each platform
- Platform profiles and linked accounts
- Problem history with submission details
- Success rates by difficulty and topic

### 3. Progress Analytics
- Difficulty breakdown charts
- Topic-wise progress visualization
- Timeline of solved problems
- Cross-platform comparative analysis

### 4. AI Suggestions
- Personalized recommendations based on weak topics, attempted difficulty levels, and success rate
- Suggested problem sets and learning paths
- Daily and weekly digest support

### 5. Profile Management
- Add or edit platform usernames (LeetCode, GFG, CodeChef)
- Update personal information
- Notification preferences

### 6. Faculty Dashboard
- Class-wide analytics
- Student performance overview
- Problem-set assignment support
- Progress tracking by topic and difficulty

## Technical Architecture

Platform: Microsoft Power Apps (Canvas App)
- Real-time data from Dataverse
- Mobile-responsive design
- Integration with Power Automate workflows

Data Layer: Dataverse
- 6 core tables with relationships
- Automated sync workflows
- Role-based access control

## Project Structure

```
Stack Track/
├── Dataverse Tables/          # Table schemas and configurations
├── Screens/                   # Canvas screen specifications
├── Workflows/                 # Power Automate workflows
├── Documentation/             # Setup guides and specifications
├── UI Design/                 # Design system and mockups
└── README.md                  # This file
```

## Color Scheme

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Orange | #E3562B | Headers, CTAs, accents |
| Primary Teal | #1D3639 | Navigation, secondary elements |
| Success Green | #28A745 | Solved problems, positive actions |
| Light Gray | #F5F5F5 | Backgrounds, cards |
| Dark Gray | #333333 | Text |

## Implementation Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1 | Week 1 | Create Dataverse tables, define relationships |
| Phase 2 | Week 1-2 | Build core screens (Dashboard, Profile) |
| Phase 3 | Week 2-3 | Implement progress charts and AI screen |
| Phase 4 | Week 3 | Create workflows and test integrations |
| Phase 5 | Week 4 | QA, optimization, faculty dashboard |
| Phase 6 | Week 4-5 | Deployment and onboarding |

## Next Steps

1. Review [Dataverse Table Specifications](./Documentation/DATAVERSE_SCHEMA.md)
2. Study [Screen Design Specifications](./Documentation/SCREEN_SPECIFICATIONS.md)
3. Check [Implementation Guide](./Documentation/IMPLEMENTATION_GUIDE.md)
4. Set up Power Apps environment
5. Create Dataverse tables
6. Build Canvas screens
7. Configure workflows
8. Test with sample data

## Support and Documentation

- [Dataverse Schema](./Documentation/DATAVERSE_SCHEMA.md)
- [Screen Specifications](./Documentation/SCREEN_SPECIFICATIONS.md)
- [Workflow Definitions](./Workflows/POWER_AUTOMATE_WORKFLOWS.md)
- [Implementation Guide](./Documentation/IMPLEMENTATION_GUIDE.md)

Version: 1.0  
Last Updated: May 11, 2026  
Status: Ready for Development
=======
## 📱 Application Screens

1. **Home / Login Screen** — Student authentication
2. **Student Dashboard** — Total problems, progress charts, quick stats
3. **Platform Details Screen** — Problems solved per platform
4. **Problem List Screen** — Filterable by difficulty, topic, date
5. **AI Suggestions Screen** — Personalized learning recommendations
6. **Faculty Dashboard** — Class-wide analytics and monitoring

---

## 🤖 AI Integration Flow

```
Student clicks "Get AI Suggestions"
        ↓
Power Automate collects problem-solving history
        ↓
Data sent to Claude API / Azure OpenAI
        ↓
AI analyzes: topics covered, difficulty levels, gaps
        ↓
Returns personalized suggestions
        ↓
Stored in Dataverse → Displayed in Power Apps
```

**Sample AI Output:**
> *"You've solved 40 Easy problems in Arrays. You're ready for Medium difficulty. Your next focus should be Trees and Graphs. Start with these 5 problems: ..."*

---

## 🔄 Power Automate Flows

| Flow | Trigger | Action |
|------|---------|--------|
| Daily Data Sync | Scheduled (Every 24 hrs) | Fetches latest data from all platforms |
| Manual Refresh | Button click in app | On-demand sync for current student |
| AI Analysis | Student request | Sends data to AI, stores suggestions |
| New Student Setup | New student record | Validates usernames, creates initial records |

---

## 💰 Cost Estimate

| Component | Monthly Cost |
|-----------|-------------|
| LeetCode API | ₹0 (Free) |
| CodeChef API | ₹0 (Free tier) |
| Azure Functions (GFG) | ₹0 (Free tier) |
| Power Platform | ₹0 (College Microsoft 365 Education license) |
| AI Suggestions (Claude API) | ₹50–200 |
| **Total (100 students)** | **₹50–200/month** |

---

## 🗺️ Implementation Roadmap

- [x] **Phase 1** — Database Design (Dataverse tables)
- [ ] **Phase 2** — Platform API Integration (LeetCode, GFG, CodeChef)
- [ ] **Phase 3** — Power Apps UI (Student & Faculty dashboards)
- [ ] **Phase 4** — AI Integration (Claude API / Azure OpenAI)
- [ ] **Phase 5** — Testing & College-wide Deployment

---

## ⚡ How to Get Started

### Prerequisites
- Microsoft 365 Education account (college email)
- Access to [Power Apps](https://make.powerapps.com)
- Azure subscription (free tier is sufficient)

### Setup Steps

1. **Access Power Apps**
   ```
   Go to https://make.powerapps.com
   Sign in with your college Microsoft account
   ```

2. **Create Dataverse Tables**
   - Navigate to Tables → New Table
   - Create all 6 tables as per the schema above

3. **Add Sample Data**
   - Add LeetCode, GFG, CodeChef to the Platforms table
   - Add a few test students

4. **Set Up Power Automate Flows**
   - Create the Daily Sync flow
   - Configure HTTP connector for LeetCode GraphQL API

5. **Build Power Apps UI**
   - Create canvas app
   - Connect to Dataverse tables
   - Build screens as per wireframes

6. **Integrate AI**
   - Set up Claude API or Azure OpenAI
   - Configure Power Automate to call AI endpoint
   - Display suggestions in app

---

## 🔌 LeetCode API Quick Reference

```json
POST https://leetcode.com/graphql

{
  "query": "query { matchedUser(username: \"YOUR_USERNAME\") { submitStats { acSubmissionNum { difficulty count } } } }"
}
```

No authentication required. Free to use.

---

## 🆚 STACK TRACK vs Codolio

| Feature | Codolio | STACK TRACK |
|---------|---------|-------------|
| Target User | Individual developers | Educational institutions |
| Faculty Dashboard | ❌ | ✅ |
| AI Suggestions | ❌ | ✅ |
| Data Ownership | Third-party | College owns data |
| Customization | Fixed features | Fully customizable |
| Class Analytics | ❌ | ✅ |
| LMS Integration | ❌ | ✅ |
| Cost for College | Per-user fees | Institutional license |

---

## 🚀 Future Enhancements

- 🏆 Leaderboards and gamification
- 🏅 Skill badges and achievements
- 🏢 Company-specific preparation paths
- 👥 Peer mentoring and study groups
- 📊 Contest tracking (Codeforces, HackerRank)
- 💡 Code quality analysis by AI

---

## 📄 License

This project is developed for educational purposes at the college level.

---

## 📬 Contact

For queries, reach out to any team member via college email.
>>>>>>> 2b08c97a8dc4a7684a6f33f813c4c79adba66ad7
