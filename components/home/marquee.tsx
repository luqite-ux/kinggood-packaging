const items = [
  'Wooden Pallets',
  'Heavy-Duty Wood Crates',
  'Cable Reels',
  'Custom Sizing',
  'Heat Treatment Available',
  'Solid Wood & Plywood',
  'Global Export Logistics',
  'Project-Specific Design',
  '36,300 m² Facility',
  '12 Production Lines',
  '3,000 Pallets / Day',
]

export function Marquee() {
  return (
    <div
      className="border-y border-[#d8e1eb] bg-[#f0f4f8] py-4"
      aria-hidden
    >
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-[#5a7085]"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8a020]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
