import ReactLogo from "../../../assets/react-logo.svg";
import MenuLink from "../MenuLink/MenuLink.tsx";

export default function Header() {
  return (
    <header className="bg-nearBlack text-nearWhite p-4">
      <nav>
        <ul className="flex space-x-4 items-center">
          <li className="flex items-center">
            <img
              src={ReactLogo}
              alt="React Logo"
              className="h-8 w-8 mr-2 inline transition-transform duration-500 ease-in-out transform hover:rotate-180"
            />
            <MenuLink to="/" label="Home" />
          </li>
          <li className="relative group">
            <MenuLink to="/quiz" label="Quiz" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
