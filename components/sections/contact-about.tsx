"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Mail, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
    { q: "LexDanisman ücretli mi?", a: "Şu anda LexDanisman temel özellikleri ile tamamen ücretsizdir. Premium özellikler gelecekte eklenebilir." },
    { q: "Verdiğiniz cevaplar bir avukat tarafından mı yazılıyor?", a: "Hayır. Yanıtlar yapay zeka tarafından, güncel mevzuat veritabanı taranarak oluşturulur. Bir avukatın yerini tutmaz." },
    { q: "Hangi alanlarda soru sorabilirim?", a: "İş hukuku, kira hukuku, aile hukuku, ceza hukuku, tüketici hukuku gibi temel alanlarda genel bilgiler alabilirsiniz." },
    { q: "Sohbetlerim gizli mi?", a: "Sohbet geçmişiniz tarayıcınızın yerel hafızasında (localStorage) saklanır. Sunucu tarafında kimliğinizle eşleştirilmiş bir kayıt tutulmaz." },
    { q: "Yanlış bilgi verme ihtimali var mı?", a: "Yapay zeka modelleri bazen hata yapabilir ('halüsinasyon'). Bu nedenle kritik kararlar almadan önce mutlaka bir hukuk profesyoneline danışmalısınız." },
    { q: "Mobil uygulaması var mı?", a: "Şu an için sadece web tarayıcısı üzerinden, mobil uyumlu arayüzümüzle hizmet vermekteyiz." }
]

export function ContactFAQSection() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const form = e.target as HTMLFormElement
            const formData = new FormData(form)
            const data = {
                email: formData.get("email"),
                subject: formData.get("subject"),
                message: formData.get("message"),
            }

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Bir hata oluştu")
            }

            toast.success("Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.")
            form.reset()
        } catch (error) {
            toast.error("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="iletisim" className="w-full py-16 md:py-24 bg-slate-900/50 border-t border-white/5">
            <div className="container px-4 md:px-6 mx-auto">
                {/* items-stretch ensures both columns are equal height */}
                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* SOL TARAF - %50 - İLETİŞİM BİLGİLERİ & FORMU */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-2">İletişime Geçin</h2>
                            <p className="text-muted-foreground mb-6">Hukuki sorularınız veya iş birliği önerileriniz için bize yazın.</p>

                            {/* İletişim Bilgileri - Sadeleştirildi */}
                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4 mb-8">
                                <h3 className="font-semibold text-foreground flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" /> İletişim Bilgileri
                                </h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                                        <span className="w-2 h-2 rounded-full bg-primary/50" /> info@bytenflow.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 bg-card/30 p-8 rounded-xl border border-white/5 w-full flex-1 flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium ml-1">E-posta Adresiniz</label>
                                    <Input name="email" id="email" type="email" placeholder="ornek@email.com" required className="bg-background/50 border-slate-700 focus:border-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium ml-1">Konu</label>
                                    <Input name="subject" id="subject" placeholder="Mesaj konusu" required className="bg-background/50 border-slate-700 focus:border-primary/50" />
                                </div>
                            </div>
                            <div className="space-y-2 flex-1">
                                <label htmlFor="message" className="text-sm font-medium ml-1">Mesajınız</label>
                                <Textarea name="message" id="message" placeholder="Size nasıl yardımcı olabiliriz?" required className="min-h-[150px] h-full bg-background/50 border-slate-700 focus:border-primary/50 resize-none" />
                            </div>
                            <Button type="submit" size="lg" disabled={loading} className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                                {loading ? "Gönderiliyor..." : "Gönder"}
                            </Button>
                        </form>
                    </div>

                    {/* SAĞ TARAF - %50 - SSS */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        {/* SSS Bölümü - Flex-1 to absorb height */}
                        <div id="sss" className="flex flex-col h-full gap-6">
                            <h2 className="text-3xl font-serif font-bold text-primary">Sıkça Sorulan Sorular</h2>
                            {/* flex-1 lets this container grow to fill equal height */}
                            <div className="flex-1 flex flex-col gap-4">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-center border border-slate-800 rounded-lg bg-card/40 overflow-hidden shadow-sm hover:border-slate-700 transition-colors">
                                        <button
                                            onClick={() => setOpenIndex(prev => prev === i ? null : i)}
                                            className="flex items-center justify-between w-full p-4 text-left font-medium transition-colors hover:bg-white/5"
                                        >
                                            {faq.q}
                                            {openIndex === i ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4" />}
                                        </button>
                                        <div className={cn("px-4 text-muted-foreground text-sm transition-all duration-300 ease-in-out", openIndex === i ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0 overflow-hidden")}>
                                            {faq.a}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
