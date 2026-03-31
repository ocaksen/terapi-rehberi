# TerapiRehberi — Landing Page Wireframe

## Genel Prensipler

- Sayfa yukarıdan aşağıya **bir hikaye anlatır**
- Her bölüm bir öncekinin duygusal devamıdır
- Kullanıcı "nefes alarak" ilerler — hiçbir yerde sıkışmış hissetmez
- Beyaz alan (whitespace) tasarımın kendisidir

---

## SAYFA AKIŞI (Top → Bottom)

---

## BÖLÜM 1: HERO

### Konum
Sayfa en üstü, full viewport height (100svh)

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]                              [NAV: Hizmetler | Konya | Blog | Uzman Ol]          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     ┌──────────────────────────────────────┐   ┌─────────────┐  │
│     │                                      │   │             │  │
│     │  OVERLINE:                          │   │  GÖRSEL    │  │
│     │  "Türkiye'nin Psikolog Rehberi"     │   │  (Ilımlı,  │  │
│     │                                      │   │   sakin,   │  │
│     │  H1:                                 │   │   pozitif) │  │
│     │  "Ruhunuzu dinleyin,                │   │            │  │
│     │   güvenle başlayın"                 │   │            │  │
│     │                                      │   │            │  │
│     │  DESCRIPTION:                       │   │            │  │
│     │  "Konya'da lisanslı uzmanlarla     │   │            │  │
│     │   bireysel, çift ve aile terapisi  │   │            │  │
│     │   seansları."                       │   │            │  │
│     │                                      │   │            │  │
│     │  [CTA BUTTON]                       │   └─────────────┘  │
│     │  "Psikolog Bul"                     │                    │
│     │                                      │   ┌─────────────┐  │
│     │  + küçük güven metni:               │   │ DOĞRULAMA   │  │
│     │  "Lisanslı uzman • Kimlik onaylı"   │   │ BADGE       │  │
│     │                                      │   └─────────────┘  │
│     └──────────────────────────────────────┘                    │
│                                                                 │
│                    ↓ (ince scroll indicator)                    │
└─────────────────────────────────────────────────────────────────┘
```

### Hizalam
- Sol: Metin bloğu (max-width: 580px), sol kenar boşluğundan 60px içeride
- Sağ: Görsel kompozisyon (laptop/desktop'ta görünür, mobilde gizli)
- Dikey: İçerik dikeyde ortalanmış (center), altında scroll indicator

### Boşluk

```
┌────────────────────────────────────────────────┐
│ üst: 0 (header zaten var)                      │
├────────────────────────────────────────────────┤
│                                                │
│  between metin ve görsel: gap-16 (64px)       │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 120px (sonraki section ile mesafe)        │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Yumuşak gradient (beyaz → çok hafif krem)
- Dekoratif element: Yok veya çok minimal (ince çizgi, nokta)
- Görsel: İnsan yüzü içeren, doğal ışıklı fotoğraf
  - Konsept: "Huzur bulmuş kişi" — yüz ifadesi yumuşak, gülümseme var
  - Fotoğraf içinde: Konum badge (beyaz, ince border, pin icon)
- CTA butonunun altında: 2-3 küçük onay işareti (shield, check, star)

### Kullanıcının Hissi
- "Buradasın"
- "Güvendesin"
- "Doğru yere geldim"
- İlk 3 saniyede "psikolog bul" butonuna tıklamak istiyor

### Dikkat Edilecek
- Overline kısa ve net: 1 satır maks
- H1 tek mesaj verir, alt bölüm "güven" ile ilgili
- Açıklama 2 cümleyi geçmez
- Görsel karmaşık değil — 1 ana fotoğraf + 1-2 küçük badge
- Mobilde görsel gizlenir, metin tam genişlikte

---

## BÖLÜM 2: TRUST / GÜVEN UNSURLARI

### Konum
Hero section'ın hemen altında — horizontal marquee veya statik bar

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ 🛡️      │  │ ✓      │  │ ⭐      │  │ 📋      │          │
│  │ Lisanslı│  │ Kimlik  │  │ 4.9/5   │  │ Tüm      │          │
│  │ Uzman   │  │ Onaylı  │  │ Puan    │  │ Uzmanlar │          │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hizalam
- Yatayda: Eşit aralıklı (space-between veya space-around)
- Dikeyde: Ortalanmış
- Container: Tam genişlikte, küçük padding (py-6)

