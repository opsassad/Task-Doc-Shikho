
## 📘 Working Employee Sheet

### 📋 Overview

- **📌 Purpose:** The Working Employee sheet dynamically generates a list of active employees for any specified date range, enabling date-specific attendance and resource tracking.

### 🔄 Data Source

- **Primary Source:** Pulls from the Employee Status sheet
- **Filter Logic:** Uses QUERY formula to identify employees who have not resigned as of the specified date and whose joining date is before or on the selected date

### ⚙️ How It Works

| Component | Details |
|:----------|:--------|
| Filter Formula | Typically uses `QUERY(Employee Status!A:Z, "SELECT ... WHERE ...")` |
| User Input | Sheet allows selecting Start Date and End Date for dynamic filtering |
| Auto-Refresh | Employee list updates automatically based on the input date range |

### 📊 Use Cases

- Prepare attendance summary for a specific range
- Extract list of currently working agents for reports, payroll, or QA/KPI use
- Help identify active CRM users vs. resigned/terminated ones

### 🧰 Troubleshooting

| Issue | Likely Cause | Solution |
|:------|:-------------|:---------|
| Missing employees in filtered output | Wrong date range or mismatch in employee joining/resign | Verify joining and resignation dates in Employee Status sheet |
| Employees showing despite resignation | Query not excluding resigned employees properly | Adjust query to check for null in resignation/effective resignation |
| Query returns blank or error | Range reference or formula syntax issue | Validate column references and ensure Employee Status data is complete |

> **⚠️ Note:** The accuracy of this sheet depends entirely on up-to-date Employee Status entries.
