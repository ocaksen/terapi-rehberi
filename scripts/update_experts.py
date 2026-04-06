import json, re

def slugify(name):
    tr = str.maketrans('ğĞüÜşŞıİöÖçÇâÂîÎûÛ', 'gGuUsSiIoOcCaAiIuU')
    s = name.lower().translate(tr)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

experts_raw = [
    # MERAM
    ("Erdim Hasip Hakverîr",   "Uzman Klinik Psikolog",      "Meram",    ["bireysel-terapi","travma","kaygi-bozuklugu","depresyon"],       ["Yüz Yüze"],          None,      True),
    ("Fatih Uğur",             "Klinik Psikolog",             "Selçuklu", ["bireysel-terapi","cift-terapisi","aile-terapisi","emdr"],       ["Yüz Yüze","Online"], "4.000₺",  False),
    ("Nazlı Çalışkan",         "Psikolojik Danışman",         "Meram",    ["bireysel-terapi","ergen-psikolojisi","aile-terapisi"],          ["Yüz Yüze","Online"], None,      False),
    ("Hüseyin Gökalp",         "Uzman Klinik Psikolog",       "Meram",    ["bireysel-terapi","kaygi-bozuklugu","depresyon","travma"],       ["Yüz Yüze"],          None,      False),
    ("Duygu Ayhan",            "Uzman Psikolojik Danışman",   "Meram",    ["bireysel-terapi","aile-terapisi","cift-terapisi"],              ["Yüz Yüze","Online"], None,      False),
    ("Yasemin Bağrıaçık",      "Uzman Psikolog",              "Meram",    ["bireysel-terapi","cocuk-psikolojisi","ergen-psikolojisi"],      ["Yüz Yüze"],          None,      False),
    ("Atiye Kaytazoğlu",       "Psikolog",                    "Meram",    ["bireysel-terapi","kaygi-bozuklugu","depresyon"],                ["Yüz Yüze","Online"], "2.500₺",  False),
    ("Merve Malaş",            "Doktor Klinik Psikolog",      "Meram",    ["bireysel-terapi","emdr","travma","kaygi-bozuklugu"],            ["Yüz Yüze","Online"], "5.000₺",  True),
    ("Rümeysa Şen",            "Psikolog",                    "Meram",    ["bireysel-terapi","ergen-psikolojisi","depresyon"],              ["Yüz Yüze","Online"], "2.000₺",  False),
    ("Kasım Taş",              "Psikolog",                    "Meram",    ["bireysel-terapi","aile-terapisi","kaygi-bozuklugu"],            ["Yüz Yüze"],          None,      False),
    ("Dilara Öksüz",           "Uzman Psikolog",              "Meram",    ["bireysel-terapi","cocuk-psikolojisi","aile-terapisi"],          ["Yüz Yüze","Online"], "3.000₺",  False),
    ("Ahmet Koyuncu",          "Uzman Psikolojik Danışman",   "Meram",    ["bireysel-terapi","ergen-psikolojisi","aile-terapisi"],          ["Yüz Yüze"],          None,      False),
    ("Esra Uzbaş Uğur",        "Uzman Klinik Psikolog",       "Meram",    ["bireysel-terapi","emdr","travma","depresyon"],                  ["Yüz Yüze","Online"], "4.500₺",  False),
    ("İzem Cehiz",             "Psikolog",                    "Meram",    ["bireysel-terapi","kaygi-bozuklugu","ergen-psikolojisi"],        ["Yüz Yüze","Online"], "2.000₺",  False),
    ("Nazmiye Dener Arslan",   "Psikolojik Danışman",         "Meram",    ["bireysel-terapi","aile-terapisi","cocuk-psikolojisi"],          ["Yüz Yüze"],          None,      False),
    ("Nalan Çokdolu",          "Uzman Psikolojik Danışman",   "Meram",    ["bireysel-terapi","cift-terapisi","kaygi-bozuklugu"],            ["Yüz Yüze","Online"], None,      False),
    ("Ömer Suna",              "Klinik Psikolog",             "Meram",    ["bireysel-terapi","depresyon","travma","emdr"],                  ["Yüz Yüze"],          "3.500₺",  False),
    ("Emine Deniz",            "Uzman Psikolog",              "Meram",    ["bireysel-terapi","cocuk-psikolojisi","ergen-psikolojisi"],      ["Yüz Yüze","Online"], "3.000₺",  False),
    ("Dilara Uyar",            "Psikolog",                    "Meram",    ["bireysel-terapi","aile-terapisi","depresyon"],                  ["Yüz Yüze","Online"], "2.000₺",  False),
    ("Elif Manuoğlu",          "Psikolog",                    "Meram",    ["bireysel-terapi","kaygi-bozuklugu","cift-terapisi"],            ["Yüz Yüze"],          None,      False),
    ("Helin Kara",             "Klinik Psikolog",             "Meram",    ["bireysel-terapi","emdr","travma"],                             ["Yüz Yüze","Online"], "3.000₺",  False),
    # SELÇUKLU
    ("İbrahim Ertabak",        "Psikolog",                    "Selçuklu", ["bireysel-terapi","ergen-psikolojisi","kaygi-bozuklugu"],        ["Yüz Yüze"],          None,      False),
    ("Cüneyt Kaya",            "Psikolog",                    "Selçuklu", ["bireysel-terapi","depresyon","kaygi-bozuklugu"],               ["Yüz Yüze","Online"], "2.500₺",  False),
    ("Derya Çiçek",            "Psikolog",                    "Selçuklu", ["bireysel-terapi","cocuk-psikolojisi","aile-terapisi"],          ["Yüz Yüze","Online"], "2.000₺",  False),
    ("Hakan Tokgöz",           "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","emdr","travma","depresyon"],                  ["Yüz Yüze"],          "3.500₺",  False),
    ("Ali Kültekin",           "Psikolojik Danışman",         "Selçuklu", ["bireysel-terapi","aile-terapisi","ergen-psikolojisi"],          ["Yüz Yüze"],          None,      False),
    ("Fatma Güllüoğlu",        "Psikolog",                    "Selçuklu", ["bireysel-terapi","cocuk-psikolojisi","ergen-psikolojisi"],      ["Yüz Yüze","Online"], "2.500₺",  False),
    ("Bayram Duysak",          "Uzman Klinik Psikolog",       "Selçuklu", ["bireysel-terapi","travma","emdr","kaygi-bozuklugu"],            ["Yüz Yüze"],          "4.000₺",  True),
    ("Merve Aslan",            "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","cift-terapisi","aile-terapisi"],              ["Yüz Yüze","Online"], "3.000₺",  False),
    ("Gupse Doğbay Toka",      "Klinik Psikolog",             "Selçuklu", ["bireysel-terapi","depresyon","kaygi-bozuklugu"],               ["Yüz Yüze","Online"], "3.500₺",  False),
    ("Ömer Menteşe",           "Psikolojik Danışman",         "Selçuklu", ["bireysel-terapi","aile-terapisi","ergen-psikolojisi"],          ["Yüz Yüze"],          None,      False),
    ("Gizem Aktürk",           "Psikolojik Danışman",         "Selçuklu", ["bireysel-terapi","cocuk-psikolojisi","aile-terapisi"],          ["Yüz Yüze","Online"], None,      False),
    ("Deniz Akıncı",           "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","travma","emdr","depresyon"],                  ["Yüz Yüze","Online"], "4.000₺",  False),
    ("Evrim Ünel",             "Psikolog",                    "Selçuklu", ["bireysel-terapi","ergen-psikolojisi","depresyon"],              ["Yüz Yüze","Online"], "2.500₺",  False),
    ("Esra Uyar",              "Psikolog",                    "Selçuklu", ["bireysel-terapi","kaygi-bozuklugu","cocuk-psikolojisi"],        ["Yüz Yüze"],          None,      False),
    ("Şerife Akçay",           "Psikolojik Danışman",         "Selçuklu", ["bireysel-terapi","aile-terapisi","cift-terapisi"],              ["Yüz Yüze"],          None,      False),
    ("Abdullah Duysak",        "Psikolog",                    "Selçuklu", ["bireysel-terapi","ergen-psikolojisi","travma"],                 ["Yüz Yüze","Online"], "2.000₺",  False),
    ("Berk Özdemir",           "Psikolog",                    "Selçuklu", ["bireysel-terapi","kaygi-bozuklugu","depresyon"],               ["Yüz Yüze","Online"], "2.500₺",  False),
    ("Sedef Arslan Ercan",     "Psikolog",                    "Selçuklu", ["bireysel-terapi","cocuk-psikolojisi","aile-terapisi"],          ["Yüz Yüze"],          None,      False),
    ("Rüya Sülü",              "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","cift-terapisi","kaygi-bozuklugu"],            ["Yüz Yüze","Online"], "3.500₺",  False),
    ("Duygu Karadavut",        "Psikolojik Danışman",         "Selçuklu", ["bireysel-terapi","ergen-psikolojisi","depresyon"],              ["Yüz Yüze"],          None,      False),
    ("Rıza Mutlu",             "Psikolog",                    "Selçuklu", ["bireysel-terapi","aile-terapisi","travma"],                     ["Yüz Yüze"],          None,      False),
    ("Mustafa Cem Oğuz",       "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","depresyon","kaygi-bozuklugu","emdr"],         ["Yüz Yüze","Online"], "3.500₺",  False),
    ("Betül Palancı",          "Klinik Psikolog",             "Selçuklu", ["bireysel-terapi","travma","emdr"],                             ["Yüz Yüze","Online"], "3.000₺",  False),
    ("Zehra Kaşıkçı",          "Klinik Psikolog",             "Selçuklu", ["bireysel-terapi","cocuk-psikolojisi","ergen-psikolojisi"],      ["Yüz Yüze"],          "3.000₺",  False),
    ("Hatice Üstüner",         "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","aile-terapisi","cift-terapisi"],              ["Yüz Yüze","Online"], None,      False),
    ("Duygu Demiray",          "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","kaygi-bozuklugu","depresyon"],               ["Yüz Yüze","Online"], "3.500₺",  False),
    ("Saliha Ünal",            "Psikolog",                    "Selçuklu", ["bireysel-terapi","cocuk-psikolojisi","aile-terapisi"],          ["Yüz Yüze"],          None,      False),
    ("Eyüp Genç",              "Psikolojik Danışman",         "Selçuklu", ["bireysel-terapi","ergen-psikolojisi","aile-terapisi"],          ["Yüz Yüze"],          None,      False),
    ("Mehri Matin",            "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","travma","emdr","depresyon"],                  ["Yüz Yüze","Online"], "4.000₺",  False),
    ("Gizem Daştan",           "Uzman Psikolog",              "Selçuklu", ["bireysel-terapi","kaygi-bozuklugu","cift-terapisi"],            ["Yüz Yüze","Online"], "3.000₺",  False),
    ("Beyza Yakıcı",           "Psikolojik Danışman",         "Selçuklu", ["bireysel-terapi","ergen-psikolojisi","depresyon"],              ["Yüz Yüze"],          None,      False),
    ("Meryem Demircan",        "Psikolog",                    "Selçuklu", ["bireysel-terapi","cift-terapisi","aile-terapisi","emdr"],       ["Yüz Yüze","Online"], "3.000₺",  False),
    # KARATAY
    ("Beyza Nur Çuhadar",      "Psikolog",                    "Karatay",  ["bireysel-terapi","cocuk-psikolojisi","ergen-psikolojisi"],      ["Yüz Yüze"],          None,      False),
    ("Fatih Kıymet",           "Psikolog",                    "Karatay",  ["bireysel-terapi","aile-terapisi","kaygi-bozuklugu"],            ["Yüz Yüze"],          None,      False),
    ("Ahmet Emin Yüksel",      "Aile Danışmanı",              "Karatay",  ["aile-terapisi","cift-terapisi","bireysel-terapi"],              ["Yüz Yüze"],          "2.000₺",  False),
    # EREĞLİ
    ("Mustafa Karagözlü",      "Uzman Psikolojik Danışman",   "Ereğli",   ["bireysel-terapi","aile-terapisi","ergen-psikolojisi"],          ["Yüz Yüze","Online"], None,      False),
]

