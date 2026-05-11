# Quick Start Guide

Get STACK TRACK up and running in 30 minutes!

---

## Prerequisites

✓ Microsoft 365 account (with Power Apps access)  
✓ Administrator rights in your organization  
✓ API keys for at least one platform (LeetCode, GFG, or CodeChef)

---

## 5-Minute Quick Setup

### Step 1: Create Environment (2 minutes)

1. Go to https://admin.powerplatform.microsoft.com
2. Click **"New Environment"**
3. Name it: "STACK TRACK"
4. Choose **Sandbox** for testing
5. Click **"Create"**
6. Wait for setup to complete

### Step 2: Create Tables (2 minutes)








1. Go to your new environment
2. Click **"Dataverse"** → **"New Table"**
3. Create table named **"Students"** with columns:
   - Student ID (Text)
   - First Name (Text)
   - Last Name (Text)
   - Email (Email)
   - Status (Choice: Active/Inactive)

4. Repeat for:
   - Platforms (3 records: LeetCode, GFG, CodeChef)
   - Student Platform Profiles
   - Problems
   - Student Solutions
   - AI Suggestions

*(Detailed column specifications in [DATAVERSE_SCHEMA.md](./DATAVERSE_SCHEMA.md))*

### Step 3: Build Canvas App (1 minute)

1. Go to https://make.powerapps.com
2. Click **"Create"** → **"Canvas App"** → **"Blank"**
3. Choose **Phone** layout
4. Name it: "STACK TRACK"
5. Click **"Create"**

*(Detailed instructions in [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md))*

---

## 30-Minute Full Setup

### Complete the Above Steps (5 minutes)

Then continue with:

### Step 4: Add Data Sources to App (5 minutes)

1. In Power Apps Studio, click **"Data"**
2. Add all 6 Dataverse tables
3. Click each table to enable it

### Step 5: Build Dashboard Screen (10 minutes)

1. Add new blank screen
2. Add components from [SCREEN_SPECIFICATIONS.md](./SCREEN_SPECIFICATIONS.md):
   - Header with title
   - 4 stats cards (total, easy/medium/hard, streak)
   - Platform cards gallery
   - Recent activity list

3. Reference formulas in [CANVAS_CODE_REFERENCE.md](./Screens/CANVAS_CODE_REFERENCE.md)

### Step 6: Set Up Navigation (5 minutes)

1. Add 4 screens: Dashboard, Progress, Profile, AI
2. Create bottom navigation bar
3. Add navigation buttons between screens
4. Test screen transitions

### Step 7: Add Sample Data (5 minutes)

1. Use sample data from [SAMPLE_DATA.md](./Documentation/SAMPLE_DATA.md)
2. Manually enter or import 5 test students
3. Link to platforms
4. Create sample solved problems

---

## Testing Your App

### Test Dashboard
1. **Verify Stats**: Do card values match test data?
2. **Check Platform Cards**: Display all 3 platforms?
3. **Test Sync Button**: Can click and load state shows?

### Test Navigation
1. **Click Buttons**: Each button navigates correctly?
2. **Back Button**: Returns to previous screen?
3. **Active State**: Button color changes when on that screen?

### Test Data
1. **Student Lookup**: Can you view any student?
2. **Platform Link**: Can you see linked accounts?
3. **Solutions**: Display correctly with all details?

---

## Next Steps

After initial setup:

1. **Set Up Workflows** (15 minutes)
   - Go to https://make.powerautomate.com
   - Create **"Daily Platform Data Sync"** workflow
   - Reference: [POWER_AUTOMATE_WORKFLOWS.md](./Workflows/POWER_AUTOMATE_WORKFLOWS.md)

2. **Build Remaining Screens** (2-3 hours)
   - Progress screen with charts
   - Profile screen with forms
   - AI suggestions screen
   - Faculty dashboard

3. **Configure Security** (30 minutes)
   - Create security roles
   - Assign users to roles
   - Test data access

4. **Deploy to Production** (30 minutes)
   - Use [DEPLOYMENT_CHECKLIST.md](./Documentation/DEPLOYMENT_CHECKLIST.md)
   - Run all tests
   - Get sign-offs

---

## Common Quick Wins

### Make Cards Responsive
```powerapps
Width: (Parent.Width - 20) / 2
Height: 120
X: If(ThisItem.ID Mod 2 = 0, 10, Parent.Width/2 + 10)
```

### Add Loading State
```powerapps
Set(IsLoading, true);
/* Do operation */
Set(IsLoading, false);
```

### Color Code by Difficulty
```powerapps
Fill: Switch(Difficulty,
  "Easy", #0099FF,
  "Medium", #E3562B,
  "Hard", #DC3545,
  #CCCCCC
)
```

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| App won't save | Check column names match exactly |
| Data not showing | Verify table relationships created |
| Charts blank | Ensure data exists in table first |
| Buttons not working | Check OnSelect formula for syntax errors |
| Slow loading | Use filters to limit data loaded |

---

## Documentation Map

```
Quick Start (You are here)
    ↓
├─ README.md - Project overview
├─ DATAVERSE_SCHEMA.md - Table specifications
├─ SCREEN_SPECIFICATIONS.md - UI detailed design
├─ IMPLEMENTATION_GUIDE.md - Step-by-step build
├─ CANVAS_CODE_REFERENCE.md - Code examples
├─ POWER_AUTOMATE_WORKFLOWS.md - Automation setup
├─ DEPLOYMENT_CHECKLIST.md - Launch checklist
├─ SAMPLE_DATA.md - Test data
└─ CONFIG.json - Configuration file
```

---

## Support & Resources

### Video Tutorials
- Coming soon! (5-10 min walkthroughs)

### FAQ
- **Q: Can I customize the colors?**  
  A: Yes! Change hex codes in CONFIG.json and screen properties.

- **Q: How do I add more students?**  
  A: Use Dataverse UI or import CSV file with student data.

- **Q: When will sync run?**  
  A: Daily at 2:00 AM UTC. Can manually trigger anytime.

### Getting Help
- Check [IMPLEMENTATION_GUIDE.md](./Documentation/IMPLEMENTATION_GUIDE.md) troubleshooting section
- Review [DEPLOYMENT_CHECKLIST.md](./Documentation/DEPLOYMENT_CHECKLIST.md) common issues
- Email: support@stacktrack.edu

---

## Success Criteria

✓ **15 minutes**: Environment created, tables defined  
✓ **25 minutes**: Canvas app created with dashboard  
✓ **30 minutes**: Navigation working, sample data loaded  

---

**Estimated Total Time**: 30-45 minutes  
**Difficulty**: Beginner-Intermediate  
**Last Updated**: May 10, 2026

**Next: [Full Implementation Guide →](./Documentation/IMPLEMENTATION_GUIDE.md)**
