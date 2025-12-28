"use client"
import Link from "next/link"
import Image from "next/image"
import { Scale, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Need to create Sheet
import { useState } from "react"
// I will implement a simple Mobile Menu inline if Sheet is not ready, or create Sheet now.
// I'll assume Sheet is coming.

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-8 mx-auto">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative h-14 w-14">
                        <Image
                            src="/logo/lexailogo1.png"
                            alt="LexDanisman Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-serif text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                        Lex<span className="text-primary transition-colors duration-300 group-hover:text-foreground">Danisman</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/#hizmetler" className="transition-all duration-200 hover:text-primary hover:scale-105">Hizmetler</Link>
                    <Link href="/#hakkimizda" className="transition-all duration-200 hover:text-primary hover:scale-105">Hakkımızda</Link>
                    <Link href="/#sss" className="transition-all duration-200 hover:text-primary hover:scale-105">S.S.S</Link>
                    {/* <Link href="/kvkk" className="transition-colors hover:text-foreground hover:text-primary">KVKK</Link> */}
                    <Link href="/#iletisim" className="transition-all duration-200 hover:text-primary hover:scale-105">İletişim</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/danisman">
                        <Button variant="default" className="hidden md:flex font-semibold text-sm px-6 h-10 shadow-gold shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/50 hover:bg-primary/90">
                            Hemen Sor
                        </Button>
                    </Link>

                    {/* Mobile Menu Trigger - Placeholder until Sheet is ready or I simple use it */}
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
