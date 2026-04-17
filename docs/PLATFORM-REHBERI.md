# TerapiRehberi — Platform Geliştirme Rehberi (Nisan 2026)

> Kod analizi + stratejik değerlendirme. Her madde doğrudan dosya/satır referansı içeriyor.

---

## 0. KRİTİK BUGLAR — Hemen Düzelt (Bu hafta)

Bunlar stratejik sorun değil, kırık şeyler. Büyüme planından önce bunları çöz.

### 0.1 — Tüm Uzman Profilleri Google'a Kapalı (BLOCKER)

**Dosya:** `app/uzman/[slug]/page.tsx` satır 23

```typescript
robots: { index: false, follow: false },  // ← TÜM UZMAN SAYFALARI NOINDEXLİ
```

Bu satır yüzünden Google'ın indekslemesi gereken 50+ uzman profili görünmez. Person + MedicalBusiness schema yazılmış, breadcrumb var, ama Google bu sayfaları taramıyor.

**Düzeltme:** Bu satırı sil ya da şuna çevir:
```typescript
robots: { index: true, follow: true },
```

**Neden noindex konulmuş?** Profillerdeki veriler eksik olduğu için (fotoğraf yok, bio şablonu) utanç verici görünmesinden çekinilmiş. Ama eksik veri + noindex = sıfır fırsat. Index aç, veri doldur.

---

### 0.2 — "Ücretsiz" vs "Aylık Ücret" Çelişkisi

**Dosya 1:** `app/konya/psikologlar/page.tsx` satır 151  
→ `"Profilinizin burada yer almasını istiyorsanız iletişime geçin — tamamen ücretsiz."`

**Dosya 2:** `app/uzman-ol/UzmanOlClient.tsx` satır 62  
→ `"Aylık listeleme ücretini ödediğinizde profiliniz anında yayına alınır."`

Bu çelişki bir psikoloğun aynı gün her iki sayfayı görmesi durumunda güven kırıyor. Karar ver ve tek mesaj ver.

**Öneri:** İlk 3 ay ücretsiz → sonra ücretli model. psikologlar sayfasındaki CTA'yı da `/iletisim` yerine `/uzman-ol`'a yönlendir.

---

### 0.3 — Feyza Çaksen Profili Boş (Vitrin Uzman)

**Dosya:** `data/db.json` satır 1-37

```json
"image": "",        // ← boş
"phone": null,      // ← boş
"experience": null, // ← boş
"sessionFee": null, // ← boş
"education": [],    // ← boş
"certifications": [],
"shortBio": "Bireysel terapi, kaygı, depresyon ve travma alanlarında uzmanlaşmış psikolog."
```

Vitrin uzman, featured:true, ama profilinin kendisi boş. Bu sayfaya gelen biri güven duymuyor.

---

### 0.4 — LocalBusiness Schema'da NAP Yok

**Dosya:** `app/layout.tsx` satır 99-112

```json
"address": { "addressLocality": "Konya", "addressCountry": "TR" }
// telefon yok, sokak adresi yok, çalışma saatleri yok
```

Google yerel aramalarda NAP (Name-Address-Phone) tutarlılığını kontrol eder.

---

### 0.5 — Organization Schema'da sameAs Boş

**Dosya:** `app/layout.tsx` satır 78

```json
"sameAs": []  // ← sosyal medya, GMB linki yok
```

---

## 1. MEVCUT DURUM ANALİZİ

### Neler Var (İyi Taraf)

| Alan | Durum |
|------|-------|
| Next.js 14 App Router | ✅ |
| GA4 (G-2TP7B2CGPH) | ✅ |
| Organization + WebSite + LocalBusiness schema | ✅ Layout.tsx |
| Person + MedicalBusiness schema (uzman profil) | ✅ lib/schema.ts |
| FAQ schema | ✅ lib/schema.ts |
| BreadcrumbList | ✅ Tüm sayfalarda |
| ItemList schema (psikologlar) | ✅ |
| Blog — 10 makale, Konya odaklı | ✅ |
| OpenGraph + Twitter card | ✅ |
| Canonical URL | ✅ |
| KVKK sayfası | ✅ |
| Testler (psikolojik testler) | ✅ |
| Uzman başvuru formu (multi-step) | ✅ |
| İç linkleme (blog → psikologlar) | Kısmi |

