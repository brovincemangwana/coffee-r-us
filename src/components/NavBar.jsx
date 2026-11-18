import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/admin">Admin Portal</NavLink>
    </nav>
  );
}

export default NavBar;