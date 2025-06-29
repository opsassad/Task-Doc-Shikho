## CRM Employee Records

### ✅ Update Triggers

| Event | When |
|:------|:-----|
| New OJT Entry | When new employees start OJT after Room Training |
| OJT Certification Update | Every Saturday, based on Training Team's email about certification or discontinuation |
| OJT Recertification Update | Every Wednesday, based on Training Team's email about recertification outcomes |

### 📄 Column-wise Update Guidelines

| Column Name | Purpose | OJT Stage | Certification Stage | Recertification Stage |
|:------------|:--------|:----------|:-------------------|:---------------------|
| ID | Unique identifier for each employee [Given by HR after joining, or given by you before joining date] | Use a random format like B13-25-14OJT02 | Replace with official employee ID from HR under certification email | Keep the given ID of OJT stage |
| Counselor | Name of the agent | Pull from CRM Users table using an extension named "Instant Data Scraper"| No change | No change |
| TL (Team Leader) | Assigned team leader or batch name [batch name in OJT] | Use batch name like Training - B13-Jun'25 | Update with assigned TL's name from team mapping | Leave as-is if not certified, otherwise update accordingly |
| Managers | Managers responsible | Set as "Training" | Update with actual assigned manager(s) | Leave as-is if not certified, otherwise update accordingly |
| Site | Agent's location | From OJT Email (e.g., Jessore or Dhaka) | No change | No change |
| Assigned QA | Quality Analyst responsible | From CRM mapping | No change | No change |
| Channel | Functional department/channel | From CRM: e.g., Telesales, CX-Inbound, CX, Retention | No change | No change |
| Joining Date | Official joining date | Leave blank | Fill with actual joining date from HR | Leave blank unless certified |
| Email Address | Email of the employee | From CRM | No change | No change |
| Phone Number | Phone number of the employee | From CRM | No change | No change |
| Training Batch | Structured batch naming for tracking | Format as 25-JUN-B13 (Year-Month-Batch) | No change | No change |
| Training Start Date | Date when room training started | Fill from training records | No change | No change |
| CRM ID | ID from the CRM users tab (not HR ID) | From CRM | No change | No change |
| Training Status | Tracks current progress/status | OJT, Not Certified, Retraining, or Discontinued | Update to Certified or appropriate status | Update to Recertification Certified, Recertification Not Certified, or Discontinued |
| Employee "ID_Name" | Concatenated field for forms or dropdowns | Concatenate ID and Name (e.g., B13-25-14OJT02_John Doe) | Concatenate official employee ID and Name | Concatenate recertification ID and Name |

### 🛠️ Common Scenarios

| Scenario | ID | TL | Managers | Training Status | Joining Date |
|:---------|:---|:---|:---------|:---------------|:-------------|
| New OJT Entry | Random format like B13-25-14OJT02 | Training - B13-Jun'25 | Training | OJT | (Leave blank) |
| Certified Agent (Saturday) | Replace with official HR ID | Update with assigned TL | Assigned Managers | Certified | Set from HR data |
| Recertification (Wednesday) | Keep or update random format | Update if certified | Update if certified | Recertification Certified or appropriate | Set only if certified |

### 🔧 Basic Troubleshooting Guide

| Issue | Possible Cause | Action to Take |
|:------|:---------------|:---------------|
| New agent missing from sheet | Not added after training or missed OJT email communication | Recheck training team's Email communication and update the missing |
| Certification not updated on time | Missed Saturday or Wednesday update | Review past certification emails and audit missing entries |
| TL or Manager info is incorrect | Incorrect team mapping or agent hasn't been reassigned | Confirm from latest org chart or CRM team mapping records |
| Missing Joining Date for certified agent | Forgot to update after certification | Double-check HR email or employee record |
| Agents showing blank in dropdowns (ID_Name field issue) | ID_Name field not populated correctly | Ensure proper concatenation of ID and Name (`=A2 & "_" & B2`) |
| Agents name/s is/are missing in Form's dropdown | — | Ensure Employee Status Sheet's AI column contains distinct agent list |
| Wrong Training Status | Misclassification of current stage | Cross-check with latest training emails and certification decisions |
| Phone/Email mismatch | Old data pulled or CRM not synced | Cross-verify with CRM Users table or internal directory |
| Agent Info Mismatch | The agent name is correct but may be we have another agent with the same name. | Keep Agents name distinct in CRM and the sheet [Add nickname] |
| Sheet too slow or unresponsive | Too many formulas or data overload | Use helper columns, avoid volatile formulas, and consider archiving old entries |
