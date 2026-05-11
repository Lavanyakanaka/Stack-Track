# Screen & UI Specifications

## Navigation Structure

### Bottom Navigation Bar
- **Dashboard** - Main student view
- **Progress** - Analytics and charts  
- **Profile** - User settings and platform accounts
- **AI** - Personalized recommendations

---

## Screen 1: Student Dashboard

### Purpose
Comprehensive overview of coding practice across all platforms.

### Layout

#### Header Section
- **Title**: "Dashboard" (Teal #1D3639)
- **Greeting**: "Hello, [FirstName]! 👋" (Dark Gray)
- **Date**: Current date and time
- **Sync Button**: "Sync Now" (Orange #E3562B) - Manual refresh

#### Quick Stats Cards (Responsive Grid)

**Card 1: Total Problems**
```
┌─────────────────┐
│ 🎯              │
│ Total Solved    │
│ [X] Problems    │
│ +5 this week    │
└─────────────────┘
```

**Card 2: Difficulty Breakdown**
```
┌─────────────────┐
│ 📊              │
│ Easy: X         │
│ Medium: X       │
│ Hard: X         │
└─────────────────┘
```

**Card 3: Streak**
```
┌─────────────────┐
│ 🔥              │
│ Current Streak  │
│ X Days          │
│ Best: Y Days    │
└─────────────────┘
```

**Card 4: Platforms**
```
┌─────────────────┐
│ 🌐              │
│ LeetCode: X     │
│ GFG: X          │
│ CodeChef: X     │
└─────────────────┘
```

#### Platform Cards (Scrollable Horizontal List)

For each platform (LeetCode, GFG, CodeChef):
```
┌──────────────────────────┐
│ [Platform Icon] LeetCode │
├──────────────────────────┤
│ Problems Solved: X       │
│ ████████░░ 80%          │
│ Last Solved: 2 hrs ago  │
│ @username                │
│ [View Details]           │
└──────────────────────────┘
```

#### Recent Activity Section
```
Recent Solutions (Last 7 Days)
┌─────────────────────────────────┐
│ [Platform] Problem Name         │
│ Difficulty: Medium | Time: 15m  │
│ Yesterday at 3:45 PM            │
├─────────────────────────────────┤
│ ...more items...                │
└─────────────────────────────────┘
```

#### Call to Action
- **Primary Button**: "Update Profiles" (Orange) - Links to Profile screen
- **Secondary Button**: "Get Suggestions" (Teal) - Links to AI screen

### Interactions
- **Platform Card Click**: Navigate to Platform Details Screen
- **Sync Button**: Trigger sync workflow
- **Recent Activity Item Click**: Show solution details

---

## Screen 2: Platform Details

### Purpose
Deep dive into a specific platform's statistics.

### Layout

#### Header
- **Back Button**: Return to Dashboard
- **Platform Name**: LeetCode (with icon and color)
- **Profile Link**: "@username" - Shows linked account

#### Profile Section
```
┌────────────────────────────────┐
│ LeetCode Profile               │
├────────────────────────────────┤
│ Linked: 2 months ago           │
│ Total Solved: 150              │
│ [Linked Profile URL]           │
│ [Unlink] [Refresh] buttons     │
└────────────────────────────────┘
```

#### Statistics Grid
```
Easy        Medium      Hard        Total
150         120         45          315
50%         40%         15%         100%
```

#### Difficulty Breakdown Chart
```
Pie Chart or Bar Chart showing:
- Easy: 50% (light blue)
- Medium: 35% (orange)
- Hard: 15% (red)
```

#### Topic-wise Progress
```
┌──────────────────────────────────┐
│ Top Topics                       │
├──────────────────────────────────┤
│ Arrays          ████████░░ 80%   │
│ Strings         ██████░░░░ 60%   │
│ Trees           █████░░░░░ 50%   │
│ DP              ███░░░░░░░ 30%   │
│ Graphs          ██░░░░░░░░ 20%   │
└──────────────────────────────────┘
```

#### Timeline/Heatmap
```
Solved Problems Over Time
(Last 30 Days - GitHub-style heatmap)
Mon Tue Wed Thu Fri Sat Sun
[Colored squares showing activity]
```

#### Solved Problems List
```
┌──────────────────────────────┐
│ Two Sum (Easy)              │
│ Solved: 3 days ago | 12 min │
├──────────────────────────────┤
│ Longest Substring (Medium)  │
│ Solved: 1 week ago | 45 min │
├──────────────────────────────┤
│ ...more problems...         │
└──────────────────────────────┘
```

#### Filters/Sorting
- Filter by: Difficulty, Topic, Date Range
- Sort by: Date Solved, Time Spent, Difficulty

---

## Screen 3: Progress Analytics

### Purpose
Comprehensive progress tracking across all platforms.

### Layout

#### Header
- **Title**: "Progress"
- **Time Period Selector**: This Week, This Month, All Time

#### Overview Cards
```
Total Problems      Success Rate    Avg Time/Problem
    350              92%                 25 min
  +10 this week                      ↓2 min from avg
```

#### Combined Difficulty Chart
```
Pie/Bar Chart (All platforms combined)
Easy: 120 (34%)
Medium: 145 (41%)  
Hard: 85 (24%)
```

#### Platform Comparison
```
Platform Comparison (Bar Chart)
LeetCode     ███████░░ 150
GFG          ████░░░░░░ 100
CodeChef     ██░░░░░░░░ 50
```

#### Topic Mastery Matrix
```
┌──────────────────────────────┐
│ Topic          Progress Level │
├──────────────────────────────┤
│ Arrays         ████████░░     │ 80%
│ Strings        ██████░░░░     │ 60%
│ Trees          █████░░░░░     │ 50%
│ DP             ███░░░░░░░     │ 30%
│ Graphs         ██░░░░░░░░     │ 20%
│ Greedy         █░░░░░░░░░     │ 10%
└──────────────────────────────┘
```

#### Timeline Graph
```
Problems Solved (Last 30 Days)
[Line Chart showing daily/cumulative progress]
X-axis: Dates
Y-axis: Number of problems
```

#### Learning Path Recommendations
```
Based on your progress:
- Recommended next topic: Graph Algorithms
- Weak areas: Greedy, Advanced DP
- Suggested difficulty: Medium
```

#### Export Button
- Download report as PDF/Excel

---

## Screen 4: Profile Management

### Purpose
Manage user account and platform profiles.

### Layout

#### Personal Information Section
```
┌─────────────────────────────┐
│ Personal Information         │
├─────────────────────────────┤
│ First Name: [_____________] │
│ Last Name:  [_____________] │
│ Email:      [_____________] │
│ Phone:      [_____________] │
│ Batch Year: [2025]          │
│ Department: [Select...]     │
│                             │
│ [Save Changes]              │
└─────────────────────────────┘
```

#### Platform Accounts Section
```
Linked Platforms

┌───────────────────────────────────┐
│ LeetCode                          │
├───────────────────────────────────┤
│ Username: @john_doe               │
│ Linked: 2 months ago              │
│ Status: ✓ Active                  │
│ Last Synced: 2 hours ago          │
│ [View Profile] [Sync] [Unlink]    │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│ GeeksforGeeks                     │
├───────────────────────────────────┤
│ Username: john_doe_gfg            │
│ Linked: 1 month ago               │
│ Status: ✓ Active                  │
│ Last Synced: 1 day ago            │
│ [View Profile] [Sync] [Unlink]    │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│ CodeChef                          │
├───────────────────────────────────┤
│ Not Yet Linked                    │
│ [Link CodeChef Account]           │
└───────────────────────────────────┘
```

#### Link New Platform Modal
```
┌─────────────────────────────┐
│ Link CodeChef Account       │
├─────────────────────────────┤
│ Enter your CodeChef         │
│ username:                   │
│ [_____________________]     │
│                             │
│ [Verify] [Cancel]           │
└─────────────────────────────┘
```

#### Settings Section
```
┌─────────────────────────────┐
│ Settings & Preferences      │
├─────────────────────────────┤
│ ☑ Email Notifications       │
│ ☐ Weekly Digest             │
│ ☐ New Suggestions Alert     │
│ ☑ Auto Sync Enabled         │
│ Time Zone: [UTC+5:30]       │
│ Language: [English]         │
│                             │
│ [Save Settings]             │
└─────────────────────────────┘
```

#### Danger Zone
```
┌─────────────────────────────┐
│ Danger Zone                 │
├─────────────────────────────┤
│ [Delete Account] (Red)      │
│                             │
│ This action is permanent    │
└─────────────────────────────┘
```

---

## Screen 5: AI Suggestions

### Purpose
Display personalized AI-generated recommendations.

### Layout

#### Header
- **Title**: "AI Recommendations"
- **Refresh Button**: Regenerate suggestions (Orange)
- **Time**: "Last updated: 2 hours ago"

#### Suggestion Cards (Stacked)

**Suggestion Card Template**
```
┌─────────────────────────────────┐
│ 🎯 Priority: HIGH              │
├─────────────────────────────────┤
│ [Category Badge] Focus Area     │
│                                 │
│ Master Binary Search Trees      │
│                                 │
│ You've solved 40% of BST        │
│ problems. Solving the next      │
│ 10 medium-level problems will   │
│ boost your proficiency.         │
│                                 │
│ Difficulty: Medium              │
│ Est. Time: 5-8 hours            │
│ Related Problems: 15             │
│                                 │
│ [Accept] [Dismiss] [Details]    │
└─────────────────────────────────┘
```

#### Types of Suggestions

**1. Topic Recommendation**
- Weak topic identification
- Why it matters
- Suggested problems
- Time estimate

**2. Difficulty Progression**
- Current difficulty mastery
- Next difficulty level
- Why ready for advancement
- 5 recommended problems

**3. Problem Set Suggestion**
- Themed problem set
- Learning objective
- Number of problems
- Estimated duration

**4. Personalized Learning Path**
- Multi-week learning plan
- Topic sequence
- Difficulty progression
- Estimated completion date

#### Filter Options
```
Show: [All] [High] [Medium] [Low] Priority
Type: [All] [Topic] [Difficulty] [Path] [Set]
```

#### Suggestion History
```
Completed Suggestions (Collapsed by default)
- Binary Trees Path (Completed 3 days ago)
- Greedy Algorithms Focus (Completed 1 week ago)
- Array Problems Set (Completed 2 weeks ago)
```

#### Contact/Feedback
```
Questions about suggestions?
[Chat with Faculty] [Report Issue]
```

---

## Screen 6: Faculty Dashboard

### Purpose
Class-wide analytics and student management.

### Layout

#### Header
- **Class Selector**: Dropdown to select class/batch
- **Export Button**: Download analytics report
- **Date Range Selector**: Custom date range

#### KPI Cards
```
Total Students      Active This Month   Avg Problems     Class Target
    450                 425               156              200
                       94% participation  ↑12 from avg
```

#### Student Performance Grid
```
Rank | Student Name    | Problems | Platform | Best Topic
────────────────────────────────────────────────────────
1    | Raj Kumar      | 285     | LC: 150  | Arrays (90%)
2    | Priya Singh    | 267     | GFG: 120 | Strings (85%)
3    | Arun Patel     | 245     | CC: 100  | DP (78%)
```

#### Topics Performance Analysis
```
Topic              Avg Success   Students Struggling   Recommended Focus
────────────────────────────────────────────────────────────────────
Binary Trees       85%           45 students         Medium-level practice
Dynamic Prog       72%           120 students        Foundations needed
Graphs             68%           95 students         Common algorithms
Greedy             60%           180 students        New topic needed
```

#### Difficulty Distribution
```
Bar Chart showing class-wide distribution:
Easy: 45% ████████░░░
Medium: 35% ███████░░░░░
Hard: 20% ████░░░░░░░░░░
```

#### Platform Usage
```
LeetCode: 350 users, 2850 problems
GFG: 280 users, 1540 problems
CodeChef: 150 users, 680 problems
```

#### Trends Graph
```
Weekly Progress (Last 12 weeks)
[Line chart showing avg problems solved per week]
```

#### Student Alerts
```
⚠️ Students with Low Activity
- 12 students inactive for 5+ days
- 8 students below expected progress
[View Details]

✓ Top Performers
- Raj Kumar: 285 problems solved
- Priya Singh: 267 problems solved
[Celebrate] [Message]
```

#### Assignment Management
```
Create/Manage Problem Sets
[+ New Assignment]
- Current Week: Binary Trees Set (15 problems)
- Next Week: Graphs & DP (20 problems)
[Edit] [Assign] [Remove]
```

---

## Design System

### Colors
- **Primary Orange**: #E3562B (Headers, CTAs, Accents)
- **Primary Teal**: #1D3639 (Navigation, Secondary)
- **Success Green**: #28A745 (Solved, Positive)
- **Warning Orange**: #FFC107 (Alerts, In Progress)
- **Error Red**: #DC3545 (Failed, Critical)
- **Light Gray**: #F5F5F5 (Backgrounds)
- **Dark Gray**: #333333 (Text)
- **Light Text**: #666666 (Secondary text)
- **Border Gray**: #E0E0E0 (Dividers)

### Typography
- **Headers (H1)**: 28px, Bold, Teal
- **Subheaders (H2)**: 20px, Bold, Dark Gray
- **Body Text**: 14px, Regular, Dark Gray
- **Small Text**: 12px, Regular, Light Gray
- **Button Text**: 14px, Bold, White

### Spacing
- **Margin**: 16px standard
- **Padding**: 12px cards, 8px buttons
- **Gap**: 8px between items

### Components
- **Card**: White background, border-radius: 8px, shadow
- **Button**: Padding 10px 20px, border-radius: 4px
- **Input**: Border-radius: 4px, height: 40px
- **Charts**: Use Power BI embedded or Canvas Charts

### Responsiveness
- **Desktop**: Full layout
- **Tablet**: Adjusted columns, sidebar collapse
- **Mobile**: Single column, bottom navigation fixed

---

**Version**: 1.0  
**Last Updated**: May 10, 2026
