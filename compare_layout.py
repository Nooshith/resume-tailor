#!/usr/bin/env python3
"""Compare two resume PDFs section-by-section: header Y positions and line counts.

Usage:
    python3 compare_layout.py ORIGINAL.pdf TAILORED.pdf [--headers "A,B,C"]

Both PDFs must be 1 page. A fully matching layout prints MATCH:
every section header at the same height (DY < 0.6pt) with the same
line count per section. Requires: pip install pymupdf
"""
import sys
import fitz

DEFAULT_HEADERS = [
    "SUMMARY",
    "TECHNICAL SKILLS",
    "PROFESSIONAL EXPERIENCE",
    "Example Corp",
    "Example Health",
    "Example Services",
    "Example Tech",
    "CERTIFICATIONS & EDUCATION",
]


def analyze(path):
    d = fitz.open(path)
    assert len(d) == 1, f"{path} has {len(d)} pages, expected 1"
    lines = []
    for b in d[0].get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            txt = " ".join(s["text"] for s in l["spans"]).strip()
            if txt:
                lines.append((round(l["bbox"][1], 1), round(l["bbox"][3], 1), txt))
    lines.sort()
    return lines


def find_headers(lines, headers):
    out = {}
    for h in headers:
        for y, b, t in lines:
            if t.startswith(h):
                out[h] = y
                break
        if h not in out:
            raise ValueError(f"header not found: {h}")
    return out


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    headers = DEFAULT_HEADERS
    if "--headers" in sys.argv:
        i = sys.argv.index("--headers")
        headers = sys.argv[i + 1].split(",")

    orig = analyze(sys.argv[1])
    new = analyze(sys.argv[2])
    so, sn = find_headers(orig, headers), find_headers(new, headers)

    ok = True
    print(f"{'SECTION':<30} {'ORIG_Y':>8} {'NEW_Y':>8} {'DY':>7}  GAP_ABOVE(o/n)")
    for h in headers:
        dy = round(sn[h] - so[h], 1)
        io = max(i for i, (y, b, t) in enumerate(orig) if y < so[h])
        inp = max(i for i, (y, b, t) in enumerate(new) if y < sn[h])
        go = round(so[h] - orig[io][1], 1)
        gn = round(sn[h] - new[inp][1], 1)
        if abs(dy) >= 0.6:
            ok = False
        print(f"{h:<30} {so[h]:>8} {sn[h]:>8} {dy:>7}  {go}/{gn}")

    print(f"{'SECTION':<30} {'ORIG_L':>7} {'NEW_L':>7} {'DL':>5}")
    for i, h in enumerate(headers):
        end_o = so[headers[i + 1]] if i + 1 < len(headers) else 9999
        end_n = sn[headers[i + 1]] if i + 1 < len(headers) else 9999
        co = sum(1 for y, b, t in orig if so[h] <= y < end_o)
        cn = sum(1 for y, b, t in new if sn[h] <= y < end_n)
        if cn != co:
            ok = False
        print(f"{h:<30} {co:>7} {cn:>7} {cn - co:>+5}")

    print("MATCH" if ok else "OFF - trim/expand tailored text until every DY=0 and DL=0")


if __name__ == "__main__":
    main()
