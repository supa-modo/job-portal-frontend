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

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("employees");

  const menuItems = [
    { id: "dashboard", icon: HomeIcon, label: "Dashboard", link: "/" },
    { id: "inbox", icon: InboxIcon, label: "Inbox", link: "/inbox" },
    {
      id: "calendar",
      icon: CalendarIcon,
      label: "Calendar",
      link: "/calendar",
    },
    {
      category: "RECRUITMENT",
      items: [
        { id: "jobs", icon: BriefcaseIcon, label: "Jobs", link: "/jobs" },
        {
          id: "candidates",
          icon: UserGroupIcon,
          label: "Candidates",
          link: "/candidates",
        },
        {
          id: "referrals",
          icon: UserIcon,
          label: "My referrals",
          link: "/referrals",
        },
      ],
    },
    {
      category: "ORGANIZATION",
      items: [
        {
          id: "employees",
          icon: UserGroupIcon,
          label: "Employee",
          link: "/employees",
        },
        {
          id: "structure",
          icon: ChartBarIcon,
          label: "Structure",
          link: "/structure",
        },
        {
          id: "reports",
          icon: ChartBarIcon,
          label: "Report",
          link: "/reports",
        },
        {
          id: "settings",
          icon: Cog6ToothIcon,
          label: "Setting",
          link: "/settings",
        },
      ],
    },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar text-white p-4 fixed left-0 top-0">
      <div className="mb-8">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>

      <nav>
        {menuItems.map((item) => (
          <div key={item.category || item.id} className="mb-6">
            {item.category && (
              <div className="text-gray-400 text-xs mb-2 px-4">
                {item.category}
              </div>
            )}

            {(item.items || [item]).map((menuItem) => {
              const Icon = menuItem.icon;
              return (
                <Link
                  key={menuItem.id}
                  to={menuItem.link}
                  className={`flex items-center px-4 py-2 rounded-lg mb-1 ${
                    activeItem === menuItem.id
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveItem(menuItem.id)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{menuItem.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
