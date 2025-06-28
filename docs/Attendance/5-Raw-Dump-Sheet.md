
## 📘 Raw Dump Sheet

### 📋 Overview

- **📌 Purpose:** The Raw Dump sheet aggregates all Month-over-Month (MoM) attendance data into a flattened format using the FLATTEN() formula. This transformation enables dynamic, flexible reporting and cross-period analysis.

### 🔄 Functionality Overview

| Component | Details |
|:----------|:--------|
| Source | Pulls data from each monthly attendance sheet (e.g., January-25, February-25, March-25 sheets) |
| Flattening | Converts matrix-style monthly data into a long, table-like format |

### 📊 Usage

- **QA Team:** Uses it as the primary source for preparing KPI reports
- **Finance Team:** Uses it to calculate monthly/quarterly incentives
- **HR Team:** Uses it to calculate monthly salary/leave and others

### ⚠️ Performance & Stability Notes

| Consideration | Details |
|:--------------|:--------|
| Sheet Stability | Generally stable; formula-driven |
| Max Safe Data Limit | Keep under 40,000 rows [approx] to prevent performance issues with QUERY or IMPORTRANGE |
| Risk of Failure | High volume may cause linked sheets (like KPI, Incentive) to break or become unresponsive |
| Prevention Tip | Regularly archive old months [keep last 4 months] or use optimized QUERY filters/AppScript to limit data scope |

> **📌 Reminder:** If this sheet slows down or linked reports stop updating, check data volume first before debugging formulas.
