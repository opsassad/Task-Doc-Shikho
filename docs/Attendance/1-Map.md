---
title: "Maintain Attendance Tracker"
description: "Complete guide for maintaining attendance tracking system"
tags: ["attendance", "hr", "tracking", "documentation"]
---

# Maintain Attendance Tracker

- **Owner:** Md Assaduzzaman
- **Partial Task Owner:** Julkar Niem, Anusuya Ghosh, Mahizebin Shams-E-Mofiz
- **Frequency:** Weekly (Every Saturday AM) and Monthly [Day 1]
- **Last Reviewed:** 28-Jun-2025
- **Purpose:** To provide stakeholders with Updated Attendance metrics in D-1 basis.

---

## 📚 Relevant Sources

| Source Names | Source Type | URLs |
|:-------------|:------------|:-----|
| Attendance | Spreadsheet | [Go to Sheet](https://docs.google.com/spreadsheets/u/0/d/1J4rfR-v5xCYr8jZTOySYGouj4CF0LCa_m2ypNvg37Vk/edit) |
| [HR] Master Database for Tele-sales | Spreadsheet | [Go to Sheet](https://docs.google.com/spreadsheets/d/1f5hB6pLLeVknq8USkWFGQ4WtM2ZVHCI6Wqpfiev3wbM/edit?gid=1780614320#gid=1780614320) |
| [BI] Teleseales-Retention Team Attendance Details | Spreadsheet | [Go to Sheet](https://docs.google.com/spreadsheets/d/1SzfzZ2PnKitV-GH-8Oq-s5LG_CPlt_-HMatZ719rD7o/edit?gid=0#gid=0) |
| [HR] Leave Application Form for Tele Sales Agents | Form | [Go to Form](https://docs.google.com/forms/d/10rm643hcaR5Yzb92LilNZX_VauAtJNxQwR5udBdjnic/edit#responses) |
| [HR] Leave Application Form for Telesales [Response] | Spreadsheet | [Go to Sheet](https://docs.google.com/spreadsheets/d/1B1TSAkP_hbJNrIXwAFosYmzjMMQ0tVb8nP1PwhlqHBw/edit?resourcekey=&gid=1644171802) |
| [HR] Tele sales Resignation Update | Form | [Go to Form](https://docs.google.com/spreadsheets/d/1B1TSAkP_hbJNrIXwAFosYmzjMMQ0tVb8nP1PwhlqHBw/edit?resourcekey=&gid=1644171802) |
| [HR] Tele sales Resignation Update [Response] | Spreadsheet | [Go to Sheet](https://docs.google.com/spreadsheets/d/15uzRWKlsj4gWn64c5aKBuDAQY7BWo7btvZ-Mtx6bQdY/edit?gid=1232786506) |
| Teleseales-Retention Team Attendance Details | Spreadsheet | [Go to Sheet](https://docs.google.com/spreadsheets/d/1SzfzZ2PnKitV-GH-8Oq-s5LG_CPlt_-HMatZ719rD7o/edit?gid=0)

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