### Boşluk
```
┌────────────────────────────────────────────────┐
│ üst: 0 (Hero ile birleşir, overlap yok)        │
├────────────────────────────────────────────────┤
│                                                │
│  Her item arası: gap-12 (48px)                │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 80px (bir sonraki section ile)            │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Beyaz veya çok hafif tint
- Her item: İkon + kısa metin
- İkonlar: Aynı boyutta (24x24), tutarlı stil
- Form: Yatay çizgi veya divider (opsiyonel)

### Kullanıcının Hissi
- "Güvenilir olduklarını kanıtladılar"
- "Rahatlayabilirim"
- İlk güven engeli aşıldı

### Dikkat Edilecek
- 4 item max (daha fazlası güven yerine şüphe yaratır)
- Her metin 2-3 kelime
- Rakam varsa büyük göster (4.9/5)

---

## BÖLÜM 3: NASIL ÇALIŞIR

### Konum
Trust'ın altında, sayfa akışında ilk "bilgi" bölümü

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     OVERLINE: "Süreç"                                           │
│                                                                 │
│     H2: "3 adımda terapiye başlayın"                          │
│                                                                 │
│     ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│     │      1         │  │      2         │  │      3         │   │
│     │               │  │               │  │               │   │
│     │   [İKON]     │  │   [İKON]     │  │   [İKON]     │   │
│     │               │  │               │  │               │   │
│     │  Başlık      │  │  Başlık      │  │  Başlık      │   │
│     │  "Uzman      │  │  "Seans       │  │  "Kendinizi  │   │
│     │   Seçin"     │  │   Ayarlayın"  │  │   İyileştirin"│   │
│     │               │  │               │  │               │   │
│     │  Açıklama    │  │  Açıklama    │  │  Açıklama    │   │
│     │  1-2 cümle   │  │  1-2 cümle   │  │  1-2 cümle   │   │
│     │               │  │               │  │               │   │
│     │  ───────     │  │  ───────     │  │               │   │
│     │  (connector) │→│               │→│               │   │
│     └───────────────┘  └───────────────┘  └───────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hizalam
- 3 kart yatayda, eşit genişlikte (grid, 3 kolon)
- Kartlar: Sol hizalı metin içerik
- Kart içi: İkon üstte, başlık ortada, açıklama altta
- 1-2-3 numaraları: İkonun içinde veya sol üst köşede (circle badge)

### Boşluk
```
┌────────────────────────────────────────────────┐
│ üst: 100px                                    │
├────────────────────────────────────────────────┤
│                                                │
│  Section başlığı → açıklama: gap-4 (16px)    │
│  Açıklama → kart grid: gap-12 (48px)         │
│  Kartlar arası: gap-6 (24px)                  │
│  Kart içi padding: p-8 (32px)                 │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 100px                                     │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Gradient geçiş (bir önceki sectiondan yumuşak)
- Kart: Beyaz, yumuşak gölge, rounded-2xl
- İkon: Glassmorphism container içinde (blur + transparan bg)
- Numara: Küçük circle badge, brand rengi
- Bağlayıcı: İnce ok veya çizgi kartlar arasında (opsiyonel)

### Kullanıcının Hissi
- "Anladım, bu kadar basit"
- "Korkacak bir şey yok"
- "Hemen başlayabilirim"

### Dikkat Edilecek
- Her adım 1 cümlede özetlenebilir olmalı
- "Kolay" hissi — terapiyi karmaşık gösterme
- Kartlar eşit yükseklikte olmalı (içerik farklı olsa dahi)
- Mobilde: 3 kolon → 1 kolon (vertical stack)

---

## BÖLÜM 4: İSTATİSTİKLER

### Konum
"Nasıl Çalışır" section'ın altında

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     H2: "Sayılarla TerapiRehberi"                              │
│                                                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │                 │ │                 │ │                 │   │
│  │    [İKON]      │ │    [İKON]      │ │    [İKON]      │   │
│  │                 │ │                 │ │                 │   │
│  │    2,400+      │ │     98%         │ │     50+        │   │
│  │                 │ │                 │ │                 │   │
│  │  Aileye         │ │  Memnuniyet    │ │  Uzman          │   │
│  │  Ulaştık        │ │  Oranı          │ │  Kadrosu        │   │
│  │                 │ │                 │ │                 │   │
│  │  (alt mesaj     │ │  (alt mesaj     │ │  (alt mesaj     │   │
│  │   opsiyonel)    │ │   opsiyonel)    │ │   opsiyonel)    │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hizalam
- Grid: 3 kolon, eşit
- Kart: İçerik dikeyde ortalanmış, metin yatayda ortalanmış
- İkon: Kartın üst bölümünde, tek başına
- Rakam: Büyük, bold, ortada
- Alt metin: Rakamın hemen altında, normal weight

