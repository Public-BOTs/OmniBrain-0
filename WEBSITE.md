# OmniBrain-0 project page

Static research project page for **OmniBrain-0: A Unified Agentic Model for Embodied Intelligence**.

Project website: https://public-bots.github.io/OmniBrain-0/

Website source: https://github.com/Public-BOTs/OmniBrain-0

Code repository: https://github.com/luo-yc17/OmniBrain-0

## Preview

Run `python3 -m http.server 8765` and open http://127.0.0.1:8765. No build step or package installation is needed.

## GitHub Pages

In Settings → Pages, choose **GitHub Actions** as the publishing source. The workflow at `.github/workflows/pages.yml` publishes the static page on pushes to `main`. `.nojekyll` keeps the site buildless. Relative asset paths support a repository subpath.

## Editing

- `index.html`: page copy, reported results, citation.
- `app.js`: execution playback, benchmark tabs, citation copy.
- `assets/execution-demos.js`: concise execution summaries and embedded WebP observations.
- `styles.css`: Xiaomi orange accents, warm white surfaces, and responsive layout.
- `assets/`: original observations and diagrams exported from the manuscript.

Five task benchmarks: LIBERO-Pro, LIBERO-Plus, RoboCasa365, RoboTwin 2.0, R2R-CE. R2R-CE values refer to the `rand100` Val-Unseen subset. The page does not use synthetic LIBERO-Plus baseline values for comparisons. Playback is explicitly labeled as execution-step playback.

The institutional citation follows the current manuscript; replace it with the final author list and publication link when available. This repository contains the project website, not training code or model weights.

Design reference: https://public-bots.github.io/UCAG-P/. Implementation and research copy are specific to OmniBrain-0.

## Figure source

All figures and execution keyframes were re-exported from the latest Overleaf compilation on 2026-10-20. `assets/figure-sources.json` records their PDF pages and crop bounds. The export script renders onto white (`alpha=False`) to preserve the PDF appearance and avoid black transparent regions.

`assets/OmniBrain-0-Technical-Report.pdf` is a web-optimized copy of that 46-page report; page order and searchable text are preserved.

## Clear research-page layout

The concept illustration is used only as a pale CSS background behind the title. The standalone artwork card, small section kickers, repeated figure-source notes, result filters, and expandable detail controls have been removed. Primary descriptions use 20–22 px desktop type and 18–19 px mobile type. The title has Technical report, Code, and Demos resources.

The results comparison is responsive HTML with a shared 0–100 scale, rather than a raster figure with small angled labels. LIBERO-Plus adds ABot-M0 (80.5), π0.5 (83.4), OmniBrain-0 9B (83.8), and RSI (84.5), from Table 2. Synthetic zero-shot entries in that table are excluded. The other four comparisons retain the scores from the supplied Figure 1. The 4B/9B/RSI table is unchanged.

## Task execution refresh

The manipulation examples use original observations from slides 1–3 of `详细可视化（新）.pptx`: salad-dressing placement (5 steps), two bread loaves (5 steps), and croissant with jam (6 steps). Each step shows its observation, one short Think summary, and the corresponding Tool. The R2R-CE example keeps its 8 paper keyframes. Previous/next controls stop at the ends, and step playback can be paused or replayed. No video or additional measured results are synthesized. The reminder-policy page from the deck is excluded.
