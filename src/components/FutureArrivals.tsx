import React from 'react';

interface FutureItem {
  id: number;
  name: string;
  image: string;
}

const futureItems: FutureItem[] = [
  {
    id: 1,
    name: 'Fresh Fruits',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 2,
    name: 'Fresh Vegetables',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 3,
    name: 'Dairy Products',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 4,
    name: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 5,
    name: 'Cooking Oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 6,
    name: 'Organic Products',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 7,
    name: 'Ready-to-Cook Products',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300',
  },
];

export const FutureArrivals: React.FC = () => {
  // Duplicate list to achieve infinite marquee scroll illusion
  const doubledItems = [...futureItems, ...futureItems, ...futureItems];

  return (
    <div className="w-full px-4 sm:px-8 select-none overflow-hidden">
      {/* Heading */}
      <div className="mb-6 text-left">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Future Arrivals
        </h2>
        <p className="text-xs text-gray-400 font-semibold mt-1">
          Premium choices coming soon to Farminix
        </p>
      </div>

      {/* Marquee Outer Container */}
      <div className="relative w-full overflow-hidden py-4 bg-slate-50/40 rounded-[24px] border border-slate-100/60 flex items-center animate-marquee-paused">
        {/* Infinite moving track */}
        <div className="animate-marquee flex gap-5">
          {doubledItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[180px] sm:w-[200px] bg-white rounded-[20px] p-4 border border-slate-100 custom-card-shadow flex flex-col items-center gap-3 relative flex-shrink-0"
            >
              {/* Coming Soon Badge (top-right corner) */}
              <span className="absolute top-3 right-3 bg-purple-50 border border-purple-100 text-[#7C3AED] text-[8px] font-extrabold px-2 py-0.5 rounded-full select-none uppercase tracking-wider">
                Coming Soon
              </span>

              {/* Square Image container */}
              <div className="w-full aspect-square bg-slate-50/50 rounded-xl overflow-hidden flex items-center justify-center border border-slate-50/50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[85%] h-[85%] object-cover rounded-lg mix-blend-multiply"
                  draggable="false"
                />
              </div>

              {/* Name only */}
              <div className="text-xs font-extrabold text-slate-800 tracking-tight leading-snug text-center">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
