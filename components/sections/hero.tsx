import Link from "next/link"
import { ArrowRight, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function HeroSection() {
    return (
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl -z-10" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground mb-4 border border-secondary/50">
                                ✨ Yeni Nesil Hukuk Teknolojisi
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-serif bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                Hukuki Sorularınız İçin <br />
                                <span className="text-primary block mt-2">Türkçe AI Danışman</span>
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl py-4 leading-relaxed">
                                Karmaşık hukuk dilini sadeleştirin. 7/24 erişilebilir yapay zeka asistanımız ile sorularınıza anında yanıt bulun. KVKK uyumlu ve güvenilir.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-[400px]:flex-row">
                            <Link href="/danisman">
                                <Button size="lg" className="w-full min-[400px]:w-auto bg-primary text-black hover:bg-primary/90 font-bold text-base px-8 h-12 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105">
                                    Hemen Sor <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#nasil-calisir">
                                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto text-base h-12 border-slate-700 hover:bg-slate-800 text-slate-200 transition-all hover:scale-105">
                                    Nasıl Çalışır?
                                </Button>
                            </Link>
                        </div>
                        <p className="text-xs text-muted-foreground pt-4 opacity-70">
                            * Bu hizmet bilgilendirme amaçlıdır. Nihai karar için avukata danışınız.
                        </p>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center items-center relative perspective-distant">
                        {/* Chat Preview Card */}
                        <Card className="w-full max-w-md bg-slate-900/90 border-slate-800 backdrop-blur-md p-4 relative overflow-hidden shadow-2xl shadow-blue-900/20 rounded-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <span className="text-xs text-black">👤</span>
                                    </div>
                                    <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3 text-sm text-slate-200 border border-slate-700/50">
                                        Kira sözleşmemi ev sahibi erken feshedebilir mi?
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                                        <Scale className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-none p-3 text-sm text-slate-200">
                                        <p className="mb-2 font-medium text-primary text-xs flex items-center gap-1">LexDanisman <span className="bg-primary/20 text-[10px] px-1 rounded">AI</span></p>
                                        Türk Borçlar Kanunu'na göre kiraya veren, sözleşme süresi dolmadan sadece belirli "haklı nedenler" varsa feshedebilir. <br /><br />
                                        Örneğin:
                                        <ul className="list-disc list-inside mt-1 ml-1 text-slate-400 text-xs space-y-1">
                                            <li>Kiracının kira ödememesi</li>
                                            <li>Esaslı tadilat ihtiyacı</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <span className="text-xs text-black">👤</span>
                                    </div>
                                    <div className="bg-slate-800 rounded-2xl rounded-tl-none p-3 text-sm text-slate-200 animate-pulse border border-slate-700/50">
                                        Peki ihtarnamenin süresi nedir? <span className="inline-block w-1 h-3 ml-1 bg-slate-400 animate-blink aligns-middle"></span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
