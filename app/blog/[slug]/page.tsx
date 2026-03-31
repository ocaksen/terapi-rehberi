import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

// Blog yazısı içerikleri — slug'a göre
const BLOG_CONTENT: Record<string, { body: string; readTime: string }> = {
  "konya-panik-atak-belirtileri": {
    readTime: "5 dk",
    body: `
Panik atak, aniden başlayan ve birkaç dakika içinde zirveye ulaşan yoğun korku nöbetleridir. Türkiye'de her 10 kişiden 1'i hayatının bir döneminde panik atak yaşar.

## Panik Atak Belirtileri

Panik atak sırasında şu belirtilerden 4 veya daha fazlası görülür:

- **Çarpıntı, kalp atışının hızlanması** — en sık görülen belirti
- **Nefes darlığı veya boğulma hissi**
- **Göğüs ağrısı veya sıkışma hissi**
- **Baş dönmesi, sersemlik, bayılma hissi**
- **Uyuşma veya karıncalanma**
- **Titreme veya titreyerek ürperme**
- **Terleme**
- **Bulantı veya mide rahatsızlığı**
- **Gerçekdışılık hissi (derealizasyon)**
- **Kontrolü kaybetme ya da "çıldırma" korkusu**
- **Ölüm korkusu**

## Panik Atak mı, Kalp Krizi mi?

Bu iki durum birbirine çok benzer. Fark şudur: Panik atak genellikle ani tetikleyicilerle başlar ve 10-20 dakika içinde geriler. Kalp krizi ağrısı ise genellikle göğüsten kola yayılır ve dinlenmekle geçmez.

İlk yaşandığında mutlaka doktora gidip fiziksel nedenlerin dışlandığından emin olun.

## Panik Atak Geçtiğinde Ne Yapmalı?

1. **Yavaş nefes alın** — 4 saniye içeri, 4 saniye tutun, 6 saniye dışarı
2. **"Bu geçecek" deyin** — Panik atak tehlikeli değildir, en fazla 20 dakika sürer
3. **Mevcut ana odaklanın** — Etrafınızda 5 şey görün, 4 şeye dokunun
4. **Kaçmayın** — Kaçmak panik bozukluğunu besler

## Ne Zaman Profesyonel Destek Alınmalı?

- Ayda 2 veya daha fazla panik atak yaşıyorsanız
- Panik korkusu ile evden çıkamıyorsanız (agorafobi)
- Yoğun kaygı günlük hayatı engelliyorsa

Bilişsel Davranışçı Terapi (BDT) ve EMDR, panik bozukluğunda en etkili yöntemler arasındadır.
    `.trim(),
  },
  "konya-cift-terapisi-ne-zaman": {
    readTime: "4 dk",
    body: `
İlişkilerde sorunlar yaşandığında çoğu çift "biraz daha bekleyelim" diye düşünür. Araştırmalar ise ortalama bir çiftin yardım almaya karar vermeden önce 6 yıl boyunca sorun yaşadığını gösteriyor.

## Çift Terapisine Gitmenin Tam Zamanı

Bu durumları tanıyorsanız, beklemeyin:

### 1. Aynı kavgaları tekrar tekrar yaşıyorsunuz
Konu değişse de kalıp aynı: Biri suçlar, diğeri savunur ya da kapanır. Sonuç: Çözümsüz ayrılık.

### 2. İletişim kesildi ya da yalnızca yüzeysel
"Ne yaptın bugün?" seviyesinin ötesine geçemiyorsunuz. Derin konuşmalar, hayaller, korkular paylaşılmıyor.

### 3. Güven sarsıldı
Aldatılma, büyük bir yalan ya da maddi ihanet. Güven onarılabilir — ama profesyonel destek olmadan nadiren.

### 4. Cinsel yakınlık azaldı veya yok oldu
Fiziksel uzaklaşma çoğunlukla duygusal uzaklaşmanın yansımasıdır.

### 5. Ayrılmayı ya da boşanmayı düşünüyorsunuz
Terapi, hem ilişkiyi kurtarmanın hem de sağlıklı bir ayrılığın aracı olabilir.

## Çift Terapisi Nasıl İşler?

Terapist, iki tarafın da tarafını tutmaz. Hedef: iletişim kalıplarını değiştirmek, karşılıklı ihtiyaçları anlamak ve yeni bir dil geliştirmek.

Ortalama 10-20 seans, çoğu çifte belirgin bir fark hissettiriyor.

## "Henüz o kadar kötü değil" Tuzağı

Çift terapisi kriz döneminde değil, **daha erken** başlandığında çok daha etkili olur. İlişkinize yatırım yapmak için kötüye gitmesini beklemeyin.
    `.trim(),
  },
  "ergen-psikologa-gitmiyor": {
    readTime: "4 dk",
    body: `
"Psikologa gitmem gerekmiyor, ben deli değilim." — Bu cümleyi duydunuzsa yalnız değilsiniz. Ergenlerin büyük çoğunluğu ilk başta terapiye direnir.

## Neden Direnir?

Ergenin direnci çoğunlukla şu korkulardan kaynaklanır:

- **Damgalanma korkusu** — Arkadaşları ne düşünür?
- **Kontrol kaybı korkusu** — Terapist her şeyimi öğrenecek mi?
- **Ebeveyne ihanet hissi** — "Aile sırlarını" paylaşmak zorunda kalacağım
- **Değişim korkusu** — Ya kimliğim değişirse?

## Zorla Götürmek İşe Yarar mı?

Kısa vadede hayır, uzun vadede zarar verir. Zorla getirilen ergen terapist karşısında kapanır, beden dili "burada olmak istemiyorum" der ve bu enerji seans verimliliğini sıfırlar.

## Doğru Yaklaşım: 5 Adım

**1. Tanı koymadan konuşun**
"Sende bir sorun var, psikolog gerekiyor" yerine: "Son zamanlarda biraz zor görünüyorsun, nasılsın gerçekten?"

**2. Seçim verin**
"Psikologa gideceksin" yerine: "Bu konuda biriyle konuşmak ister misin, seçim senin."

**3. Süreci açık anlatın**
Terapistin ne yapıp yapmadığını, gizlilik ilkesini somut olarak açıklayın.

**4. Etiket kullanmayın**
"Tedavi" ya da "hasta" gibi kelimeler yerine "konuşma seansı" veya "destek" deyin.

**5. İlk görüşmeyi düşük baskılı tutun**
"Sadece bir kez git, beğenmezsen devam etmek zorunda değilsin." Bu yaklaşım direnci önemli ölçüde kırar.

## Ne Zaman Acil?

Kendine zarar verme, intihar düşünceleri veya yeme bozukluğu belirtileri varsa direnci beklemeden uzman müdahalesi şarttır.
    `.trim(),
  },
};

