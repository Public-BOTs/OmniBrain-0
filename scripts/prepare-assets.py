"""Export the reviewed figures from the 2026-10-20 Overleaf PDF.

Usage: python3 scripts/prepare-assets.py /path/to/compiled-report.pdf
Page coordinates are in PDF points. Render onto white instead of dropping alpha.
"""
from pathlib import Path
import argparse
import hashlib
import json

import fitz
from PIL import Image

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("pdf", type=Path)
args = parser.parse_args()
site = Path(__file__).resolve().parents[1]
assets = site / "assets"
assets.mkdir(exist_ok=True)
doc = fitz.open(args.pdf)

figures = {
    "performance": (1, (75, 537, 539, 653), 3000),
    "repository-overview": (4, (70.5, 79.5, 541.5, 415), 3000),
    "architecture": (7, (70.86, 105.79, 541.14, 276.76), 2800),
    "data-pipeline": (9, (70.86, 208.26, 541.14, 347.84), 2800),
    "training": (11, (70.5, 76.5, 541.5, 227), 3000),
    "reminder-policy": (13, (70.86, 307.52, 541.14, 523.81), 2800),
    "flywheel": (14, (70.86, 371.37, 541.14, 603.10), 2800),
    "trace-libero": (25, (70.5, 78, 541.5, 331), 3400),
    "trace-robotwin": (25, (70.5, 368, 541.5, 591.5), 3400),
    "trace-robocasa": (26, (70.5, 78, 541.5, 326), 3400),
    "trace-navigation": (26, (70.5, 418, 541.5, 665), 3400),
    "real-world": (27, (70.86, 216.98, 541.14, 396.28), 3000),
    "reminder": (28, (70.86, 77.94, 541.14, 196.24), 3000),
}

def export(page_number, bounds, width, target):
    clip = fitz.Rect(bounds)
    pix = doc[page_number - 1].get_pixmap(
        matrix=fitz.Matrix(width / clip.width, width / clip.width),
        clip=clip, alpha=False,
    )
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    image.save(target, quality=92, method=6)
    return image.size

sizes = {}
for name, (page, bounds, width) in figures.items():
    sizes[name] = export(page, bounds, width, assets / f"{name}.webp")

# The eight observation cells in the top execution row, including PDF annotations.
for name, page, y, height in [
    ("libero", 25, 89.68, 53.22),
    ("robotwin", 25, 381.14, 39.91),
    ("robocasa", 26, 89.68, 53.58),
    ("navigation", 26, 428.87, 53.22),
]:
    for index in range(8):
        x = 92.24 + index * 56.19
        sizes[f"{name}-{index + 1}"] = export(
            page, (x, y, x + 53.22, y + height), 360,
            assets / f"{name}-{index + 1}.webp",
        )

manifest = {
    "source": "Latest Overleaf compilation, 2026-10-20",
    "source_pdf_sha256": hashlib.sha256(args.pdf.read_bytes()).hexdigest(),
    "background": "White, rendered with alpha=False to match the PDF",
    "figures": {name: {"page": spec[0], "bounds": spec[1], "size": sizes[name]}
                for name, spec in figures.items()},
}
(assets / "figure-sources.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Exported {len(sizes)} images from {len(doc)} PDF pages.")
