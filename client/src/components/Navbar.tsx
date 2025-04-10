import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navbar = () => {
  const[isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const activeStyle = "text-white bg-amber-600 p-4"
  function handleNav() {
    setIsOpen(!isOpen)
  }
  
  return (
    <div>
      <div className="flex justify-between p-6 items-center bg-neutral-800">
        <div>
          <Link to='/'><h1 className="font-bold text-2xl text-amber-600">PyGuess</h1></Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-2.5 text-amber-600 cursor-pointer items-center">
            <Link to="/"><li className={location.pathname == "/" ? activeStyle : ""}>Home</li></Link>
            <AnchorLink href="#about" className={location.pathname == "/about" ? activeStyle : ""}><li>About</li></AnchorLink>
            <Link to="/contact" className={location.pathname == "/contact" ? activeStyle : ""}><li>Contact us</li></Link>
            <Link to="/login" className={location.pathname == "/login" ? activeStyle : ""}><li>Login</li></Link>
            <Link to="/register" className={location.pathname == "/register" ? activeStyle : ""}><li>Register</li></Link>
          </ul>
        </div>
        
        {isOpen ? <AiOutlineClose onClick={handleNav} size={30} className="text-amber-600 md:hidden" /> : <GiHamburgerMenu onClick={handleNav} size={30} className="text-amber-600 md:hidden"/>}
      </div>
      <div className={isOpen ? "absolute w-[40%] bg-neutral-800 opacity-80" : "hidden"}>
          <ul className="flex flex-col text-center text-white font-medium md:hidden">
            <Link to="/"><li className={location.pathname == "/" ? activeStyle : "p-4"}>Home</li></Link>
            <AnchorLink href="#about"><li className={location.pathname == "#about" ? activeStyle : "p-4"}>About</li></AnchorLink>
            <Link to="/contact"><li className={location.pathname == "/contact" ? activeStyle : "p-4"}>Contact us</li></Link>
            <Link to="/login"><li className={location.pathname == "/login" ? activeStyle : "p-4"}>Login</li></Link>
            <Link to="/register"><li className={location.pathname == "/register" ? activeStyle : "p-4"}>Register</li></Link>
          </ul>
      </div>
    </div>
  )
}

export default Navbar