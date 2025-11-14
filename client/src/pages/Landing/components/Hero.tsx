import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import { ArrowRight, BookOpen, DollarSign } from "lucide-react"

const Hero = (): ReactNode => {
    return (
        <div className="relative flex flex-col items-center text-center sm:pt-30 ">
            <img
                src="/Cool Kids - Notes.png"
                alt="notes image"
                className="absolute rotate-340 left-2 top-17 sm:left-0 sm:top-12 md:left-30 w-40 sm:w-48 md:w-56 opacity-95 pointer-events-none z-10"
            />
            <div className="rounded-full mb-4 md:mb-6 bg-zinc-800 text-white text-xs px-4 py-2 font-semibold relative z-10 flex justify-between gap-8"><div></div><div>Onyxx the new evolution</div><ArrowRight className="w-4 h-4" /></div>
            <div className="relative z-10 font-inter font-bold text-3xl sm:text-5xl md:text-6xl max-w-xs sm:max-w-xl md:max-w-3xl">
                Your Notes, Always Where You Need Them.
            </div>
            <div className="mt-2 sm:mt-4 md:mt-6 font-inter text-lg sm:text-xl md:text-2xl max-w-xs sm:max-w-xl md:max-w-2xl text-zinc-600">
                Save ideas before they disappear. Keep your thoughts organized and always within reach.
            </div>
            <div className="flex mt-2 sm:mt-4 md:mt-6 justify-around gap-5">
                <Button>Get Started <span className="gap-2"><BookOpen /></span></Button>
                <Button>Premium <span className="gap-2"><DollarSign /></span></Button>
            </div>
        </div>
    )
}

export default Hero