---
title: "Maintain Attendance Tracker"
description: "Complete guide for maintaining attendance tracking system"
tags: ["attendance", "hr", "tracking", "documentation"]
---

# Maintain Attendance Tracker

- **Task ID:** 1
- **Owner:** Md Assaduzzaman
- **Partial Task Owner:** Julkar Niem, Anusuya Ghosh, Mahizebin Shams-E-Mofiz
- **Frequency:** Weekly (Every Saturday AM) and Monthly [Day 1]
- **Last Reviewed:** 22-Jun-2025
- **Purpose:** To provide stakeholders with Updated Attendance metrics in D-1 basis.

---

## 📚 Relevant Sources

| Source Names | Source Type | URLs |
|:-------------|:------------|:-----|
| Attendance | Spreadsheet | Attendance [2025] |
| [HR] Master Database for Tele-sales | Spreadsheet | HR Master Database for Tele-sales |
| [BI] Teleseales-Retention Team Attendance Details | Spreadsheet | Teleseales-Retention Team Attendance Details |
| [HR] Leave Application Form for Tele Sales Agents | Form | Go to Form |
| [HR] Leave Application Form for Telesales [Response] | Spreadsheet | Leave Application Form for Telesales (Responses) |
| [HR] Tele sales Resignation Update | Form | Go to Form |
| [HR] Tele sales Resignation Update [Response] | Spreadsheet | [HR] Tele sales Resignation Update (Responses) |

---

## 🗂️ Spreadsheet Task Mapping
| Tab/Sheet Name | Purpose |
|:---------------|:--------|
| CRM Employee Records | Serves as the master database for all CRM employee information [Including Not-Certified OJT], used across multiple sheets for consistent agent mapping. |
| Employee Status | Maintains centralized HR records and ensures synchronization between HR and CRM employee data. |
| Case Records | Tracks employee resignations, holidays, and leave details—essential for updating and automating monthly attendance sheets. |
| Raw Dump | Aggregates all monthly attendance data in a flattened format to support dynamic reporting and analysis. |
| Working Employee | Dynamically generates a list of employees who were active during a specified date range, based on "Employee Status" data. |
| BI Dump Source | Automatically imports daily [D-1] attendance data from the "[BI] Teleseales-Retention Team Attendance Details" sheet using predefined logic. Any issue appears, first run the D-1 script, if still something wrong, check with BI team |
| BI-Data Sorted | Merges attendance data from the BI source with leave and resignation records to produce the final daily attendance for telesales agents. Already automated Sheet. Just need to extend the formula by copy pasting down to the bottom of the sheet if required |
| CRM ID Status | Identifies resigned employees to deactivate their CRM access and halt lead assignments. |
| Script | Used as a fallback mechanism to populate attendance data manually in case of errors or automation failures. |