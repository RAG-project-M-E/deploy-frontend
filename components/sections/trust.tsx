import { ShieldCheck, Clock, Zap, BookOpen } from "lucide-react"

export function TrustSection() {
    const items = [
        { icon: ShieldCheck, text: "KVKK Uyumlu & Güvenli" },
        { icon: Clock, text: "7/24 Kesintisiz Erişim" },
        { icon: Zap, text: "Saniyeler İçinde Yanıt" },
        { icon: BookOpen, text: "Güncel Mevzuat Bilgisi" },
    ]

    return (
        <section className="w-full py-8 border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left transition-opacity opacity-70 hover:opacity-100">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-slate-200">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
