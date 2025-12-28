"use client"

import { ShieldCheck, Clock, Zap, BookOpen } from "lucide-react"

const features = [
    {
        icon: ShieldCheck,
        text: "KVKK Uyumlu & Güvenli"
    },
    {
        icon: Clock,
        text: "7/24 Kesintisiz Erişim"
    },
    {
        icon: Zap,
        text: "Saniyeler İçinde Yanıt"
    },
    {
        icon: BookOpen,
        text: "Güncel Mevzuat Bilgisi"
    }
]

export function FeatureTicker() {
    return (
        <div className="w-full bg-primary/5 border-y border-primary/10 overflow-hidden py-8 relative">
            {/* Gradient masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex w-full">
                {/* Rolling container - duplicated for seamless loop */}
                <div className="flex animate-infinite-scroll whitespace-nowrap">
                    {/* Render loops multiple times to ensure full width coverage on large screens */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center mx-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center mx-8 md:mx-12 group select-none">
                                    <feature.icon className="h-5 w-5 mr-3 text-primary/70 group-hover:text-primary transition-colors" />
                                    <span className="text-sm md:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                                        {feature.text}
                                    </span>
                                    {/* Separator dot */}
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/20 ml-8 md:ml-12" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
