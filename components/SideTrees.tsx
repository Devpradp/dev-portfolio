// Decorative gutter banners: overlapping pine silhouettes with slow falling
// leaves. Server component, no client JS — leaves animate via pure CSS
// (.leaf / leaf-fall in globals.css). Shown only on wide screens (>=1280px)
// where the centered 860px column leaves empty side gutters; never overlaps
// content (pointer-events-none) and hidden under prefers-reduced-motion.

interface TreeInstance {
  src: string;
  height: string; // vh — bottom-anchored
  // Always a left-offset from the panel's own left edge:
  //   Left panel:  left edge = screen-left  (outer); tree canopy extends rightward
  //   Right panel: left edge = content edge (inner); flip:true mirrors canopy inward
  // Using left for both prevents inner-edge clipping on the right panel, which
  // happens when using `right: N` because `right + width > 210px` overflows left.
  leftOffset: number;
  opacity: number;
  flip?: boolean;
}

interface Leaf {
  left: string;
  duration: number;
  delay: number; // negative => starts mid-fall
  size: number; // px
}

// Front (most opaque/tallest) listed last so it paints on top.
const leftTrees: TreeInstance[] = [
  { src: "/trees/pine-b.png", height: "62vh", leftOffset: -36, opacity: 0.18, flip: true },
  { src: "/trees/pine.png",   height: "76vh", leftOffset:  46, opacity: 0.38 },
  { src: "/trees/pine.png",   height: "86vh", leftOffset: -14, opacity: 0.62 },
];

// Right panel: leftOffset=0 is the inner (content) edge, leftOffset=210 is the screen edge.
// All flip:true so canopy faces inward. leftOffset keeps canopy from crossing inner edge:
// with the tree anchored near the content edge, the trunk extends rightward (off-screen),
// so overflow-hidden only clips the outer (screen) edge — exactly where we want it.
const rightTrees: TreeInstance[] = [
  { src: "/trees/pine-b.png", height: "58vh", leftOffset: 62, opacity: 0.18, flip: true },
  { src: "/trees/pine.png",   height: "72vh", leftOffset: 28, opacity: 0.38, flip: true },
  { src: "/trees/pine.png",   height: "84vh", leftOffset:  4, opacity: 0.62, flip: true },
];

const leftLeaves: Leaf[] = [
  { left: "22%", duration: 19, delay: -4, size: 9 },
  { left: "48%", duration: 24, delay: -13, size: 7 },
  { left: "70%", duration: 21, delay: -8, size: 10 },
  { left: "86%", duration: 17, delay: -2, size: 6 },
];

const rightLeaves: Leaf[] = [
  { left: "18%", duration: 22, delay: -10, size: 7 },
  { left: "40%", duration: 18, delay: -3, size: 10 },
  { left: "64%", duration: 24, delay: -15, size: 6 },
  { left: "82%", duration: 20, delay: -6, size: 9 },
];

function Panel({
  side,
  trees,
  leaves,
}: {
  side: "left" | "right";
  trees: TreeInstance[];
  leaves: Leaf[];
}) {
  return (
    <div
      className={`hidden min-[1280px]:block fixed top-14 bottom-0 z-0 w-[210px] overflow-hidden pointer-events-none ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      {trees.map((tree, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={tree.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 w-auto max-w-none select-none"
          style={{
            height: tree.height,
            opacity: tree.opacity,
            left: `${tree.leftOffset}px`,
            transform: tree.flip ? "scaleX(-1)" : undefined,
          }}
        />
      ))}
      {leaves.map((leaf, i) => (
        <span
          key={`leaf-${i}`}
          className="leaf bg-slate-800"
          style={{
            left: leaf.left,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function SideTrees() {
  return (
    <div aria-hidden="true">
      <Panel side="left" trees={leftTrees} leaves={leftLeaves} />
      <Panel side="right" trees={rightTrees} leaves={rightLeaves} />
    </div>
  );
}
