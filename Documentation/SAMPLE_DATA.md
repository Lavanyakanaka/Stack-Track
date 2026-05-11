# Sample Test Data

## Student Records (Sample 5 records)

```json
{
  "students": [
    {
      "studentid": "STU001",
      "firstname": "Raj",
      "lastname": "Kumar",
      "emailaddress": "raj.kumar@college.edu",
      "phonenumber": "+91-98765-43210",
      "batchyear": 2025,
      "department": "Computer Science",
      "joindate": "2024-08-15",
      "totalproblemsolved": 285,
      "longeststreak": 47,
      "profilecompleted": true,
      "status": "Active"
    },
    {
      "studentid": "STU002",
      "firstname": "Priya",
      "lastname": "Singh",
      "emailaddress": "priya.singh@college.edu",
      "phonenumber": "+91-98765-43211",
      "batchyear": 2025,
      "department": "Computer Science",
      "joindate": "2024-09-01",
      "totalproblemsolved": 267,
      "longeststreak": 32,
      "profilecompleted": true,
      "status": "Active"
    },
    {
      "studentid": "STU003",
      "firstname": "Arun",
      "lastname": "Patel",
      "emailaddress": "arun.patel@college.edu",
      "phonenumber": "+91-98765-43212",
      "batchyear": 2025,
      "department": "Computer Science",
      "joindate": "2024-09-10",
      "totalproblemsolved": 245,
      "longeststreak": 21,
      "profilecompleted": true,
      "status": "Active"
    },
    {
      "studentid": "STU004",
      "firstname": "Maya",
      "lastname": "Gupta",
      "emailaddress": "maya.gupta@college.edu",
      "phonenumber": "+91-98765-43213",
      "batchyear": 2025,
      "department": "Computer Science",
      "joindate": "2024-08-20",
      "totalproblemsolved": 198,
      "longeststreak": 15,
      "profilecompleted": true,
      "status": "Active"
    },
    {
      "studentid": "STU005",
      "firstname": "Vikram",
      "lastname": "Verma",
      "emailaddress": "vikram.verma@college.edu",
      "phonenumber": "+91-98765-43214",
      "batchyear": 2025,
      "department": "Computer Science",
      "joindate": "2024-10-01",
      "totalproblemsolved": 156,
      "longeststreak": 8,
      "profilecompleted": false,
      "status": "Active"
    }
  ]
}
```

---

## Platform Records (Pre-populated)

```json
{
  "platforms": [
    {
      "platformname": "LeetCode",
      "platformcode": "LT",
      "websiteurl": "https://leetcode.com",
      "color": "#FFB81C",
      "icon": "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      "description": "Leading online judge for coding interviews",
      "active": true
    },
    {
      "platformname": "GeeksforGeeks",
      "platformcode": "GFG",
      "websiteurl": "https://www.geeksforgeeks.org/",
      "color": "#36464B",
      "icon": "https://media.geeksforgeeks.org/wp-content/uploads/20210928014305/GFGLogo.png",
      "description": "Educational platform for coding tutorials and problems",
      "active": true
    },
    {
      "platformname": "CodeChef",
      "platformcode": "CC",
      "websiteurl": "https://www.codechef.com/",
      "color": "#C4514D",
      "icon": "https://a.thumbs.redditmedia.com/7K-84SrHl7LhFDTb4j3qMc4AvM0MfMdJxPg_fGJ9gJw.png",
      "description": "Competitive programming platform and contests",
      "active": true
    }
  ]
}
```

---

## Student Platform Profiles (Sample)

```json
{
  "student_platform_profiles": [
    {
      "studentid": "STU001",
      "platformid": "LT",
      "platformusername": "rajkumar92",
      "linkeddate": "2024-08-20",
      "totalproblemsolved": 150,
      "easyproblemsolved": 75,
      "mediumproblemsolved": 60,
      "hardproblemsolved": 15,
      "lastsynced": "2026-05-10T06:00:00Z",
      "profileurl": "https://leetcode.com/rajkumar92/",
      "status": "Active"
    },
    {
      "studentid": "STU001",
      "platformid": "GFG",
      "platformusername": "raj_kumar_92",
      "linkeddate": "2024-09-05",
      "totalproblemsolved": 85,
      "easyproblemsolved": 45,
      "mediumproblemsolved": 35,
      "hardproblemsolved": 5,
      "lastsynced": "2026-05-10T06:00:00Z",
      "profileurl": "https://auth.geeksforgeeks.org/user/raj_kumar_92/",
      "status": "Active"
    },
    {
      "studentid": "STU001",
      "platformid": "CC",
      "platformusername": "rajkumar_92",
      "linkeddate": "2024-09-15",
      "totalproblemsolved": 50,
      "easyproblemsolved": 30,
      "mediumproblemsolved": 18,
      "hardproblemsolved": 2,
      "lastsynced": "2026-05-10T06:00:00Z",
      "profileurl": "https://www.codechef.com/users/rajkumar_92",
      "status": "Active"
    }
  ]
}
```

