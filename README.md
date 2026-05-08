# 🚀 STACK TRACK
### Student Coding Profile Tracker

> A centralized, AI-powered platform built on Microsoft Power Platform to track student coding progress across multiple platforms and provide personalized learning recommendations.

---

## 👥 Team Members

| Name | Roll Number |
|------|-------------|
| Kella Lavanya | 23A91A1228 |
| Killamsetty Keerthika | 23A91A1229 |
| Kankatala Madhurima | 23A91A1226 |
| Kurru Jayavardhan | 23MH1A4465 |
| Appanapalli Sunitha | 23MH1A05P9 |
| Sudarsanam Pavan | 23P31A05I9 |

---

## 📌 Project Overview

STACK TRACK solves a real problem faced by CS students and colleges — there is no centralized way to monitor coding practice across multiple platforms. Students juggle between LeetCode, GeeksforGeeks, and CodeChef separately, while faculty have no visibility into student progress.

STACK TRACK brings everything into **one place**, adds **AI-powered suggestions**, and gives **faculty oversight** — all built on Microsoft Power Platform.

---

## 🔍 Problem Statement

- Students practice on multiple coding platforms but have **no unified dashboard**
- Faculty have **no visibility** into student coding activity
- Students receive **no personalized guidance** on what to practice next
- No **institutional record** of student coding progress exists

---

## ✅ Solution

STACK TRACK provides:

- **Unified Dashboard** — View total problems solved across all platforms in one place
- **Platform Drill-Down** — Click on LeetCode, GFG, or CodeChef to see platform-specific stats
- **AI-Powered Suggestions** — Personalized recommendations like *"You've mastered arrays, now focus on Dynamic Programming"*
- **Faculty Dashboard** — Monitor entire class progress, identify struggling students
- **Automated Data Sync** — Daily automated sync with coding platforms

---

## 🎯 Supported Platforms

| Platform | Data Collection Method | Cost |
|----------|----------------------|------|
| LeetCode | GraphQL API (Public) | Free |
| GeeksforGeeks | Web Scraping via Azure Functions | Free (Azure free tier) |
| CodeChef | Official API | Free (within rate limits) |

---

## 🏗️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | Microsoft Power Apps | Student & Faculty UI |
| Database | Microsoft Dataverse | Data storage |
| Automation | Microsoft Power Automate | Data sync & AI triggers |
| AI Engine | Claude API / Azure OpenAI | Personalized suggestions |
| Scraping | Azure Functions (Python) | GFG data collection |

---

## 🗄️ Database Schema

### Tables in Dataverse

```
Students
├── Student Name (Primary)
├── Email
├── Roll Number (Unique)
├── Department (Choice)
└── Year (Choice)

Platforms
├── Platform Name (Primary)
├── Platform URL
└── Icon URL

Student Platform Profiles
├── Profile Name (Primary)
├── Student (Lookup → Students)
├── Platform (Lookup → Platforms)
├── Username on Platform
└── Profile URL

Problems
├── Problem Title (Primary)
├── Platform (Lookup → Platforms)
├── Difficulty (Easy / Medium / Hard)
├── Topics (Multi-choice)
└── Problem URL

Student Solutions
├── Student (Lookup → Students)
├── Problem (Lookup → Problems)
├── Date Solved
├── Language Used
└── Solution Code (Optional)

AI Suggestions
├── Student (Lookup → Students)
├── Suggestion Text
├── Topics to Focus
├── Recommended Problems
└── Date Generated
```

---

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
