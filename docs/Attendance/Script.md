## 🛠️ Script: Manual Attendance Population (Fallback)

### 🎯 Purpose

To manually populate daily attendance data into the system in case of failure or error in the automated pipeline.
Used as a **fallback mechanism** to ensure data continuity.

---

### Script URL:

| Script Type | Runnig From [Spreadsheet] | Script URL |
|:------|:---------------|:-----------|
| Script Running From | [[BI] Teleseales-Retention Team Attendance Details](https://docs.google.com/spreadsheets/d/1SzfzZ2PnKitV-GH-8Oq-s5LG_CPlt_-HMatZ719rD7o/edit?gid=0#gid=0) | [ImportLastDay](https://script.google.com/u/0/home/projects/1jBlRz3bqdBEeuBroGcS_ApBqckh_Co6cOh4PNd_I8OukjTuhd9ctYevl/edit) |
Fallback/Manual Script | [Attendance [2025]](https://docs.google.com/spreadsheets/d/1J4rfR-v5xCYr8jZTOySYGouj4CF0LCa_m2ypNvg37Vk/edit?gid=449699715#gid=449699715) | [importLastDay.gs](https://script.google.com/u/0/home/projects/1BlIlR7TosD2ATO73mo2RigOpEPC2yL07lUKKd61T3QhXFtlH5irF8oX3/edit)|

### 📌 When to Trigger This Task

* When the `BI Dump Source` sheet fails to fetch/update daily attendance.
* Automation formulas break, causing blank or incorrect entries in `BI-Data Sorted`.
* Sheet permissions block the IMPORTRANGE or data pipelines temporarily.

---

### 🧾 Source Sheet

* **Primary Source:** [[BI] Teleseales-Retention Team Attendance Details](https://docs.google.com/spreadsheets/d/1SzfzZ2PnKitV-GH-8Oq-s5LG_CPlt_-HMatZ719rD7o/edit?gid=0#gid=0)
* **Destination:** `BI Dump Source` of [Attendance 2025](https://docs.google.com/spreadsheets/d/1J4rfR-v5xCYr8jZTOySYGouj4CF0LCa_m2ypNvg37Vk/edit?gid=449699715#gid=449699715) spreadsheet

---

### 🧰 Script Overview

The script pulls yesterday’s (D-1) data manually and populates the attendance sheet.

#### Key Functional Steps:

1. Identify **yesterday’s date**.
2. Open the source sheet (`Teleseales-Retention Team Attendance Details`).
3. Filter and pull attendance data (P, A, L, etc.).
4. Write the data into the target sheet (`BI Dump Source`).
6. Trigger the downstream formula calculations in `BI-Data Sorted`.

---

### 🛑 Preconditions

* Script must have edit access to both source and destination sheets.
* The source sheet must be updated with the latest D-1 attendance.

---

### 🧠 Execution Method

Can be executed via:

* Manual run from the Apps Script Editor
* Custom menu button (e.g., "Menu > Import Last Day")
* Script Schedule: Time-driven trigger (runs at 10:30 AM)

---

### 📋 Output Format (Example Written Row)

| Agent Name | Date      | Attendance |
| ---------- | --------- | ---------- |
| John Doe   | 27-Jun-25 | P          |
| Jane Smith | 27-Jun-25 | A          |

---

### 🧩 Troubleshooting

| Issue                         | Cause                               | Action                                  |
| ----------------------------- | ----------------------------------- | --------------------------------------- |
| No data pulled                | Date mismatch or blank source       | Check if source sheet is updated        |
| Wrong names or missing agents | Name mismatch with master list      | Validate against `CRM Employee Records` |
| Script throws error           | Permission issue or range not found | Confirm access and named ranges         |

---

### 🧼 Best Practices

* Log every manual run (date, user, row count) in a separate `Script Log` sheet.
* Use range validation before writing.
* Prevent duplication by checking existing entries before appending.

---

### ✅ Ownership

* **Primary Owner**: Md Assaduzzaman
* **Backup Operator**: Julkar Niem
* **Frequency**: As needed only when automation fails
