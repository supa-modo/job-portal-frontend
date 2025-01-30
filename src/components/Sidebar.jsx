import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  InboxIcon,
  CalendarIcon,
  BriefcaseIcon,
  UserGroupIcon,
  UserIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
  TbBriefcase,
  TbBriefcaseFilled,
  TbCalendarCheck,
  TbChevronLeft,
  TbChevronRight,
  TbWorld,
} from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosCalendar } from "react-icons/io";
import { FaCalendar, FaRegCalendarAlt } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiUserCheckDuotone } from "react-icons/pi";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("employees");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      category: "",
      items: [
        {
          id: "dashboard",
          icon: MdSpaceDashboard,
          label: "Dashboard",
          link: "/",
        },
        // { id: "inbox", icon: InboxIcon, label: "Inbox", link: "/inbox" },
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
        className={`absolute top-4 transition-all duration-300 bg-gray-700 py-2 px-1 rounded-lg hover:bg-gray-600 ${
          isCollapsed ? "left-1/2 -translate-x-1/2" : "right-1"
        }`}
      >
        {isCollapsed ? (
          <TbChevronRight size={20} />
        ) : (
          <TbChevronLeft size={20} />
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
              <div className="mb-6 flex items-center space-x-4 border-b pb-4">
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
                  className="h-10 w-10 rounded-full"
                />
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav>
            {menuItems.map((item) => (
              <div key={item.category || item.id} className="mb-6">
                {item.category && !isCollapsed && (
                  <div className="text-gray-400 text-xs mb-2 px-4">
                    {item.category}
                  </div>
                )}

                {(item.items || [item]).map((menuItem) => {
                  const Icon = menuItem.icon;
                  return (
                    <div key={menuItem.id} className="group relative">
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {menuItem.label}
                        </div>
                      )}

                      <Link
                        to={menuItem.link}
                        className={`flex items-center ${
                          isCollapsed ? "justify-center" : "px-4"
                        } py-2 rounded-lg mb-2 ${
                          activeItem === menuItem.id
                            ? "bg-blue-600"
                            : "hover:bg-gray-700"
                        } transition-all duration-200`}
                        onClick={() => setActiveItem(menuItem.id)}
                      >
                        <Icon className={`h-6 w-6 ${!isCollapsed && "mr-3"}`} />
                        {!isCollapsed && <span>{menuItem.label}</span>}
                      </Link>
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button - Always at the Bottom */}
        <div className="mt-auto">
          <button className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-700 rounded-lg">
            <UserIcon className="h-6 w-6 mr-3" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
