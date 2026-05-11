# Dataverse Tables - Complete Schema

## Overview

The STACK TRACK application uses 6 core Dataverse tables with carefully designed relationships to manage student data, platform accounts, problems, and solutions.

---

## Table 1: Students

**Description**: Core student information table

**Display Name**: Student  
**Plural Name**: Students  
**Table Type**: Standard  

### Columns

| Column Name | Display Name | Data Type | Length | Required | Description |
|-------------|--------------|-----------|--------|----------|-------------|
| cr1f9_studentid | Student ID | Text | 50 | Yes | Unique identifier (Email or Student ID) |
| firstname | First Name | Text | 100 | Yes | Student's first name |
| lastname | Last Name | Text | 100 | Yes | Student's last name |
| emailaddress | Email Address | Email | - | Yes | Student email (primary contact) |
| cr1f9_phonenumber | Phone Number | Text | 20 | No | Contact phone number |
| cr1f9_batchyear | Batch Year | Whole Number | - | No | Year of study/batch (2024, 2025, etc.) |
| cr1f9_deptartment | Department | Lookup | - | No | Department/Stream |
| cr1f9_joindate | Join Date | Date and Time | - | Yes | When student registered |
| cr1f9_totalproblemsolved | Total Problems Solved | Whole Number | - | No | Aggregated count (auto-calculated) |
| cr1f9_longeststreak | Longest Streak | Whole Number | - | No | Maximum consecutive days |
| cr1f9_profilecompleted | Profile Completed | Yes/No | - | No | Whether all profile details filled |
| cr1f9_status | Status | Choice | - | Yes | Active, Inactive, Graduated |

### Key Relationships

- **One-to-Many**: Student → Student Platform Profiles
- **One-to-Many**: Student → Student Solutions

---

## Table 2: Platforms

**Description**: Supported coding practice platforms

**Display Name**: Platform  
**Plural Name**: Platforms  
**Table Type**: Standard  

### Columns

