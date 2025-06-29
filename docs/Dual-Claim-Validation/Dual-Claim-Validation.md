## 📊 **Dual Claim Validation - SOP**

### 🔎 **Identify Dual Claims**

A sale is marked as **dual claimed** if:

* Multiple agents have claimed the **same sale on the same day**, even after data correction.

---

### 🚀 **Trigger: Sale Marked Invalid due to Dual Claim**

1. Agent, TL, and Manager receive an **email notification** with a link to a **document submission form**.

2. The form:

   * Is **secured, conditional**, and has an **expiry window (72 hours)** (excluding holidays).
   * Has **prefilled and locked fields** (read-only).
   * URL parameters are **Base64 encoded** to prevent tampering.
   * After expiry, **URL becomes inaccessible**.

3. A **reminder email** is triggered in the **early morning of the deadline day**.

---

### ✍️ **After Submission**

* QA team validates the submitted documentation using standard audit parameters.
* Final outcome is emailed to Agent, TL, and Manager:

  * Declares **who rightfully owns the sale**.
* CRM and monthly sales sheets (e.g., `Jun'25 All Sales`) are updated accordingly:

  * Agent Name
  * Sales Channel (if necessary)
  * CRM Event based on Event ID

---

### ⚠️ **Common Issues & Fixes**

| Issue                                                  | Checkpoint / Fix                                                                                                                                                                                                                          |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No QA assigned for dual claim                          | Go to `Validated By` column in `[Automation] D-1 Telesales Sales` sheet. If missing, assign a QA.                                                                                                                                         |
| Finance sheet shows less revenue even though agent won | Ensure the **channel** is updated in both **CRM Event** and **Jun'25 All Sales** sheet.                                                                                                                                                   |
| Sales not showing in finance sheet despite updates     | Check `[Automated] Sales Database` [Spreadsheet](https://docs.google.com/spreadsheets/d/1Ua4k_dizZu2vXPNipjcxt7m6MgUqeGYXiYXTDjOu45o/edit?gid=0#gid=0). It may be overloaded. Limit references to **last 4 months only** (incl. current). |

---

Let me know if you'd like to add flowcharts, form templates, or example scenarios.
