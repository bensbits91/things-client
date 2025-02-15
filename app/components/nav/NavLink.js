import Link from 'next/link';

const NavLink = ({ href, children }) => (
   <Link href={href} className='nav-link'>
      {children}
   </Link>
);

export default NavLink;