---

## Problems (Sample 20 problems)

```json
{
  "problems": [
    {
      "problemid": "LT0001",
      "problemname": "Two Sum",
      "platformid": "LT",
      "difficulty": "Easy",
      "category": "Array",
      "topics": "Array, Hash Table",
      "acceptancerate": 48.2,
      "description": "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
      "exampleinput": "nums = [2,7,11,15], target = 9",
      "exampleoutput": "[0,1]",
      "platformurl": "https://leetcode.com/problems/two-sum/",
      "problemnumber": "1",
      "createdon": "2024-08-20"
    },
    {
      "problemid": "LT0002",
      "problemname": "Add Two Numbers",
      "platformid": "LT",
      "difficulty": "Medium",
      "category": "Linked List",
      "topics": "Linked List, Math, Recursion",
      "acceptancerate": 32.8,
      "description": "You are given two non-empty linked lists representing two non-negative integers.",
      "exampleinput": "l1 = [2,4,3], l2 = [5,6,4]",
      "exampleoutput": "[7,0,8]",
      "platformurl": "https://leetcode.com/problems/add-two-numbers/",
      "problemnumber": "2",
      "createdon": "2024-08-20"
    },
    {
      "problemid": "LT0003",
      "problemname": "Longest Substring Without Repeating Characters",
      "platformid": "LT",
      "difficulty": "Medium",
      "category": "String",
      "topics": "String, Sliding Window",
      "acceptancerate": 33.8,
      "description": "Given a string s, find the length of the longest substring without repeating characters.",
      "exampleinput": "s = \"abcabcbb\"",
      "exampleoutput": "3",
      "platformurl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      "problemnumber": "3",
      "createdon": "2024-08-20"
    },
    {
      "problemid": "GFG001",
      "problemname": "Reverse an Array",
      "platformid": "GFG",
      "difficulty": "Easy",
      "category": "Array",
      "topics": "Array, Iteration",
      "acceptancerate": 85.0,
      "description": "Reverse an array in-place.",
      "exampleinput": "[1, 2, 3, 4, 5]",
      "exampleoutput": "[5, 4, 3, 2, 1]",
      "platformurl": "https://www.geeksforgeeks.org/reverse-an-array/",
      "problemnumber": "array-reverse-1",
      "createdon": "2024-08-20"
    },
    {
      "problemid": "GFG002",
      "problemname": "Binary Search",
      "platformid": "GFG",
      "difficulty": "Easy",
      "category": "Searching",
      "topics": "Binary Search, Array",
      "acceptancerate": 88.0,
      "description": "Implement binary search on a sorted array.",
      "exampleinput": "arr = [1,3,5,7,9], target = 5",
      "exampleoutput": "2",
      "platformurl": "https://www.geeksforgeeks.org/binary-search/",
      "problemnumber": "search-binary-1",
      "createdon": "2024-08-20"
    },
    {
      "problemid": "CC001",
      "problemname": "Chef and His Students",
      "platformid": "CC",
      "difficulty": "Easy",
      "category": "Basic",
      "topics": "Math, Loops",
      "acceptancerate": 72.5,
      "description": "Chef has N students. He wants to give them candies.",
      "exampleinput": "N = 5",
      "exampleoutput": "15",
      "platformurl": "https://www.codechef.com/problems/STUDENTS",
      "problemnumber": "STUDENTS",
      "createdon": "2024-08-20"
    }
  ]
}
```

---

## Student Solutions (Sample 30 records for STU001)

