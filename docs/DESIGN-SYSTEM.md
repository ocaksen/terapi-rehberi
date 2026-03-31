# TerapiRehberi — Design System

## 1. Renk Sistemi (60-30-10)

### Kurallar
- **%60 Nötr** — Beyaz ve açık gri tonları (ferahlık, güven)
- **%30 Marka** — Ana yeşil (brand-500, güven, huzur)
- **%10 Kontrast** — Soft turuncu/somon (CTA, dikkat çekme)

### Renk Paleti

```css
/* ───────────────────────────────────────────────────────────
   ARKA PLAN & NÖTRLER (60%)
   ─────────────────────────────────────────────────────────── */

--color-background:     #FAFBFC;   /* Sayfa arka planı - ferah beyaz */
--color-surface:        #FFFFFF;   /* Kart yüzeyleri */
--color-surface-raised: #F8FAFB;   /* Yükseltilmiş yüzeyler */

--color-border:         #E8ECF0;    /* İnce çizgiler */
--color-border-subtle:  #F1F4F7;   /* Çok hafif ayrımlar */

/* Metin nötrleri */
--color-text-primary:   #1A1F26;   /* Ana metin - yumuşak siyah */
--color-text-secondary: #5C6570;   /* İkincil metin */
--color-text-muted:     #8C939E;   /* Açıklama metni */
--color-text-inverse:   #FFFFFF;   /* Koyu zemin üstü beyaz */


/* ───────────────────────────────────────────────────────────
   MARK A COLORS (30%)
   Kullanım: Logo, primary button, aktif state, vurgu
   ─────────────────────────────────────────────────────────── */

--color-brand-50:       #EEF9F6;   /* En açık - arka plan tint */
--color-brand-100:      #D1F0E7;   /* Hafif arka plan */
--color-brand-200:      #A3E1CF;   /* Hover arka plan */
--color-brand-300:      #6FCFBA;   /* Yumuşak accent */
--color-brand-400:      #4ABEA6;   /* İcon, link */
--color-brand-500:      #2EA88E;   /* PRIMARY - Ana marka rengi */
--color-brand-600:      #258A73;   /* Hover state */
--color-brand-700:      #1E6B5A;   /* Active state */
--color-brand-800:      #174C42;   /* Koyu yüzey */
--color-brand-900:      #0F2E29;   /* En koyu - footer */


/* ───────────────────────────────────────────────────────────
   ACCENT COLORS (10%)
   Kullanım: CTA butonları, önemli aksiyonlar
   ─────────────────────────────────────────────────────────── */

/* Soft Turuncu / Somon - Ana CTA rengi */
--color-accent:         #F5A86E;   /* PRIMARY ACCENT */
--color-accent-light:   #FFF0E6;   /* Arka plan tint */
--color-accent-dark:    #E8894F;   /* Hover */
--color-accent-muted:   #FBE6D4;   /* Subtle background */

/* Yardımcı aksanlar (minimal kullanım) */
--color-coral:          #F0735A;   /* Yanlış/Silme - nadir */
--color-amber:          #F5C84A;   /* Uyarı/Bekleme - nadir */
--color-lavender:       #A78BFA;   /* Kategori badge - nadir */
--color-sky:            #60C4F0;   /* Bilgi - nadir */

/* ───────────────────────────────────────────────────────────
   ÖZEL DURUMLAR
   ─────────────────────────────────────────────────────────── */

--color-success:        #22C55E;
--color-success-bg:     #DCFCE7;
--color-error:         #EF4444;
--color-error-bg:       #FEE2E2;
--color-warning:        #F59E0B;
--color-warning-bg:     #FEF3C7;


/* ───────────────────────────────────────────────────────────
   SECTION ARKA PLAN GRADIENTLERİ
   ─────────────────────────────────────────────────────────── */

--gradient-section-1:   linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%);
--gradient-section-2:   linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 50%, #EEF9F6 100%);
--gradient-section-3:   linear-gradient(180deg, #EEF9F6 0%, #FFFFFF 100%);
--gradient-hero:         linear-gradient(135deg, #FAFBFC 0%, #EEF9F6 50%, #F8FAFB 100%);
```

