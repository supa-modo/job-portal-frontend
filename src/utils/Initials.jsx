// Utility function to get initials
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Reusable InitialsAvatar Component
export const InitialsAvatar = ({ name, email }) => {
  const initials = getInitials(name);
  return (
    <div className="flex items-center">
      <div
        className="w-10 h-10 rounded-full bg-gray-400 text-white 
          flex items-center justify-center font-semibold mr-4  
          shadow-sm text-sm"
      >
        {initials}
      </div>
      <div>
        <div className="font-bold font-nunito tracking-tight text-[0.94rem] text-gray-600">{name}</div>
        <div className="text-sm font-sans text-gray-500">{email}</div>
      </div>
    </div>
  );
};
