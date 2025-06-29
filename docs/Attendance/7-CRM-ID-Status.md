
## 🔒 CRM ID Status - Task Breakdown

### 🎯 Purpose

To identify resigned employees, pull their leads from the CRM, deactivate their CRM IDs, and log the activity in a side table.

### 🛠️ Steps

#### ✅ Check for Resigned Employees

- Go to the Employee Status or Case Records sheet.
- Filter rows where Effective Resignation Date is not blank and is on or before today.
- Cross-check with the CRM Employee Records for name and ID consistency.

#### 📤 Pull Their Leads from CRM

- Log in to the CRM tool.
- Search by Employee ID or Name.
- Export or record active leads still assigned to them.
- Transfer/reassign leads as per team protocol (if needed).

#### 🚫 Deactivate CRM ID

- Disable the user from the CRM [Users](https://crm.shikho.com/list/user) tab 

#### 📝 Update Side Table in CRM ID Status Sheet

Add the following details:

| Employee ID | Name | Lead Pull Status | Deactivated On |
|:------------|:-----|:-----------------|:---------------|
| EMP1234 | John Doe | ✅ [Pulled] / ❌ [No Leads] | 28-Jun-2025 |

### ⏱️ When to Perform

- **Daily:** Everyday morning.

### ⚠️ Important Checks

- Don't deactivate CRM access before lead transfer is confirmed. Otherwise, owner name will be excluded from advanced search in https://crm.shikho.com/list/leads