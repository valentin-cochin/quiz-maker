import { Link } from "react-router-dom";

interface MenuLinkProps {
  to: string;
  label: string;
}

export default function MenuLink({ to, label }: MenuLinkProps) {
  return (
    <Link to={to} className="hover:underline">
      {label}
    </Link>
  );
}
