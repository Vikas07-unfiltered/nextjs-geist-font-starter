"use client";

import Image from "next/image";

export function Doodles() {
    return (
        <div className="fixed inset-0 pointer-events-none select-none overflow-hidden">
            {/* Top left squiggle */}
            <div className="absolute top-20 left-[5%] w-24 h-24 text-gray-200/50 animate-float">
                <Image src="/doodles/squiggle.svg" alt="Squiggle Doodle" width={96} height={96} className="rotate-45" />
            </div>

            {/* Top right circle */}
            <div className="absolute top-40 right-[10%] w-32 h-32 text-gray-200/50 animate-[spin_20s_linear_infinite]">
                <Image src="/doodles/circle.svg" alt="Circle Doodle" width={128} height={128} />
            </div>

            {/* Bottom right dots */}
            <div className="absolute bottom-40 right-[5%] w-20 h-20 text-gray-200/50 animate-bounce">
                <Image src="/doodles/dots.svg" alt="Dots Doodle" width={80} height={80} className="-rotate-12" />
            </div>

            {/* Middle left circle */}
            <div className="absolute top-[40%] left-[8%] w-24 h-24 text-gray-200/50 animate-[spin_15s_linear_infinite]">
                <Image src="/doodles/circle.svg" alt="Circle Doodle" width={96} height={96} />
            </div>

            {/* Bottom left squiggle */}
            <div className="absolute bottom-32 left-[15%] w-16 h-16 text-gray-200/50 animate-float">
                <Image src="/doodles/squiggle.svg" alt="Squiggle Doodle" width={64} height={64} className="-rotate-12" />
            </div>

            {/* Middle right dots */}
            <div className="absolute top-[60%] right-[12%] w-16 h-16 text-gray-200/50 animate-bounce">
                <Image src="/doodles/dots.svg" alt="Dots Doodle" width={64} height={64} className="rotate-45" />
            </div>

            {/* Extra doodles for more visual interest */}
            <div className="absolute top-[30%] right-[25%] w-20 h-20 text-gray-200/50 animate-float">
                <Image src="/doodles/squiggle.svg" alt="Squiggle Doodle" width={80} height={80} className="rotate-90" />
            </div>

            <div className="absolute bottom-[20%] left-[30%] w-28 h-28 text-gray-200/50 animate-[spin_25s_linear_infinite]">
                <Image src="/doodles/circle.svg" alt="Circle Doodle" width={112} height={112} />
            </div>

            <div className="absolute top-[70%] left-[20%] w-12 h-12 text-gray-200/50 animate-bounce">
                <Image src="/doodles/dots.svg" alt="Dots Doodle" width={48} height={48} className="rotate-180" />
            </div>
        </div>
    );
}