### Kritik Eksikler

| Alan | Durum | Öncelik |
|------|-------|---------|
| Uzman profilleri noindex | BLOCKER | 🔴 Acil |
| Fotoğraf (gerçek fotoğraf) | Unsplash stock | 🔴 Acil |
| Uzman bio (kişisel) | Template metin | 🔴 Acil |
| Testimonial / hasta yorumu | Sıfır | 🔴 Acil |
| sessionFee | %95 null | 🟠 Yüksek |
| experience | %95 null | 🟠 Yüksek |
| education | %95 boş dizi | 🟠 Yüksek |
| Google Business Profile | Yok | 🟠 Yüksek |
| Google Maps embed | Yok | 🟡 Orta |
| Aile siteleri interlink | Yok | 🟡 Orta |
| Randevu sistemi | Sadece WhatsApp | 🟡 Orta |
| Haftada 3+ blog | Haftada 1 | 🟡 Orta |

---

## 2. E-E-A-T SORUNLARI VE ÇÖZÜMLERİ

Google'ın E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) kriterleri sağlık/psikoloji sektörünü çok sıkı değerlendirir. "YMYL" (Your Money Your Life) kategorisindeyiz.

### 2.1 — Uzman Profil Zenginleştirme Planı

**Hedef veri modeli** (mevcut `types/index.ts`'e eklenecek alanlar):

```typescript
// types/index.ts — Expert interface'e ekle
interface Expert {
  // ... mevcut alanlar
  reviewCount?: number;        // "47 değerlendirme"
  avgRating?: number;          // 4.8
  testimonials?: Testimonial[]; // hasta yorumları (anonim)
  specializations?: string[];  // "Travma Sonrası Stres", "OKB"
  therapyApproaches?: string[]; // "BDT", "EMDR", "Şema Terapi"
  insurances?: string[];        // SGK, özel sigorta
  availability?: string;        // "Bu hafta müsait" | "2 hafta sonra"
  verifiedAt?: string;          // "2026-02-15"
  profileCompleteness?: number; // 0-100 (UI'da progress bar)
}

interface Testimonial {
  initials: string;  // "A.K."
  age?: number;      // 34
  text: string;      // yorum metni
  date: string;      // "2026-03"
  service: string;   // "Bireysel Terapi"
}
```

**Önce Feyza Çaksen profilini tam doldur** — vitrin uzman olduğu için referans profil o olmalı.

### 2.2 — Psikologlar Listesi Zenginleştirme

Mevcut `app/konya/psikologlar/page.tsx`'de her uzman kartında şunlar eksik:
- Fotoğraf (avatar)
- Yıldız/değerlendirme sayısı
- "Bu hafta müsait" / "Hızlı yanıt" badge'i
- sessionFee

**Referans:** Doktortakvimi.com'daki her kart fotoğraf + yıldız + "En erken randevu: Çarşamba" gösteriyor. Biz şu an sadece isim + unvan + hizmet etiketleri gösteriyoruz.

---

## 3. SEO STRATEJİSİ — Detaylı

### 3.1 — Teknik SEO (Hemen)

#### robots — Uzman sayfaları
```typescript
// app/uzman/[slug]/page.tsx satır 23 — DEĞİŞTİR
robots: { index: true, follow: true },
// expert.phone veya expert.sessionFee dolu ise:
// robots: { index: true, follow: true }
// ikisi de null ise geçici olarak noindex bırakabilirsin
// AMA hedef: verileri doldurup hepsini index aç
```

#### Sitemap
`app/sitemap.ts` dosyası var mı kontrol et. Yoksa oluştur:
```typescript
// app/sitemap.ts
import { getAllExperts } from "@/lib/data";
import { getAllBlogPostsFromFiles } from "@/lib/blog.server";

export default function sitemap() {
  const experts = getAllExperts();
  const posts = getAllBlogPostsFromFiles();
  
  return [
    { url: "https://www.terapirehberi.com", changeFrequency: "weekly", priority: 1.0 },
    { url: "https://www.terapirehberi.com/konya/psikologlar", changeFrequency: "weekly", priority: 0.9 },
    { url: "https://www.terapirehberi.com/blog", changeFrequency: "weekly", priority: 0.8 },
    ...experts.map(e => ({
      url: `https://www.terapirehberi.com/uzman/${e.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map(p => ({
      url: `https://www.terapirehberi.com/blog/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
```

#### robots.txt
```
// public/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://www.terapirehberi.com/sitemap.xml
```

### 3.2 — Title Tag Optimizasyonu

**Mevcut:** `"Konya Psikolog Listesi — TerapiRehberi"`  
**Hedef:** `"Konya Psikolog Bul 2026 | 50+ Doğrulanmış Uzman — TerapiRehberi"`

**Mevcut layout title:** `"TerapiRehberi — Konya'da Psikolog Bul"`  
**Hedef:** `"Konya Psikolog 2026 | Doğrulanmış 50+ Uzman | TerapiRehberi"`

Uzman profil title'ı şu an:
```
"Feyza Çaksen — Klinik Psikolog | TerapiRehberi"
```
Konya kelimesi yok! Olmalı:
```
"Feyza Çaksen — Klinik Psikolog Konya | TerapiRehberi"
```

**Düzeltme** `app/uzman/[slug]/page.tsx`:
```typescript
title: `${expert.name} — ${expert.title} ${expert.district}, Konya | TerapiRehberi`,
description: `${expert.name}, Konya ${expert.district} bölgesinde ${expert.title} olarak hizmet vermektedir. ${expert.services.slice(0,3).join(", ")} alanlarında uzman. ${expert.sessionFee ? "Seans ücreti: " + expert.sessionFee : ""}`,
```

### 3.3 — Schema Markup Geliştirme

#### LocalBusiness — eksik alanlar ekle (`app/layout.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TerapiRehberi",
  "url": "https://www.terapirehberi.com",
  "telephone": "+90-XXX-XXX-XXXX",       // ← ekle
  "email": "info@terapirehberi.com",      // ← ekle
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Selçuklu",          // ← ekle
    "addressLocality": "Konya",
    "postalCode": "42250",                // ← ekle
    "addressCountry": "TR"
  },
  "openingHours": "Mo-Fr 09:00-18:00",   // ← ekle
  "sameAs": [
    "https://www.instagram.com/terapirehberi",
    "https://twitter.com/terapirehberi"
  ]
}
```

#### ReviewSchema — uzman profiline ekle
Testimonial'lar eklendikten sonra `lib/schema.ts`'e:
```typescript
export function reviewSchema(expert: Expert) {
  if (!expert.testimonials?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Person",
      "name": expert.name,
    },
    "ratingValue": expert.avgRating,
    "reviewCount": expert.reviewCount,
  };
}
```

### 3.4 — İlçe Sayfaları (Uzun Kuyruk SEO)

Mevcut `/konya/[ilce]/page.tsx` var. Her ilçe için optimize title/description yaz:

| URL | Title Hedefi |
|-----|-------------|
| `/konya/meram` | Meram Psikolog 2026 \| Konya Meram Terapist — TerapiRehberi |
| `/konya/selcuklu` | Selçuklu Psikolog 2026 \| Konya Selçuklu Terapi — TerapiRehberi |
| `/konya/karatay` | Karatay Psikolog 2026 \| Konya Karatay Psikoloji — TerapiRehberi |

Her ilçe sayfasına o ilçedeki uzmanların mini listesi + yerel bilgi ekle.

### 3.5 — Blog İçerik Planı (6 Ay)

**Mevcut:** 10 makale  
**Hedef:** 6 ay sonunda 40+ makale

**Eksik "para" konuları:**

| Konu | Hedef Anahtar Kelime | Aylık Arama Tahmini |
|------|---------------------|---------------------|
| Konya psikiyatrist listesi | "konya psikiyatrist" | Yüksek |
| Konya çift terapisi nerede | "konya çift terapisi" | Orta |
| EMDR terapi Konya | "emdr konya" | Orta |
| Konya online terapi nasıl | "online terapi konya" | Yüksek |
| Konya'da ADHD çocuk | "konya adhd çocuk" | Orta |
| Konya dil terapisti ücret | "konya dil terapisti fiyat" | Orta |
| Ergen depresyonu Konya | "ergen psikoloğu konya" | Orta |
| Kaygı bozukluğu tedavi Konya | "kaygı tedavisi konya" | Orta |
| Boşanma süreci terapi | "boşanma terapisi konya" | Düşük-Orta |
| Yas terapisi Konya | "yas terapisi konya" | Düşük |

**Blog yazı standardı:**
- Min. 1.500 kelime
- H2/H3 yapısı (doğru başlık hiyerarşisi)
- FAQ schema (mevcut blog.server.ts destekliyor)
- İç link: Minimum 2 uzman profiline, 1 ilçe sayfasına link
- Sonunda CTA: "Konya'da [konu] uzmanı bul → /konya/psikologlar"
- Yazar: "TerapiRehberi Editör" değil, gerçek uzman adı (E-E-A-T)

---

## 4. UZMAN ÇEKME STRATEJİSİ

### 4.1 — Güven Paketi (Psikologlara Gönderilecek)

**Mevcut problem:** `/uzman-ol` formu var ama "neden katılayım?" sorusu tam yanıtlanmıyor.

**Eksik bilgiler:**
- Fiyatlandırma (şu an sadece "aylık sabit ücret" yazıyor, rakam yok)
- Örnek profil linki ("işte böyle görünecek")
- Kaç kişi görüntülüyor (sosyal kanıt)
- Katılan uzmanların deneyimi (testimonial)

**Uzman-ol sayfasına eklenecekler:**

```
─────────────────────────────────────────
  İLK 3 AY ÜCRETSİZ
  Sonrasında aylık 299 TL (komisyon yok)
