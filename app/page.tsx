import { HeroSection } from "@/components/sections/hero"
import { ServicesSection } from "@/components/sections/services"
import { ContactFAQSection } from "@/components/sections/contact-about"
import { FeatureTicker } from "@/components/sections/feature-ticker"
import { AboutSection } from "@/components/sections/about"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureTicker />
      <div id="hizmetler">
        <ServicesSection />
      </div>
      <div id="nasil-calisir" className="py-24 text-center bg-card/20 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            3 Adımda Çözüm
          </div>
          <h2 className="text-3xl font-serif font-bold mb-12">Nasıl Çalışır?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-card/50 rounded-xl border border-white/5 relative">
              <div className="absolute -top-6 w-12 h-12 rounded-full bg-background border-4 border-card flex items-center justify-center text-primary font-bold text-xl shadow-lg">1</div>
              <h3 className="font-semibold mb-2 mt-4 text-lg">Konunu Belirle</h3>
              <p className="text-sm text-muted-foreground">Hizmetlerimiz arasından sorununuzla ilgili hukuk dalını seçin (Kira, İş, Aile vb.).</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card/50 rounded-xl border border-white/5 relative">
              <div className="absolute -top-6 w-12 h-12 rounded-full bg-background border-4 border-card flex items-center justify-center text-primary font-bold text-xl shadow-lg">2</div>
              <h3 className="font-semibold mb-2 mt-4 text-lg">Sorunu Sor</h3>
              <p className="text-sm text-muted-foreground">Detayları chatbot asistanımıza yazın. Ne kadar detay verirseniz o kadar net yanıt alırsınız.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-card/50 rounded-xl border border-white/5 relative">
              <div className="absolute -top-6 w-12 h-12 rounded-full bg-background border-4 border-card flex items-center justify-center text-primary font-bold text-xl shadow-lg">3</div>
              <h3 className="font-semibold mb-2 mt-4 text-lg">Bilgi Al</h3>
              <p className="text-sm text-muted-foreground">Kanun ve içtihatlara dayalı bilgilendirici yanıtı saniyeler içinde görüntüleyin.</p>
            </div>
          </div>
        </div>
      </div>
      <AboutSection />
      <ContactFAQSection />
    </div>
  )
}
