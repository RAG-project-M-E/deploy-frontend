"use client"
import Link from "next/link"

export function SiteFooter() {
    return (
        <footer className="w-full border-t border-border/40 bg-background py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; 2025{" "}
                        <span
                            className="font-medium"
                        >
                            BytenFlow
                        </span>
                        . Tüm hakları saklıdır.
                    </p>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                    Bu servis bir avukat değildir. Verilen tüm bilgiler bilgilendirme amaçlıdır.
                </p>
            </div>
        </footer>
    )
}
