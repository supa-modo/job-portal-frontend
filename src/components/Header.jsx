import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b bg-white">
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-gray-400"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <BellIcon className="h-6 w-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <UserCircleIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;
