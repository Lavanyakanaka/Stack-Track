# Power Automate Workflows

## Overview

Power Automate workflows manage data synchronization, AI suggestion generation, and notifications.

---

## Workflow 1: Daily Platform Data Sync

**Name**: Daily Platform Data Sync  
**Type**: Cloud Flow - Scheduled Cloud Flow  
**Trigger**: Runs daily at 2:00 AM UTC  
**Purpose**: Automatically sync problem-solving data from platforms

### Flow Steps

```
1. TRIGGER: Schedule (Daily at 2:00 AM UTC)
   └─ Recurrence: Every 1 day

2. GET ACTIVE STUDENT PROFILES
   └─ List Rows from Dataverse (Student Platform Profiles)
   ├─ Filter: Status = 'Active'
   └─ Returns: StudentId, PlatformId, PlatformUsername

3. FOR EACH PLATFORM
   └─ Loop through each active profile
   
   3A. GET PLATFORM DATA
       └─ HTTP GET Request
       ├─ URL: [Platform API Endpoint]
       ├─ Headers: Authorization, API Key
       └─ Returns: Problem data, user stats
   
   3B. PROCESS DATA
       └─ Parse JSON response
       ├─ Extract: problems solved, difficulty breakdown
       └─ Map to table structure
   
   3C. UPDATE PROFILE STATS
       └─ Update Row in Dataverse
       ├─ Table: Student Platform Profiles
       ├─ Update fields:
       │  ├─ Total Problems Solved
       │  ├─ Easy/Medium/Hard counts
       │  └─ Last Synced timestamp
       └─ Condition: Only if data changed
   
   3D. SYNC SOLUTIONS
       └─ For each new problem solved:
           ├─ Check if Student Solution record exists
           ├─ If not, create new Student Solution record
           │  ├─ StudentId
           │  ├─ ProblemId
           │  ├─ Solved Date
           │  ├─ Difficulty
           │  └─ Status = 'Solved'
           └─ If exists, verify and update

4. UPDATE STUDENT AGGREGATES
   └─ For each student involved:
       ├─ Calculate total problems across all platforms
       ├─ Update Student table
       │  ├─ Total Problems Solved
       │  └─ Updated timestamp
       └─ Trigger notification if milestone reached

5. SEND SYNC COMPLETION EMAIL
   └─ Send email to admin
   ├─ Content: Sync completion summary
   │  ├─ Records processed
   │  ├─ New problems added
   │  ├─ Errors (if any)
   └─ Include timestamp and duration

6. ERROR HANDLING
   └─ Try-Catch for API failures
   ├─ Log errors to error table
   ├─ Send alert email if sync fails
   └─ Retry mechanism: 3 attempts with 30-min delay
```

### Configuration

**API Endpoints** (Secure Variables):
- **LeetCode API**: `https://leetcode.com/api/v1/`
- **GFG API**: `https://api.geeksforgeeks.org/`
- **CodeChef API**: `https://api.codechef.com/`

**Authentication**:
- Store API keys in environment variables (never in flow)
- Use Power Apps Secrets for sensitive data

---

## Workflow 2: Generate AI Suggestions

**Name**: Generate AI Suggestions  
**Type**: Cloud Flow - Automated (triggered by Power Apps)  
**Purpose**: Create personalized AI recommendations  
**Trigger**: User clicks "Get Suggestions" button

### Flow Steps

```
1. TRIGGER: When called from a Power App (HTTP trigger)
   └─ Input: StudentId

2. FETCH STUDENT DATA
   └─ Get Row from Dataverse (Students)
   ├─ StudentId parameter
   └─ Returns: student info, stats

3. FETCH STUDENT SOLUTIONS
   └─ List Rows from Dataverse (Student Solutions)
   ├─ Filter: StudentId = trigger StudentId
   ├─ Include: Problem details, Difficulty, Status
   └─ Returns: All solved problems, platforms

4. ANALYZE PERFORMANCE PATTERNS
   └─ Compose (JSON)
   ├─ Calculate weak topics (< 60% success)
   ├─ Identify strong areas (> 80% success)
   ├─ Determine difficulty readiness
   ├─ Count problems by platform
   └─ Generate performance score

5. CALL AI SERVICE (Azure OpenAI)
   └─ HTTP POST Request
   ├─ Service: Azure OpenAI GPT-4
   ├─ Prompt Template:
   │  ├─ Student performance summary
   │  ├─ Weak topics to focus on
   │  ├─ Recommended difficulty progression
   │  ├─ Learning objectives
   │  └─ Time availability (from profile)
   └─ Returns: 5-10 personalized suggestions

6. PROCESS AI RESPONSE
   └─ Parse AI response
   ├─ For each suggestion:
   │  ├─ Extract: title, description, category
   │  ├─ Determine: priority (High/Medium/Low)
   │  └─ Calculate: estimated time, relevance score

7. CREATE SUGGESTION RECORDS
   └─ For each suggestion:
       └─ Create Row in Dataverse (AI Suggestions)
       ├─ StudentId
       ├─ Title
       ├─ Description
       ├─ Category
       ├─ Priority
       ├─ Status = 'New'
       ├─ RelevanceData = JSON
       └─ GeneratedAt = timestamp

8. SEND NOTIFICATION
   └─ Send email to student
   ├─ Subject: "Your personalized learning path"
   ├─ Content:
   │  ├─ Top 3 suggestions
   │  ├─ Why recommended
   │  ├─ Estimated effort
   │  └─ CTA: View in app
   └─ Include link to AI screen

9. RETURN RESPONSE
   └─ HTTP response
   ├─ Status: Success
   ├─ Suggestion count
   └─ Timestamp
```

