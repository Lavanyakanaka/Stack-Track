# Implementation Guide - Step by Step

## Phase 1: Environment Setup (Week 1, Days 1-2)

### Step 1.1: Create Power Apps Environment

1. Go to https://admin.powerplatform.microsoft.com
2. Click **"Environments"** in the left menu
3. Click **"+ New"**
4. Configure:
   - **Name**: STACK TRACK Environment
   - **Type**: Sandbox (for testing) or Production (for live)
   - **Region**: Your preferred region
   - **Database**: Create database with Dataverse
5. Click **"Create"** and wait for setup (5-10 minutes)

### Step 1.2: Set Up Dataverse

1. After environment created, click on it
2. Go to **"Dataverse"** → **"Tables"**
3. Verify you're in your new environment
4. Note the **Environment ID** and **Org URL** for later

### Step 1.3: Create Security Roles

1. Go to **"Dataverse"** → **"Security Roles"**
2. Create roles:
   - **Student Role**: Limited to own records
   - **Faculty Role**: Read-only access to all data
   - **Admin Role**: Full access to all tables

3. For Student Role:
   - Entity: Student - **User** level access
   - Entity: Student Platform Profiles - **User** level
   - Entity: Student Solutions - **User** level
   - Entity: AI Suggestions - **User** level
   - Entity: Problems - **Organization** level (read-only)
   - Entity: Platforms - **Organization** level (read-only)

---

## Phase 2: Dataverse Tables (Week 1, Days 2-3)

### Step 2.1: Create Students Table

1. Go to **"Dataverse"** → **"Tables"** → **"New Table"**
2. Fill in:
   - **Display Name**: Student
   - **Plural Name**: Students
   - **Primary Column Name**: Full Name

3. After creation, add columns per specification:

```
Columns to Add:
├─ Student ID (Text, max 50, Required)
├─ First Name (Text, max 100, Required)
├─ Last Name (Text, max 100, Required)
├─ Email Address (Email, Required)
├─ Phone Number (Text, max 20)
├─ Batch Year (Whole Number)
├─ Department (Lookup - create Departments table)
├─ Join Date (Date and Time, Required)
├─ Total Problems Solved (Whole Number, auto-calculated)
├─ Longest Streak (Whole Number)
├─ Profile Completed (Yes/No)
└─ Status (Choice: Active, Inactive, Graduated)
```

**Add Column Steps**:
1. Click **"+ New"** in Columns section
2. Fill: Name, Display Name, Data Type, Length/Format
3. Check Required if needed
4. Click **"Save"**

### Step 2.2: Create Platforms Table

```
Table: Platform
Columns:
├─ Platform Name (Text, Required)
│  └─ Choice values: LeetCode, GeeksforGeeks, CodeChef
├─ Platform Code (Text, max 20, Required)
│  └─ Choice values: LT, GFG, CC
├─ Website URL (URL, Required)
├─ Color (Text, max 10)
├─ Icon URL (URL)
├─ Description (Text, max 500)
└─ Active (Yes/No, Required)
```

**Create 3 Records**:
1. Click **"New"**
2. Enter platform details:
   - **LeetCode**: #FFB81C, https://leetcode.com
   - **GeeksforGeeks**: #36464B, https://geeksforgeeks.org
   - **CodeChef**: #C4514D, https://codechef.com
3. Click **"Save & New"** for next

### Step 2.3: Create Student Platform Profiles Table

```
Table: Student Platform Profile
Columns:
├─ Student (Lookup → Students, Required)
├─ Platform (Lookup → Platforms, Required)
├─ Platform Username (Text, max 200, Required)
├─ Linked Date (Date and Time, Required)
├─ Total Problems Solved (Whole Number)
├─ Easy Problems Solved (Whole Number)
├─ Medium Problems Solved (Whole Number)
├─ Hard Problems Solved (Whole Number)
├─ Last Synced (Date and Time)
├─ Profile URL (URL)
└─ Status (Choice: Active, Inactive, Unverified)
```

**Relationship Setup**:
1. When adding Lookup columns, ensure **Relationship created** automatically
2. Verify reverse relationship in Students table

