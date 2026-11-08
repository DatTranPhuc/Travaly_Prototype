# Lumi tutorial artwork

Original artwork supplied by the user on 2026-11-08:

- poses-a.png: A881C117-9202-47AE-B4CB-6A3498596FDF.png
- poses-b.png: A8A110F5-2055-4CFD-B64E-14E01B541D55.png

Both source files are unchanged PNG copies (1536 × 1024).

pose-a-0.png through pose-b-5.png are separate cutouts from these sources.
Extraction groups connected alpha regions with their nearest mascot, preserving
props that extend beyond the nominal grid and disconnected decorations. Each
512 × 512 output includes 28 pixels of transparent padding. The modal displays
these files with object-fit: contain, without clipping or sprite positioning.
No generated or redrawn mascot is used.

Rebuild on macOS: swift scripts/crop-lumi-guides.swift
Pose selection: src/features/travel/lumiGuides.ts