### Boşluk
```
┌────────────────────────────────────────────────┐
│ üst: 100px                                     │
├────────────────────────────────────────────────┤
│                                                │
│  Section başlığı → grid: gap-12 (48px)        │
│  Kartlar arası: gap-6 (24px)                   │
│  Kart içi padding: p-10 (40px)                 │
│  İkon → rakam: gap-4 (16px)                    │
│  Rakam → metin: gap-2 (8px)                    │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 100px                                     │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Hafif farklı (surface-raised veya subtle gradient)
- Kart: Beyaz, güçlü gölge yok (shadow-sm yeterli)
- Rakam: 48px, bold, tracking-tight
- İkon: Farklı icon her kartta, glassmorphism wrapper
- İsteğe bağlı: Rakamların altında 1 cümlelik insan hikayesi

### Kullanıcının Hissi
- "Ciddi ve profesyonel bir ekip"
- "Çok kişi güvenmiş ve faydalanmış"
- "Ben de bu istatistiklere katılabilirim"

### Dikkat Edilecek
- Rakamlar büyük AMA abartısız (4rem max, 3rem ideal)
- İkon + rakam + metin üçlüsü eksik olmasın
- 3 stat max — daha fazlası değer kaybı
- Sayılar gerçek olmalı (placeholder değil)

---

## BÖLÜM 5: TESTLER / ÖZ-FARKINDALIK

### Konum
İstatistikler section'ın altında — kullanıcıyı etkileşime davet eden ilk bölüm

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     OVERLINE: "Kendinizi Tanıyın"                              │
│                                                                 │
│     H2: "Hangi terapi türü size uygun?"                        │
│                                                                 │
│     AÇIKLAMA:                                                  │
│     "3 kısa soru ile size en uygun yaklaşımı keşfedin"         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │   ┌─────────┐   ┌─────────┐   ┌─────────┐               │   │
│  │   │  KART   │   │  KART   │   │  KART   │   ← veya    │   │
│  │   │  (test) │   │  (test) │   │  (test) │     slider   │   │
│  │   └─────────┘   └─────────┘   └─────────┘               │   │
│  │                                                         │   │
│  │   [TESTE BAŞLA] butonu (accent renk)                    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Alternatif Yapı (Eğer interaktif test yerine kartlar tercih edilirse):

```
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │               │  │               │  │               │       │
│  │   [İKON]     │  │   [İKON]     │  │   [İKON]     │       │
│  │               │  │               │  │               │       │
│  │  "Kaygı      │  │  "İlişki     │  │  "Ergen      │       │
│  │   Yaşıyorum" │  │   Sorunu"    │  │   Desteği"   │       │
│  │               │  │               │  │               │       │
│  │  → Keşfet    │  │  → Keşfet    │  │  → Keşfet    │       │
│  │               │  │               │  │               │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
```

### Hizalam
- Kapsayıcı container: Max 800px, ortalanmış (daha dar olabilir)
- Kartlar: Yatayda 3 kolon (eşit)
- İçerik: Kart içi sol hizalı, buton kartın altında ortalanmış

### Boşluk
```
┌────────────────────────────────────────────────┐
│ üst: 100px                                     │
├────────────────────────────────────────────────┤
│                                                │
│  Section başlığı → açıklama: gap-3 (12px)      │
│  Açıklama → kart grid: gap-8 (32px)            │
│  Kartlar arası: gap-4 (16px)                   │
│  Kart içi padding: p-6 (24px)                 │
│  Kart → buton: mt-auto (kendi içinde)           │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 100px                                     │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Yumuşak geçiş (gradient ile önceki sectiondan)
- Kart: Beyaz, hafif gölge, rounded-xl
- Hover: Kart yukarı kayar (5px), gölge artar
- Test kartları: Farklı accent renkler (her kart farklı tonda)
- CTA: Accent turuncu (brand değil)