### Kullanım Kuralları

```
┌─────────────────────────────────────────────────────────────┐
│  NE KULLAN                                    NE KULLANMA  │
├─────────────────────────────────────────────────────────────┤
│  ✓ Tek ton: brand-500 CTA'da                  ✗ brand-300  │
│  ✓ Surface beyaz kartlarda                   ✗ brand-100   │
│  ✓ text-brand-600 linklarda                   ✗ brand-800   │
│  ✓ accent-light CTA arka planında              ✗ Gri gradient│
│  ✓ Beyaz/yumuşak geçişler                     ✗ Sert renk   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Tipografi Sistemi

### Font Ailesi
- **Primary:** Inter (Google Fonts)
- **Fallback:** system-ui, -apple-system, sans-serif
- **Variable weights:** 400, 500, 600, 700, 800

### Font Yükleme
```css
/* app/layout.tsx veya globals.css içinde */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
```

### Font Scale

```
┌────────────────────────────────────────────────────────────────┐
│ KULLANIM              │ BOYUT      │ AĞIRLIK │ SATIR    │ RENK    │
├───────────────────────┼────────────┼─────────┼──────────┼─────────┤
│ Display (Hero)        │ 56-64px    │ 800     │ 1.1      │ primary │
│ H1 (Section Title)    │ 40-48px    │ 700     │ 1.2      │ primary │
│ H2 (Subsection)       │ 28-32px    │ 600     │ 1.3      │ primary │
│ H3 (Card Title)       │ 20-24px    │ 600     │ 1.4      │ primary │
│ H4 (Small Title)      │ 16-18px    │ 600     │ 1.4      │ primary │
│ Body Large            │ 18px       │ 400     │ 1.6-1.7  │ secondary│
│ Body                  │ 16px       │ 400     │ 1.6-1.7  │ secondary│
│ Body Small            │ 14px       │ 400     │ 1.5      │ secondary│
│ Caption / Label        │ 12-13px    │ 500-600 │ 1.4      │ muted   │
│ Overline (Section)     │ 11-12px    │ 600     │ 1.2      │ brand-500│
│ Button                │ 14-15px    │ 600     │ 1.0      │ inverse │
│ Badge                 │ 11-12px    │ 600     │ 1.0      │ varies  │
└────────────────────────────────────────────────────────────────┘
```

### CSS Değerleri

```css
/* Font sizes - Tailwind custom theme */
--text-display:   3.5rem;    /* 56px */
--text-h1:       3rem;      /* 48px */
--text-h2:       2rem;      /* 32px */
--text-h3:       1.5rem;    /* 24px */
--text-h4:       1.125rem;  /* 18px */
--text-body-lg:  1.125rem;  /* 18px */
--text-body:     1rem;      /* 16px */
--text-body-sm:  0.875rem;  /* 14px */
--text-caption:  0.8125rem; /* 13px */
--text-label:    0.75rem;   /* 12px */
--text-overline: 0.6875rem; /* 11px */

/* Line heights */
--leading-tight:   1.1;
--leading-snug:    1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.65;

/* Letter spacing */
--tracking-tight:   -0.02em;  /* Başlıklar */
--tracking-normal:  0em;       /* Body */
--tracking-wide:    0.05em;    /* Caption */
--tracking-widest:  0.15em;    /* Overline/label */

/* Font weights */
--font-regular:    400;
--font-medium:     500;
--font-semibold:   600;
--font-bold:       700;
--font-extrabold:  800;
```

### Hiyerarşi Örneği

```tsx
// Section başlığı
<h2 className="text-h2 font-bold tracking-tight text-primary">
  Huzurla Başlayın
</h2>

// Alt başlık
<p className="text-h4 font-semibold text-primary mt-2">
  Bireysel Terapi
</p>

// Açıklama
<p className="text-body text-secondary leading-relaxed">
  Duygusal zorluklarınızı anlamlı bir şekilde ele almak için yanınızdayız.
</p>

// İnce açıklama
<p className="text-caption text-muted">
  Haftada 2 seans, ortalama 12 hafta sürmektedir.
</p>

