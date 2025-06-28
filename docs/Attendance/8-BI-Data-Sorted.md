
## 🧮 BI-Data Sorted - Task Details

### 🎯 Purpose

To produce the final daily attendance status for each telesales agent by merging:

- BI-sourced daily attendance (BI Dump Source)
- Leave records
- Resignation data

This sheet is already automated using formulas and logic mapping.

### ⚙️ Current Automation

- Attendance status is calculated automatically using formulas.
- Leave (L), Resigned (R), Holiday (H), OTD, and other status symbols are derived from:
  - Case Records (Leave & Resignation)
  - BI Dump Source (Daily presence)
  - Employee Status (Active/Resigned validation)

### 🛠️ Manual Maintenance Step

#### 📌 ONLY THING YOU NEED TO DO:

➡ Copy the last row of formulas and paste them downward if:

- New agents are added,
- Or the bottom formulas don't auto-extend due to manual edits or formula breakage.

#### How:

- Scroll to the bottom-most row where formulas are active.
- Select that row (or range of rows).
- Drag down using the fill handle or paste it down manually (for ~50 extra rows as buffer).
- Stop at a reasonable limit — don't blindly extend down 10,000 rows.

### 🧰 Troubleshooting / Notes

| Issue | Cause | Action |
|:------|:------|:-------|
| Some agents show blank | Formulas didn't extend | Paste formulas further down |
| Attendance looks wrong | Overwrite by manual entry or status mismatch | Check formula integrity and status overrides |
| Slowness in sheet | Too many formula rows | Limit range, or archive old months |