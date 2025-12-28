export default function AboutPage() {
    return (
        <div className="container px-4 py-16 max-w-3xl mx-auto">
            <h1 className="text-4xl font-serif font-bold mb-8">Hakkımızda</h1>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>LexDanisman, hukuk ve teknolojiyi bir araya getiren yeni nesil bir girişimidir. Türkiye'de adalete erişimi kolaylaştırmak ve hukuki okuryazarlığı artırmak vizyonuyla yola çıktık.</p>
                <p>Amacımız, karmaşık hukuki süreçleri herkes için anlaşılır ve erişilebilir kılmaktır. Geliştirdiğimiz yapay zeka modelleri, Türk Hukuku mevzuatını, Yargıtay kararlarını ve akademik kaynakları tarayarak kullanıcılara saniyeler içinde doğru ve güncel ön bilgi sağlar.</p>

                <h3 className="text-2xl font-serif text-foreground mt-8 mb-4">Misyonumuz</h3>
                <p>Hukuki bilgiye erişimi demokratikleştirmek, vatandaşların haklarını öğrenmesine yardımcı olmak ve avukatların iş yükünü hafifleterek süreçleri hızlandırmak.</p>

                <div className="bg-primary/5 p-8 rounded-xl border border-primary/20 mt-12">
                    <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                        ⚠️ Yasal Uyarı
                    </h4>
                    <p className="text-sm">LexDanisman bir avukatlık bürosu veya hukuk firması değildir. Sunulan hizmetler sadece bilgilendirme ve yönlendirme amaçlıdır. Yargı mercileri önünde temsil yetkisine sahip değildir ve verdiği yanıtlar hukuki tavsiye niteliği taşımaz. Hak kaybı yaşamamak için mutlaka bir avukata danışmalısınız.</p>
                </div>
            </div>
        </div>
    )
}
