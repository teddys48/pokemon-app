import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarMenuList = ({ name, path }) => {
  const [currentPath, setCurrentPath] = useState("");

  const setPath = () => {
    let pathname = document.location.pathname;
    setCurrentPath(pathname);
  };

  useEffect(() => {
    setCurrentPath(document.location.pathname);
  }, []);

  console.log(currentPath, path);
  return (
    <>
      <Link
        // onClick={() => setCurrentPath(path)}
        to={path}
        className={
          //   currentPath == path
          //     ? "h-full flex justify-center items-center bg-pink-600 px-2"
          "h-full flex justify-center items-center hover:bg-pink-600 px-2"
        }
      >
        <span
          className={
            // currentPath == path
            //   ? "hover:border-b-2 hover:bg-pink-600 w-full flex text-xl"
            "hover:border-b-2 hover:bg-pink-600 w-full flex text-xl"
          }
        >
          {name}
        </span>
      </Link>
    </>
  );
};

export { NavbarMenuList };
