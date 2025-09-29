import { Link } from "react-router";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Properties",
    href: "/property",
  },
  {
    name: "Reviews",
    href: "/Reviews",
  },
];

const Sidebar = () => {
  const pathname = "";

  return (
    <nav className="flex- w-[300px] flex-col items-center justify-center border p-5">
      <div className="flex gap-1 items-end">
        <img src={"/logo.png"} alt="the flex" width={50} height={50} />
        <h3 className="text-2xl mb-1">The Flex</h3>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        {navItems.map((item) => (
          <Link
            to={item.href}
            key={item.name}
            className={`text-lg  p-2 ${
              pathname === item.href
                ? "bg-blue-500 text-white rounded-md"
                : "hover:bg-gray-200 hover:rounded-md"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
