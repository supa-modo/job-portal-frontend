import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const SkillTag = ({ skill, onDelete, isEditing }) => {
  return (
    <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm m-1 relative">
      {skill}
      {isEditing && (
        <button
          onClick={() => onDelete(skill)}
          className="ml-2 hover:text-red-600 focus:outline-none"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

const SkillsSection = ({ editedJob, setEditedJob, isEditing }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleDeleteSkill = (skillToDelete) => {
    const updatedSkills = editedJob.skills
      .split(" ")
      .filter((skill) => skill !== skillToDelete)
      .join(" ");
    setEditedJob({ ...editedJob, skills: updatedSkills });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      const updatedSkills = `${editedJob.skills} ${newSkill.trim()}`;
      setEditedJob({ ...editedJob, skills: updatedSkills });
      setNewSkill("");
    }
  };

  const skills = (editedJob.skills || "React TypeScript Node.js")
    .split(" ")
    .filter(Boolean);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <SkillTag
            key={`${skill}-${index}`}
            skill={skill}
            onDelete={handleDeleteSkill}
            isEditing={isEditing}
          />
        ))}
        {isEditing && (
          <form onSubmit={handleAddSkill} className="inline-flex items-center">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill..."
              className="border border-gray-300 rounded-l-full px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-100 text-blue-800 rounded-r-full px-2 py-1 hover:bg-blue-200 focus:outline-none"
            >
              <Plus size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
