import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  
  // Create a mapping of routes to breadcrumb names
  const breadcrumbNameMap = {
    '/dashboard': 'Dashboard',
    '/profile': 'Profile',

    '/contact/list': 'Manage Contact',
    '/contact/edit': 'Edit Contact',

    '/category/list': 'Manage Category',
    '/category/edit': 'Edit Category',
    '/category/add': 'Add Category',

    '/product/list': 'Manage Product',
    '/product/edit': 'Edit Product',
    '/product/edit-image': 'Edit Product Image',
    '/product/add': 'Add Product',

    '/discount/list': 'Manage Discount',
    '/discount/edit': 'Edit Discount',
    '/discount/add': 'Add Discount',

    '/customer/list': 'Manage Customer',
    '/customer/edit': 'Edit Customer',

    '/order/list': 'Manage Order',
    '/order/edit': 'Edit Order',
    '/order/add': 'Add Order',

    '/user/list': 'Manage User',
    '/user/edit/:user_id': 'Edit User',
    '/user/add': 'Add User',
    
  };

  // Get the current path and split it into segments
  const pathnames = location.pathname.split("/").filter((x) => x).slice(1);
  if (!isNaN(pathnames[pathnames.length - 1])) {
    pathnames.pop();
  }

  return (
    <div className="px-6 py-5 mt-[73px]">
      <nav className="text-sm text-gray-600 flex items-center">
        {/* Home Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        
        {pathnames.map((value, index) => {
          const fullPath = `/${pathnames.slice(0, index + 1).join("/")}`;
          
          return (
            <React.Fragment key={fullPath}>
              {/* Arrow separator */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
              
              {/* Breadcrumb link */} 
              <span>{breadcrumbNameMap[fullPath] || value.charAt(0).toUpperCase() + value.slice(1)}</span>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
