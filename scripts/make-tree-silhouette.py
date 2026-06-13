"""One-off: turn the reference pine photo into charcoal transparent silhouettes.

Source is a dark tree on a near-white background, so a simple luminance
threshold gives a clean alpha mask. Output PNGs are committed to public/trees/
and the site needs no image tooling at runtime.

Run: python3 scripts/make-tree-silhouette.py
"""

from PIL import Image, ImageFilter

SRC = "/Users/devpradeep/Downloads/tree.jpg"
CHARCOAL = (15, 23, 42)  # tailwind slate-900
THRESHOLD = 205          # pixels darker than this become tree


def silhouette(threshold: int) -> Image.Image:
    gray = Image.open(SRC).convert("L")
    # drop the Alamy watermark band along the bottom edge before thresholding
    w, h = gray.size
    gray = gray.crop((0, 0, w, int(h * 0.93)))
    mask = gray.point(lambda p: 255 if p < threshold else 0)
    # despeckle stray sky pixels, then smooth the edge a touch
    mask = mask.filter(ImageFilter.MedianFilter(size=3))
    out = Image.new("RGBA", gray.size, CHARCOAL + (0,))
    out.putalpha(mask)
    bbox = mask.getbbox()
    return out.crop(bbox)


def main() -> None:
    full = silhouette(THRESHOLD)
    full.thumbnail((520, 1400))
    full.save("public/trees/pine.png")
    print("wrote public/trees/pine.png", full.size)

    # a second, slightly fuller variant for grove variety: crop a bit of the
    # lower bare trunk so this one reads as a shorter, bushier tree
    w, h = full.size
    variant = full.crop((0, 0, w, int(h * 0.82)))
    variant.save("public/trees/pine-b.png")
    print("wrote public/trees/pine-b.png", variant.size)


if __name__ == "__main__":
    main()
