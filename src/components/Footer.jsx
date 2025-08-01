import { Copyright } from "lucide-react";
export const Footer = () => {
    return (
        <div className="flex items-center px-8 py-4 h-15 bg-beige-400 text-brown-700">
            <Copyright strokeWidth={1.5} size={16} />
            <p> 2025 LeftoverChef. All rights reserved.</p>
        </div>
    )
}