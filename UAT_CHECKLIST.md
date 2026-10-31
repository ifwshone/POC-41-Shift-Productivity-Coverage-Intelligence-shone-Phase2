# Functional UAT Checklist

This document contains the User Acceptance Testing (UAT) cases for validating the RealRails Shift Productivity Dashboard interactivity and data logic.

| Test Case ID | Category | Test Case | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- |
| **TC-001** | The Handshake | Click a data point on the Output-Per-Hour trend line in the 70% main stage. | The 30% sidebar instantly updates to display the specific Date, KPI, and Status metadata for that exact data point. |  PASS |
| **TC-002** | The Handshake | Click a bar segment on the Overtime Pareto chart. | The sidebar Intelligence panel reflects the overtime root-cause metadata specific to that segment. | PASS |
| **TC-003** | Filter Logic | Change the 'Location' (Owner) filter from the dropdown. | The 70% visualization stage re-renders to display only the data associated with the newly selected location. | PASS |
| **TC-004** | Filter Logic | Change the 'Team' (Risk/Shift) filter from the dropdown. | The Coverage Heatmap and Shift Matrix Context update to reflect the specific shift schedule and risk status of the selected team. | PASS |
| **TC-005** | Filter Logic | Adjust the 'Date' range filter. | The X-axis on the trend chart and Pareto scales dynamically to fit the new temporal bounds without breaking the UI. | PASS |
| **TC-006** | Intelligence Value | Observe the 'Who controls the rail' / Intelligence panel after selecting a location with a 'Warning' status. | The panel accurately outputs the text findings from the `[DataSource]` indicating the specific bottleneck or operational drag. | PASS |
| **TC-007** | Intelligence Value | Observe the 'Who controls the rail' / Intelligence panel after selecting an 'Optimal' location. | The panel accurately outputs the `[DataSource]` findings highlighting the positive drivers of the current performance. | PASS |