### Kullanıcının Hissi
- "Beni tanıyorlar"
- "Kendim hakkında düşünmek güzel"
- "Bir şey keşfedebilirim"

### Dikkat Edilecek
- Kullanıcı burada **düşünmeye başlar**, henüz karar vermez
- Kartlar "bakış açısı" verir, soru sorar
- Test varsa: 3 soru max, her biri 10 saniyede cevaplanabilir
- Sonuç: "Size uygun terapi: Bireysel Terapi" gibi net bir öneri

---

## BÖLÜM 6: UZMANLAR

### Konum
Öz-farkındalık section'ın altında — sosyal kanıtın en güçlü olduğu bölüm

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     OVERLINE: "Uzman Kadromuz"                                  │
│                                                                 │
│     H2: "Güvenilir, lisanslı psikologlar"                     │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │                 │  │                 │  │                 │   │
│  │    [FOTO]      │  │    [FOTO]      │  │    [FOTO]      │   │
│  │   ┌─────────┐  │  │   ┌─────────┐  │  │   ┌─────────┐  │   │
│  │   │ yuvarlak│  │  │   │ yuvarlak│  │  │   │ yuvarlak│  │   │
│  │   └─────────┘  │  │   └─────────┘  │  │   └─────────┘  │   │
│  │                 │  │                 │  │                 │   │
│  │  Uzm. Psk.     │  │  Uzm. Psk.     │  │  Uzm. Psk.     │   │
│  │  [İsim]        │  │  [İsim]        │  │  [İsim]        │   │
│  │                 │  │                 │  │                 │   │
│  │  [Uzmanlık]    │  │  [Uzmanlık]    │  │  [Uzmanlık]    │   │
│  │  [İlçe, Konya] │  │  [İlçe, Konya] │  │  [İlçe, Konya] │   │
│  │                 │  │                 │  │                 │   │
│  │  ★ 4.9  (8yıl) │  │  ★ 4.8  (12yıl)│  │  ★ 5.0  (6yıl) │   │
│  │                 │  │                 │  │                 │   │
│  │  [Profili Gör →]│  │  [Profili Gör →]│  │  [Profili Gör →]│   │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
│                                                                 │
│              [Tüm Uzmanları Gör →]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hizalam
- Grid: 3 kolon (desktop), 2 kolon (tablet), 1 kolon (mobil)
- Kart: İçerik dikeyde yukarı hizalı
- Fotoğraf: Kartın üst bölümünde, yuvarlak (circle) veya rounded-xl
- Bilgiler: Fotoğrafın altında, sol hizalı
- Puan + deneyim: İsim satırının altında veya yanında

