# Power Apps Canvas - Screen Code Reference

## Global Variables & Settings

### Initialize Global Variables

Add this code to **App.OnStart**:

```powerapps
Set(ColorPrimary, ColorValue("#E3562B")); // Orange
Set(ColorSecondary, ColorValue("#1D3639")); // Teal
Set(ColorSuccess, ColorValue("#28A745")); // Green
Set(ColorWarning, ColorValue("#FFC107")); // Orange
Set(ColorError, ColorValue("#DC3545")); // Red
Set(ColorLightGray, ColorValue("#F5F5F5"));
Set(ColorDarkGray, ColorValue("#333333"));
Set(ColorBorderGray, ColorValue("#E0E0E0"));

// Font sizes
Set(FontSizeH1, 28);
Set(FontSizeH2, 20);
Set(FontSizeBody, 14);
Set(FontSizeSmall, 12);

// Spacing
Set(SpacingStandard, 16);
Set(SpacingSmall, 8);
Set(SpacingLarge, 24);

// Current user context
Set(CurrentUser, 
  LookupRecords(
    Dataverse.Students,
    "emailaddress",
    User().Email
  )
);

// Tables
Set(AllProblems, Dataverse.Problems);
Set(AllSolutions, Dataverse.'Student Solutions');
Set(AllProfiles, Dataverse.'Student Platform Profiles');
```

---

## Dashboard Screen - Detailed Code

### Container: Header

```powerapps
Container_Header:
  - Fill: White
  - Padding: 12px
  - Children:
    
    Label_DashboardTitle:
      - Text: "Dashboard"
      - Font Size: FontSizeH1
      - Font Weight: Bold
      - Color: ColorSecondary
      - X: SpacingStandard
      - Y: SpacingStandard
    
    Label_Greeting:
      - Text: "Hello, " & CurrentUser.'First Name' & "! 👋"
      - Font Size: FontSizeBody
      - Color: ColorDarkGray
      - X: SpacingStandard
      - Y: Label_DashboardTitle.Y + Label_DashboardTitle.Height + SpacingSmall
    
    Button_SyncNow:
      - Text: "Sync Now"
      - Fill: ColorPrimary
      - Color: White
      - X: Parent.Width - 120
      - Y: Label_DashboardTitle.Y
      - Width: 100
      - Height: 40
      - OnSelect: 
        Set(IsLoading, true);
        /* Trigger sync workflow */
        Notify("Syncing...", NotificationType.Information);
```

### Stats Cards Grid

```powerapps
/* Total Problems Card */
Card_TotalProblems:
  - Layout: Vertical
  - Width: (Parent.Width - 20) / 2
  - Height: 120
  - Fill: White
  - BorderColor: ColorBorderGray
  - BorderThickness: 1
  - Padding: SpacingSmall
  
  - Content:
    
    Icon1:
      - Text: "🎯"
      - Font Size: 28
    
    Label_TotalTitle:
      - Text: "Total Solved"
      - Font Size: FontSizeBody
      - Color: ColorLightGray
      - Top: 35
    
    Label_TotalValue:
      - Text: CountRows(
          Filter(AllSolutions, 
            Student.id=CurrentUser.id,
            Status="Solved"
          )
        )
      - Font Size: FontSizeH2
      - Font Weight: Bold
      - Color: ColorSecondary
      - Top: 55
    
    Label_TotalChange:
      - Text: "+5 this week"
      - Font Size: FontSizeSmall
      - Color: ColorSuccess
      - Top: 85
```

**Repeat pattern for other cards**:
- Easy/Medium/Hard breakdown
- Streak information
- Platform stats

---

## Platform Details Screen - Chart Code

### Difficulty Breakdown Pie Chart

```powerapps
PieChart_DifficultyBreakdown:
  - Data: 
    AddColumns(
      GroupBy(
        Filter(AllSolutions,
          Student.id=CurrentUser.id,
          Platform.id=Gallery_Platforms.Selected.id,
          Status="Solved"
        ),
        "Difficulty",
        "count"
      ),
      "Label", Difficulty,
      "Value", CountRows(count)
    )
  
  - LegendPosition: Bottom
  - ShowLegend: true
  
  - SeriesAxes:
    - Label: "Difficulty"
    - Values: "Value"
  
  - Colors:
    - Easy: ColorValue("#0099FF")
    - Medium: ColorPrimary
    - Hard: ColorError
```

