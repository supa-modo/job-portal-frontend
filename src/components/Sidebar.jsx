import { useState } from "react";
import { Link } from "react-router-dom";
import { ChartBarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import {
  TbBriefcase,
  TbCalendarCheck,
  TbLayoutSidebar,
  TbLayoutSidebarFilled,
  TbWorld,
} from "react-icons/tb";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiUserCheckDuotone } from "react-icons/pi";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      category: "HOME",
      items: [
        {
          id: "dashboard",
          icon: MdSpaceDashboard,
          label: "Dashboard",
          link: "/",
        },
        {
          id: "calendar",
          icon: TbCalendarCheck,
          label: "Calendar",
          link: "/calendar",
        },
      ],
    },
    {
      category: "RECRUITMENT",
      items: [
        { id: "jobs", icon: TbBriefcase, label: "Jobs", link: "/jobs" },
        {
          id: "candidates",
          icon: HiMiniUserGroup,
          label: "Candidates",
          link: "/candidates",
        },
        {
          id: "shortlisted",
          icon: PiUserCheckDuotone,
          label: "Shortlisted",
          link: "/shortlisted",
        },
        {
          id: "careers",
          icon: TbWorld,
          label: "Careers View",
          link: "/careers",
        },
      ],
    },
    {
      category: "SYSTEM",
      items: [
        {
          id: "reports",
          icon: ChartBarIcon,
          label: "Reports",
          link: "/reports",
        },
        {
          id: "settings",
          icon: Cog6ToothIcon,
          label: "Settings",
          link: "/settings",
        },
      ],
    },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-sidebar text-white p-4 left-0 top-0 transition-all duration-300 ease-in-out relative flex flex-col`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-4 transition-all duration-300 py-2 px-2 rounded-lg hover:bg-gray-500 ${
          isCollapsed ? "left-1/2 -translate-x-1/2" : "right-1"
        }`}
      >
        {isCollapsed ? (
          <TbLayoutSidebarFilled className="" size={28} />
        ) : (
          <TbLayoutSidebar size={28} />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Header Section */}
          <div
            className={`flex flex-col items-center ${
              isCollapsed ? "mt-14" : "mt-0"
            }`}
          >
            {!isCollapsed ? (
              <div className="mb-10 flex items-center space-x-4 border-b border-gray-500 pb-4">
                <img src="/joblogo.jpg" alt="Logo" className="h-14" />
                <span className="font-semibold uppercase">
                  Job Listings Recruitment
                </span>
              </div>
            ) : (
              <div className="mb-6 flex items-center justify-center">
                <img
                  src="/joblogo.jpg"
                  alt="Logo"
                  className="h-12 w-12 rounded-full"
                />
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav>
            {menuItems.map((item) => (
              <div key={item.category || item.id} className="mb-6">
                {item.category && !isCollapsed && (
                  <div className="text-gray-400  text-xs mb-3 px-4">
                    {item.category}
                  </div>
                )}

                {(item.items || [item]).map((menuItem) => {
                  const Icon = menuItem.icon;
                  return (
                    <div key={menuItem.id} className="group relative">
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white  text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {menuItem.label}
                        </div>
                      )}

                      <Link
                        to={menuItem.link}
                        className={`flex items-center ${
                          isCollapsed ? "justify-center" : "px-4"
                        } py-2 rounded-lg mb-2 ${
                          activeItem === menuItem.id
                            ? "bg-amber-600"
                            : "hover:bg-gray-500"
                        } transition-all duration-200`}
                        onClick={() => setActiveItem(menuItem.id)}
                      >
                        <Icon className={`h-6 w-6 ${!isCollapsed && "mr-3"}`} />
                        {!isCollapsed && (
                          <span className="font-semibold font-nunito">
                            {menuItem.label}
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button - Always at the Bottom */}
        <div className=" mt-auto border-t border-gray-500 pt-3">
          <button
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "px-4"
            } w-full  py-2 text-red-400 hover:bg-red-300 hover:text-red-600 rounded-lg transition-all duration-200`}
          >
            <MdLogout className={`h-6 w-6 ${!isCollapsed && "mr-3"}`} />
            {!isCollapsed && <span className="font-semibold">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