```json
{
  "student_solutions": [
    {
      "studentid": "STU001",
      "problemid": "LT0001",
      "platformid": "LT",
      "status": "Solved",
      "solvedon": "2024-08-22T14:30:00Z",
      "timespent": 12,
      "difficulty": "Easy",
      "isoptimal": true,
      "languageused": "Python",
      "notes": "Used hash table approach. Very efficient.",
      "firstattemptsuccess": true,
      "hintsused": 0,
      "syncedfromplatform": true,
      "manualentry": false
    },
    {
      "studentid": "STU001",
      "problemid": "LT0002",
      "platformid": "LT",
      "status": "Solved",
      "solvedon": "2024-08-24T10:15:00Z",
      "timespent": 45,
      "difficulty": "Medium",
      "isoptimal": false,
      "languageused": "Java",
      "notes": "Linked list traversal. Could optimize space complexity.",
      "firstattemptsuccess": false,
      "hintsused": 2,
      "syncedfromplatform": true,
      "manualentry": false
    },
    {
      "studentid": "STU001",
      "problemid": "LT0003",
      "platformid": "LT",
      "status": "Solved",
      "solvedon": "2024-08-25T16:45:00Z",
      "timespent": 35,
      "difficulty": "Medium",
      "isoptimal": true,
      "languageused": "Python",
      "notes": "Sliding window approach. Clean solution.",
      "firstattemptsuccess": true,
      "hintsused": 0,
      "syncedfromplatform": true,
      "manualentry": false
    },
    {
      "studentid": "STU001",
      "problemid": "GFG001",
      "platformid": "GFG",
      "status": "Solved",
      "solvedon": "2024-09-05T09:20:00Z",
      "timespent": 5,
      "difficulty": "Easy",
      "isoptimal": true,
      "languageused": "Python",
      "notes": "Simple two-pointer approach.",
      "firstattemptsuccess": true,
      "hintsused": 0,
      "syncedfromplatform": true,
      "manualentry": false
    },
    {
      "studentid": "STU001",
      "problemid": "GFG002",
      "platformid": "GFG",
      "status": "Solved",
      "solvedon": "2024-09-06T13:30:00Z",
      "timespent": 10,
      "difficulty": "Easy",
      "isoptimal": true,
      "languageused": "Java",
      "notes": "Binary search implementation.",
      "firstattemptsuccess": true,
      "hintsused": 0,
      "syncedfromplatform": true,
      "manualentry": false
    }
  ]
}
```

---

## AI Suggestions (Sample for STU001)

```json
{
  "ai_suggestions": [
    {
      "studentid": "STU001",
      "suggestiontype": "Topic",
      "title": "Master Binary Search Trees",
      "description": "You've solved 40% of BST problems. Solving the next 10 medium-level problems will boost your proficiency to 80%+. Binary trees are crucial for interviews.",
      "recommendedon": "2026-05-08T10:00:00Z",
      "priority": "High",
      "category": "Weak Topic",
      "targetdifficulty": "Medium",
      "estimatedtimehours": 5.5,
      "relevancedata": "{\"currentSuccess\": 40, \"targetSuccess\": 80, \"relatedTopics\": [\"Trees\", \"DFS\", \"BFS\"]}",
      "status": "New",
      "reasoning": "Analysis shows BST is your weakest strong category with only 40% success. This is important for technical interviews.",
      "generatedat": "2026-05-08T10:00:00Z"
    },
    {
      "studentid": "STU001",
      "suggestiontype": "Difficulty",
      "title": "Ready for Hard Problems",
      "description": "Congratulations! You've achieved 92% success rate on medium-level problems. You're ready to tackle hard problems. Start with 5 easy hard problems to build confidence.",
      "recommendedon": "2026-05-09T08:00:00Z",
      "priority": "High",
      "category": "Next Level",
      "targetdifficulty": "Hard",
      "estimatedtimehours": 8.0,
      "relevancedata": "{\"currentDifficulty\": \"Medium\", \"successRate\": 92, \"readyFor\": \"Hard\"}",
      "status": "Viewed",
      "reasoning": "Your medium problem success rate (92%) indicates you're ready for the next difficulty tier. Gradual progression recommended.",
      "generatedat": "2026-05-09T08:00:00Z"
    },
    {
      "studentid": "STU001",
      "suggestiontype": "Problem Set",
      "title": "Dynamic Programming Bootcamp",
      "description": "A curated set of 15 DP problems progressing from basics to advanced. Duration: 10-15 hours. Success rate among similar students: 87%.",
      "recommendedon": "2026-05-07T15:00:00Z",
      "priority": "Medium",
      "category": "Focus Area",
      "targetdifficulty": "Mixed",
      "estimatedtimehours": 12.0,
      "relevancedata": "{\"problems\": 15, \"topics\": [\"DP\", \"Recursion\"], \"successRate\": 87}",
      "status": "Accepted",
      "reasoning": "You've attempted only 3 DP problems. This is a critical algorithm pattern. Recommended to spend concentrated effort.",
      "generatedat": "2026-05-07T15:00:00Z"
    }
  ]
}
```

---

## Import Instructions

### For CSV Import

1. Export each JSON array to CSV format
2. Ensure columns match Dataverse table structure
3. Go to **Dataverse** → **Tables** → Select Table → **Data**
4. Click **"Import Data"**
5. Select CSV file
6. Map columns to table fields
7. Click **"Import"**

### For Direct Dataverse Entry

1. Go to **Dataverse** → **Tables** → Select Table
2. Click **"New"**
3. Fill in all fields
4. Click **"Save & New"** for next record

### Bulk Import via Power Automate

Create a flow to parse JSON and create records:

```powerapps
{
  "trigger": "Manually",
  "actions": [
    {
      "name": "Parse JSON",
      "input": { "json": sample_data_above }
    },
    {
      "name": "For each student",
      "createRecord": "Create in Students table"
    }
  ]
}
```

---

**Version**: 1.0  
**Sample Data Size**: ~50 records across tables  
**Last Updated**: May 10, 2026
