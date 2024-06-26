import {Link,NavLink} from 'react-router-dom'
import Logo from '../../assets/images/logo2.svg';
export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={Logo}
                            // src="https://alexharkness.com/wp-content/uploads/2020/06/logo-4.png"
                            className="mr-3 h-12  rounded-lg bg-white"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2" >
                        <button  className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ">

                       
                        <Link
                           
                            to="#"
                            className="text-primary border-solid border-2 border-primary bg-white    font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.25 mr-2 focus:outline-none"
                        >Get Started
                        </Link>
                        </button>
                
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to=""
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200
                                     border-b ${isActive ? "text-secondary" : "text-primary"}
                                      border-gray-100 hover:bg-primary lg:hover:bg-transparent lg:border-0
                                       hover:text-secondary lg:p-0`
                                    }
                                    // call back ->var(isactive)
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200
                                     border-b ${isActive ? "text-secondary" : "text-primary"}
                                      border-gray-100 hover:bg-primary lg:hover:bg-transparent lg:border-0
                                       hover:text-secondary lg:p-0`
                                    }
                                    // call back ->var(isactive)
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200
                                     border-b ${isActive ? "text-secondary" : "text-primary"}
                                      border-gray-100 hover:bg-primary lg:hover:bg-transparent lg:border-0
                                       hover:text-secondary lg:p-0`
                                    }
                                    // call back ->var(isactive)
                                >
                                    Contact
                                </NavLink>
                            </li>
                            
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