// Section label (overline)
<span className="text-overline font-semibold uppercase tracking-widest text-brand-500">
  Hizmetlerimiz
</span>
```

---

## 3. Spacing & Layout Sistemi

### Container

```css
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;   /* 24px */
  padding-right: 1.5rem;  /* 24px */
}

/* Mobilde */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;   /* 16px */
    padding-right: 1rem;  /* 16px */
  }
}
```

### Section Spacing

```css
/* Minimum section boşluğu */
.section {
  padding-top: 7.5rem;    /* 120px */
  padding-bottom: 7.5rem; /* 120px */
}

/* Mobilde */
@media (max-width: 768px) {
  .section {
    padding-top: 4rem;     /* 64px */
    padding-bottom: 4rem; /* 64px */
  }
}
```

### Grid Sistemi

```css
/* 3 kolon stats kartları için */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;  /* 24px */
}

/* 2 kolon */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
```

### Eleman Arası Boşluk

```
Internal spacing (kart içi):
  - xs:  0.5rem   (8px)
  - sm:  0.75rem  (12px)
  - md:  1rem     (16px)
  - lg:  1.5rem   (24px)
  - xl:  2rem     (32px)

External spacing (elemanlar arası):
  - gap-4:  1rem   (16px)
  - gap-6:  1.5rem (24px)
  - gap-8:  2rem   (32px)
  - gap-12: 3rem   (48px)
```

---

## 4. Border Radius Sistemi

```css
/* Tek tutarlı radius değeri: 20px (1.25rem) */

--radius-sm:    0.5rem;    /* 8px  - İcon container, küçük badge */
--radius-md:    0.75rem;   /* 12px - Input, small button */
--radius-lg:    1rem;      /* 16px - Small card */
--radius-xl:    1.25rem;   /* 20px - Ana kart, button (PRIMARY) */
--radius-2xl:   1.5rem;    /* 24px - Large card */
--radius-3xl:   2rem;      /* 32px - Hero card, special element */
--radius-full:  9999px;    /*      - Pill, avatar, badge */
```

### Kullanım

```tsx
// Tüm kartlar
<div className="rounded-xl bg-white shadow-sm">...</div>

// Button
<button className="rounded-xl px-6 py-3 bg-brand-500 text-white">...</button>

// Input
<input className="rounded-lg px-4 py-3 border border-border" />

// Avatar (dairesel)
<div className="rounded-full w-12 h-12">...</div>

// Badge (kapsül)
<span className="rounded-full px-3 py-1 text-label">...</span>
```

---

## 5. Shadow Sistemi (Soft UI)

```css
/* ───────────────────────────────────────────────────────────
   GÖLGE PRENSİBİ:
   Gölgeler yumuşak ve yayılık olmalı. Keskin gölge YOK.
   Renk: rgba(0, 0, 0, 0.04 - 0.08)
   ─────────────────────────────────────────────────────────── */

--shadow-xs:   0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm:   0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md:   0 4px 16px rgba(0, 0, 0, 0.05);
--shadow-lg:   0 8px 32px rgba(0, 0, 0, 0.06);
--shadow-xl:   0 16px 48px rgba(0, 0, 0, 0.08);
--shadow-2xl:  0 24px 64px rgba(0, 0, 0, 0.10);

/* Hover'da gölge artışı */
.shadow-hover {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.shadow-hover:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-5px);
}

/* İç gölge (neumorphic subtle) */
--shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.04);

/* Glassmorphism */
--shadow-glass:
  0 8px 32px rgba(0, 0, 0, 0.06),
  inset 0 1px 0 rgba(255, 255, 255, 0.8);
```

### Kullanım Örneği

```tsx
// Kart - temel
<div className="bg-white rounded-xl shadow-sm">

// Kart - hover efekti (micro-interaction)
<div className="bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">

// Glassmorphism kart
<div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-glass border border-white/50">

// Button - iç gölge (pressed state)
<button className="shadow-sm active:shadow-inset">
```

---

## 6. Geçişler & Animasyonlar

### Transition Temel Değerleri

```css
:root {
  --transition-fast:   150ms ease;    /* Micro: hover, focus */
  --transition-base:   250ms ease;    /* Default: color, bg change */
  --transition-slow:   400ms ease;    /* Large: opacity, transform */
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1); /* Bounce */
}

.ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
.ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);
.ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Section Geçişleri (Gradient Shift)

```css
/* Her section arası: yukarı doğru yumuşak gradient fade */
.section-fade-down {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(238, 249, 246, 0.3) 50%,
    rgba(238, 249, 246, 0.8) 100%
  );
}

/* Beyaz → Hafif yeşil → Beyaz akışı */
.section-gradient-flow {
  background: linear-gradient(
    180deg,
    #FFFFFF 0%,      /* Beyaz başlangıç */
    #FAFBFC 30%,     /* Hafif gri */
    #EEF9F6 70%,     /* Brand tint */
    #FFFFFF 100%     /* Beyaz bitiş */
  );
}
```

### Micro-Interactions

```css
/* Hover: Hafif yükselme + gölge artışı (KURAL) */
.interactive {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.interactive:hover {
  transform: translateY(-5px);      /* ← 5px yukarı */
  box-shadow: var(--shadow-lg);     /* ← gölge artışı */
}

/* Button hover */
.btn {
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn:active {
  transform: translateY(0);
}

/* Link hover */
.link {
  transition: color 0.2s ease;
}

.link:hover {
  color: var(--color-brand-600);
}
```

### Scroll Animasyonları (Framer Motion)

```tsx
// Reusable fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Stagger children
const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

// Kullanım
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
  variants={fadeUp}
>
  {children}
</motion.div>
```

---

## 7. İkon Sistemi (Duotone + Glassmorphism)

### Kural
- **Stil:** Duotone (2 renk: outline + filled areas)
- **Stroke:** 1.5px - 2px, rounded caps
- **Boyut:** 20x20px (small), 24x24px (medium), 32x32px (large)
- **Renk:** Metin rengi ile uyumlu, accent değil

### İkon Container

```tsx
// Glassmorphism icon wrapper
<div className="
  w-12 h-12 rounded-xl
  bg-white/70 backdrop-blur-md
  border border-white/50
  flex items-center justify-center
  shadow-sm
">
  {/* İkon */}
  <IconComponent className="w-6 h-6 text-brand-500" />
</div>
```

### Kapsamlı İkon Palette

```tsx
// icons/index.tsx - Tüm ikonlar burada

export const Icons = {
  // Temel - line icons (1.5px stroke)
  heart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),

  // Hizmet ikonları
  brain: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0 1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5"/>
    </svg>
  ),

  users: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),

  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),

  // Location pin - Konya badge için
  mapPin: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),

  // Actions
  arrowRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),

  check: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),

  // Stats icons
  star: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),

  trendingUp: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
};
```

### İkon Kullanım Örnekleri

```tsx
// Hizmet kartı ikonu
<div className="flex items-center gap-4">
  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center">
    <Icons.brain className="w-7 h-7 text-brand-500" />
  </div>
  <div>
    <h3 className="text-h4 font-semibold">Bireysel Terapi</h3>
    <p className="text-body-sm text-secondary">Duygusal iyileşme</p>
  </div>
</div>

// Glassmorphism ikon kartı
<div className="
  w-16 h-16 rounded-2xl
  bg-white/70 backdrop-blur-xl
  border border-white/50
  flex items-center justify-center
  shadow-glass
">
  <Icons.heart className="w-8 h-8 text-brand-500" />
</div>
```

---

## 8. Location Badge (Konya)

### Kural
- **Koyu zemin KULLANMA**
- **Beyaz/near-white arka plan**
- **İnce border**
- **Pin icon + "Konya" yazısı**
- **Bol padding**

### Doğru Uygulama

```tsx
// ✅ DOĞRU - Beyaz badge
<div className="
  inline-flex items-center gap-1.5
  px-3 py-1.5
  bg-white
  border border-border
  rounded-full
  shadow-xs
">
  <Icons.mapPin className="w-3.5 h-3.5 text-brand-500" />
  <span className="text-caption font-medium text-primary">Konya</span>
</div>

// ✅ Grid'de kullanım
<div className="
  absolute top-4 left-4
  inline-flex items-center gap-1.5
  px-3 py-1.5
  bg-white/90 backdrop-blur-sm
  border border-white/50
  rounded-full
  shadow-sm
">
  <Icons.mapPin className="w-3.5 h-3.5 text-brand-500" />
  <span className="text-caption font-medium text-primary">Konya</span>
</div>

// ❌ YANLIŞ - Koyu badge
<div className="bg-brand-900 text-white ...">  ← KULLANMA
```

