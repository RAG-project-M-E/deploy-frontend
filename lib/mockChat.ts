import { Message } from "./types"

const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;

export async function getChatResponse(messages: Message[]): Promise<string> {
    const lastMessage = messages[messages.length - 1].content;

    // 1. REAL API MODE
    if (API_URL) {
        try {
            // Convert to atomic props
            const payloadMessages = messages.map(({ role, content }) => ({ role, content }));

            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: payloadMessages,
                    locale: "tr"
                })
            });

            if (!res.ok) throw new Error(`API Error: ${res.status}`);

            const data = await res.json();
            // Expecting { reply: string, citations?: [] }
            let replyText = data.reply;

            // Append citations if any
            if (data.citations && Array.isArray(data.citations) && data.citations.length > 0) {
                replyText += "\n\n---\n**Kaynaklar:**\n";
                data.citations.forEach((c: { title: string, url?: string }) => {
                    replyText += `• ${c.title}\n`;
                });
            }

            return replyText;
        } catch (error) {
            console.error("API request failed, falling back to demo mode...", error);
            // Fallthrough to demo mode or return error? 
            // Requirement: "API yoksa DEMO MODE; API hata verirse uyarı toast".
            throw error;
        }
    }

    // 2. DEMO MODE
    return new Promise((resolve) => {
        setTimeout(() => {
            const lower = lastMessage.toLowerCase();

            if (lower.includes("kira") || lower.includes("ev sahibi") || lower.includes("tahliye") || lower.includes("zam")) {
                resolve(`Kira hukuku ile ilgili sorunuz için temel hususlar şunlardır:

1. **Tahliye Sebepleri:** 6098 sayılı Türk Borçlar Kanunu'na göre, kira süresinin bitmesi tek başına tahliye nedeni değildir. Haklı nedenler (kira ödenmemesi, malikin gereksinimi, esaslı tadilat vb.) gereklidir.
2. **Kira Artışı:** Konut kiralarında artış oranı yasal düzenlemelere ve TÜFE ortalamasına göre belirlenir.
3. **Depozito:** Güvence bedeli en fazla 3 aylık kira bedeli kadar olabilir ve vadeli bir hesapta tutulmalıdır.

Sözleşmenizin süresi ve fesih bildirim tarihleri bu durumda belirleyicidir. Size noter kanalıyla gönderilen bir ihtarname var mı?`);
            }
            else if (lower.includes("iş") || lower.includes("tazminat") || lower.includes("kovul") || lower.includes("istifa") || lower.includes("mobbing")) {
                resolve(`İş hukuku kapsamındaki sorunuzla ilgili olarak:

* **Kıdem Tazminatı:** En az 1 yıllık çalışmanız varsa ve haklı bir neden olmadan (veya tarafınızdan haklı nedenle) işten çıkarıldıysanız hak kazanırsınız.
* **İhbar Süresi:** Çalışma sürenize göre 2 ile 8 hafta arasında değişen ihbar süresi tanımanız veya tazminatını almanız gerekebilir.
* **İşe İade:** 30'dan fazla çalışanı olan işyerlerinde, 6 aydan fazla kıdeminiz varsa ve güvencesiz çıkarıldıysanız işe iade davası (1 ay içinde) açabilirsiniz.

İşten çıkış kodunuzu biliyor musunuz? (Örn: 04, 29 vb.) Bu kod haklarınızı belirlemede kritiktir.`);
            }
            else if (lower.includes("boşan") || lower.includes("nafaka") || lower.includes("velayet") || lower.includes("evli")) {
                resolve(`Aile hukuku konusundaki sorunuz hassas detaylar içerebilir. Genel çerçeve:

- **Anlaşmalı Boşanma:** En az 1 yıl evli kaldıysanız ve her konuda anlaşırsanız tek celsede boşanabilirsiniz.
- **Çekişmeli Boşanma:** Kusur oranına (zina, şiddet, terk vb.) göre tazminat ve nafaka belirlenir.
- **Velayet:** Yargıtay yerleşik içtihatlarına göre "çocuğun üstün yararı" temel alınır.

Durumunuzda fiziksel veya psikolojik şiddet iddiası var mı? Varsa 6284 sayılı kanun gereği uzaklaştırma talep edebilirsiniz.`);
            }
            else if (lower.includes("ceza") || lower.includes("polis") || lower.includes("savcı") || lower.includes("karakol") || lower.includes("suç")) {
                resolve(`Ceza hukuku süreçleri (soruşturma ve kovuşturma) ciddi hak kayıplarına yol açabilir. Temel haklarınız:

1. **Susma Hakkı:** İfadeniz sırasında susma hakkınızı kullanabilirsiniz.
2. **Müdafi Yardımı:** İfade verirken mutlaka bir avukatın hazır bulunmasını talep etme hakkınız vardır (Barodan talep edilebilir).
3. **Deliller:** Lehinizdeki delillerin toplanmasını isteme hakkınız mevcuttur.

Şu an bir ifadeye mi çağrıldınız yoksa bir suç duyurusunda mı bulunmak istiyorsunuz?`);
            }
            else if (lower.includes("merhaba") || lower.includes("selam") || lower.includes("naber")) {
                resolve(`Merhaba! Ben LexDanisman AI asistanıyım. Size hukuki konularda genel bilgilendirme, mevzuat taraması ve süreç rehberliği sağlamak için buradayım.

Hangi hukuk dalında (İş, Kira, Ceza, Aile, Ticaret vb.) yardıma ihtiyacınız var? Sorunuzu detaylandırarak yazarsanız sizi daha doğru yönlendirebilirim.`);
            }
            else {
                resolve(`Bu konuda size genel bir bakış sunabilirim. Hukuk sistemimizde ispat yükümlülüğü ve hak düşürücü süreler (zamanaşımı) büyük önem taşır.

Sorduğunuz konuyla ilgili hukuki nitelendirme yapabilmem için:
- Olayın gerçekleştiği tarih nedir?
- Elinizde hangi belgeler (sözleşme, senet, yazışma vb.) var?

*Not: Bu yanıt bir yapay zeka tarafından bilgilendirme amaçlı üretilmiştir. Kesinlikle hukuki tavsiye yerine geçmez. Hak kaybı yaşamamak için bir avukata danışmalısınız.*`);
            }
        }, 1000)
    })
}
