# RealRails Shift Productivity Dashboard

An enterprise-grade, high-performance telemetry dashboard designed to visualize operational shift metrics, output trends, and workforce coverage. 

Built with a strict UX architecture, this dashboard enforces a **70/30 spatial split**: 70% of the viewport is dedicated to the primary visualization stage, while the remaining 30% acts as a contextual intelligence sidebar.

## 🚀 Key Features

* **Output-Per-Hour Trend:** A temporal visualization mapping real-time output against historical Bureau of Labor Statistics (BLS) baselines.
* **Overtime Pareto Analysis:** A composed chart tracking overtime hours with a cumulative percentage curve to quickly identify operational bottlenecks.
* **Coverage Heatmap:** A CSS-grid-based geographical and temporal density map for instant shift coverage recognition.
* **Shift Matrix Context:** A relational state tracker displaying active scopes, team hierarchy, and real-time status (Optimal, Warning, Critical).
* **Data Export:** Built-in payload generation to download active bounded datasets as CSV for external reporting.
* **Strict Brand DNA:** Adheres to a custom dark-mode aesthetic utilizing an Obsidian Black (`#030712`) background with Electric Cyan (`#38BDF8`) and Emerald (`#10B981`) telemetry accents.

## 🛠️ Tech Stack

* **Framework:** React / Next.js (App Router)
* **Styling:** Tailwind CSS
* **Data Visualization:** Recharts
* **State Management:** React Hooks (`useState`, `useMemo`, `useEffect`)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/realrails-dashboard.git
   cd realrails-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

The UI is built on a responsive grid that guarantees the 70/30 split on desktop environments. 

* `frontend/app/page.tsx`: The main dashboard component containing state logic, the intelligence sidebar, and the visualization grid.
* `mockDatabase`: A simulated data layer used for frontend validation (ready to be swapped with a Python REST/GraphQL API).

## 🧪 Testing (UAT)

A rigorous User Acceptance Testing (UAT) protocol is established for this project. Please refer to the `uat_cases.md` or the `Shift_Productivity_UAT_Table.xlsx` file in the testing directory to validate:
* Interactive handshake events between the 70% stage and 30% sidebar.
* Temporal, risk, and ownership filter logic.
* Dynamic intelligence rendering based on active data nodes.

---
*Built for the RealRails Telemetry Initiative.*