---

## 9. Veri Görselleştirme (Stats/Data Cards)

### Kurallar
- **Büyük rakamları küçült** — 4rem+ kullanma
- **Kart içine al** — Her veri ayrı kart
- **İkon ile destekle** — Rakam tek başına durmasın

### Doğru Uygulama

```tsx
// Stats kartları - 3 kolon grid
<div className="grid grid-cols-3 gap-6">

  {/* Kart 1 */}
  <div className="
    bg-white
    rounded-2xl
    p-8
    border border-border
    shadow-sm
    text-center
  ">
    <div className="
      w-14 h-14 mx-auto mb-4
      rounded-2xl
      bg-brand-50
      flex items-center justify-center
    ">
      <Icons.users className="w-7 h-7 text-brand-500" />
    </div>

    {/* Rakam - büyük ama abartısız */}
    <p className="text-h2 font-bold text-primary mb-1">
      2,400<span className="text-brand-500">+</span>
    </p>

    {/* Açıklama */}
    <p className="text-body-sm text-secondary">
      Aileye ulaştık
    </p>

    {/* Alt mesaj - opsiyonel */}
    <p className="text-caption text-muted mt-2">
      "Ilk seanstan sonra nefes alabildim"
    </p>
  </div>

  {/* Kart 2 - benzer yapı */}
  ...
</div>
```

### Rakam Boyutlandırma

```css
/* Rakam boyutları */
.stat-number {
  font-size: 3rem;      /* 48px - max */
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
}

@media (max-width: 640px) {
  .stat-number {
    font-size: 2.25rem; /* 36px - mobil */
  }
}
```

---

## 10. Component Yapıları

### Button Components

```tsx
// Primary Button - CTA
<button className="
  inline-flex items-center justify-center gap-2
  px-7 py-3.5
  bg-brand-500 text-white
  font-semibold text-body-sm
  rounded-xl
  shadow-sm
  hover:bg-brand-600
  hover:shadow-md
  hover:-translate-y-0.5
  active:translate-y-0
  transition-all duration-200
">
  {children}
</button>

// Secondary Button
<button className="
  inline-flex items-center justify-center gap-2
  px-7 py-3.5
  bg-white text-primary
  font-semibold text-body-sm
  rounded-xl
  border border-border
  shadow-xs
  hover:shadow-sm hover:bg-surface-raised
  hover:-translate-y-0.5
  active:translate-y-0
  transition-all duration-200
">
  {children}
</button>

// Ghost Button (text only)
<button className="
  inline-flex items-center gap-1.5
  text-brand-600 font-medium text-body-sm
  hover:text-brand-700
  transition-colors duration-200
">
  {children}
  <Icons.arrowRight className="w-4 h-4" />
</button>
```

### Card Component

```tsx
// Temel kart
<div className="
  bg-white
  rounded-2xl
  p-6 lg:p-8
  border border-border
  shadow-sm
  hover:shadow-md
  hover:-translate-y-1
  transition-all duration-300
">
  {children}
</div>

// Glassmorphism kart
<div className="
  bg-white/70 backdrop-blur-xl
  rounded-2xl
  p-6 lg:p-8
  border border-white/50
  shadow-glass
">
  {children}
</div>
```

### Input Component

```tsx
<input
  className="
    w-full
    px-4 py-3
    bg-white
    border border-border
    rounded-xl
    text-body text-primary
    placeholder:text-muted
    focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
    transition-all duration-200
  "
  placeholder="Adınız"
/>
```

### Badge Component

```tsx
// Label badge
<span className="
  inline-flex items-center
  px-2.5 py-1
  bg-brand-50 text-brand-600
  text-label font-semibold
  rounded-full
">
  {children}
</span>

// Location badge
<span className="
  inline-flex items-center gap-1.5
  px-3 py-1.5
  bg-white border border-border
  text-caption font-medium
  rounded-full shadow-xs
">
  <Icons.mapPin className="w-3.5 h-3.5 text-brand-500" />
  Konya
</span>
```

