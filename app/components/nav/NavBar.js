import NavLink from './NavLink';

const NavBar = () => {
   return (
      <nav>
         <ul>
            <li>
               <NavLink href='/'>Home</NavLink>
            </li>
            <li>
               <NavLink href='/things'>Things</NavLink>
            </li>
            <li>
               <NavLink href='/new'>New</NavLink>
            </li>
         </ul>
      </nav>
   );
};

export default NavBar;
