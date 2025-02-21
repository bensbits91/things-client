import NavLink from './NavLink';

const NavBar = () => {
   return (
      <nav style={{ marginBottom: 24, padding: 12}}>
         <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-between' }}>
            <li>
               <NavLink href='/'>Home</NavLink>
            </li>
            <li>
               <NavLink href='/things'>Things</NavLink>
            </li>
            <li>
               <NavLink href='/search'>Search</NavLink>
            </li>
         </ul>
      </nav>
   );
};

export default NavBar;
