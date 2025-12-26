import { AuthContext } from "@/contexts/AuthContext";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { useContext } from 'react';
export default function ModeDisplay() {
    const { mode } = useContext(AuthContext)


    const modeText = `Mode: ${capitalizeFirstLetter(mode)}`
    const badgeStyle = "bg-zinc-900 border-2 border-zinc-500 text-stone-50 h-6 px-4 py-2 rounded-md flex items-center justify-center"
    return (
        <div className="flex items-center justify-center">
            <span className={badgeStyle}>{modeText}</span>
        </div>
    );
}