female_imgs = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
    "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=400&q=80",
    "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&q=80",
    "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=400&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    "https://images.unsplash.com/photo-1489424731084-a5d8b2a2cf0c?w=400&q=80",
]
male_imgs = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    "https://images.unsplash.com/photo-1615109398623-88346a601842?w=400&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
]

male_first = {"Erdim","Hüseyin","Fatih","Kasım","Ahmet","İbrahim","Cüneyt","Hakan","Ali","Ömer","Bayram","Abdullah","Berk","Rıza","Mustafa","Eyüp"}

fi, mi = 0, 0
experts = []
for i, (name, title, district, services, session_type, fee, featured) in enumerate(experts_raw):
    first = name.split()[0]
    if first in male_first:
        img = male_imgs[mi % len(male_imgs)]
        mi += 1
    else:
        img = female_imgs[fi % len(female_imgs)]
        fi += 1

    slug = slugify(name)
    expert = {
        "id": str(i+1),
        "slug": slug,
        "name": name,
        "title": title,
        "city": "konya",
        "district": district,
        "image": img,
        "shortBio": f"{title} olarak Konya {district} bölgesinde hizmet vermektedir.",
        "longBio": [f"{name}, Konya {district} bölgesinde psikolog ve danışmanlık hizmetleri sunmaktadır."],
        "services": services,
        "sessionFee": fee,
        "sessionType": session_type,
        "experience": None,
        "phone": None,
        "appointmentUrl": None,
        "featured": featured,
        "education": [],
        "certifications": [],
        "languages": ["Türkçe"],
        "officeAddress": f"{district}, Konya",
        "approaches": []
    }
    experts.append(expert)

print(f"Toplam uzman: {len(experts)}")

with open('C:/Users/ASUS/Desktop/terapi-rehberi/data/db.json', encoding='utf-8') as f:
    db = json.load(f)

db['experts'] = experts

with open('C:/Users/ASUS/Desktop/terapi-rehberi/data/db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print("db.json guncellendi!")
