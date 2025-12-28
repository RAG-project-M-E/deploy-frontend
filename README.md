# LexDanisman Frontend

Yapay Zeka Destekli Hukuk Asistanı Frontend Projesi.

## Kurulum

Bağımlılıkları yüklemek için:

```bash
pnpm install
# veya
npm install
```

## Çalıştırma

Geliştirme sunucusunu başlatmak için:

```bash
pnpm dev
# veya
npm run dev
```

## Özellikler

- **Next.js App Router**
- **Tailwind CSS** & **Radix UI** (shadcn/ui)
- **Tema:** Dark Mode (Premium Law Firm)
- **Chat:** Demo Modu (Mock API) ve LocalStorage Kayıt
- **Sayfalar:** Landing, Chat, Hizmetler, Hakkımızda, İletişim, KVKK

## Demo Modu

Gerçek bir backend olmadığı için `lib/mockChat.ts` içerisinde simüle edilmiş yanıtlar döner. Anahtar kelimelere göre (kira, iş, boşanma, vb.) farklı senaryolar test edilebilir.
