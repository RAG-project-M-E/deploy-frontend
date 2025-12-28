"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock submission
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                loading: 'Gönderiliyor...',
                success: 'Mesajınız iletildi! En kısa sürede dönüş yapacağız.',
                error: 'Bir hata oluştu.'
            }
        )
    }

    return (
        <div className="container px-4 py-16 max-w-xl mx-auto">
            <h1 className="text-4xl font-serif font-bold mb-8 text-center">İletişim</h1>
            <p className="text-center text-muted-foreground mb-8">
                Öneri, şikayet veya iş birliği talepleriniz için bize ulaşın.
            </p>
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Ad Soyad</label>
                        <Input id="name" placeholder="Adınız Soyadınız" required className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">E-posta Adresi</label>
                        <Input id="email" type="email" placeholder="ornek@email.com" required className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">Konu</label>
                        <Input id="subject" placeholder="Mesajınızın konusu" required className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Mesajınız</label>
                        <Textarea id="message" placeholder="Size nasıl yardımcı olabiliriz?" required className="min-h-[120px] bg-background/50" />
                    </div>
                    <Button type="submit" className="w-full font-bold h-11">Gönder</Button>
                </form>
            </div>
        </div>
    )
}
