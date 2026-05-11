# Troubleshooting Guide

Common issues and solutions for STACK TRACK application.

---

## Table of Contents

1. [Environment & Setup Issues](#environment--setup-issues)
2. [Dataverse Issues](#dataverse-issues)
3. [Power Apps Issues](#power-apps-issues)
4. [Workflow Issues](#workflow-issues)
5. [Data Sync Issues](#data-sync-issues)
6. [Performance Issues](#performance-issues)
7. [Security & Access Issues](#security--access-issues)
8. [API Integration Issues](#api-integration-issues)

---

## Environment & Setup Issues

### Issue: Can't Create Environment

**Symptoms**: "You don't have permission to create environments"

**Solutions**:
1. Verify you're a **Global Administrator** or have **Power Platform Admin** role
2. Check Power Platform admin center for licensing
3. Contact IT administrator for permission elevation
4. Alternative: Use existing environment with admin approval

**Checklist**:
- [ ] Check Microsoft 365 admin center for role assignment
- [ ] Verify Dataverse capacity available (1GB min)
- [ ] Confirm Power Apps licensing enabled

---

### Issue: Environment Creation Fails

**Symptoms**: "Environment creation failed" error message

**Solutions**:
1. Check organization limits:
   - Max 10 production environments per tenant
   - Max 10 sandbox environments per tenant
   
2. If limit reached:
   - Delete unused environments
   - Or request additional capacity from Microsoft

3. Wait 24 hours after organization setup

---

## Dataverse Issues

### Issue: Can't Create Tables

**Symptoms**: "Table creation failed" or button disabled

**Solutions**:
1. Verify Dataverse database created in environment
   - Go to **Admin Center** → **Environments** → Select environment
   - Check "Database Created" status = Yes

2. If database not created:
   - Click **"Create Database"**
   - Wait 5-10 minutes for provisioning

3. Check browser compatibility (use Edge, Chrome, Firefox)

---

### Issue: Column Not Showing in Table

**Symptoms**: Created column but doesn't appear in table

**Solutions**:
1. Refresh the page (Ctrl+R)
2. Check column visibility settings:
   - Click column → **Advanced options** → **Visible in mobile**
   - Ensure it's checked
3. Verify column data type is correct
4. Check for special characters in column name (avoid spaces)

---

### Issue: Relationship Not Created

**Symptoms**: Lookup column created but no relationship showing

**Solutions**:
1. Verify related table already exists
2. Check lookup column points to correct table
3. Ensure column is defined as "Lookup" type
4. Refresh page and check relationship table
5. Manually verify:
   - Go to target table
   - Check **Relationships** tab for reverse relationship

---

### Issue: View Not Filtering Correctly

**Symptoms**: View shows all records even with filter applied

**Solutions**:
1. Check filter syntax:
   ```
   ✓ Correct: Column "Status" equals "Active"
   ✗ Wrong: Status = Active (without quotes for text)
   ```

2. Verify column contains data matching filter criteria

3. Clear browser cache and refresh

4. Check for special characters in filter values

---

## Power Apps Issues

### Issue: App Won't Load

**Symptoms**: Blank screen or infinite loading spinner

**Solutions**:
1. Clear browser cache:
   - Press **Ctrl+Shift+Delete**
   - Select "All time"
   - Check Cookies and Cached images
   - Click **"Clear data"**

2. Try different browser (Chrome, Edge, Firefox)

3. Check internet connection

4. Verify user has app access:
   - Go to app settings → Share
   - Confirm user is listed with "Can edit" permission

5. Check environment status:
   - Confirm environment is "Ready"

---

### Issue: Tables Not Showing in Data Sources

**Symptoms**: "Add data" shows no tables available

**Solutions**:
1. Verify you're in correct environment
   - Check environment dropdown in top-right

2. Confirm tables created (go to Dataverse and verify)

3. Refresh Power Apps studio:
   - Close and reopen app
   - Or click **"Refresh"** in Data pane

4. Check table permissions:
   - Ensure you have Read permission on table

---

### Issue: Buttons Not Working

**Symptoms**: Click button but nothing happens

**Solutions**:
1. Check button formula in **OnSelect**:
   ```
   ✓ Navigate(ScreenName)
   ✗ Navigate(ScreenName)) - extra parenthesis
   ```

2. Check formula syntax:
   - Use **fx** button to see errors
   - Look for red squiggly lines

3. Verify screen name exactly matches formula

4. Check if button enabled:
   - **DisplayMode** should be **Edit**
   - Not **Disabled**

5. Test formula in formula bar separately

---

### Issue: Charts Not Displaying

**Symptoms**: Chart component blank or shows no data

**Solutions**:
1. Verify data source has records:
   - Check filter returns data
   - Use CountRows() to debug: `CountRows(DataSource)`

2. Check chart configuration:
   - X-axis and Y-axis properly mapped
   - Data type matches axis type

3. Ensure chart control installed:
   - Go to **Insert** → **Charts**
   - If not available, check Power Apps license (Premium required)

4. Test with hardcoded data first:
   ```
   { Label: "Easy", Value: 50 },
   { Label: "Medium", Value: 35 },
   { Label: "Hard", Value: 15 }
   ```

5. Clear cache and reload

---

### Issue: Form Fields Not Saving

**Symptoms**: Edit field, click Save, value reverts

**Solutions**:
1. Check Patch formula syntax:
   ```powerapps
   ✓ Patch(Table, Record, {Column: NewValue})
   ✗ Patch(Table, {Column: NewValue}) - missing record
   ```

2. Verify column is editable:
   - Check in Dataverse table permissions
   - Ensure user role allows write

3. Check for validation errors:
   - Add error tracking: `IfError(Patch(...), Notify(FirstError.Message))`

4. Confirm record exists before patching:
   - Filter to verify record loaded

5. Try simpler test:
   ```powerapps
   Patch(Students, {studentid: "TEST", firstname: "John"})
   ```

---

## Workflow Issues

### Issue: Workflow Doesn't Run

**Symptoms**: Scheduled workflow not executing

**Solutions**:
1. Verify workflow is **Turned On**:
   - Go to **Power Automate**
   - Check workflow status

2. Check trigger condition:
   - Scheduled: Verify time is in future
   - Automated: Ensure condition meets requirements

3. Check flow permissions:
   - Verify environment connection has correct credentials

4. Check workflow history:
   - Go to workflow details
   - Click **28-day run history**
   - Look for failed runs and error messages

5. Test manually:
   - Click **"Test"** → **"Manually"** → **"Test"**
   - See actual error

---

### Issue: Workflow Fails with Error

**Symptoms**: Workflow shows red X in history

**Solutions**:
1. Click run to see error details
2. Common causes:
   - **API Key Invalid**: Verify key in environment variables
   - **Permission Denied**: Check service connection credentials
   - **Table Not Found**: Confirm table name spelled correctly
   - **Timeout**: Increase timeout or optimize query

3. Add error handling:
   ```
   Try: [Main Action]
   Catch: Send notification with error
   ```

---

### Issue: Email Not Sending

**Symptoms**: Workflow runs but no email received

**Solutions**:
1. Check email configuration:
   - Verify email address is valid format
   - Confirm recipient is valid user/email

2. Check spam/junk folder

3. Add success notification:
   ```
   Notify: "Email sent to {email}"
   ```

4. Test email action directly:
   - Create simple "Send an email" action
   - Manually trigger workflow
   - Verify email received

5. Check connection:
   - Go to **Power Automate** → **Connections**
   - Verify Office 365 Outlook connected

---

## Data Sync Issues

### Issue: Data Not Syncing from Platform

**Symptoms**: Workflow runs but no new Student Solutions created

**Solutions**:
1. Check workflow run details:
   - Go to run history
   - Review each step for errors

2. Verify API endpoint correct:
   - Test API call independently:
     ```
     curl -H "Authorization: Bearer {key}" \
     https://api.platform.com/user/{username}
     ```

3. Check API key not expired:
   - Go to platform account settings
   - Regenerate key if needed
   - Update in Power Automate secrets

4. Verify username linked correctly:
   - Check Student Platform Profile record
   - Ensure PlatformUsername is exact match

5. Check rate limits:
   - Some APIs limit requests per hour
   - May need to add delays between calls

6. Test with single student first:
   - Filter workflow to one profile
   - See if sync works

---

### Issue: Duplicate Solutions Created

**Symptoms**: Same problem appears multiple times for student

**Solutions**:
1. Add deduplication check:
   ```
   Check if Student Solution already exists:
   If empty, create new
   If exists, update instead
   ```

2. Use Upsert instead of Create:
   ```
   Upsert(StudentSolutions, {
     StudentId, ProblemId
   }, newRecord)
   ```

3. Add unique constraint:
   - Go to Dataverse table
   - Set StudentId + ProblemId as unique key

---

## Performance Issues

### Issue: App Loading Slowly

**Symptoms**: Takes >3 seconds to load dashboard

**Solutions**:
1. Reduce initial data load:
   ```powerapps
   ✗ Students table (load all 500 students)
   ✓ Filter(Students, Status="Active") (load 400)
   ```

2. Paginate large lists:
   - Set **PageSize: 50** in gallery
   - Load more on scroll

3. Use local caching:
   ```powerapps
   Set(CachedStudents, Filter(Students, Status="Active"));
   // Then use CachedStudents instead of calling table multiple times
   ```

4. Limit columns loaded:
   - Only select needed columns in source
   - Avoid loading optional text fields

5. Move calculations to Dataverse:
   - Use calculated columns instead of formulas
   - Use aggregates in views

6. Profile performance:
   - Use app insights to identify slow components
   - Monitor data load times

---

### Issue: Charts Take Forever to Render

**Symptoms**: Chart blank for 5+ seconds

**Solutions**:
1. Pre-process data:
   - Calculate groups before passing to chart
   - Cache result in variable

2. Limit chart data:
   - Show top 10 instead of all 100 categories
   - Use date range filter (last 30 days vs all time)

3. Simplify query:
   ```powerapps
   ✗ Complex nested filters
   ✓ Use Dataverse views (pre-filtered, faster)
   ```

4. Use Power BI embedded instead:
   - For complex visualizations
   - Better performance with large datasets

---

### Issue: Gallery Scrolling Laggy

**Symptoms**: Gallery items stutter when scrolling

**Solutions**:
1. Reduce template complexity:
   - Move calculations to OnLoad
   - Simplify visual effects

2. Reduce data:
   - Show 50 items, paginate rest
   - Filter to recent only

3. Disable animations:
   - Go to gallery settings
   - Reduce transition time

---

## Security & Access Issues

### Issue: User Can't Access App

**Symptoms**: "You don't have access" message

**Solutions**:
1. Verify app is shared:
   - Go to **Power Apps** → Select app → **Share**
   - Confirm user/group listed

2. Check permissions:
   - User needs "Can edit" or "Can play"

3. Verify security role assigned:
   - User must have role with table access

4. Check environment access:
   - User must have access to environment
   - Go to **Admin Center** → **Environments** → Select → **Access**

5. Clear cached credentials:
   - Sign out completely
   - Clear browser data
   - Sign back in

---

### Issue: User Sees Other Students' Data

**Symptoms**: Student can view all students' solutions, not just own

**Solutions**:
1. Add row-level security:
   ```
   Add filter to view:
   Solution.Student.id = CurrentUser().id
   ```

2. Verify security role:
   - Student role should have **User** level access
   - Not **Organization** level

3. Check formula filters:
   - All galleries/forms must include:
     ```
     Filter(Table, Student.id = CurrentUser().id)
     ```

4. Test with different user account

---

### Issue: Faculty Can't See Class Analytics

**Symptoms**: Faculty dashboard blank or limited data

**Solutions**:
1. Verify faculty role assigned to user
2. Check role permissions include:
   - Students table (Read, Organization level)
   - Student Solutions (Read, Organization level)
3. Verify faculty dashboard filters correct:
   - Should NOT filter by current user
   - Should show entire class data

---

## API Integration Issues

### Issue: "Invalid API Key" Error

**Symptoms**: Workflow fails with authorization error

**Solutions**:
1. Verify key format correct:
   - LeetCode: Hex string, 32 chars
   - GFG: Usually alphanumeric
   - CodeChef: Bearer token format

2. Check key not expired:
   - Regenerate on platform
   - Update in Power Automate

3. Verify scope correct:
   - Some keys have limited scope
   - May need read+write permissions

4. Check environment variable:
   - Go to Power Automate → **My connections**
   - Verify connection configured

---

### Issue: "Rate Limit Exceeded"

**Symptoms**: Workflow fails after running several times

**Solutions**:
1. Add delay between API calls:
   ```
   Add action: "Delay" → 5 seconds
   ```

2. Implement exponential backoff:
   ```
   Attempt 1: Immediate
   Attempt 2: Wait 5 seconds
   Attempt 3: Wait 30 seconds
   ```

3. Batch requests:
   - Instead of 1 request per student
   - Call once per platform for all students

4. Check API rate limits:
   - LeetCode: 1 req/sec
   - GFG: 10 req/sec
   - CodeChef: Check docs

---

### Issue: "Invalid Response Format"

**Symptoms**: Workflow fails parsing API response

**Solutions**:
1. Log raw response:
   - Add action: Compose output of API call
   - Save to file for debugging

2. Check expected format:
   - API documentation may have changed
   - Verify response is JSON

3. Use Try-Catch:
   ```
   Try: Parse JSON
   Catch: Save raw response and error
   ```

4. Test API independently:
   ```
   curl -H "Authorization: Bearer {key}" \
   https://api.example.com/endpoint
   ```

---

## Getting Help

### Before Contacting Support

Prepare:
- [ ] Screenshot of error
- [ ] Steps to reproduce
- [ ] Environment ID
- [ ] Affected user/record ID
- [ ] Workflow run ID (if automation issue)
- [ ] Browser and OS
- [ ] Recent changes made

### Contact Information

- **Email**: support@stacktrack.edu
- **Response Time**: 24 business hours
- **Critical Issues**: Escalate to IT administrator

---

**Last Updated**: May 10, 2026
