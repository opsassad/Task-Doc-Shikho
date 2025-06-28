
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

Either:
- Disable the user from the CRM admin panel,
- Or inform the tech/admin team with the deactivation list.
- Confirm that login access and lead routing is stopped.

#### 📝 Update Side Table in CRM ID Status Sheet

Add the following details:

| Employee ID | Name | Lead Pull Status | Deactivated On |
|:------------|:-----|:-----------------|:---------------|
| EMP1234 | John Doe | ✅ Pulled / ❌ No Leads | 28-Jun-2025 |

### ⏱️ When to Perform

- **Weekly:** Every Saturday morning.
- **Monthly Sweep:** On 1st of every month as a catch-all.

### ⚠️ Important Checks

- Ensure no duplicate resignations are being handled twice.
- Keep lead pull/export traceable (CRM screenshots or export logs).
- Don't deactivate CRM access before lead transfer is confirmed.
- If CRM name doesn't match exact HR name, use ID for mapping.