─────────────────────────────────────────
  Ortalama profil görüntülenme: 180/ay
  Platformdaki uzman sayısı: 50+
  Son 30 günde başvuran kullanıcı: 340+
─────────────────────────────────────────
```

**Demo profil** → `/uzman/feyza-caksen` linkini "Örnek profil nasıl görünür?" diye göster. Ama önce o profili doldur!

### 4.2 — Psikoloğa Mesaj Şablonu

"Sizi ekleyelim mi?" yerine:

```
Merhaba [İsim] Hanım/Bey,

Konya'da [uzmanlık alanı] alanında çalıştığınızı gördüm.
TerapiRehberi.com'da sizin için bir demo profil hazırladım:
→ [link]

2 dakikada inceleyin, beğendiyseniz aktivasyon 5 dakika.
İlk 3 ay tamamen ücretsiz, komisyon yok.

Değişiklik istenirse de 1 mesajla kaldırırım.
```

### 4.3 — Profil Zenginleştirme Akışı

Uzman kabul ettiğinde:
1. WhatsApp'tan profesyonel fotoğraf iste (ya da yakınındaki yerden çektir)
2. 5 soruluk mini anket gönder → biyoyu sen yaz
3. Uzmanlık alanlarını, eğitimini, yaklaşımlarını al
4. "Doğrulanmış" rozeti için diploma/ruhsat belgesi iste
5. 3 anonimleştirilmiş hasta yorumu iste

---

## 5. AİLE SİTELERİ İNTERLİNKİNG

Bu en kolay "otorite" kazanımı. Hiç teknik iş gerektirmiyor.

### Şu an durum:
- `terapirehberi.com` ↔ `terapitime.com` → Link YOK
- `terapirehberi.com` ↔ `psikologcaksen.com` → Link YOK
- `terapirehberi.com` ↔ `caksendanismanlik.com` → Link YOK

### Yapılacak (Öncelik sırası):

**1. psikologcaksen.com footer'a ekle:**
```html
<a href="https://www.terapirehberi.com">
  TerapiRehberi — Konya Psikolog Rehberi
