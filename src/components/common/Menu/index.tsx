// import { NavDropdownContext } from '../Nav';

import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                    Menu                                    */
/* -------------------------------------------------------------------------- */

const Menu: React.FC<React.HtmlHTMLAttributes<HTMLUListElement> & { width?: string | number }> = ({
  className,
  children,
  width,
  ...props
}) => {
  return (
    <ul
      className={`grid grid-cols-1 gap-y-1 ${className !== undefined ? className : ''}`}
      style={{ width }}
      {...props}>
      {children}
    </ul>
  );
};

export default Menu;

/* -------------------------------------------------------------------------- */
/*                                 Menu Button                                */
/* -------------------------------------------------------------------------- */

// export interface MenuButtonProps {
//   icon?: React.ReactElement;
// }

// export const MenuButton: React.FC<MenuButtonProps & React.HTMLAttributes<HTMLButtonElement>> = ({
//   className,
//   icon,
//   ...props
// }) => {
//   const { setIsDropdownOpen } = React.useContext(NavDropdownContext);
//   return (
//     <button
//       {...props}
//       className={`flex items-center py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors focus:bg-gray-100 focus:outline-none ${
//         className !== undefined ? className : ''
//       }`}
//       onClick={(event) => {
//         props.onClick && props.onClick(event);
//         setIsDropdownOpen(false);
//       }}>
//       {icon && (
//         <div
//           className="flex items-center justify-center mr-3 bg-gray-300 rounded-full dark:bg-gray-700"
//           style={{ width: 36, height: 36 }}>
//           {icon}
//         </div>
//       )}
//       <span className="text-sm font-medium">{props.children}</span>
//     </button>
//   );
// };

/* -------------------------------------------------------------------------- */
/*                                  Menu Link                                 */
/* -------------------------------------------------------------------------- */
// export interface MenuLinkProps extends LinkProps {
//   icon?: React.ReactElement;
//   text?: string;
//   fontSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
// }

// export const MenuLink: React.FC<MenuLinkProps> = ({
//   children,
//   className,
//   icon,
//   text,
//   fontSize = 'text-sm',
//   ...props
// }) => {
//   const { pathname } = useLocation();
//   const { setIsDropdownOpen } = React.useContext(NavDropdownContext);
//   return (
//     <Link
//       {...props}
//       replace={props.replace !== undefined ? props.replace : props.to === pathname}
//       className={`flex items-center py-1 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 dark:focus:bg-gray-500 transition-colors focus:bg-gray-100 ${
//         className !== undefined ? className : ''
//       }`}
//       onClick={(event) => {
//         props.onClick && props.onClick(event);
//         setIsDropdownOpen(false);
//       }}>
//       {icon && (
//         <div
//           className="flex items-center justify-center mr-3 bg-gray-300 rounded-full dark:bg-gray-700 dark:text-white"
//           style={{ width: 36, height: 36 }}>
//           {icon}
//         </div>
//       )}

//       <span className={`${fontSize} font-medium dark:text-white`}>{children || text}</span>
//     </Link>
//   );
// };
