## Monthly Sales Sheet Update Process

### 🎯 Purpose

To create and configure the monthly sales sheet in the `[Automation] D-1 Telesales Sales` spreadsheet for each new month to ensure consistency, structure, and functionality for daily sales logging, validation, and reporting.

---

### 📦 Key Spreadsheets Involved

1. **\[Automation] D-1 Telesales Sales** (Main Sheet)

   * Link: [https://docs.google.com/spreadsheets/d/1XHoj9MNvZMz82mFCeyVMADqbXCTNztbxTRcPo8\_kjV4](https://docs.google.com/spreadsheets/d/1XHoj9MNvZMz82mFCeyVMADqbXCTNztbxTRcPo8_kjV4)

2. **Sales Confirmation**

   * Link: [https://docs.google.com/spreadsheets/d/14hbtbJPtoYrWLi95Ge\_g958c57c2BbcdcnToKLICWrM](https://docs.google.com/spreadsheets/d/14hbtbJPtoYrWLi95Ge_g958c57c2BbcdcnToKLICWrM)

3. **Submitted Documents**

   * Link: [https://docs.google.com/spreadsheets/d/1s42PZdo3uCSrHOUw-jKHu8rLUwnxsl8EFfrXOzBTL4Y](https://docs.google.com/spreadsheets/d/1s42PZdo3uCSrHOUw-jKHu8rLUwnxsl8EFfrXOzBTL4Y)

---

### 📋 Monthly Setup Process

#### ✅ Step 1: Create Daily Sheets for the Month

* Go to the `[Automation] D-1 Telesales Sales` spreadsheet.
* Click the **"Science"** menu and run the **"Create Dates"** trigger.

  * This will generate a new daily sheet for each day of the month.
  * Format follows `YYYY-MM-DD` (e.g., `2025-06-01`).

#### ✅ Step 2: Duplicate the Previous Month's Sales Sheet

* Copy the last month's sheet (e.g., `May'25 All Sales`).
* Rename it following the same pattern: `Jun'25 All Sales`.

#### ✅ Step 3: Clear and Update the Copied Sheet

* **Clear These Columns:**

  * `Final Counselor Name`: Replace with `=T2` and drag down.
  * `Final Channel Name`: Replace with `=S2` and drag down.
  * `Manual Validation`: Clear all `[1]` values.
  * `Validated By` & `Remarks`: Clear all contents.

* **Update Formula in Cell A2**:

  * Adjust formula logic to reference the **new month’s daily sheets**.
  * Make sure it dynamically links new dates correctly.

---

### 🔄 Connected Sheet Logic

#### 📌 Sales-CRM Record Backup

* Employee info imported from `CRM Employee Records` and used throughout.
* References `Agent List` sheet.

#### 📌 Sales Confirmation

* Pulls claim data from confirmation response sheet.
* Used to validate if sales claims are complete.

#### 📌 Submitted Documents

* Contains all uploaded document records by TLs for claim validation.

#### 📌 Doc Links

* Manages validation codes and submission deadlines.
* Tracks alert status for document issues.

---

### ⚠️ Common Issues

| Issue                               | Cause                                        | Solution                                               |
| ----------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Final Counselor/Channel not working | Formula not dragged properly                 | Reapply formulas `=T2`, `=S2` and drag to bottom       |
| Manual Validation pre-filled        | Old 1s not cleared                           | Ensure full column is cleared before monthly setup     |
| Wrong validations or missing data   | Incorrect formula references to daily sheets | Verify formula in cell A2 and date ranges              |
| Lag or performance issues           | Too many rows/daily sheets in spreadsheet    | Archive older months, limit view ranges where possible |

---

### 🧼 Best Practices

* Always create daily sheets first before updating the monthly view.
* Use consistent naming and formatting for monthly and daily sheets.
* Avoid manually overwriting formulas unless you're sure of logic.
* Review the Sales Confirmation and Doc Links sheets for any alert before month-end closing.

---

### ✅ Task Owners

* **Primary Owner**: Md Assaduzzaman
* **Backup Operators**: Assigned by BI
* **Frequency**: Monthly (Day 1 setup)