### Topics Bar Chart

```powerapps
BarChart_TopicProgress:
  - Data:
    AddColumns(
      Sort(
        GroupBy(
          Filter(AllSolutions,
            Student.id=CurrentUser.id,
            Platform.id=Gallery_Platforms.Selected.id,
            Status="Solved"
          ),
          "Topics",
          "count"
        ),
        "Value"
      ),
      "Label", Topics,
      "Value", CountRows(count)
    )
  
  - ChartType: BarChart
  - LegendPosition: Bottom
  - XAxis_Label: "Topic"
  - YAxis_Label: "Problems Solved"
```

---

## Profile Screen - Form Code

### Update Student Information

```powerapps
Button_SaveProfile:
  - Text: "Save Changes"
  - Fill: ColorPrimary
  - OnSelect:
    Patch(
      Dataverse.Students,
      CurrentUser,
      {
        'First Name': TextInput_FirstName.Value,
        'Last Name': TextInput_LastName.Value,
        'Phone Number': TextInput_Phone.Value,
        'Batch Year': Value(TextInput_BatchYear.Value),
        'Profile Completed': true
      }
    );
    Set(CurrentUser, 
      LookupRecords(
        Dataverse.Students,
        "id",
        CurrentUser.id
      )
    );
    Notify("Profile updated successfully!", 
      NotificationType.Success);
```

### Link New Platform Profile

```powerapps
Button_LinkPlatform:
  - Text: "Link " & Dropdown_SelectPlatform.Selected.'Platform Name'
  - Fill: ColorPrimary
  - OnSelect:
    If(
      IsBlank(TextInput_Username.Value),
      Notify("Please enter a username", 
        NotificationType.Error),
      /* Call verification workflow */
      Set(IsVerifying, true);
      /* Workflow call would go here */
    )

ToggleButton_VerifyingIndicator:
  - Visible: IsVerifying
  - Text: "Verifying..."
  - Fill: ColorWarning
```

---

## AI Suggestions Screen - Gallery Code

### Suggestions Gallery

```powerapps
Gallery_Suggestions:
  - Data: 
    Sort(
      Filter(
        Dataverse.'AI Suggestions',
        Student.id=CurrentUser.id,
        If(
          Dropdown_Priority.Selected.Value="All",
          true,
          Priority=Dropdown_Priority.Selected.Value
        ),
        If(
          Dropdown_Type.Selected.Value="All",
          true,
          'Suggestion Type'=Dropdown_Type.Selected.Value
        )
      ),
      Priority,
      SortOrder.Descending
    )
  
  - Layout: Vertical
  - SnapToGrid: true
  - Height: (Parent.Height - 120) / 3
  
  - Template Content:
    
    Card_SuggestionItem:
      - Fill: White
      - BorderColor: ColorBorderGray
      - BorderThickness: 1
      - BorderRadius: 8
      - Padding: SpacingStandard
      - Margin: SpacingSmall
      
      Badge_Priority:
        - Text: "🎯 " & ThisItem.Priority
        - Fill: Switch(
            ThisItem.Priority,
            "High", ColorError,
            "Medium", ColorWarning,
            ColorSuccess
          )
        - Color: White
        - Padding: 4
        - BorderRadius: 4
      
      Label_Category:
        - Text: ThisItem.Category
        - Font Size: FontSizeSmall
        - Color: ColorPrimary
        - Font Weight: Bold
        - Y: Badge_Priority.Y + Badge_Priority.Height + SpacingSmall
      
      Label_Title:
        - Text: ThisItem.Title
        - Font Size: FontSizeH2
        - Font Weight: Bold
        - Color: ColorDarkGray
        - Y: Label_Category.Y + Label_Category.Height + SpacingSmall
      
      Label_Description:
        - Text: ThisItem.Description
        - Font Size: FontSizeBody
        - Color: ColorLightGray
        - Y: Label_Title.Y + Label_Title.Height + SpacingSmall
      
      HorizontalContainer_Metadata:
        - Layout: Horizontal
        - Y: Label_Description.Y + Label_Description.Height + SpacingSmall
        - Content:
          - Label_Difficulty: ThisItem.'Target Difficulty'
          - Label_Time: ThisItem.'Estimated Time (hours)' & " hours"
          - Label_Problems: "15 problems"
      
      HorizontalContainer_Actions:
        - Layout: Horizontal
        - Spacing: SpacingSmall
        - Y: Bottom
        - Content:
          
          Button_Accept:
            - Text: "✓ Accept"
            - Fill: ColorSuccess
            - OnSelect:
              Patch(
                Dataverse.'AI Suggestions',
                ThisItem,
                {Status: "Accepted"}
              );
              Notify("Suggestion accepted!", 
                NotificationType.Success);
          
          Button_Dismiss:
            - Text: "✕ Dismiss"
            - Fill: ColorLightGray
            - OnSelect:
              Patch(
                Dataverse.'AI Suggestions',
                ThisItem,
                {Status: "Dismissed"}
              );
          
          Button_Details:
            - Text: "→ Details"
            - Fill: ColorSecondary
            - OnSelect:
              Set(SelectedSuggestion, ThisItem);
              Navigate(SuggestionDetails_Screen);
```

