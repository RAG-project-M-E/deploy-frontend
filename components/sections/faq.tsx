"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
    { q: "LexDanisman ücretli mi?", a: "Şu anda LexDanisman temel özellikleri ile tamamen ücretsizdir. Premium özellikler gelecekte eklenebilir." },
    { q: "Verdiğiniz cevaplar bir avukat tarafından mı yazılıyor?", a: "Hayır. Yanıtlar yapay zeka tarafından, güncel mevzuat veritabanı taranarak oluşturulur. Bir avukatın yerini tutmaz." },
    { q: "Hangi alanlarda soru sorabilirim?", a: "İş hukuku, kira hukuku, aile hukuku, ceza hukuku, tüketici hukuku gibi temel alanlarda genel bilgiler alabilirsiniz." },
    { q: "Sohbetlerim gizli mi?", a: "Sohbet geçmişiniz tarayıcınızın yerel hafızasında (localStorage) saklanır. Sunucu tarafında kimliğinizle eşleştirilmiş bir kayıt tutulmaz." }
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="sss" className="w-full py-12 md:py-24 bg-slate-900/30">
            <div className="container px-4 md:px-6 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold font-serif text-center mb-8">Sıkça Sorulan Sorular</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-slate-800 rounded-lg bg-card/40 overflow-hidden">
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
        </section>
    )
}
