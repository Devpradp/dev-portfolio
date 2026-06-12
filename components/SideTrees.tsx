// Decorative gutter banners: black tree silhouettes with slow falling leaves.
// Pure CSS animation (see .leaf / leaf-fall in globals.css) — no client JS.

interface Leaf {
  left: string;
  duration: number;
  delay: number;
  scale: number;
}

// Negative delays start leaves mid-fall so the scene isn't empty on load
const leftLeaves: Leaf[] = [
  { left: "12%", duration: 14, delay: -3, scale: 1 },
  { left: "34%", duration: 19, delay: -11, scale: 0.8 },
  { left: "52%", duration: 12, delay: -6, scale: 0.9 },
  { left: "68%", duration: 17, delay: -1, scale: 1.1 },
  { left: "84%", duration: 20, delay: -14, scale: 0.7 },
];

const rightLeaves: Leaf[] = [
  { left: "16%", duration: 18, delay: -9, scale: 0.8 },
  { left: "30%", duration: 13, delay: -2, scale: 1 },
  { left: "48%", duration: 20, delay: -5, scale: 0.7 },
  { left: "66%", duration: 15, delay: -12, scale: 1.1 },
  { left: "82%", duration: 16, delay: -7, scale: 0.9 },
];

function Tree() {
  return (
    <svg
      viewBox="0 0 160 480"
      preserveAspectRatio="xMidYMax meet"
      className="absolute bottom-0 left-0 h-[58vh] w-full text-slate-900/90"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      {/* trunk */}
      <path d="M80 480 C 77 410, 83 345, 78 282" strokeWidth="14" />
      <path d="M80 480 C 70 466, 56 458, 44 454" strokeWidth="6" />
      <path d="M80 480 C 92 464, 104 458, 116 455" strokeWidth="5" />
      {/* main limbs */}
      <path d="M78 282 C 60 242, 42 212, 28 162" strokeWidth="8" />
      <path d="M78 282 C 100 238, 118 206, 132 152" strokeWidth="8" />
      <path d="M78 282 C 80 232, 76 190, 80 132" strokeWidth="7" />
      {/* secondary branches */}
      <path d="M42 212 C 32 192, 24 176, 21 150" strokeWidth="4" />
      <path d="M28 162 C 22 142, 17 126, 19 104" strokeWidth="3" />
      <path d="M28 162 C 36 138, 42 122, 44 98" strokeWidth="3" />
      <path d="M116 208 C 126 188, 134 172, 140 148" strokeWidth="4" />
      <path d="M132 152 C 137 130, 141 114, 139 92" strokeWidth="3" />
      <path d="M132 152 C 122 130, 116 114, 116 90" strokeWidth="3" />
      <path d="M77 198 C 68 176, 62 160, 62 136" strokeWidth="4" />
      <path d="M79 170 C 87 150, 93 134, 95 110" strokeWidth="4" />
      <path d="M80 132 C 77 110, 80 94, 78 72" strokeWidth="3" />
      {/* twigs */}
      <path d="M21 150 C 16 136, 13 124, 14 108" strokeWidth="2" />
      <path d="M44 98 C 45 86, 48 74, 53 62" strokeWidth="2" />
      <path d="M140 148 C 145 134, 148 120, 148 104" strokeWidth="2" />
      <path d="M116 90 C 113 78, 113 66, 116 52" strokeWidth="2" />
      <path d="M62 136 C 58 122, 56 108, 58 92" strokeWidth="2" />
      <path d="M95 110 C 98 96, 102 84, 108 72" strokeWidth="2" />
      <path d="M78 72 C 75 60, 76 48, 80 34" strokeWidth="2" />
    </svg>
  );
}

function Panel({ side, leaves }: { side: "left" | "right"; leaves: Leaf[] }) {
  return (
    <div
      className={`hidden min-[1280px]:block fixed inset-y-0 w-40 z-0 pointer-events-none overflow-hidden ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <div className={side === "right" ? "absolute inset-0 scale-x-[-1]" : "absolute inset-0"}>
        <Tree />
      </div>
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className="leaf bg-slate-800"
          style={{
            left: leaf.left,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            width: `${10 * leaf.scale}px`,
            height: `${10 * leaf.scale}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function SideTrees() {
  return (
    <div aria-hidden="true">
      <Panel side="left" leaves={leftLeaves} />
      <Panel side="right" leaves={rightLeaves} />
    </div>
  );
}
