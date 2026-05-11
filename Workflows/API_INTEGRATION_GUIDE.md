# API Integration Guide

Complete guide for integrating with LeetCode, GeeksforGeeks, and CodeChef APIs.

---

## Overview

STACK TRACK syncs problem-solving data from three platforms:
- **LeetCode**: https://leetcode.com
- **GeeksforGeeks**: https://geeksforgeeks.org
- **CodeChef**: https://codechef.com

---

## Security Best Practices

### 1. Store API Keys Securely

**Never** hardcode API keys in workflows!

**Instead**, use Power Automate Secrets:

1. Go to **Power Automate** → **My connections**
2. Click **"New connection"**
3. Select **"HTTP with Azure AD"** or similar
4. Store credentials securely
5. Reference in workflow: `connection().authentication`

### 2. Use Environment Variables

In Power Automate:
```
Add action: "Initialize variable"
├─ Name: APIKey_LeetCode
├─ Type: String
├─ Value: @environment('APIKey_LeetCode')
```

Environment variable setup:
- Go to **Solutions** → **Environment variables**
- Create one per API key
- Set value per environment

### 3. HTTPS Only

All API calls must use HTTPS:
```
✓ https://api.leetcode.com/user/...
✗ http://api.leetcode.com/user/...
```

---

## LeetCode API

### Authentication

LeetCode doesn't require API key for public data, but rate limiting applies.

**Rate Limit**: 1 request per second

### Base URL

```
https://leetcode.com/api/v1/
```

### Key Endpoints

#### 1. Get User Profile
```
GET /user/{username}/

Response:
{
  "username": "rajkumar92",
  "real_name": "Raj Kumar",
  "avatar": "https://...",
  "status": "Whitelisted",
  "profile": {
    "userSlug": "rajkumar92",
    "realName": "Raj Kumar",
    "aboutMe": "...",
    "userAvatar": "https://...",
    "countryName": "India",
    "state": "Delhi"
  }
}
```

#### 2. Get User Submissions
```
GET /submissions/latest_submission_list/?username={username}&limit=10

Response:
{
  "submissions": [
    {
      "id": "1234567",
      "title": "Two Sum",
      "titleSlug": "two-sum",
      "timestamp": "1724151345",
      "status_display": "Accepted",
      "lang": "python3",
      "runtime": "45 ms",
      "url": "/submissions/detail/1234567/"
    },
    ...
  ]
}
```

#### 3. Get Problem Details
```
GET /problems/{problem_slug}/

Response:
{
  "question_id": 1,
  "question_title": "Two Sum",
  "question_title_slug": "two-sum",
  "level": {
    "level": 1  // 1=Easy, 2=Medium, 3=Hard
  },
  "stats": {
    "totalAccepted": "8.3M",
    "totalSubmission": "17.3M",
    "totalAcceptedRaw": 8300000,
    "totalSubmissionRaw": 17300000
  },
  "topics": [
    {"name": "Array"},
    {"name": "Hash Table"}
  ]
}
```

### Power Automate Implementation

```powerapps
Action: HTTP
  Method: GET
  URI: https://leetcode.com/api/v1/user/{username}/
  
Action: Parse JSON
  Schema: {
    "type": "object",
    "properties": {
      "username": {"type": "string"},
      "real_name": {"type": "string"}
    }
  }

Action: Create a row in Student Platform Profiles
  ├─ StudentId: {StudentId}
  ├─ PlatformId: LeetCode
  ├─ PlatformUsername: parsed_username
  ├─ TotalProblemsSolved: submissions.length
  └─ Status: "Verified"
```

---

## GeeksforGeeks API

### Authentication

GeeksforGeeks API requires authentication token.

**Rate Limit**: 10 requests per second

### Getting API Key

1. Go to https://www.geeksforgeeks.org/
2. Sign in to account
3. Go to **Settings** → **API Keys**
4. Generate new key
5. Copy and store securely

### Base URL

```
https://api.geeksforgeeks.org/
```

### Key Endpoints

#### 1. Get User Profile
```
GET /api/v1/profile/{username}/
Headers:
  Authorization: Bearer {API_KEY}
  Content-Type: application/json

Response:
{
  "success": true,
  "data": {
    "id": "123456",
    "username": "raj_kumar_92",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "problems_solved": 85,
    "profile_pic": "https://...",
    "user_type": "user"
  }
}
```

