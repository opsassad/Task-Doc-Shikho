## ✅ Sales Validation (Valid / Invalid)

### 🎯 Purpose

To validate telesales claims by matching agent‑submitted records against daily sales data, flag invalid entries, and coordinate timely investigation and correction.

add relevant sheet url as in explained earlier message

---


---

### 📌 Validation Pattern

Both sides (Agent claim & Daily Sales record) format sales as:

```
Sale Date-Mobile Number-Agent Name-Channel
```

Example:  `45809-1731126781-Md. Nafis Siddque-cx-inbound`

* **Match = Valid:** All four elements match between claim and sales data.
* **Mismatch = Invalid:** Any element differs → claim becomes **Invalid**.

---

### 🚨 Invalid Sale Workflow

1. **Auto‑Email Alert**

   * When a sale is flagged Invalid, an email is sent to **Agent, TL, and Manager**.
   * Subject indicates the issue; body states the claim must be investigated.

2. **Investigation Window**

   * **Deadline:** TL must post findings in the **“Invalid Input”** group **by end of next working day** (Email Date + 1 working day).

3. **Classify the Issue** (TL responsibility)

   | Type               | Identification Rule                        |
   | ------------------ | ------------------------------------------ |
   | **Late Claim**     | `Claim Date > Submission Date`             |
   | **Wrong Number**   | Submitted phone ≠ actual customer phone    |
   | **Wrong Agent**    | Submitted agent name ≠ correct agent       |
   | **Delete Request** | Claim confirmed false; TL requests removal |

---

### 🛠️ TS BI Fix Procedure

1. Open **Input Fixer** web‑app:

   * [https://script.google.com/macros/s/AKfycbxKN5C9NSjJTFBeDbr6WzaOEF3ZEomUL\_Z3lUbz5r1EYFprjfPy-gHr0K6E0AJXSu2T/exec](https://script.google.com/macros/s/AKfycbxKN5C9NSjJTFBeDbr6WzaOEF3ZEomUL_Z3lUbz5r1EYFprjfPy-gHr0K6E0AJXSu2T/exec)
2. Search the **phone number** reported.
3. Perform action based on TL post:

   * **Late Claim:** Update Sale Date to correct (earlier) date.
   * **Wrong Number:** Update mobile number.
   * **Wrong Agent:** Update agent name.
   * **Delete Request:** Remove the claim row.
4. Log change (date/time, operator initials) in tracker if required.
5. ✅ Mark as 'Fixed' or ❌ 'Not Fixed/Rejected' on the group post based on whether the update was applied successfully in Input Fixer

---

### ❌ Requests NOT Entertained by TS-BI

* Claim submitted **> After 'Sale Date + 1 working day'**.
* TL posts investigation **> After 'Email Notification Date + 1 working day'**.

(Reject politely and refer TL to policy.)

---

### ⚠️ Common Pitfalls & Checks

| Pitfall                             | Prevention                                            |
| ----------------------------------- | ----------------------------------------------------- |
| TL forgets to post in time          | TL must ensure posting in group before deadline |
| Mobile number formatted with spaces | Strip spaces before comparison                        |
| Agent edits pattern manually        | Lock pattern columns; use data validation             |

---

### ✅ Task Owners

* **Primary Owner:** Md Assaduzzaman
* **BI Operator (Fixes):** Assigned daily rota
* **TL Responsibility:** Investigate & classify within 1 working day
* **Frequency:** Continuous, as invalid sales are generated