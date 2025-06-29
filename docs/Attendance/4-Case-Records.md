
## 📘 Case Records


### 🔗 Quick Access

| Resource | Type | Link |
|:---------|:-----|:-----|
| [HR] Leave Application Form for Tele Sales Agents | Form | [Go to Form](https://docs.google.com/forms/d/10rm643hcaR5Yzb92LilNZX_VauAtJNxQwR5udBdjnic/edit#responses) |


### 📋 Overview

- **📌 Purpose:** The Case Records sheet is responsible for tracking employee resignations, holidays, and leave details. It plays a critical role in automating and updating the monthly attendance sheet named BI-Data Sorted by supplying relevant status symbols (e.g., R, H, OTD).
- **🔄 Data Circulation:** This sheet aggregates and relays leave and resignation-related records from multiple sources into structured tables. It feeds attendance-impacting data directly into the monthly attendance pipeline.

### 📊 Key Tables & Their Roles

#### 🟥 1. Resign Records

| Field | Source / Logic |
|:------|:---------------|
| CRM Agent Name | From Employee Status — Must match CRM Employee Records |
| ID | HR-issued employee ID |
| HR Name | Name from HR's employee database |
| Effective Resignation | =Last Working Day + 1 |
| Status | Always R (Symbol for "Resigned" in attendance system) |

- **Purpose:** Identifies resigned employees. Used in attendance to reflect resignation.
- **Filter Condition:** Any row from Employee Status with non-empty "Effective Resignation Date". It means the resignation is approved by the Managers.
- **Note:** Only CRM agents tracked from Nov 2022 onwards are covered.

#### 🟨 2. Leave Records

| Field | Description |
|:------|:------------|
| Employee ID | HR-issued ID |
| Employee Names | Must match CRM Employee Records |
| Type of Leave | Sick, Casual, LWP, Annual, etc. |
| Start Date of Leave | Leave start date from HR form |
| End Date of Leave | Leave end date from HR form |
| Total Leave Days | Calculated field from start to end date |
| Leave Name (Attendance) | Symbol used in attendance sheet (e.g., SL for Sick Leave, CL for Casual Leave) |

- **Source:** Imported from [Leave Application Form for Telesales](https://docs.google.com/spreadsheets/d/1f5hB6pLLeVknq8USkWFGQ4WtM2ZVHCI6Wqpfiev3wbM/edit?gid=1780614320#gid=1780614320) managed by HR.
- **Purpose:** Sends approved leave details to attendance sheet.

#### 🟩 3. Holiday Records

| Field | Description |
|:------|:------------|
| Holiday Dates | Dates when Shikho is closed (public holidays incl. Fridays) |
| Holiday Status | Always H (Holiday symbol used in attendance) |

- **Update Type:** Manually updated by HR team
- **Applies to:** All telesales agents

#### 🟦 4. OTD Records (Over Time Duty)

| Field | Description |
|:------|:------------|
| OTD Dates | Gov't Holidays when Shikho decides to operate telesales |
| OTD Status | Always OTD (Special symbol in attendance sheet) |

- **Update Type:** Manually updated by HR team
- **Applies to:** All telesales agents
- **Note:** Indicates agents worked on official holidays with allowance entitlements or condition applied.

#### 🟫 5. General Leave/Holidays – Agent Specific

| Field | Description |
|:------|:------------|
| Agent Name | Must match CRM Employee Records |
| Start Date | Start date of the condition |
| End Date | End date of the condition |
| Leave Status | Custom attendance symbol (e.g., A, R, H, OTD, etc) |

- **Update Type:** Manually updated by HR team
- **Purpose:** Overrides all other attendance conditions — acts as a master control
- **Use Case:** Used to change agent status manually (e.g., override Present to Absent)

### 🧰 Basic Troubleshooting

| Issue | Possible Cause | Action |
|:------|:---------------|:-------|
| Sheet data not updating in BI-Data Sorted | Break in linked formula or outdated import | Check import formulas and ensure BI sheet access is maintained |
| Resigned employee not marked as 'R' | Effective resignation date not set or CRM name mismatch | Validate Employee Status data and CRM name formatting |
| Leave records not reflecting | Leave not approved or mismatch in name | Confirm leave status in HR form and cross-check against CRM records |
| Holidays/OTD not applied in attendance | HR hasn't updated holiday/OTD table | Follow up with HR team for manual updates |
| Agent-specific override not working | Date range mismatch or wrong symbol | Check for overlapping ranges and verify the override symbol used |

> **⚠️ Note:** Most issues originate from data entry or HR team dependencies. The structure itself is stable.