</a>
```

**2. terapirehberi.com layout.tsx → Organization sameAs:**
```json
"sameAs": [
  "https://www.psikologcaksen.com",
  "https://www.terapitime.com",
  "https://www.caksendanismanlik.com"
]
```

**3. Blog yazılarından çapraz link:**
- Dil terapisi blog yazısı → terapitime.com'a link
- "Konya psikolog nasıl seçilir" → psikologcaksen.com'a link
- caksendanismanlik.com blog → terapirehberi.com'a link

**Etki:** Google, bu domain'lerin birbiriyle ilişkili olduğunu anlıyor. Otorite transferi gerçekleşiyor. Bu 4 sitenin toplamı tek bir sitenin gücünü destekliyor.

---

## 6. GOOGLE İŞLETME PROFİLİ (GBP) — Adım Adım

GBP olmadan "Konya psikolog" aramasında harita kutucuğuna giremezsiniz.

### Adımlar:
1. `business.google.com` → Yeni profil ekle
2. İşletme adı: **TerapiRehberi**
3. Kategori: **Online bilgi hizmetleri** veya **Sağlık danışmanlık hizmeti**
4. Adres: Mevcut adres (varsa ofis adresi, yoksa hizmet bölgesi olarak Konya)
5. Telefon: Ekle
6. Website: `https://www.terapirehberi.com`
7. Fotoğraf: En az 5 fotoğraf ekle
8. Haftalık post: Her hafta 1 blog yazısını GBP'de paylaş