### Step 2.4: Create Problems Table

```
Table: Problem
Columns:
├─ Problem ID (Text, max 100, Required)
├─ Problem Name (Text, max 500, Required)
├─ Platform (Lookup → Platforms, Required)
├─ Difficulty (Choice: Easy, Medium, Hard, Required)
├─ Category (Text, max 100)
├─ Topics (Text, max 500)
├─ Acceptance Rate (Decimal)
├─ Description (Text, max 2000)
├─ Example Input (Text, max 1000)
├─ Example Output (Text, max 1000)
├─ Problem URL (URL)
├─ Problem Number (Text, max 50)
└─ Created On (Date and Time, Required, auto: current time)
```

### Step 2.5: Create Student Solutions Table

```
Table: Student Solution
Columns:
├─ Student (Lookup → Students, Required)
├─ Problem (Lookup → Problems, Required)
├─ Platform (Lookup → Platforms, Required)
├─ Status (Choice: Solved, Attempted, Skipped, Required)
├─ Solved On (Date and Time)
├─ Time Spent (minutes) (Whole Number)
├─ Difficulty (Choice: Easy, Medium, Hard, Required)
├─ Is Optimal (Yes/No)
├─ Language Used (Text, max 50)
├─ Notes (Text, max 1000)
├─ First Attempt Success (Yes/No)
├─ Hints Used (Whole Number)
├─ Synced from Platform (Yes/No)
└─ Manual Entry (Yes/No)
```

### Step 2.6: Create AI Suggestions Table

```
Table: AI Suggestion
Columns:
├─ Student (Lookup → Students, Required)
├─ Suggestion Type (Choice: Topic, Difficulty, Problem Set, Path, Required)
├─ Title (Text, max 200, Required)
├─ Description (Text, max 2000)
├─ Recommended On (Date and Time, Required)
├─ Priority (Choice: High, Medium, Low, Required)
├─ Category (Text, max 100)
├─ Target Difficulty (Text, max 50)
├─ Estimated Time (hours) (Decimal)
├─ Relevance Data (Text, max 2000)
├─ Status (Choice: New, Viewed, Accepted, Completed, Required)
├─ Reasoning (Text, max 1000)
└─ Generated At (Date and Time, Required)
```

### Step 2.7: Create Views

For each table, create the views specified in SCREEN_SPECIFICATIONS.md:

**Students Table Views**:
1. **Active Students**
   - Filter: Status = Active
   - Sort: Join Date (newest first)

2. **By Batch**
   - Group By: Batch Year
   - Sort: Batch Year (descending)

3. **Leaderboard**
   - Filter: Status = Active
   - Sort: Total Problems Solved (descending)

**Problems Table Views**:
1. **By Platform**
   - Group By: Platform
   - Sort: Difficulty

2. **By Difficulty**
   - Group By: Difficulty
   - Sort: Platform

---

## Phase 3: Power Apps Canvas App (Week 1-2, Days 4-7)

### Step 3.1: Create Canvas App

1. Go to https://make.powerapps.com
2. Click **"Create"** → **"Canvas app"** → **"Blank canvas app"**
3. Choose **Phone** layout
4. Name: "STACK TRACK"
5. Click **"Create"**

### Step 3.2: Add Data Sources

In the App canvas:
1. Click **"Data"** in left panel
2. Click **"Add data"** → **"Dataverse"**
3. Select and add these tables:
   - Students
   - Platforms
   - Student Platform Profiles
   - Problems
   - Student Solutions
   - AI Suggestions

### Step 3.3: Set Up Navigation

Create 4 main screens:

```
App Structure:
├─ Screen 1: Dashboard (Initial screen)
├─ Screen 2: Progress
├─ Screen 3: Profile
└─ Screen 4: AI Suggestions
```

**Create Navigation Bar**:
1. In Screen 1, add 4 buttons at bottom:
   ```
   [Dashboard] | [Progress] | [Profile] | [AI]
   ```
