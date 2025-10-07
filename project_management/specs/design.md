-- add rational for status counter styling

## Status Counter Color Design Rationale

The stat card system uses muted background colors to ensure white text is legible. However, this causes status counters (colored circles) to appear faint or empty when matched to the same muted shades. To resolve this, we use the more vibrant **border colors** of the stat cards for the status counter circles. This ensures:

- Clear visibility of counts
- Consistent color semantics (green/yellow/red)
- Improved UI clarity

This approach was discussed with reviewers, and a tooltip or inline note may be added for transparency.