function renderContent(body: string) {
  const paragraphs = body.split("\n\n");
  return paragraphs.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-bold text-brand-900 mt-8 mb-3">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="text-base font-bold text-brand-800 mt-5 mb-2">
          {block.replace("### ", "")}
        </h3>
      );
    }
    if (block.startsWith("- ") || block.includes("\n- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-2 my-3 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
              <span className="text-brand-400 mt-1 shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
    }
    if (block.match(/^\d+\./)) {
      const items = block.split("\n").filter((l) => l.match(/^\d+\./));
      return (
        <ol key={i} className="space-y-2 my-3 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
              <span className="font-bold text-brand-500 shrink-0 w-5">{j + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ol>
      );
    }
    if (block.trim()) {
      return (
        <p key={i} className="text-slate-600 leading-relaxed text-sm my-3"
          dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
        />
      );
    }
    return null;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const content = BLOG_CONTENT[slug];
  const allPosts = getAllBlogPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ── Başlık ────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-cream-200 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-brand-600">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-600">Blog</Link>
            <span>/</span>
            <span className="text-brand-600 font-medium truncate">{post.title}</span>
          </nav>

          <span className="text-xs font-semibold text-brand-500 uppercase tracking-widest">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 mt-2 mb-4 leading-snug">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>{new Date(post.publishedAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</span>
            {content && <span>· {content.readTime} okuma</span>}
            <span>· TerapiRehberi Editör</span>
          </div>
        </div>
      </div>

      {/* ── İçerik ────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="card p-6 sm:p-8 mb-8">
          {/* Özet kutusu */}
          <div className="bg-brand-50 border-l-4 border-brand-400 rounded-r-xl p-4 mb-6">
            <p className="text-sm text-brand-800 leading-relaxed font-medium">{post.excerpt}</p>
          </div>

          {/* İçerik */}
          {content ? (
            <div>{renderContent(content.body)}</div>
          ) : (
            <p className="text-slate-500 text-sm">Bu yazının içeriği yakında eklenecek.</p>
          )}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div className="card p-6 bg-brand-700 text-white text-center mb-8">
          <h2 className="font-bold text-lg mb-2">Profesyonel destek almak ister misiniz?</h2>
          <p className="text-brand-200 text-sm mb-4">Konya'daki doğrulanmış uzmanlarımızla tanışın.</p>
          <Link href="/konya/psikologlar" className="bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-cream-100 transition-colors inline-block min-h-[44px]">
            Psikolog Bul →
          </Link>
        </div>

        {/* ── Diğer yazılar ────────────────────────────────────────────── */}
        {allPosts.length > 0 && (
          <div>
            <h2 className="font-bold text-brand-900 mb-4">Diğer Yazılar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="card p-4 flex flex-col gap-2 group hover:shadow-md transition-shadow"
                >
                  <span className="text-xs font-semibold text-brand-500 uppercase">{p.category}</span>
                  <h3 className="text-sm font-semibold text-brand-900 leading-snug group-hover:text-brand-600 transition-colors">
                    {p.title}
                  </h3>
                  <span className="text-xs text-brand-500 font-medium mt-auto">Oku →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