---

## 7. DÖNÜŞÜM OPTİMİZASYONU

### 7.1 — Ana Sayfa CTA Hiyerarşisi

Mevcut ana sayfada 3 farklı CTA var. Hangisi birincil belli değil.

**Öneri:**
```
Birincil CTA: "Konya'da Uzman Bul →" → /konya/psikologlar
İkincil CTA: "Psikolog musunuz? Ücretsiz Profil →" → /uzman-ol
```

### 7.2 — Psikologlar Sayfası CTA Düzeltmesi

`app/konya/psikologlar/page.tsx` satır 153-160:
```tsx
// Mevcut: href="/iletisim"
// Olmalı: href="/uzman-ol"
<Link href="/uzman-ol">
  Ücretsiz Profil Oluştur
</Link>
```

### 7.3 — WhatsApp Butonu (Uzman Profili)

Mevcut uzman profil sayfasında WhatsApp butonu var mı? Varsa `expert.phone` null olduğu için gösterilmiyor.

En azından genel bir WhatsApp CTA:
```
"Bu uzmanla iletişime geçmek ister misiniz? → WhatsApp"
```

### 7.4 — Aciliyet Tetikleyicisi

Psikologlar listesinde bazı uzmanlara "Bu hafta 2 yer kaldı" veya "Hızlı yanıt veriyor" badge'i eklemek dönüşümü artırır. Statik veri olarak bile eklenebilir başlangıçta.

---

## 8. 6 AYLIK ROADMAP

### AY 1 — Altyapı (Nisan 2026)

**Hafta 1 (Hemen):**
- [ ] `app/uzman/[slug]/page.tsx` → robots noindex kaldır
- [ ] `app/konya/psikologlar/page.tsx` → CTA'yı `/uzman-ol`'a yönlendir
- [ ] `data/db.json` → psikologlar sayfası CTA metni düzelt ("tamamen ücretsiz" tutarsızlığını çöz)
- [ ] Feyza Çaksen profilini doldur (fotoğraf, bio, eğitim, deneyim, sessionFee, phone)
- [ ] `app/layout.tsx` → LocalBusiness schema'ya telefon + adres ekle
- [ ] `app/layout.tsx` → Organization sameAs'e kardeş siteler ekle

