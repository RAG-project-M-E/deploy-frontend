"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScrollToTopButton() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShow(true)
            } else {
                setShow(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <Button
            variant="secondary"
            size="icon"
            className={cn(
                "fixed bottom-24 right-6 h-10 w-10 rounded-full shadow-lg z-40 transition-all duration-300 opacity-0 translate-y-10 pointer-events-none border border-border/50 bg-background/80 backdrop-blur hover:bg-background",
                show && "opacity-100 translate-y-0 pointer-events-auto"
            )}
            onClick={scrollToTop}
            aria-label="Yukarı Çık"
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    )
}