#### 2. Get User Problems
```
GET /api/v1/user/{username}/problems/?limit=50&offset=0
Headers:
  Authorization: Bearer {API_KEY}

Response:
{
  "success": true,
  "count": 85,
  "results": [
    {
      "id": "1",
      "title": "Reverse an Array",
      "difficulty": "Easy",
      "topic": "Array",
      "solved_at": "2024-09-05T10:30:00Z",
      "time_spent": "5 minutes"
    },
    ...
  ]
}
```

#### 3. Get Problem Details
```
GET /api/v1/problem/{problem_id}/
Headers:
  Authorization: Bearer {API_KEY}

Response:
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Reverse an Array",
    "description": "...",
    "difficulty": "Easy",
    "topics": ["Array"],
    "acceptance_rate": 85.5,
    "submissions": 10000
  }
}
```

### Power Automate Implementation

```powerapps
Action: Initialize variable
  ├─ Name: APIKey_GFG
  ├─ Type: String
  └─ Value: @environment('APIKey_GFG')

Action: HTTP
  ├─ Method: GET
  ├─ URI: https://api.geeksforgeeks.org/api/v1/profile/{username}/
  └─ Headers:
       Authorization: Bearer @{variables('APIKey_GFG')}
       Content-Type: application/json

Action: Parse JSON
  Schema: {
    "type": "object",
    "properties": {
      "success": {"type": "boolean"},
      "data": {
        "type": "object",
        "properties": {
          "username": {"type": "string"},
          "problems_solved": {"type": "integer"}
        }
      }
    }
  }

Action: For each problem in results
  ├─ Create Student Solution record
  └─ Update aggregates
```

---

## CodeChef API

### Authentication

CodeChef uses OAuth2 authentication.

**Rate Limit**: 5 requests per second

### Getting API Credentials

1. Go to https://www.codechef.com/
2. Sign in to account
3. Go to **Settings** → **Applications**
4. Create new application
5. Get Client ID and Client Secret
6. Store securely

### Base URL

```
https://api.codechef.com/
```

### Authentication Flow

```
Step 1: Get access token
POST /oauth/token
  ├─ grant_type: client_credentials
  ├─ client_id: {CLIENT_ID}
  └─ client_secret: {CLIENT_SECRET}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}

Step 2: Use token for API calls
GET /problems/
  Headers: Authorization: Bearer {access_token}
```

### Key Endpoints

#### 1. Get User Profile
```
GET /users/{username}
Headers:
  Authorization: Bearer {TOKEN}

Response:
{
  "result": {
    "data": {
      "username": "rajkumar_92",
      "name": "Raj Kumar",
      "country": "India",
      "city": "Delhi",
      "email": "raj@example.com",
      "solved_count": 50,
      "rating": 1850
    }
  }
}
```

#### 2. Get User Submissions
```
GET /users/{username}/submissions
Headers:
  Authorization: Bearer {TOKEN}

Response:
{
  "result": {
    "data": [
      {
        "id": "123456",
        "problem_code": "CCDSAP",
        "language": "PYTHON",
        "status": "AC",
        "submission_time": "2024-09-15T14:30:00Z",
        "exec_time": "0.02",
        "exec_memory": "4.3"
      },
      ...
    ]
  }
}
```

#### 3. Get Problem Details
```
GET /problems/{problem_code}
Headers:
  Authorization: Bearer {TOKEN}

Response:
{
  "result": {
    "data": {
      "code": "CCDSAP",
      "name": "Chef and String",
      "body": "...",
      "difficulty": "EASY",
      "solved": 3500,
      "total_submissions": 8500,
      "accuracy": "41.18%"
    }
  }
}
```

### Power Automate Implementation

```powerapps
Action: Initialize variables
  ├─ ClientId: @environment('CodeChef_ClientId')
  ├─ ClientSecret: @environment('CodeChef_ClientSecret')
  └─ AccessToken: ""

Action: HTTP - Get Access Token
  ├─ Method: POST
  ├─ URI: https://api.codechef.com/oauth/token
  ├─ Body: {
  │   "grant_type": "client_credentials",
  │   "client_id": "@{variables('ClientId')}",
  │   "client_secret": "@{variables('ClientSecret')}"
  │ }
  └─ Set AccessToken: @body('HTTP_GetToken')['access_token']

Action: HTTP - Get User Profile
  ├─ Method: GET
  ├─ URI: https://api.codechef.com/users/{username}
  └─ Headers:
       Authorization: Bearer @{variables('AccessToken')}

Action: Parse JSON and process
  └─ Create/Update Student Platform Profile
```

---

## Error Handling

### Common API Errors

