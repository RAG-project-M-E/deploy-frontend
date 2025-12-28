import Link from "next/link"
import { Building2, Home, Briefcase, Users, Gavel, FileText, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
    { title: "İş Hukuku", icon: Briefcase, desc: "İşe iade, kıdem tazminatı ve mobbing davaları konularında AI desteği." },
    { title: "Kira Hukuku", icon: Home, desc: "Tahliye, kira tespiti ve sözleşme sorunları hakkında detaylı bilgi." },
    { title: "Ticaret Hukuku", icon: Building2, desc: "Şirket kuruluşu, sözleşmeler ve ticari alacaklar için rehberlik." },
    { title: "Aile Hukuku", icon: Users, desc: "Boşanma, velayet, nafaka ve mal paylaşımı süreçleri." },
    { title: "İcra Hukuku", icon: FileText, desc: "Borç tahsili, haciz ve iflas süreçleri hakkında temel bilgiler." },
    { title: "Ceza Hukuku", icon: Gavel, desc: "Soruşturma, kovuşturma ve savunma süreçlerinde haklarınız." },
]

export function ServicesSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                        Uzmanlık Alanları
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-serif">Hukuki Alanlar</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-lg">
                        LexDanisman geniş bir yelpazede hukuki konularda size rehberlik eder. İlgili alanda hemen soru sormaya başlayın.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, i) => (
                        <Card key={i} className="group relative overflow-hidden border-slate-800 bg-card/40 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                            <CardHeader>
                                <div className="p-3 w-fit rounded-lg bg-primary/10 mb-2">
                                    <service.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/danisman?topic=${encodeURIComponent(service.title)}`} className="w-full">
                                    <Button variant="ghost" className="w-full justify-between hover:text-primary hover:bg-primary/5">
                                        Soru Sor <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
