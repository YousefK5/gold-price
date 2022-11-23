import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink , useNavigate } from 'react-router-dom';
import logo from './logo.png';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example({logged , setLogged}) {
    const [currentPage , setCurrentPage] = useState('Home');
    let navigation = [
      { name: 'Home', href: '/', current: currentPage=='Home' },
      { name: 'About', href: 'about', current:  currentPage=='About' },
      { name: 'Contact', href: 'contact', current:  currentPage=='Contact' },
      { name: 'Shop', href: 'shop', current:  currentPage=='Shop' },
    ]
    const navigate = useNavigate();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16  justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-15"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to= {item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        onClick={()=>setCurrentPage(item.name)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      {localStorage.getItem('loggedin') ? 
                      <div className='text-white mr-2 mt-2'>Welcome , {localStorage.getItem('loggedname')} </div>
                      : '' }
                      <img
                        className="h-8 w-8 rounded-full"
                        src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {localStorage.getItem('loggedin') ? 
                    <>
                    <Menu.Item>
                    {({ active }) => (
                      <Link
                        to='/cart'
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Cart
                      </Link>
                    )}
                  </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                      <Link
                        onClick={()=>{
                          localStorage.removeItem('loggedin');
                          localStorage.removeItem('loggedname');
                          localStorage.removeItem('cart');
                          setLogged(!logged);
                          const MySwal = withReactContent(Swal)
                           MySwal.fire({
                            title: <strong>See You Soon</strong>,
                            html: <i>You will go to Home Page</i>,
                            icon: 'success',
                            timer: 3000
                        })
                        setTimeout(() => {
                            navigate('/');
                        }, 3000);
                        }}
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        logout
                      </Link>
                    )}
                  </Menu.Item>
                  </>
                  :
                    <> 
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/login'
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={()=>setCurrentPage("Login")}
                          >
                            Login
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/signup"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={()=>setCurrentPage("Signup")}
                          >
                            Sign Up
                          </Link>
                        )}
                      </Menu.Item>
                      </> 
                      
                    }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