### AI Prompt Template

```
You are an expert coding mentor analyzing a student's programming journey.

Student Profile:
- Name: {StudentName}
- Batch: {BatchYear}
- Total Problems Solved: {TotalProblems}
- Platforms Used: {Platforms}

Performance Data:
- Easy Problems: {EasyCount} ({EasyPercentage}%)
- Medium Problems: {MediumCount} ({MediumPercentage}%)
- Hard Problems: {HardCount} ({HardPercentage}%)
- Topics Mastered: {MasteredTopics}
- Weak Topics: {WeakTopics}
- Success Rate: {SuccessRate}%

Available Time: {AvailableHours} hours per week

Based on this data, provide 5-7 personalized suggestions that:
1. Address weak areas with appropriate difficulty progression
2. Build on existing strengths
3. Are achievable within the time constraint
4. Follow industry learning pathways

For each suggestion, provide:
- Title (clear, actionable)
- Why this is important
- Recommended approach
- Estimated hours needed
- Next step

Format as JSON array.
```

---

## Workflow 3: Milestone Achievement Notifications

**Name**: Milestone Achievement Notifications  
**Type**: Cloud Flow - Automated  
**Purpose**: Celebrate student achievements

### Triggers & Actions

```
TRIGGERS (Any of these):
├─ 50 Problems Solved
├─ 100 Problems Solved (and every 100 thereafter)
├─ First Hard Problem Solved
├─ 7-Day Streak
├─ 30-Day Streak
├─ Topic Mastery (90%+ in any topic)
└─ All Hard Problems Solved

ACTIONS FOR EACH MILESTONE:
├─ Create Milestone Record
│  ├─ StudentId
│  ├─ Type (milestone type)
│  └─ AchievedDate
│
├─ Send Notification Email
│  ├─ Subject: "🎉 You've achieved {milestone}!"
│  ├─ Include: stats, visual celebration
│  └─ Motivation message
│
├─ Update Leaderboard
│  └─ Recalculate rankings
│
├─ Send Faculty Notification (Optional)
│  ├─ Notify teachers of student progress
│  └─ Include: achievement and student name
│
└─ Add Achievement Badge
    └─ Display in Profile/Dashboard
```

---

## Workflow 4: Weekly Progress Summary

**Name**: Weekly Progress Summary  
**Type**: Cloud Flow - Scheduled  
**Purpose**: Send weekly digest to students
**Trigger**: Every Monday at 8:00 AM

### Flow Steps

```
1. TRIGGER: Schedule (Weekly, Monday 8:00 AM)

2. GET ALL ACTIVE STUDENTS
   └─ List Rows from Dataverse (Students)
   ├─ Filter: Status = 'Active'
   └─ Filter: Notification preference = 'Weekly Digest'

3. FOR EACH STUDENT
   ├─ Get solutions from last 7 days
   ├─ Calculate stats:
   │  ├─ Problems solved this week
   │  ├─ Topics practiced
   │  ├─ Difficulty breakdown
   │  └─ Compare with last week
   │
   ├─ Generate streak status
   │
   ├─ Get pending AI suggestions
   │
   └─ Send Email
       ├─ Subject: "Your Weekly Coding Summary"
       ├─ Stats visualization
       ├─ Top topics worked on
       ├─ Comparison: This week vs. last week
       ├─ Current streak status
       ├─ Pending suggestions
       └─ Motivational message + CTA
```

---