| Status | Code | Meaning | Solution |
|--------|------|---------|----------|
| 401 | UNAUTHORIZED | Invalid/expired token | Regenerate token, check API key |
| 403 | FORBIDDEN | No permission | Check scope, verify API key active |
| 404 | NOT_FOUND | User/problem doesn't exist | Verify username/problem ID |
| 429 | RATE_LIMITED | Too many requests | Add delay, implement backoff |
| 500 | SERVER_ERROR | API server error | Retry later, contact platform |

### Retry Strategy

```powerapps
Action: HTTP call
  └─ Configure retry:
       ├─ Maximum retries: 3
       ├─ Backoff multiplier: 2
       ├─ Initial interval: 1 second
       └─ Max interval: 30 seconds
```

### Error Logging

```powerapps
Action: Try-Catch
  ├─ Try: [API Call]
  └─ Catch:
       ├─ Create error record in Dataverse
       │  ├─ Error message
       │  ├─ Status code
       │  ├─ Timestamp
       │  └─ User/problem details
       │
       ├─ Send notification to admin
       │  └─ Subject: "API Sync Error - {Platform}"
       │
       └─ Return error response
```

---

## Testing APIs

### Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create new request
3. Set method and URL
4. Add headers (Authorization, Content-Type)
5. Click "Send"
6. Review response

### cURL Testing

```bash
# LeetCode user profile
curl -X GET "https://leetcode.com/api/v1/user/rajkumar92/"

# GeeksforGeeks with API key
curl -X GET "https://api.geeksforgeeks.org/api/v1/profile/raj_kumar_92/" \
  -H "Authorization: Bearer YOUR_API_KEY"

# CodeChef (first get token)
curl -X POST "https://api.codechef.com/oauth/token" \
  -d "grant_type=client_credentials&client_id=YOUR_ID&client_secret=YOUR_SECRET"
```

---

## Rate Limiting Strategy

### Implementation

```powerapps
Workflow: Daily Data Sync
  ├─ Get all student profiles (let's say 100)
  │
  ├─ For LeetCode (1 req/sec):
  │  ├─ Delay: 1 second between requests
  │  ├─ 100 profiles = 100 seconds = 1.67 minutes
  │
  ├─ For GFG (10 req/sec):
  │  ├─ Delay: 0.1 seconds between requests
  │  ├─ 100 profiles = 10 seconds
  │
  └─ For CodeChef (5 req/sec):
     ├─ Delay: 0.2 seconds between requests
     ├─ 100 profiles = 20 seconds
```

### Add Delay

```powerapps
Action: Delay
  ├─ Count: 1
  └─ Unit: Seconds
```

---

## Mapping APIs to Dataverse

### Problem Difficulty Mapping

| LeetCode | GFG | CodeChef | Dataverse |
|----------|-----|----------|-----------|
| Easy | Easy | EASY | Easy |
| Medium | Medium | MEDIUM | Medium |
| Hard | Hard | HARD | Hard |

### Timestamp Handling

All platforms return timestamps in different formats:

```
LeetCode:   Unix timestamp (1724151345)
GFG:        ISO 8601 (2024-09-05T10:30:00Z)
CodeChef:   ISO 8601 (2024-09-15T14:30:00Z)

Convert to Dataverse:
LeetCode:   addSeconds(baseDate, timestamp)
GFG/CC:     parseDateTime(timestamp)
```

---

## Monitoring API Health

### Add to Workflow

```powerapps
Action: Create log entry
  ├─ Timestamp
  ├─ Platform
  ├─ Requests made
  ├─ Requests successful
  ├─ Requests failed
  └─ Response times
```

### Dashboard Metric

```
API Health Score = (Successful requests / Total requests) * 100

✓ Green: > 99%
⚠️ Yellow: 95-99%
🔴 Red: < 95%
```

---

## Troubleshooting API Issues

### LeetCode

**Issue**: All requests return 404

**Solution**: 
- Username might be case-sensitive
- Try exact username from profile URL

### GeeksforGeeks

**Issue**: 401 Unauthorized

**Solution**:
- API key might have expired
- Regenerate new key
- Check key format (should be long hex string)

### CodeChef

**Issue**: Token expires after 1 hour

**Solution**:
- Refresh token before expiry
- Add check: `if (currentTime > tokenExpiryTime) { refreshToken() }`

---

## Production Checklist

- [ ] All API keys stored in environment variables
- [ ] HTTPS enforced for all endpoints
- [ ] Error logging implemented
- [ ] Retry logic with exponential backoff
- [ ] Rate limiting respected
- [ ] API health monitoring active
- [ ] Load testing completed (100+ concurrent users)
- [ ] Disaster recovery tested
- [ ] Documentation updated

---

**Last Updated**: May 10, 2026  
**API Integration Status**: Complete
