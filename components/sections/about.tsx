"use client"

import { Mail, Info } from "lucide-react"

export function AboutSection() {
    return (
        <section id="hakkimizda" className="w-full py-16 md:py-24 bg-background border-t border-white/5">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-start max-w-4xl mx-auto">
                    <div className="w-full space-y-6 bg-card/50 p-8 rounded-xl border border-white/5 backdrop-blur-sm shadow-lg text-center">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
                            Biz Kimiz?
                        </div>
                        <h2 className="text-3xl font-serif font-bold mb-6">Hakkımızda</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-lg text-justify text-left">
                            <p>
                                LexDanisman, karmaşık hukuki süreçleri herkes için anlaşılır, erişilebilir ve güvenilir kılmak amacıyla yola çıkmış, yapay zeka destekli yeni nesil bir hukuk teknolojisi girişimidir. Bizler, teknolojinin gücünü adaletin hassasiyetiyle birleştirerek, bireylerin ve kurumların hukuki yolculuklarında yanlarında olmayı hedefliyoruz.
                            </p>
                            <p>
                                Türk hukuku mevzuatını, güncel yargıtay kararlarını ve akademik içtihatları sürekli tarayan gelişmiş algoritmalarımız sayesinde, kullanıcılarımıza 7/24 kesintisiz ve doğru bilgiye dayalı önleyici hukuki rehberlik sunuyoruz. Geleneksel danışmanlık süreçlerinin aksine, anlık yanıtlar ve kişiselleştirilmiş çözümlerle, karşılaşılan hukuki sorunların henüz büyümeden ele alınmasını sağlıyoruz.
                            </p>
                            <p>
                                Amacımız, sadece bilgi vermek değil; toplumda hukuki okuryazarlığı artırarak adalete erişimdeki engelleri kaldırmak ve herkesin haklarını daha bilinçli bir şekilde savunabilmesine katkı sağlamaktır. LexDanisman ile hukuk artık karmaşık bir labirent değil, çözüme giden aydınlık bir yoldur.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-yellow-600/10 border border-yellow-600/20 px-6 py-4 rounded-lg text-center text-yellow-600/90 flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto shadow-sm">
                    <Info className="h-8 w-8 shrink-0" />
                    <span className="font-medium text-lg">Bu servis bilgilendirme amaçlıdır. Nihai karar için mutlaka bir avukata danışınız.</span>
                </div>
            </div>
        </section>
    )
}
