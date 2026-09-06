# Semantic color contrast

Calculated from canonical CSS tokens, using the WCAG sRGB relative-luminance
formula. Values are rounded only for display; assertions use full precision.
This verifies listed solid-color pairs, not complete accessibility conformance
or text over arbitrary images. Decorative pastel fills are not text colors.

| Theme | Foreground / background | Measured | Required |
| --- | --- | --- | --- |
| day | ink / surface | 13.82:1 | 4.5:1 |
| day | ink / paper | 14.14:1 | 4.5:1 |
| day | ink / canvas | 12.86:1 | 4.5:1 |
| day | muted / surface | 6.15:1 | 4.5:1 |
| day | muted / paper | 6.30:1 | 4.5:1 |
| day | muted / canvas | 5.73:1 | 4.5:1 |
| day | on-primary / primary | 5.98:1 | 4.5:1 |
| day | on-primary / primary-hover | 8.42:1 | 4.5:1 |
| day | ink / selected | 11.89:1 | 4.5:1 |
| day | ink / subtle | 11.90:1 | 4.5:1 |
| day | success / success-soft | 5.80:1 | 4.5:1 |
| day | success / surface | 6.64:1 | 4.5:1 |
| day | warning / warning-soft | 5.81:1 | 4.5:1 |
| day | danger / danger-soft | 5.42:1 | 4.5:1 |
| day | danger / surface | 6.28:1 | 4.5:1 |
| day | focus / focus-gap | 6.33:1 | 3:1 |
| day | control-border / paper | 3.48:1 | 3:1 |
| day | control-border / surface | 3.40:1 | 3:1 |
| day | primary / surface | 5.85:1 | 4.5:1 |
| day | primary / paper | 5.98:1 | 4.5:1 |
| day | clock-ink / clock-face | 13.37:1 | 4.5:1 |
| day | clock-hour / clock-face | 4.65:1 | 3:1 |
| day | clock-minute / clock-face | 5.67:1 | 3:1 |
| evening | ink / surface | 11.74:1 | 4.5:1 |
| evening | ink / paper | 13.29:1 | 4.5:1 |
| evening | ink / canvas | 14.48:1 | 4.5:1 |
| evening | muted / surface | 7.75:1 | 4.5:1 |
| evening | muted / paper | 8.77:1 | 4.5:1 |
| evening | muted / canvas | 9.55:1 | 4.5:1 |
| evening | on-primary / primary | 9.41:1 | 4.5:1 |
| evening | on-primary / primary-hover | 11.53:1 | 4.5:1 |
| evening | ink / selected | 7.86:1 | 4.5:1 |
| evening | ink / subtle | 9.71:1 | 4.5:1 |
| evening | success / success-soft | 7.57:1 | 4.5:1 |
| evening | success / surface | 8.53:1 | 4.5:1 |
| evening | warning / warning-soft | 8.21:1 | 4.5:1 |
| evening | danger / danger-soft | 7.30:1 | 4.5:1 |
| evening | danger / surface | 7.67:1 | 4.5:1 |
| evening | focus / focus-gap | 11.26:1 | 3:1 |
| evening | control-border / paper | 5.13:1 | 3:1 |
| evening | control-border / surface | 4.53:1 | 3:1 |
| evening | primary / surface | 7.63:1 | 4.5:1 |
| evening | primary / paper | 8.64:1 | 4.5:1 |
| evening | clock-ink / clock-face | 13.37:1 | 4.5:1 |
| evening | clock-hour / clock-face | 4.65:1 | 3:1 |
| evening | clock-minute / clock-face | 5.67:1 | 3:1 |

Reference: [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