### Boşluk
```
┌────────────────────────────────────────────────┐
│ üst: 100px                                     │
├────────────────────────────────────────────────┤
│                                                │
│  Section başlığı → grid: gap-10 (40px)         │
│  Kartlar arası: gap-6 (24px)                   │
│  Kart içi padding: p-6 (24px)                  │
│  Foto → bilgiler: gap-4 (16px)                 │
│  Kart → CTA: mt-auto (alta yaslama)            │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 100px                                     │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Gradient veya beyaz
- Kart: Beyaz, subtle border, shadow-sm
- Fotoğraf: Yuvarlak (rounded-full) veya soft square (rounded-2xl)
- Uzmanlık alanı: Badge olarak (brand-50 arka plan)
- Konum: İnce badge, pin icon + "Meram, Konya"
- Puan: Yıldız icon + rakam
- Deneyim: Parantez içinde "8 yıl" gibi

### Kullanıcının Hissi
- "Gerçek insanlar bunlar"
- "İsim biliyorum, güveniyorum"
- "Hangisi bana uygun acaba?"

### Dikkat Edilecek
- 3 öne çıkan uzman (featured) — rastgele değil, veri tabanından çekilecek
- Her uzman: Fotoğraf, isim, unvan, uzmanlık alanı, konum, puan
- "Tümünü gör" CTA'sı: Ghost button, sayfanın altında ortalanmış
- Mobilde: Yatay scroll değil, dikey liste

---

## BÖLÜM 7: CTA BÖLÜMÜ

### Konum
Uzmanlar section'ın altında — kullanıcıyı harekete geçiren son bölüm

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │              [BACKGROUND: SAKIN GÖRSE L]               │   │
│  │                                                         │   │
│  │         H2: "Hazır mısınız?"                           │   │
│  │                                                         │   │
│  │         AÇIKLAMA:                                      │   │
│  │         "İlk adımı atın, gerisini bize bırakın.        │   │
│  │          Yanınızdayız."                                │   │
│  │                                                         │   │
│  │         ┌─────────────────┐  ┌─────────────────┐       │   │
│  │         │   RANDEVU AL    │  │ UZMANLARI GÖR   │       │   │
│  │         │   (Primary)     │  │   (Secondary)   │       │   │
│  │         └─────────────────┘  └─────────────────┘       │   │
│  │                                                         │   │
│  │         + küçük güven metni:                           │   │
│  │         "Ücretsiz ön görüşme • 15 dakika"               │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hizalam
- Container: Tam genişlikte, max 900px, ortalanmış
- İçerik: Yatayda ve dikeyde ortalanmış
- İki buton: Yan yana (desktop), alt alta (mobil)
- Güven metni: Butonların altında, ortalanmış

### Boşluk
```
┌────────────────────────────────────────────────┐
│ üst: 100px                                     │
├────────────────────────────────────────────────┤
│                                                │
│  İçerik bloğu padding: py-20 (80px)             │
│  H2 → açıklama: gap-4 (16px)                   │
│  Açıklama → butonlar: gap-8 (32px)              │
│  Butonlar arası: gap-4 (16px)                   │
│  Butonlar → güven metni: gap-4 (16px)          │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 100px (Footer ile birleşir)                │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Tamamen farklı — soft gradient veya abstract shape
  - Seçenek A: Yumuşak illustration (dalga, yuvarlak formlar)
  - Seçenek B: Konya'dan sakin bir fotoğraf (tarihi doku, cuma mescidi)
  - Seçenek C: Gradient: brand-50 → beyaz
- Primary CTA: Accent turuncu (brand değil)
- Secondary CTA: Ghost/outline button
- Container: rounded-3xl veya hiç rounded yok (dramatik geçiş)

### Kullanıcının Hissi
- "Şimdi hazırım"
- "Bir engel kalmadı"
- "Başlıyorum"

### Dikkat Edilecek
- Duygu: Sıcak ama kararlı — "acele yok ama karar verdim"
- İki yol sun: Hemen randevu al veya daha fazla bilgi al
- "Ücretsiz ön görüşme" kritik — ilk adımın cesaretini kıran engeli kaldırır
- Primary CTA: Accent turuncu, büyük, dikkat çekici
- Bu bölüm kesinlikle "soğuk" hissettirmemeli

---

## BÖLÜM 8: FAQ

### Konum
CTA section'ın altında, footer'ın üstünde

### İçerik

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     OVERLINE: "Sık Sorulan Sorular"                            │
│                                                                 │
│     H2: "Merak ettikleriniz"                                   │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐   │
│     │  ▸  Soru 1: "Terapiye ilk kez gidicem, ne         │   │
│     │         beklemeliyim?"                              │   │
│     │         ─────────────────────────────────           │   │
│     │         [CEVAP: Accordion açılır]                  │   │
│     └─────────────────────────────────────────────────────┘   │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐   │
│     │  ▸  Soru 2: "Online terapi etkili mi?"             │   │
│     └─────────────────────────────────────────────────────┘   │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐   │
│     │  ▸  Soru 3: "Seans ücretleri ne kadar?"           │   │
│     └─────────────────────────────────────────────────────┘   │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐   │
│     │  ▸  Soru 4: "Konya'da yüz yüze görüşebilir      │   │
│     │         miyim?"                                     │   │
│     └─────────────────────────────────────────────────────┘   │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐   │
│     │  ▸  Soru 5: "Uzman değişikliği yapabilir       │   │
│     │         miyim?"                                     │   │
│     └─────────────────────────────────────────────────────┘   │
│                                                                 │
│         [Hâlâ sorunuz mu var? Bize ulaşın →]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Hizalam
- Container: Max 800px, ortalanmış
- Sorular: Dikeyde alt alta, tam genişlikte
- Soru satırı: Sol hizalı, sağda açılır ikon (chevron)
- Cevap: Accordion olarak gizli, tıklanınca açılır

