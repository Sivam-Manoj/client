import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex bg-slate-800 text-white h-11  justify-evenly">
      <div className="text-4xl text-red-500">spm task</div>

      <nav>
        <ul className="flex gap-11 pt-3">
          <li>
            <Link href="/">Add Car</Link>
          </li>
          <li>
            <Link href="/pages/cars">Car database</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