## Workflow 5: Faculty Analytics Report

**Name**: Faculty Analytics Report  
**Type**: Cloud Flow - Scheduled  
**Purpose**: Generate class-wide analytics
**Trigger**: Every Friday at 5:00 PM

### Flow Steps

```
1. TRIGGER: Schedule (Weekly, Friday 5:00 PM)

2. FILTER BY CLASS/BATCH
   └─ Parameter: BatchYear (from environment)

3. CALCULATE CLASS METRICS
   ├─ Total students in class
   ├─ Active students (solved at least 1 problem this week)
   ├─ Participation rate
   ├─ Average problems per student
   ├─ Leaderboard top 10
   ├─ Bottom performers (low activity)
   └─ Overall difficulty distribution

4. ANALYZE BY TOPIC
   ├─ Most practiced topics
   ├─ Weakest topics (lowest success rate)
   ├─ Topics recommended for class-wide focus
   └─ Comparison with previous week

5. IDENTIFY STUDENTS NEEDING HELP
   ├─ Inactive for 5+ days
   ├─ Consistently solving only easy problems
   ├─ Low success rate on medium problems
   └─ Below expected progress

6. GENERATE REPORT
   └─ Create HTML email with:
       ├─ Class dashboard stats
       ├─ Charts and visualizations
       ├─ Student alerts
       ├─ Recommendations for faculty
       └─ Top performers to celebrate

7. SEND EMAIL
   ├─ To: Faculty inbox
   ├─ Format: HTML with embedded charts
   └─ Include: CTA to view full dashboard
```

---

## Workflow 6: Manual Platform Profile Link

**Name**: Platform Profile Verification  
**Type**: Cloud Flow - Automated  
**Purpose**: Verify and link student platform profiles
**Trigger**: New Student Platform Profile created

### Flow Steps

```
1. TRIGGER: When Platform Profile record created
   ├─ Input: StudentId, Platform, Username

2. VERIFY PROFILE EXISTS
   ├─ HTTP GET: Platform API
   ├─ Check if username exists
   └─ Validate public profile

3. CONDITIONS:
   ├─ IF VALID:
   │  ├─ Update Status = 'Active'
   │  ├─ Set ProfileURL
   │  ├─ Log timestamp
   │  └─ Send confirmation email
   │
   └─ IF INVALID:
       ├─ Update Status = 'Unverified'
       ├─ Set error message
       ├─ Send help email
       └─ Notify faculty
```

---

## Workflow 7: Data Export for Faculty

**Name**: Export Class Data  
**Type**: Cloud Flow - Triggered  
**Purpose**: Export analytics for reporting
**Trigger**: Faculty clicks "Export Report" in dashboard

### Flow Steps

```
1. TRIGGER: Invoked from Power Apps
   └─ Input: ClassId, DateRange, Format

2. FETCH DATA
   ├─ All students in class
   ├─ All solutions in date range
   ├─ Aggregate statistics
   └─ Performance metrics

3. FORMAT DATA
   ├─ For Excel:
   │  ├─ Pivot tables by student
   │  ├─ Charts and analysis
   │  └─ Summary sheets
   │
   └─ For PDF:
       ├─ Formatted report layout
       ├─ Charts and visualizations
       └─ Professional styling

4. CREATE FILE
   └─ Generate file
   ├─ Format: Excel (.xlsx) or PDF
   ├─ Filename: ClassAnalytics_{Date}.xlsx
   └─ Upload to SharePoint

5. SEND DOWNLOAD
   └─ Return file link
   ├─ Send email with attachment
   └─ Set auto-expiry (7 days)
```

---

## Error Handling Strategy

### Retry Policy
```
Attempt 1: Immediate retry
Attempt 2: Retry after 5 minutes
Attempt 3: Retry after 30 minutes
If all fail: Log error and notify admin
```

### Error Logging
```
Create error log records in Dataverse:
├─ Workflow name
├─ Error message
├─ Timestamp
├─ Affected records
└─ Manual resolution steps
```

### Notifications
```
Critical errors (API down, data corruption):
└─ Send SMS + Email to admin

Non-critical errors (Missing optional data):
└─ Log only, don't notify
```

---

## Security Considerations

1. **Authentication**: Use environment variables for API keys
2. **Data Privacy**: Don't log sensitive user data
3. **Rate Limiting**: Respect platform API rate limits (add delays)
4. **Access Control**: Only admin can view all data
5. **Data Encryption**: Use secure connections (HTTPS)

---

**Version**: 1.0  
**Last Updated**: May 10, 2026
