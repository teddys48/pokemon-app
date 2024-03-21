import { Link } from "react-router-dom";
import { Menu } from "./MenuList";
import { NavbarMenuList } from "./NavbarMenu";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    setCurrentPath(document.location.pathname);
  }, []);
  return (
    <>
      <div className="max-sm:hidden flex w-full h-12 justify-evenly items-center text-white font-sans bg-pink-500">
        {Menu.map((data) => {
          return (
            <>
              <Link
                onClick={() => setCurrentPath(data.link)}
                to={data.link}
                className={
                  currentPath == data.link
                    ? "h-full flex justify-center items-center bg-pink-600 px-2"
                    : "h-full flex justify-center items-center hover:bg-pink-600 px-2"
                }
              >
                <span
                  className={
                    currentPath == data.link
                      ? "border-b-2 hover:bg-pink-600 w-full flex text-xl"
                      : "hover:border-b-2 hover:bg-pink-600 w-full flex text-xl"
                  }
                >
                  {data.name}
                </span>
              </Link>
            </>
          );
        })}
      </div>
      <div className="max-sm:flex flex-col hidden max-sm:w-full h-full bg-pink-500 text-white">
        <span
          className="flex w-full justify-end p-1 fa fa-bars text-2xl"
          onClick={() => setToggleMenu((val) => !val)}
        ></span>
        <div
          key={"asasas"}
          className={
            toggleMenu
              ? "flex w-full flex-col justify-center items-center p-2 space-y-2"
              : "hidden"
          }
        >
          {Menu.map((data) => {
            return (
              <>
                <Link
                  key={data.name}
                  onClick={() => setCurrentPath(data.link)}
                  to={data.link}
                  className={
                    currentPath == data.link
                      ? "flex w-full justify-center items-center bg-pink-600 px-2"
                      : "flex w-full justify-center items-center hover:bg-pink-600 px-2"
                  }
                >
                  <span
                    key={data.name}
                    className={
                      currentPath == data.link
                        ? "hover:bg-pink-600 w-full flex justify-center text-xl"
                        : "hover:bg-pink-600 w-full flex justify-center text-xl"
                    }
                  >
                    {data.name}
                  </span>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Navbar };
