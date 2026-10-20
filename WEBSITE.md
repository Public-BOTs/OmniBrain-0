# OmniBrain-0 project page

Static research project page for **OmniBrain-0: A Unified Agentic Model for Embodied Intelligence**.

## Preview

Run `python3 -m http.server 8765` and open http://127.0.0.1:8765. No build step or package installation is needed.

## GitHub Pages

In Settings → Pages, choose **GitHub Actions** as the publishing source. The workflow at `.github/workflows/pages.yml` publishes the static page on pushes to `main`. `.nojekyll` keeps the site buildless. Relative asset paths support a repository subpath.

## Editing

- `index.html`: page copy, reported results, citation.
- `app.js`: selected execution keyframes, tabs, filters, citation copy.
- `styles.css`: white, monochrome, responsive layout.
- `assets/`: original observations and diagrams exported from the manuscript.

Five task benchmarks: LIBERO-Pro, LIBERO-Plus, RoboCasa365, RoboTwin 2.0, R2R-CE. R2R-CE values refer to the `rand100` Val-Unseen subset. The page does not use synthetic LIBERO-Plus baseline values for comparisons. Playback is explicitly labeled as keyframe playback.

The institutional citation follows the current manuscript; replace it with the final author list and publication link when available. This repository contains the project website, not training code or model weights.

Design reference: https://public-bots.github.io/UCAG-P/. Implementation and research copy are specific to OmniBrain-0.
