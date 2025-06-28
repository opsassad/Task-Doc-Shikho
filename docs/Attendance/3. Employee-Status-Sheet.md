
## 📘 Employee Status Sheet

### 📋 Overview

- **📌 Purpose:** The Employee Status sheet maintains centralized HR records and ensures synchronization between HR and CRM employee data.
- **🗂️ Data Source:** Primary data source: [HR] Master Database for Tele-sales. This database is updated by HR whenever an employee joins or resigns.
- **🔁 Data Integration:** The sheet integrates with CRM Employee Records by matching on the Agent Name. Agent names must be unique. If a new joiner's name conflicts with an existing name, add a nickname or surname to distinguish.

### 🧩 Role of This Sheet

| Function | Description |
|:---------|:------------|
| Joined Employee Tracking | Maintains all currently joined agents synced from HR data |
| Resignation Updates | Reflects when agents have resigned, ensuring accurate headcount and status |
| Status Monitoring | Helps identify active and inactive employees in CRM systems |

### 🧰 Basic Troubleshooting

| Issue | Possible Cause | Resolution |
|:------|:---------------|:-----------|
| Sheet appears broken or blank | Formula other than IMPORTRANGE might be broken | Check formulas for errors or missing references |
| Data not updating from HR sheet | Issue with IMPORTRANGE permission or link | Ensure the import range link has access and correct sheet reference |
| Duplicate or mismatched names | Agent name is not unique or inconsistently spelled | Coordinate with HR to apply a nickname or add a surname to avoid conflict |
| Unexpected values in CRM sync | Name mismatch between Employee Status and CRM Employee Records | Validate name consistency across both sheets |

> **⚠️ Note:** This sheet is generally stable. If anything breaks beyond formulas, reach out to the HR team for clarification.
