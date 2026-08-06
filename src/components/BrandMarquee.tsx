import React from 'react';
import { BrandLogos } from '../assets/graphics';

// Each brand as an individual logo card
const brands: { name: string; logo: string }[] = [
  { name: 'Daawat',      logo: BrandLogos.daawat      },
  { name: 'Aashirvaad',  logo: BrandLogos.aashirvaad  },
  { name: 'Fortune',     logo: BrandLogos.fortune      },
  { name: 'Tata',        logo: BrandLogos.tata         },
  { name: 'Amul',        logo: BrandLogos.amul         },
  { name: 'Maggi',       logo: BrandLogos.maggi        },
  { name: 'Nescafé',     logo: BrandLogos.nescafe      },
  { name: 'Tide',        logo: BrandLogos.tide         },
  { name: 'Tata Salt',   logo: BrandLogos.tataSalt     },
  { name: 'India Gate',  logo: BrandLogos.indiaGate    },
  { name: 'Sunpure',     logo: BrandLogos.sunpure      },
  { name: 'MDH',         logo: BrandLogos.mdh          },
  { name: 'Everest',     logo: BrandLogos.everest      },
  { name: "Lay's",       logo: BrandLogos.lays         },
  { name: 'Coca-Cola',   logo: BrandLogos.cocaCola     },
  { name: 'Surf Excel',  logo: BrandLogos.surfExcel    },
  { name: 'Dettol',      logo: BrandLogos.dettol       },
  { name: 'Parle-G',     logo: BrandLogos.parleG       },
  { name: 'Britannia',   logo: BrandLogos.britannia    },
  { name: 'Dabur',       logo: BrandLogos.dabur        },
  { name: 'Patanjali',   logo: BrandLogos.patanjali    },
  { name: 'Colgate',     logo: BrandLogos.colgate      },
  { name: 'Tata Sampann',logo: BrandLogos.tataSampann  },
  { name: 'Pro Nature',  logo: BrandLogos.proNature    },
];

const LogoCard: React.FC<{ brand: { name: string; logo: string } }> = ({ brand }) => (
  <div
    className="brand-card flex-shrink-0 flex items-center justify-center bg-white rounded-2xl border border-slate-100 mx-5 cursor-default select-none"
    style={{
      width: 160,
      height: 80,
      padding: '10px 18px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}
    title={brand.name}
  >
    <img
      src={brand.logo}
      alt={brand.name}
      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      draggable={false}
    />
  </div>
);

export const BrandMarquee: React.FC = () => {
  // Duplicate for seamless infinite loop
  const doubled = [...brands, ...brands];

  return (
    <section className="w-full py-10 px-0 select-none" aria-label="Trusted Brands">
      {/* Section heading */}
      <div className="px-4 sm:px-8 mb-6 text-center">
        <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-[3px] mb-1">Our Partners</p>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Trusted Brands We Carry</h2>
        <p className="text-xs text-gray-500 mt-1">
          Authentic products from India's most loved brands — straight to your door.
        </p>
      </div>

      {/* Marquee wrapper with gradient fades */}
      <div className="relative w-full overflow-hidden animate-marquee-paused">
        {/* Left gradient fade */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
          }}
        />
        {/* Right gradient fade */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
          }}
        />

        {/* Scrolling track */}
        <div className="animate-marquee py-4">
          {doubled.map((brand, idx) => (
            <LogoCard key={`${brand.name}-${idx}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};
