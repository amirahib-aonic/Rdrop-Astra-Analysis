# Rdrop Astra — GPT6 refinement

6 October 2026 • KiCad 9.0.7 • Two copper layers • 1 oz copper target

This is a conservative copper and routing refinement for comparison with the original design. It is **not a verified 15 A / 18S thermal qualification**. The original project in `PCB Design` is unchanged. Open `hw-aonic-r-drop-main-board.kicad_pro` in this folder for the refined design.

## Delivered comparison views

- [Top copper comparison](Comparison/comparison-top.png)
- [Bottom copper comparison](Comparison/comparison-bottom.png) — both shown from above, without mirroring, to make coordinates directly comparable.
- [3D comparison](Comparison/comparison-3d.png)
- [Comparison gallery](Comparison/comparison.html)

Individual PNGs and vector SVGs are included. The images use the same layers, viewpoint, and scale for both designs. 3D views use the existing component models; they are not enclosure-fit or thermal simulations.

## Changes made

| Change | Original | Refined | Reason |
|---|---:|---:|---|
| Main top and bottom GND fill clearance | 0.8 mm | 0.3 mm | Recover ground copper around low-voltage traces and reduce wide return-path gaps. |
| Ground stitching vias | 299 total board vias | 339 total board vias | Add 40 GND vias, 0.8 mm diameter / 0.4 mm drill, in the low-voltage area with copper on both sides. |
| +5V_1 routing | 1.0 mm | 1.5 mm on 12 segments / 77.04 mm | Increase copper cross-section where existing clearances permit. |
| +5V_2 routing | 1.0 mm | 1.5 mm on 6 segments / 27.60 mm | Increase copper cross-section where existing clearances permit. |
| +UBEC_OUT routing | 0.8 mm | 1.2 mm on 4 segments / 9.22 mm | Increase copper cross-section on unconstrained segments. |
| J301 pad 1, GND | Inherited thermal connection | Solid zone connection | Remove an isolated thermal-spoke condition after refilling and give this supply-return pad a direct copper connection. Soldering heat demand increases. |

Seven proposed width increases were rejected after DRC and restored to their original widths. There is no claim that the whole supply path is now 1.5 mm wide. The remaining narrow sections, vias, pads, connectors, and protection parts can still limit current.

The battery-positive zone geometry, its 1.0 mm zone clearance, and its solid pad connections were retained. The dedicated servo-return and current-shunt nets remain separate from GND. USB and CAN signal routing, component placement, antenna keepout, and existing fabrication rules were retained. No components were added or removed; the additions are vias.

## Verification

| Check | Original | Refined |
|---|---:|---:|
| DRC errors | 0 | 0 |
| DRC warnings | 80 | 80 |
| Unconnected items | 0 | 0 |
| Schematic-parity issues | 0 | 0 |
| Footprints, including mounting holes and logos | 78 | 78 |
| Copper layers | 2 | 2 |
| GND filled area, top | 6140.37 mm² | 6876.47 mm² (+12.0%) |
| GND filled area, bottom | 6822.95 mm² | 7399.30 mm² (+8.4%) |

Exact checks verified unchanged footprint identities, values, positions, rotations, sides, pad coordinates, pad sizes, drill sizes, and net assignments. Board outline and cutout geometry are unchanged. All schematic files are byte-identical. The original PCB's SHA-256 remains `c80d10d69f5310de7cd80b0fb0a269ae44d5f7d4dcedefd1dde41fcfe5b25da2`.

The 80 existing warnings comprise 5 footprint-library issues, 40 library mismatches, 4 padstack warnings, 3 silk-edge clearance warnings, 3 silk-over-copper warnings, 10 silk overlaps, 14 text-height warnings, and 1 text-thickness warning. The fuse-pad negative paste margins were retained; they may reflect manual assembly, but that intent has not been confirmed.

Ground area is calculated from KiCad filled polygons, not an electrical performance measurement. No EMI, impedance, voltage-drop, temperature, or functional bench measurements were performed. DRC verifies the configured rules, not suitability of those rules for every operating environment.

## Outstanding current and voltage requirements

The supplied target is 15 A peak, up to an 18S battery, and 15–18 °C maximum temperature rise. Still needed:

1. The exact 15 A path: battery input, servo output, or another connection.
2. Normal current, peak duration, and repetition rate.
3. Confirm the maximum pack voltage: 18 × 4.2 V = 75.6 V if these are 4.2 V cells, versus the stated approximately 72–74 V.

These details are needed before selecting or validating current-carrying neck widths and interpreting the thermal target. Ambient temperature, enclosure cooling, and actual finished copper thickness will also affect measured temperature rise. Retaining the components means their current, voltage, pulse, and power ratings must be considered separately from copper geometry.

## How to compare hardware performance

Use identical assembly, firmware, load waveform, wiring, enclosure, and ambient conditions on both revisions. Measure supply drop and temperature at the same terminals, connectors, fuse/shunt pads, narrow copper sections, and vias. Check current-sense offset/noise, sensor readings, and communication reliability under the same load transitions. A before/after improvement requires those measurements; visual copper changes alone do not establish it.

## Method and records

The board was edited and refilled through the installed KiCad 9.0.7 Python board engine, checked with KiCad 9's DRC and schematic-parity checker, opened for visual review in the KiCad 9 PCB Editor, and rendered with KiCad 9. This was not a mouse-only editing run. `Comparison/changes.json` identifies accepted and rejected edits by UUID; `verification.json` records invariants, counts, areas, and hashes. The scripts document the process; rerunning the initial trial script replaces the refined board with the initial trial, so they are evidence rather than a one-click final-build command.

Ground-return rationale: [TI, PCB trace as a wave guide](https://www.ti.com/video/6307562268112) and [TI, optimizing PCB design for EMC](https://www.ti.com/video/6173428079001). Tool reference: [KiCad 9 zone filler](https://docs.kicad.org/doxygen-python-9.0/classpcbnew_1_1ZONE__FILLER.html).
