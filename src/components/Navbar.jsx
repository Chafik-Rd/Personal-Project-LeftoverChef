import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-beige-200 backdrop-blur-md border-b-1 border-brown-600">
      <div className="flex px-6 md:px-8 py-4 h-16 justify-between items-center">
        <section>
          <Link to="/">
            <p className="text-brown-700 text-2xl md:text-4xl font-bold">
              LeftoverChef
            </p>
          </Link>
        </section>
        <Link to="login">
          <UserRound strokeWidth={1.5} color="#000000" size={32} />
        </Link>
      </div>
    </nav>
  );
};