---

## 11. UI Prensipleri Özeti

```
┌─────────────────────────────────────────────────────────────────┐
│                     YAP — YAPMA                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✓ YAP                                                       │
│  ─────────────────────────────────────────────────────────────  │
│  • Yumuşak radius (20px+)                                     │
│  • Beyaz/krem arka plan                                        │
│  • Yumuşak gölgeler (rgba 0,0,0, 0.04-0.08)                    │
│  • Yeterli beyaz alan                                          │
│  • Tutarlı icon stili (duotone/line)                          │
│  • İkon + başlık + açıklama birlikte                           │
│  • Hover'da translateY(-5px) + gölge artışı                    │
│  • Section arası gradient geçişler                             │
│  • 60-30-10 renk kuralı                                        │
│  • Glassmorphism açık içerikli kartlarda                       │
│                                                                 │
│                                                                 │
│  ✗ YAPMA                                                      │
│  ─────────────────────────────────────────────────────────────  │
│  • Keskin köşe (border-radius: 0, 4px)                         │
│  • Koyu gölge (rgba 0,0,0, 0.2+)                               │
│  • Aşırı yeşil/kırmızı kullanımı                               │
│  • Sert section geçişleri                                      │
│  • Yalnız rakam (ikon/açıklama olmadan)                        │
│  • Çok farklı icon stili karışımı                               │
│  • Boşluk yokluğu veya aşırı sıkışıklık                        │
│  • 3+ farklı renk aynı bölümde                                 │
│  • Koyu zemin badge (Konya gibi lokasyon)                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Section Gradient Akışı

Sayfa genelinde kullanılacak gradient sıralaması:

```css
/* Bölüm 1: Hero */
background: linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%);

/* Bölüm 2: Problem/Tanışma */
background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 40%, #EEF9F6 100%);

/* Bölüm 3: Çözüm/Hizmetler */
background: linear-gradient(180deg, #EEF9F6 0%, #FFFFFF 60%, #FFFFFF 100%);

/* Bölüm 4: İstatistikler */
background: linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 50%, #F8FAFB 100%);

/* Bölüm 5: Uzmanlar */
background: linear-gradient(180deg, #F8FAFB 0%, #EEF9F6 30%, #FFFFFF 100%);

/* Bölüm 6: CTA */
background: linear-gradient(180deg, #FFFFFF 0%, #EEF9F6 50%, #FFFFFF 100%);
```

---

## 13. Responsive Breakpoints

```css
/* Breakpoints */
--breakpoint-sm: 640px;   /* Mobil landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Laptop */
--breakpoint-xl: 1280px;  /* Desktop */

/* Responsive spacing */
.section {
  padding-top: 7.5rem;    /* 120px */
  padding-bottom: 7.5rem;
}

@media (max-width: 768px) {
  .section {
    padding-top: 4rem;    /* 64px */
    padding-bottom: 4rem;
  }
}

/* Grid collapse */
.grid-3 { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-3, .grid-2 { grid-template-columns: 1fr; }
}
```

---

## 14. Hızlı Referans (Quick Reference)

```css
/* Renkler */
--color-background:    #FAFBFC;
--color-surface:        #FFFFFF;
--color-brand-500:      #2EA88E;  /* ANA MARK A */
--color-accent:         #F5A86E;  /* CTA ACCENT */
--color-text-primary:   #1A1F26;
--color-text-secondary: #5C6570;
--color-text-muted:     #8C939E;
--color-border:         #E8ECF0;

/* Border Radius */
--radius-xl: 1.25rem;  /* Standart */
--radius-2xl: 1.5rem; /* Large */
--radius-3xl: 2rem;   /* Hero */

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
--shadow-md: 0 4px 16px rgba(0,0,0,0.05);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.06);

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;

/* Layout */
.container: max-w-[1200px] mx-auto px-6;
.section: py-[120px];
.grid-3: 3 kolon, gap-6
```
