# ZAI Institute Z-mark Asset Package

Version 1.0 (May 2026)

## What's in here

Canonical Z-mark logo files for ZAI Institute, in SVG and PNG formats.

## File structure

```
zai-logo/
├── README.md (this file)
│
├── z-mark-dark.svg      Dark variant (Ink fill, primary use)
├── z-mark-light.svg     Light variant (transparent, alternate use)
├── z-mark-reverse.svg   Reverse variant (transparent with light Z)
├── z-mark-mono.svg      Single-color variant (no dots)
├── z-mark-favicon.svg   Simplified for tiny sizes (no dots)
│
└── png/
    ├── z-mark-dark-16.png         (and 32, 64, 128, 256, 512, 1024)
    ├── z-mark-light-16.png        (and same sizes)
    ├── z-mark-reverse-16.png      (and same sizes)
    ├── z-mark-mono-16.png         (and same sizes)
    └── z-mark-favicon-16.png      (and same sizes)
```

## Which variant to use

| Variant   | Use case                                                |
|-----------|---------------------------------------------------------|
| Dark      | Primary use. Self-contained mark on any background.     |
| Light     | Alternate. When dark fill is too heavy for the layout.  |
| Reverse   | Overlay on dark photographic or design surfaces.        |
| Mono      | Single-color contexts (faxes, embossing, special print).|
| Favicon   | Sizes below 24px. Removes accent dots for legibility.   |

## Canonical colors

| Token     | Hex      | Use                                  |
|-----------|----------|--------------------------------------|
| Ink       | #0A0A0F  | Z strokes (light variants), fill     |
| Gold      | #B8962E  | Border, accent dots, primary CTAs    |
| Paper     | #F5F2ED  | Z strokes (dark variants), fills     |

## Sizing rules

- Print minimum: 0.5 inches (about 36pt)
- Screen minimum: 24 pixels for full variant, 16 pixels for favicon variant
- Below 24px: use favicon variant
- Below 16px: do not use the mark

## Clear space

Minimum clear space on all sides equals the height of one gold accent dot.

## What not to do

Do not:
- Recreate the Z-mark by hand
- Distort the proportions
- Change the angle of the Z
- Move or resize the accent dots
- Recolor with non-brand colors
- Apply gradients, shadows, or effects
- Place on busy photographic backgrounds where the mark loses contrast

## Source

The Z-mark is defined as a vector graphic (SVG) and scales cleanly to any size.
All PNG renderings in the /png folder were generated from the source SVGs at
the indicated pixel sizes. To regenerate PNGs at custom sizes, render from the
source SVG using any SVG renderer (Inkscape, rsvg-convert, cairosvg, browser).

## Brand reference

For full brand application rules, see ZAI Institute Brand Guidelines v1.2.

## Questions

research@zaiinstitute.ai

ZAI Institute
zaiinstitute.ai
(888) 384-7020