| Column Name | Display Name | Data Type | Length | Required | Description |
|-------------|--------------|-----------|--------|----------|-------------|
| cr1f9_platformname | Platform Name | Text | 100 | Yes | LeetCode, GeeksforGeeks, CodeChef |
| cr1f9_platformcode | Platform Code | Text | 20 | Yes | LT, GFG, CC |
| cr1f9_websiteurl | Website URL | URL | - | Yes | Official platform website |
| cr1f9_color | Color | Text | 10 | No | Brand color (e.g., #FFB81C for LeetCode) |
| cr1f9_icon | Icon URL | URL | - | No | Platform logo/icon |
| cr1f9_description | Description | Text | 500 | No | Platform description |
| cr1f9_active | Active | Yes/No | - | Yes | Whether platform is currently tracked |

### Key Relationships

- **One-to-Many**: Platform → Student Platform Profiles
- **One-to-Many**: Platform → Problems

---

## Table 3: Student Platform Profiles

**Description**: Student's account details on each platform

**Display Name**: Student Platform Profile  
**Plural Name**: Student Platform Profiles  
**Table Type**: Standard  

### Columns

| Column Name | Display Name | Data Type | Length | Required | Description |
|-------------|--------------|-----------|--------|----------|-------------|
| cr1f9_studentid | Student | Lookup | - | Yes | Link to Students table |
| cr1f9_platformid | Platform | Lookup | - | Yes | Link to Platforms table |
| cr1f9_platformusername | Platform Username | Text | 200 | Yes | Username on the platform |
| cr1f9_linkeddate | Linked Date | Date and Time | - | Yes | When account was linked |
| cr1f9_totalproblemsolved | Total Problems Solved | Whole Number | - | No | Total on this platform |
| cr1f9_easyproblemsolved | Easy Problems Solved | Whole Number | - | No | Count of easy problems |
| cr1f9_mediumproblemsolved | Medium Problems Solved | Whole Number | - | No | Count of medium problems |
| cr1f9_hardproblemsolved | Hard Problems Solved | Whole Number | - | No | Count of hard problems |
| cr1f9_lastsynced | Last Synced | Date and Time | - | No | Last data update time |
| cr1f9_profileurl | Profile URL | URL | - | No | Link to platform profile |
| cr1f9_status | Status | Choice | - | Yes | Active, Inactive, Unverified |

### Key Relationships

- **Many-to-One**: Platform Profile → Student
- **Many-to-One**: Platform Profile → Platform

---

## Table 4: Problems

**Description**: Coding problems from all platforms

**Display Name**: Problem  
**Plural Name**: Problems  
**Table Type**: Standard  

### Columns

| Column Name | Display Name | Data Type | Length | Required | Description |
|-------------|--------------|-----------|--------|----------|-------------|
| cr1f9_problemid | Problem ID | Text | 100 | Yes | Unique problem identifier |
| cr1f9_problemname | Problem Name | Text | 500 | Yes | Problem title/name |
| cr1f9_platformid | Platform | Lookup | - | Yes | Link to Platforms table |
| cr1f9_difficulty | Difficulty | Choice | - | Yes | Easy, Medium, Hard |
| cr1f9_category | Category | Text | 100 | No | Algorithm, Data Structure, etc. |
| cr1f9_topics | Topics | Text | 500 | No | Comma-separated topics |
| cr1f9_acceptancerate | Acceptance Rate | Decimal | - | No | Problem acceptance rate (%) |
| cr1f9_description | Description | Text | 2000 | No | Problem description/statement |
| cr1f9_exampleinput | Example Input | Text | 1000 | No | Sample input |
| cr1f9_exampleoutput | Example Output | Text | 1000 | No | Expected output |
| cr1f9_platformurl | Problem URL | URL | - | No | Link to problem on platform |
| cr1f9_problemnumber | Problem Number | Text | 50 | No | Problem ID on platform |
| cr1f9_createdon | Created On | Date and Time | - | Yes | When record was created |

### Key Relationships

- **Many-to-One**: Problem → Platform
- **One-to-Many**: Problem → Student Solutions

---

## Table 5: Student Solutions

**Description**: Records of problems solved by students

**Display Name**: Student Solution  
**Plural Name**: Student Solutions  
**Table Type**: Standard  

### Columns

| Column Name | Display Name | Data Type | Length | Required | Description |
|-------------|--------------|-----------|--------|----------|-------------|
| cr1f9_studentid | Student | Lookup | - | Yes | Link to Students table |
| cr1f9_problemid | Problem | Lookup | - | Yes | Link to Problems table |
| cr1f9_platformid | Platform | Lookup | - | Yes | Link to Platforms table |
| cr1f9_status | Status | Choice | - | Yes | Solved, Attempted, Skipped |
| cr1f9_solvedon | Solved On | Date and Time | - | No | When problem was solved |
| cr1f9_timespent | Time Spent (minutes) | Whole Number | - | No | Duration to solve |
| cr1f9_difficulty | Difficulty | Choice | - | Yes | Easy, Medium, Hard (denormalized) |
| cr1f9_isoptimal | Is Optimal | Yes/No | - | No | Whether solution is optimal |
| cr1f9_language | Language Used | Text | 50 | No | Java, Python, C++, etc. |
| cr1f9_notes | Notes | Text | 1000 | No | Student's personal notes |
| cr1f9_firstattemptsuccess | First Attempt Success | Yes/No | - | No | Solved on first try |
| cr1f9_hintsused | Hints Used | Whole Number | - | No | Number of hints used |
| cr1f9_syncedfromplatform | Synced from Platform | Yes/No | - | No | Whether synced via API |
| cr1f9_manualentry | Manual Entry | Yes/No | - | No | Whether manually entered |

### Key Relationships

- **Many-to-One**: Solution → Student
- **Many-to-One**: Solution → Problem
- **Many-to-One**: Solution → Platform

---

## Table 6: AI Suggestions

**Description**: Personalized AI-generated recommendations

**Display Name**: AI Suggestion  
**Plural Name**: AI Suggestions  
**Table Type**: Standard  

### Columns

| Column Name | Display Name | Data Type | Length | Required | Description |
|-------------|--------------|-----------|--------|----------|-------------|
| cr1f9_studentid | Student | Lookup | - | Yes | Link to Students table |
| cr1f9_suggestiontype | Suggestion Type | Choice | - | Yes | Topic, Difficulty, Problem Set, Path |
| cr1f9_title | Title | Text | 200 | Yes | Suggestion title |
| cr1f9_description | Description | Text | 2000 | No | Detailed suggestion |
| cr1f9_recommendedon | Recommended On | Date and Time | - | Yes | When suggestion was generated |
| cr1f9_priority | Priority | Choice | - | Yes | High, Medium, Low |
| cr1f9_category | Category | Text | 100 | No | Weak Topic, Focus Area, Next Level |
| cr1f9_targetdifficulty | Target Difficulty | Text | 50 | No | Suggested difficulty level |
| cr1f9_estimatedtimehours | Estimated Time (hours) | Decimal | - | No | How long to complete |
| cr1f9_relevancedata | Relevance Data | Text | 2000 | No | JSON data for ranking |
| cr1f9_status | Status | Choice | - | Yes | New, Viewed, Accepted, Completed |
| cr1f9_reasoning | Reasoning | Text | 1000 | No | Why this suggestion was made |
| cr1f9_generatedat | Generated At | Date and Time | - | Yes | When AI generated this |

### Key Relationships

- **Many-to-One**: Suggestion → Student

---

## Relationship Diagram

```
Students (1) ──────────── (many) Student Platform Profiles
    |
    ├─────────────────────── (many) Student Solutions
    |
    └─────────────────────── (many) AI Suggestions

Platforms (1) ──────────── (many) Student Platform Profiles
    |
    └─────────────────────── (many) Problems

Problems (1) ──────────── (many) Student Solutions
```

---

## Views to Create

### Students Table
- **Active Students**: Filter by Status = Active
- **By Batch**: Grouped by Batch Year
- **Leaderboard**: Sorted by Total Problems Solved (desc)

### Problems Table
- **By Platform**: Grouped by Platform
- **By Difficulty**: Grouped by Difficulty
- **By Topic**: Grouped by Category

### Student Solutions Table
- **Recent Solutions**: Sorted by Solved On (newest first)
- **By Status**: Filtered by Status
- **By Platform**: Grouped by Platform

### Student Platform Profiles
- **Active Profiles**: Filter by Status = Active
- **By Platform**: Grouped by Platform

---

## Security & Permissions

- **Students Table**: Users can view/edit only their own records
- **Platform Profiles**: Users can view/edit only their own profiles
- **Solutions**: Users can view/edit only their own solutions
- **Faculty/Admin**: Can view all records in admin dashboard
- **AI Suggestions**: Users can view only their own suggestions

---

## Data Types Reference

- **Lookup**: Reference to another table
- **Choice**: Dropdown with predefined options
- **Text**: String field
- **Whole Number**: Integer
- **Decimal**: Float/Double
- **Date and Time**: Timestamp
- **Yes/No**: Boolean
- **URL**: Web link
- **Email**: Email address

---

**Last Updated**: May 10, 2026  
**Version**: 1.0
