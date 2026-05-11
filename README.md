# STACK TRACK - Power Apps Application

A modern, cloud-based application for tracking student coding practice across multiple platforms (LeetCode, GeeksforGeeks, CodeChef).

## Project Overview

**Purpose**: Enable students to track their coding practice and receive personalized AI-driven recommendations for skill improvement.

**Target Users**: 
- Students (primary users)
- Faculty members (analytics dashboard)
- Administrators

**Scale**: Designed for 500+ concurrent users

---

## Key Features

### 1. **Student Dashboard**
- Total problems solved across all platforms
- Platform-specific statistics (LeetCode, GFG, CodeChef)
- Quick stats cards showing:
  - Total problems solved
  - Easy/Medium/Hard breakdown
  - Streak information
  - Topic proficiency

### 2. **Platform-Specific Views**
- Dedicated screens for each platform
- Platform user profiles and linked accounts
- Problem history with submission details
- Success rates by difficulty and topic

### 3. **Progress Analytics**
- Difficulty breakdown charts
- Topic-wise progress visualization
- Solver timeline (problems solved over time)
- Comparative analysis across platforms

### 4. **AI Suggestions**
- Personalized recommendations based on:
  - Weak topics
  - Difficulty levels attempted
  - Success rates
- Suggested problem sets and learning paths
- Daily/weekly digest emails

### 5. **Profile Management**
- Add/edit platform usernames (LeetCode, GFG, CodeChef)
- Update personal information
- Notification preferences
- Privacy settings

### 6. **Faculty Dashboard**
- Class-wide analytics
- Student performance overview
- Problem set assignments
- Progress tracking by topic/difficulty
- Export reports

---

## Technical Architecture

### Platform: Microsoft Power Apps (Canvas App)
- Real-time data from Dataverse
- Mobile-responsive design
- Integration with Power Automate for workflows

### Data Layer: Dataverse
- 6 Core tables with relationships
- Automated data sync workflows
- Role-based access control

---

## Project Structure

```
Stack Track/
├── Dataverse Tables/          # Table schemas and configurations
├── Screens/                    # Canvas screen specifications
├── Workflows/                  # Power Automate workflows
├── Documentation/              # Setup guides and specifications
├── UI Design/                  # Design system and mockups
└── README.md                   # This file
```

---

## Color Scheme

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Orange | #E3562B | Headers, CTAs, accents |
| Primary Teal | #1D3639 | Navigation, secondary elements |
| Success Green | #28A745 | Solved problems, positive actions |
| Light Gray | #F5F5F5 | Backgrounds, cards |
| Dark Gray | #333333 | Text |

---

## Implementation Timeline

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1 | Week 1 | Create Dataverse tables, define relationships |
| Phase 2 | Week 1-2 | Build core screens (Dashboard, Profile) |
| Phase 3 | Week 2-3 | Implement progress charts, AI screen |
| Phase 4 | Week 3 | Create workflows, test integrations |
| Phase 5 | Week 4 | QA, optimization, faculty dashboard |
| Phase 6 | Week 4-5 | Deployment, user onboarding |

---

## Next Steps

1. Review [Dataverse Table Specifications](./Documentation/DATAVERSE_SCHEMA.md)
2. Study [Screen Design Specifications](./Documentation/SCREEN_SPECIFICATIONS.md)
3. Check [Implementation Guide](./Documentation/IMPLEMENTATION_GUIDE.md)
4. Set up Power Apps environment
5. Create tables in Dataverse
6. Build screens using provided specifications
7. Configure workflows
8. Test with sample data

---

## Support & Documentation

- [Dataverse Schema](./Dataverse%20Tables/)
- [Screen Mockups](./UI%20Design/)
- [Workflow Definitions](./Workflows/)
- [Complete Setup Guide](./Documentation/IMPLEMENTATION_GUIDE.md)

---

**Version**: 1.0  
**Last Updated**: May 10, 2026  
**Status**: Ready for Development