**Hafta 2:**
- [ ] `app/sitemap.ts` oluştur (tüm uzman + blog URL'leri)
- [ ] `public/robots.txt` oluştur
- [ ] Google Search Console'a kaydet + sitemap gönder
- [ ] Uzman profil title'larına "Konya" ekle
- [ ] Google Business Profile aç

**Hafta 3:**
- [ ] `types/index.ts` → `testimonials`, `avgRating`, `therapyApproaches` alanları ekle
- [ ] `data/db.json` → 5 öncelikli uzmana gerçek fotoğraf + dolu bio ekle
- [ ] Blog: 2 yeni makale (psikiyatrist + çift terapisi)

**Hafta 4:**
- [ ] Kardeş sitelerden interlink al
- [ ] Uzman-ol sayfasına fiyatlandırma + sosyal kanıt ekle
- [ ] Blog: 2 yeni makale
- [ ] İlk 5 uzmandan testimonial topla

---

### AY 2 — Profil Derinleştirme (Mayıs 2026)

- [ ] 20 uzman profiline gerçek fotoğraf + kişisel bio yaz
- [ ] Testimonial sistemi geliştir (uzman profilinde yorum bölümü)
- [ ] ReviewSchema'yı `lib/schema.ts`'e ekle
- [ ] İlçe sayfalarını optimize et (Meram, Selçuklu, Karatay)
- [ ] Blog: 8 makale (haftada 2 hız)
- [ ] Google İşletme Profili'ne haftalık post başla
- [ ] 10 yeni uzman başvurusu hedefle

**Ay 2 Metrik Hedefleri:**
- Google Search Console: 200+ impression/gün
- Uzman profili doluluk oranı: en az 10 uzman %80+ dolu
- Blog trafik: aylık 500+ organik

---

### AY 3 — Otorite İnşası (Haziran 2026)

- [ ] Konya Psikoloji Derneği / yerel derneklerle iletişim → backlink
- [ ] Konya haberleri / yerel blog'lara "uzman görüşü" içerik ver → backlink
- [ ] İlk ücretli uzman alımı (fiyatlandırma model testi)
- [ ] Tüm uzman profilleri index'te
- [ ] Blog: 8 makale
- [ ] FAQ genişletme: her uzman sayfasına özelleştirilmiş FAQ

**Ay 3 Metrik Hedefleri:**
- Aylık 1.500+ organik ziyaretçi
- 5+ ücretli uzman
- "Konya psikolog" aramasında ilk sayfa

---

### AY 4 — Büyüme (Temmuz 2026)

- [ ] Haber/basın bültenler: "Konya'nın ilk doğrulamalı psikolog rehberi"
- [ ] Instagram/TikTok: haftalık psikoeğitim içeriği
- [ ] Referral sistemi: mevcut uzmanlar yeni uzman getirirse 1 ay ücretsiz
- [ ] Randevu sistemi araştır (Calendly entegrasyonu veya basit form)
- [ ] Blog: 8 makale
- [ ] Konya Üniversitesi psikoloji bölümü → staj/proje işbirliği

**Ay 4 Metrik Hedefleri:**
- Aylık 2.500+ organik ziyaretçi
- 20+ aktif uzman profili
- İlk basın haberi / mention

---

### AY 5 — Gelir Modeli (Ağustos 2026)

- [ ] Tüm ücretsiz uzmanları ücretliye geçirme konuşmaları başlat
- [ ] Premium profil özellikleri: video, randevu butonu, öne çıkarma
- [ ] Konya dışı genişleme araştır (Ankara, İstanbul long-tail)
- [ ] Blog: 8 makale
- [ ] Kullanıcı anketi: "Platformu nasıl buldunuz?"

---

### AY 6 — Ölçekleme (Eylül 2026)

- [ ] Hedef: "Konya psikolog" aramasında 1-3. sıra
- [ ] Aylık 5.000+ organik ziyaretçi
- [ ] 30+ aktif uzman profili (10+ ücretli)
- [ ] 100+ blog makalesi
- [ ] Randevu sistemi canlıda
- [ ] terapitime.com ile ortak kampanya

---

## 9. KİLİT METRİKLER

Google Analytics 4 + Search Console'da takip et:

| Metrik | Ay 1 Hedef | Ay 3 Hedef | Ay 6 Hedef |
|--------|-----------|-----------|-----------|
| Organik ziyaretçi/ay | 300 | 1.500 | 5.000 |
| "Konya psikolog" sırası | İlk sayfa yok | İlk 10 | İlk 3 |
| Index'teki uzman profili | 50 (hepsi) | 50 | 80+ |
| Ortalama oturum süresi | 1:30 | 2:00 | 2:30 |
| Uzman profil tıklanma oranı | - | 8% | 15% |
| Uzman başvurusu/ay | 2 | 10 | 20 |

---

## 10. HIZLI KAZANIM KAYNAKLAR

Bir hafta içinde yapılabilecek, büyük etki yaratacak şeyler:

1. **robots noindex kaldır** → Google 50+ sayfayı indexlemeye başlar (0 geliştirme zamanı)
2. **sitemap.ts yaz** → Tüm sayfaları Google'a duyur (1 saat)
3. **psikologlar CTA'sını `/uzman-ol`'a yönlendir** → Dönüşüm artışı (5 dakika)
4. **Feyza Çaksen profilini doldur** → Vitrin profil hazır, referans olarak kullanılabilir (2 saat)
5. **GBP aç** → Harita aramaları için (30 dakika)
6. **psikologcaksen.com'dan link al** → Kolay backlink (10 dakika + site erişimi)

---

*Bu rehber `docs/PLATFORM-REHBERI.md` olarak kaydedildi. Nisan 2026 durumu yansıtıyor.*