---

## Navigation Code

### Bottom Navigation Bar

```powerapps
/* Add to all screens */

Container_BottomNav:
  - Layout: Horizontal
  - Height: 60
  - Y: Parent.Height - 60
  - Fill: White
  - BorderColor: ColorBorderGray
  - BorderThickness: 1
  - Spacing: 0
  
  Button_NavDashboard:
    - Text: "📊 Dashboard"
    - Width: Parent.Width / 4
    - Fill: If(
        ActiveScreen="Dashboard",
        ColorPrimary,
        ColorLightGray
      )
    - Color: If(
        ActiveScreen="Dashboard",
        White,
        ColorDarkGray
      )
    - OnSelect:
      Set(ActiveScreen, "Dashboard");
      Navigate(Dashboard_Screen);
  
  Button_NavProgress:
    - Text: "📈 Progress"
    - Width: Parent.Width / 4
    - Fill: If(
        ActiveScreen="Progress",
        ColorPrimary,
        ColorLightGray
      )
    - OnSelect:
      Set(ActiveScreen, "Progress");
      Navigate(Progress_Screen);
  
  Button_NavProfile:
    - Text: "👤 Profile"
    - Width: Parent.Width / 4
    - OnSelect:
      Set(ActiveScreen, "Profile");
      Navigate(Profile_Screen);
  
  Button_NavAI:
    - Text: "🤖 AI"
    - Width: Parent.Width / 4
    - OnSelect:
      Set(ActiveScreen, "AI");
      Navigate(AI_Screen);
```

---

## Key Formulas & Functions

### Get Current Student's Total Problems

```powerapps
CountRows(
  Filter(AllSolutions,
    Student.id=CurrentUser.id,
    Status="Solved"
  )
)
```

### Get Problems by Difficulty for Current Student

```powerapps
{
  Easy: CountRows(Filter(AllSolutions, 
    Student.id=CurrentUser.id, 
    Difficulty="Easy", 
    Status="Solved")),
  Medium: CountRows(Filter(AllSolutions, 
    Student.id=CurrentUser.id, 
    Difficulty="Medium", 
    Status="Solved")),
  Hard: CountRows(Filter(AllSolutions, 
    Student.id=CurrentUser.id, 
    Difficulty="Hard", 
    Status="Solved"))
}
```

### Calculate Success Rate by Topic

```powerapps
AddColumns(
  GroupBy(AllSolutions, "Topics"),
  "Total", CountRows(Group),
  "Solved", CountRows(
    Filter(Group, Status="Solved")
  ),
  "SuccessRate", CountRows(
    Filter(Group, Status="Solved")
  ) / CountRows(Group) * 100
)
```

### Get Last 7 Days of Activity

```powerapps
Filter(AllSolutions,
  Student.id=CurrentUser.id,
  'Solved On' >= Today()-7,
  Status="Solved"
)
```

---

## Error Handling

### Try-Catch Pattern

```powerapps
IfError(
  Patch(Dataverse.Students, CurrentUser, {Status: "Active"}),
  Notify(
    "Error updating record: " & FirstError.Message,
    NotificationType.Error
  )
)
```

### Validation

```powerapps
/* Form validation before submit */
If(
  IsBlank(TextInput_FirstName.Value),
  Notify("First name is required", NotificationType.Error);
  false,
  If(
    IsBlank(TextInput_Email.Value),
    Notify("Email is required", NotificationType.Error);
    false,
    true
  )
)
```

---

**Version**: 1.0  
**Last Updated**: May 10, 2026