2. Set button colors:
   - Active: Orange (#E3562B)
   - Inactive: Light Gray (#F5F5F5)
3. Set OnSelect for each button:
   ```
   Navigate(ScreenName, ScreenTransition.Cover)
   ```

### Step 3.4: Build Dashboard Screen

**Header Section**:
```powerapps
Label1:
- Text: "Dashboard"
- Font Size: 28
- Color: #1D3639
- Bold: true

Label2:
- Text: "Hello, " & User().FullName & "! 👋"
- Font Size: 16
- Color: #333333

Button_Sync:
- Text: "Sync Now"
- Color: #E3562B
- OnSelect: /* Trigger sync workflow */
```

**Stats Cards**:
```powerapps
/* Card 1: Total Problems */
Card_Total:
- Background: White
- Border: 1px #E0E0E0
- Padding: 12px
- Contains:
  ├─ Label: "Total Solved"
  ├─ Label: CountRows(Filter(Student Solutions, Status="Solved" && Student.id=User().id))
  ├─ Label: "+5 this week"

/* Repeat for other cards */
```

**Platform Cards**:
```powerapps
/* Horizontal scrolling gallery */
Gallery_Platforms:
- Data: Platforms
- Layout: Horizontal
- For each platform:
  ├─ Platform Name
  ├─ Total problems from Student Platform Profiles
  ├─ Progress bar
  ├─ Last synced time
  └─ OnSelect: Navigate(Platform_Details_Screen)
```

### Step 3.5: Build Platform Details Screen

**Header**:
```powerapps
Label_PlatformName: 
- Text: Gallery_Platforms.Selected.'Platform Name'
- Font Size: 24
- Color: Gallery_Platforms.Selected.Color

Button_Back:
- Text: "← Back"
- OnSelect: Navigate(Dashboard_Screen)
```

**Stats Section**:
```powerapps
/* Easy, Medium, Hard problem counts */
Label_Easy: CountRows(Filter(Student Solutions, Difficulty="Easy" && Platform.id=Gallery_Platforms.Selected.id))
Label_Medium: CountRows(...)
Label_Hard: CountRows(...)
```

**Charts**:
```powerapps
/* Use Pie Chart for difficulty breakdown */
PieChart1:
- Data: Group solved problems by difficulty
- Colors: Light Blue (Easy), Orange (Medium), Red (Hard)

/* Bar Chart for topics */
BarChart1:
- Data: Group solutions by topic
- Show top 5 topics
```

### Step 3.6: Build Progress Screen

**Time Period Selector**:
```powerapps
Radio_TimePeriod:
- Options: "This Week", "This Month", "All Time"
- OnChange: Refresh all charts with filtered data
```

**Combined Charts**:
```powerapps
/* Pie chart: All platforms combined */
PieChart_Combined:
- Data: All Student Solutions where Student.id=User().id
- Group by: Difficulty
- Colors: #0099FF, #E3562B, #DC3545

/* Bar chart: Platform comparison */
BarChart_Comparison:
- Data: Student Platform Profiles
- X: Platform Name
- Y: Total Problems Solved

/* Line chart: Timeline */
LineChart_Timeline:
- Data: Student Solutions grouped by date
- X: Date
- Y: Count of problems
- Span: Last 30 days
```

**Topic Mastery**:
```powerapps
Gallery_Topics:
- Data: Distinct topics from Student Solutions
- For each topic:
  ├─ Topic name
  ├─ Success rate: (Solved count / Total attempted) * 100
  ├─ Progress bar
  └─ Color: Green if >80%, Orange if 60-80%, Red if <60%
```

### Step 3.7: Build Profile Screen

**Personal Information Section**:
```powerapps
TextInput_FirstName:
- Default: User().GivenName
- Editable: true

TextInput_Email:
- Default: User().Email
- Editable: false

TextInput_BatchYear:
- Default: CurrentStudent.'Batch Year'
- Editable: true

Button_SaveProfile:
- OnSelect: Patch(Students, CurrentStudent, {
    'First Name': TextInput_FirstName.Value,
    'Batch Year': TextInput_BatchYear.Value
  })
  Notify("Profile updated successfully")
```

**Platform Accounts Section**:
```powerapps
Gallery_Platforms:
- Data: Student Platform Profiles for current student
- For each linked platform:
  ├─ Platform name
  ├─ Username
  ├─ Linked date
  ├─ Status badge
  ├─ Button: "View Profile" → Opens platform URL
  ├─ Button: "Sync" → Triggers sync workflow
  └─ Button: "Unlink" → Removes relationship

Button_LinkNewPlatform:
- OnSelect: Toggle(Modal_LinkPlatform)

Modal_LinkPlatform:
- Dropdown: Select platform
- TextInput: Enter username
- Button_Verify:
  └─ Calls verify workflow
  └─ Creates new Student Platform Profile if valid
```

**Settings Section**:
```powerapps
Toggle_EmailNotifications:
- Default: true
- OnChange: Update user notification preferences

Toggle_WeeklyDigest:
- Default: true

Dropdown_Timezone:
- Options: All timezones
- Default: User's timezone

Button_DeleteAccount:
- Color: Red (#DC3545)
- OnSelect: Confirm dialog → Delete user record
```

### Step 3.8: Build AI Suggestions Screen

**Header**:
```powerapps
Label_Title: "AI Recommendations"
Button_Refresh:
- Text: "Refresh"
- Color: #E3562B
- OnSelect: /* Call generate suggestions workflow */
Label_LastUpdated: "Last updated: " & Text(Now(), "2 hours ago")
```

**Filter Options**:
```powerapps
Dropdown_Priority:
- Options: All, High, Medium, Low
- Default: All

Dropdown_Type:
- Options: All, Topic, Difficulty, Path, Set
- Default: All
```

**Suggestion Cards**:
```powerapps
Gallery_Suggestions:
- Data: Filter(AI Suggestions, StudentId=User().id, Priority=(if Priority_Filter="All" then Priority else Priority_Filter))
- Layout: Vertical
- For each suggestion:
  ├─ Priority badge (color coded)
  ├─ Category label
  ├─ Title (bold, large)
  ├─ Description (multi-line)
  ├─ Metadata: Difficulty, Est. Time, Related Problems
  ├─ Button_Accept:
  │  └─ Updates Status to "Accepted"
  │  └─ Creates notification
  ├─ Button_Dismiss:
  │  └─ Updates Status to "Dismissed"
  └─ Button_Details:
      └─ Navigate to details screen
```

**Completed Suggestions Section**:
```powerapps
Expandable_Completed:
- Title: "Completed Suggestions"
- Data: AI Suggestions where Status="Completed"
- Shows: Summary of completed suggestions
```

---

## Phase 4: Power Automate Workflows (Week 2, Days 1-3)

### Step 4.1: Create Daily Sync Workflow

1. Go to https://make.powerautomate.com
2. Click **"Create"** → **"Scheduled cloud flow"**
3. Name: "Daily Platform Data Sync"
4. Set trigger: **Recurrence** - Every 1 day at 2:00 AM

5. Add actions per POWER_AUTOMATE_WORKFLOWS.md:
   - List active Student Platform Profiles
   - For each profile, call platform API
   - Parse response
   - Create/update Student Solutions
   - Update profile stats
   - Update student aggregates
   - Handle errors

### Step 4.2: Create AI Suggestions Workflow

1. Create **New automated cloud flow**
2. Trigger: **When a row is created or modified**
   - Table: Students
   - Scope: Tenant

3. Add actions:
   - Get student data
   - List all student solutions
   - Analyze performance patterns
   - Call Azure OpenAI API
   - Create AI Suggestion records
   - Send email notification

### Step 4.3: Create Milestone Notifications

1. Create **New automated cloud flow**
2. Trigger: **When a row is created**
   - Table: Student Solutions

3. Add actions:
   - Aggregate total problems for student
   - Check if milestone reached
   - If yes:
     - Create milestone record
     - Send celebratory email
     - Update leaderboard

### Step 4.4: Create Weekly Digest

1. Create **New scheduled cloud flow**
2. Trigger: **Recurrence** - Every Monday at 8:00 AM

3. Add actions:
   - Get all active students
   - For each student:
     - Get solutions from last 7 days
     - Calculate stats
     - Send digest email with stats

---

## Phase 5: Testing & Validation (Week 2, Days 4-5)

### Step 5.1: Test Data Population

1. **Create 10 Test Students**:
   ```
   John Doe, Jane Smith, ...
   Batch: 2025, Department: CSE
   Status: Active
   ```

2. **Create Test Platform Profiles**:
   ```
   For each student, create links to LeetCode, GFG, CodeChef
   Add sample usernames
   ```

3. **Create Test Solutions**:
   ```
   For each student, add 20-50 solved problems
   Vary difficulty: Easy, Medium, Hard
   Set solved dates across last 30 days
   ```

### Step 5.2: Test Workflows

1. **Test Sync Workflow**:
   - Manually trigger (run now)
   - Verify Student Solutions created
   - Check stat updates

2. **Test AI Suggestions**:
   - Click "Get Suggestions"
   - Verify suggestions generated
   - Check email delivery

3. **Test Notifications**:
   - Create a new solution
   - If 50 problems reached, verify milestone email sent

### Step 5.3: Test UI/UX

| Screen | Test Cases |
|--------|-----------|
| Dashboard | Display correct totals, click platform cards, sync button works |
| Progress | All charts render, filters work, data accurate |
| Profile | Update info saves, link platform works, unlink removes |
| AI | Suggestions load, filters work, accept/dismiss updates status |

---

## Phase 6: Optimization & Deployment (Week 2-3)

### Step 6.1: Performance Optimization

1. **Implement Data Caching**:
   ```powerapps
   Set(CachedStudentSolutions, 
     Filter(Student Solutions, 
       Student.id=User().id,
       'Solved On' > Today()-30
     )
   )
   ```

2. **Lazy Load Data**:
   - Only load visible items in galleries
   - Set PageSize: 50

3. **Optimize Queries**:
   - Use direct table references instead of filters
   - Minimize nested lookups

### Step 6.2: Security Review

- [ ] Verify role-based access control
- [ ] Check field-level permissions
- [ ] Audit user access logs
- [ ] Test data isolation per student
- [ ] Verify admin-only screens

### Step 6.3: Faculty Dashboard

1. Create new **Admin/Faculty screen**
2. Add:
   - Class overview statistics
   - Student leaderboard
   - Topic performance analysis
   - Student alerts section
   - Export report button

### Step 6.4: Publishing

1. Go to **Power Apps** → **Apps**
2. Select "STACK TRACK"
3. Click **"Share"**
4. Add users/groups:
   - Students: Read/Write on own data
   - Faculty: Read-only on all data
   - Admin: Full access
5. Click **"Publish"**

---

## Phase 7: User Onboarding (Week 3)

### Step 7.1: Create User Guide

1. **Getting Started**:
   - How to link platform accounts
   - How to sync data
   - How to view dashboard

2. **Features**:
   - Explaining each screen
   - How to use progress charts
   - Understanding AI suggestions

3. **Troubleshooting**:
   - Common issues
   - How to contact support

### Step 7.2: Faculty Training

1. **Dashboard Overview**:
   - How to view class analytics
   - How to identify struggling students
   - How to assign problem sets

2. **Workflow Configuration**:
   - How to customize sync schedule
   - How to configure notifications

### Step 7.3: Student Onboarding

1. Send welcome email with:
   - App link
   - Quick start guide
   - How to link first platform

2. Create video tutorials:
   - 2-min: Dashboard walkthrough
   - 2-min: Profile setup
   - 2-min: AI suggestions explained

---

## Maintenance & Support

### Regular Tasks

**Daily**:
- Monitor sync workflow execution
- Check error logs
- Verify data integrity

**Weekly**:
- Review user feedback
- Check for performance issues
- Update problem database

**Monthly**:
- Backup Dataverse
- Review analytics
- Plan feature updates
- Update documentation

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Sync fails | Check API keys, verify network, check error log |
| Suggestions not generated | Verify student has enough solution history |
| Charts not loading | Clear browser cache, reload app |
| Slow performance | Check data volume, optimize queries |

---

**Version**: 1.0  
**Last Updated**: May 10, 2026
