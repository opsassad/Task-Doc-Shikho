## Telesales QA Audit

### 🎯 Purpose

To audit telesales calls based on standard QA parameters using a simplified and automated Google Form process, ensuring quality tracking, dashboard visibility, and continuous agent improvement.

---

### 📦 Key Assets

1. **Call Metrics | 2025 (Source of Audits)**

   * Link: [https://docs.google.com/spreadsheets/d/1NQtbl9jqSyrScptBF\_WAdQazpMii76OoCsQo2472iqs](https://docs.google.com/spreadsheets/d/1NQtbl9jqSyrScptBF_WAdQazpMii76OoCsQo2472iqs)

2. **Telesales Call Evaluator (Google Form)**

   * Pre-filled audit form; captures QA assessments.
   * Link: [https://docs.google.com/forms/d/e/1FAIpQLSeLZwBmaHY7VKdMYXk60kJYJvG2pj1cd9mVLNsiN-JhGZtYRA](https://docs.google.com/forms/d/e/1FAIpQLSeLZwBmaHY7VKdMYXk60kJYJvG2pj1cd9mVLNsiN-JhGZtYRA)

3. **Telesales Call Evaluator \[Form Response Sheet]**

   * Collects audit submissions.
   * Contains score logic, QA parameter setup, automation, and FLATTEN-powered reporting.

---

### 📋 Process Overview

#### Step 1: Call Metrics | Shikho 2025

* QA team selects call entries to audit.
* Pre-filled Google Form links are auto-generated for each call.

  * Fields are pre-populated based on call information, agent information and QA feedbacks in the each QA's sheet.
  * Only an extra fields like agent email need manual input in the form manually.

#### Step 2: Conduct Audit via Pre-filled Form

* QA reviews/Audits the call, fills the fields in the spreadshet to make a the form filled with custom formula, QA clicks on the pre-filled link, completes, and submits.
* The submitted data goes to the response sheet.

#### Step 3: Response Sheet Handling

* Audit data lands in the **Form Response Sheet**.
* Sheet includes:

  * Audit form responses
  * Employee Information
  * QA Parameters
  * Score calculation and logics
  * Raw data for dymamic reports

#### Step 4: Reporting Layer

* **"Raw Data"** sheet (within Form Response Sheet)

  * Uses `FLATTEN()` to normalize audit data for Looker Studio.
  * Enables dynamic filters and matrix-style Looker Studio dashboard views.

#### Step 5: Employee Info Sync

* Data synced from **CRM Employee Records** ("Attendance 2025") via automation.
* Script runs daily (between 10–11 AM) to keep employee info updated across sheets.

---

### 👨‍🔧 Setup Instructions for New QA Onboarding

1. Duplicate any existing QA's audit sheet.
2. Rename the sheet with the new QA's name.
3. Open the **Apps Script** linked to that audit sheet.
4. Find the shared script (already available inside):

   * Copy the relevant function block.
   * Rename the function to match the new QA.
5. Assign this function to the "Delete" button on the sheet.
6. Sheet is now ready for auditing.

---

### 🔁 TL Name Automation

* TL list inside the form updates via **Google Form’s own Apps Script**.
* Script file name: `TL List Update`
* Runs **daily (morning)**
* Issues can occur if:

  * Internal script error.
  * OJT or new joiners have no TL in `CRM Employee Records`.

---

### ⚠️ Important Cautions

| Issue                        | Cause                                               | Action                                                         |   |   |   |   |
| ---------------------------- | --------------------------------------------------- | -------------------------------------------------------------- | - | - | - | - |
| TL names not updating        | App Script error or CRM Employee Records missing TL | Check `Update TL` function in Form script and CRM mapping      |   |   |   |   |
| Raw Data broken              | QA used \`\|" character                             | Instruct QA to avoid special characters like "\|" in any input |   |   |   |   |
| Missing Employee Info        | Sync failure or Attendance Sheet not updated        | Trigger custom "Science" menu in `Attendance 2025` sheet       |   |   |   |   |
| Dashboard blank              | Raw Data structure issue                            | Ensure `FLATTEN()` isn't broken; check range limits            |   |   |   |   |
| Response sheet not extending | Max row reached                                     | Add new rows manually to extend structure                      |   |   |   |   |

---

### 🧼 Best Practices

* Do not alter structure of Form Response Sheet unless necessary.
* Avoid entering special characters (`|`, `"`, etc.) that can break dashboards.
* Always verify pre-filled links before audits.
* Backup Raw Data monthly to avoid FLATTEN overflow.

---

### ✅ Task Owners

* **Primary Owner**: Md Assaduzzaman
* **Backup/QA Leads**: Assigned per audit batch
* **Frequency**: Daily audits based on QA schedule