### Boşluk
```
┌────────────────────────────────────────────────┐
│ üst: 100px                                     │
├────────────────────────────────────────────────┤
│                                                │
│  Section başlığı → soru listesi: gap-10 (40px)│
│  Her soru arası: gap-2 (8px)                   │
│  Soru item padding: py-4 (16px)                │
│  Soru → cevap (açıkken): pt-4 (16px)           │
│  Soru listesi → iletişim CTA: gap-8 (32px)     │
│                                                │
├────────────────────────────────────────────────┤
│ alt: 80px                                      │
└────────────────────────────────────────────────┘
```

### Görsel Öğeler
- Arka plan: Önceki sectiondan farklı (beyaz veya hafif kontrast)
- Soru: Hafif border-bottom veya soru kartları (tercihen border-bottom)
- Chevron: Sağda, açılınca döner (180 derece)
- Cevap: Text-body, secondary color, padding ile
- İletişim CTA: Ghost button, son sorunun altında

### Kullanıcının Hissi
- "Sorularım cevaplanıyor"
- "Karanlıkta kalmadım"
- "Hâlâ takıldığım bir şey varsa ulaşabilirim"

### Dikkat Edilecek
- 5 soru ideal (daha azı yetersiz, daha fazlası sıkıcı)
- En çok merak edilen sorular üstte (terapi süreci, maliyet, online vs yüz yüze)
- Accordion animasyonu yumuşak olmalı (height + opacity)
- Son soru genellikle "diğer sorular için ulaşın" olmalı

---

## ÖZET: SECTION SIRALAMASI VE DUYGUSAL AKIŞ

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. HERO           → "Buradasın, güvendesin"                   │
│                     (Keşfetme, ilk adımı atma isteği)          │
│                                                                 │
│  2. TRUST          → "Güvenilir olduklarını kanıtladılar"      │
│                     (Endişe azalır)                            │
│                                                                 │
│  3. NASIL ÇALIŞIR  → "Anladım, bu kadar basit"                │
│                     (Korku azalır)                              │
│                                                                 │
│  4. İSTATİSTİKLER  → "Çok kişi güvenmiş"                      │
│                     (Sosyal kanıt güçlenir)                   │
│                                                                 │
│  5. TESTLER        → "Beni tanıyorlar"                         │
│                     (Kişiselleşme, ilgi)                       │
│                                                                 │
│  6. UZMANLAR       → "Gerçek insanlar, güveniyorum"            │
│                     (Bağ kurma, seçim yapma)                    │
│                                                                 │
│  7. CTA            → "Hazırım, başlıyorum"                    │
│                     (Karar, harekete geçme)                    │
│                                                                 │
│  8. FAQ            → "Tüm sorularım cevaplandı"               │
│                     (Son engeller kalkar)                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## GENEL BOŞLUK HARİTASI

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  HEADER (fixed, height: 64px)                                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 1: Hero                   padding-top: 80px           │
│                                   padding-bottom: 120px         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 2: Trust                    padding-top: 0            │
│                                   padding-bottom: 80px          │
│                                   (Hero ile birleşik his)       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 3: Nasıl Çalışır         padding-top: 100px           │
│                                   padding-bottom: 100px         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 4: İstatistikler         padding-top: 100px           │
│                                   padding-bottom: 100px         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 5: Testler               padding-top: 100px           │
│                                   padding-bottom: 100px         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 6: Uzmanlar              padding-top: 100px           │
│                                   padding-bottom: 100px         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 7: CTA                    padding-top: 100px           │
│                                   padding-bottom: 100px         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION 8: FAQ                    padding-top: 100px          │
│                                   padding-bottom: 80px          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FOOTER                                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## MOBIL UYUMLULUK NOTLARI

| Element | Desktop | Mobil |
|---------|---------|-------|
| Hero layout | 2 kolon (metin + görsel) | Tek kolon (metin, görsel gizli) |
| Trust items | Yatay 4'lü | Yatay scroll veya 2x2 grid |
| How it works | 3 kolon kart | 1 kolon (dikey stack) |
| İstatistikler | 3 kolon | 1 kolon |
| Testler | 3 kolon kart | 1 kolon veya yatay scroll |
| Uzmanlar | 3 kolon | 1 kolon (dikey liste) |
| CTA buttons | Yan yana | Alt alta |
| FAQ | Tam genişlik | Tam genişlik |
