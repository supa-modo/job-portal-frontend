import React, { useState } from "react";
import { Calendar } from "lucide-react";
import {
  TbBriefcase,
  TbEdit,
  TbCheck,
  TbX,
  TbPlus,
  TbComponents,
} from "react-icons/tb";
import { BsBuilding } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

// Constants
const INITIAL_COLORS = [
  "bg-blue-100",
  "bg-green-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-yellow-100",
];
const JOB_STATUS_OPTIONS = ["active", "closed", "draft"];

// Utility functions
const splitAndFilter = (text) => {
  if (Array.isArray(text)) {
    return text;
  }
  return text?.split("\n").filter((item) => item.trim()) || [];
};

// Reusable Components
const EditButtons = ({ onSave, onCancel }) => (
  <div className="flex space-x-2">
    <button onClick={onSave} className="text-green-500">
      <TbCheck size={20} />
    </button>
    <button onClick={onCancel} className="text-red-500">
      <TbX size={20} />
    </button>
  </div>
);

const Label = ({ label, onEdit, withBar = false }) => {
  const baseClasses = "flex items-center space-x-4 mb-2";
  const barClasses = withBar ? "border-l-[3px] rounded-l border-blue-500" : "";

  return (
    <div className={`${baseClasses} ${barClasses}`}>
      <h3
        className={`font-extrabold font-nunito ${
          withBar ? "text-gray-600 ml-2" : "text-button"
        }`}
      >
        {label}
      </h3>
      <button onClick={onEdit} className="text-gray-400 hover:text-amber-500">
        <TbEdit size={19} />
      </button>
    </div>
  );
};

const EditableField = ({
  isEditing,
  value,
  onChange,
  type = "text",
  icon,
  renderDisplay,
}) => {
  if (isEditing) {
    const InputComponent = type === "textarea" ? "textarea" : "input";
    const inputProps = type === "textarea" ? { rows: 5 } : {};

    return (
      <InputComponent
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-[90%] p-2 font-semibold text-gray-700 border rounded-md ${
          type === "textarea" ? "min-h-[100px]" : ""
        }`}
        {...inputProps}
      />
    );
  }

  return renderDisplay ? (
    renderDisplay(value)
  ) : (
    <div className="flex items-center">
      {icon && <span className="text-gray-400 mr-2">{icon}</span>}
      <span className="bg-gray-100 font-semibold text-[0.95rem] text-gray-500 border w-[85%] px-3 py-2 rounded-md">
        {value}
      </span>
    </div>
  );
};

const SkillsList = ({ skills, isEditing, onDelete, colors }) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill, i) => (
      <div
        key={i}
        className={`${colors[i % colors.length]} rounded-full px-4 py-1.5 ${
          isEditing ? "flex items-center" : ""
        }`}
      >
        <span className="text-gray-600 text-sm font-nunito font-bold">
          {skill.trim()}
        </span>
        {isEditing && (
          <button
            onClick={() => onDelete(skill)}
            className="ml-2 text-gray-500 hover:text-red-500"
          >
            <TbX size={16} />
          </button>
        )}
      </div>
    ))}
  </div>
);

const JobDetailsGrid = ({ details, isEditing, onEdit, onUpdate }) => {
  return (
    <div className="relative">
      <div className="flex space-x-4 items-center mb-4">
        <h3 className="font-extrabold font-nunito text-button">Job Details</h3>
        <button onClick={onEdit} className="text-gray-400 hover:text-amber-500">
          <TbEdit size={19} />
        </button>
      </div>
      <div className="space-y-4">
        {details.map(({ label, icon: Icon, value, key }) => (
          <div key={key} className="relative">
            <div className="text-sm font-nunito text-gray-500 mb-1 font-semibold">
              {label}
            </div>
            <EditableField
              isEditing={isEditing}
              value={value}
              onChange={(newValue) => onUpdate(key, newValue)}
              icon={<Icon size={20} />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const JobInfoCard = ({ job }) => {
  const [editingField, setEditingField] = useState(null);
  const [editedJob, setEditedJob] = useState({
    ...job,
    skills: Array.isArray(job.skills)
      ? job.skills
      : job.skills?.split("\n") || [],
  });
  const [status, setStatus] = useState("active");
  const [newSkill, setNewSkill] = useState("");

  const handleEdit = (field) => setEditingField(field);
  const handleSave = () => setEditingField(null);
  const handleCancel = () => {
    setEditedJob({ ...job });
    setEditingField(null);
  };

  const updateField = (field, value) => {
    setEditedJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillUpdate = {
    add: () => {
      if (newSkill.trim()) {
        updateField(
          "skills",
          Array.isArray(editedJob.skills)
            ? [...editedJob.skills, newSkill.trim()]
            : [newSkill.trim()]
        );
        setNewSkill("");
      }
    },
    delete: (skillToDelete) => {
      const updatedSkills = splitAndFilter(editedJob.skills).filter(
        (skill) => skill.trim() !== skillToDelete.trim()
      );
      updateField("skills", updatedSkills);
    },
  };

  const renderJobSection = (field, Icon, value) => (
    <div>
      <Label label={field} onEdit={() => handleEdit(field.toLowerCase())} />
      <EditableField
        isEditing={editingField === field.toLowerCase()}
        value={value}
        onChange={(newValue) => updateField(field.toLowerCase(), newValue)}
        icon={<Icon size={20} />}
      />
    </div>
  );

  const renderSkillsSection = () => (
    <div>
      <Label label="Skills" onEdit={() => handleEdit("skills")} />
      <div className="space-y-4">
        <SkillsList
          skills={splitAndFilter(editedJob.skills)}
          isEditing={editingField === "skills"}
          onDelete={handleSkillUpdate.delete}
          colors={INITIAL_COLORS}
        />
        {editingField === "skills" && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
              className="p-2 font-semibold text-gray-600 border rounded-md flex-grow"
              onKeyDown={(e) => e.key === "Enter" && handleSkillUpdate.add()}
            />
            <button
              onClick={handleSkillUpdate.add}
              className="p-2 px-3 text-gray-500 hover:text-amber-500"
            >
              <TbPlus size={26} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const jobDetailsConfig = [
    {
      label: "Work Location",
      icon: MdLocationPin,
      value: editedJob.location,
      key: "location",
    },
    {
      label: "Job Type",
      icon: TbBriefcase,
      value: editedJob.type,
      key: "type",
    },
    {
      label: "Department",
      icon: BsBuilding,
      value: editedJob.department,
      key: "department",
    },
    {
      label: "Experience Level",
      icon: TbBriefcase,
      value: editedJob.experienceLevel,
      key: "experienceLevel",
    },
  ];

  const handleJobDetailUpdate = (key, value) => {
    updateField(key, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg py-10 px-10">
      {/* Header Section */}
      <div className=" mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-6 flex-grow">
            <h1 className="text-2xl font-extrabold font-nunito text-amber-700">
              <EditableField
                isEditing={editingField === "title"}
                value={editedJob.title}
                onChange={(value) => updateField("title", value)}
                renderDisplay={(value) => value}
              />
            </h1>
            {editingField === "title" ? (
              <EditButtons onSave={handleSave} onCancel={handleCancel} />
            ) : (
              <button
                onClick={() => handleEdit("title")}
                className="text-gray-400 hover:text-amber-500"
              >
                <TbEdit size={20} />
              </button>
            )}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="py-1.5 px-4 text-[0.95rem] border rounded-xl font-semibold  border-primary bg-gray-200 text-primary hover:border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              {JOB_STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="pl-4 pr-14">
          <Label
            label="Job Description"
            onEdit={() => handleEdit("description")}
          />
          <EditableField
            isEditing={editingField === "description"}
            value={editedJob.description}
            onChange={(value) => updateField("description", value)}
            type="textarea"
            renderDisplay={(value) => (
              <div className="text-gray-600 ">{value}</div>
            )}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8 border border-gray-200 p-8 rounded-xl">
        {/* Left Column */}
        <div className="w-[30%] space-y-6 border-r-2">
          <JobDetailsGrid
            details={jobDetailsConfig}
            isEditing={editingField === "jobDetails"}
            onEdit={() => handleEdit("jobDetails")}
            onUpdate={handleJobDetailUpdate}
          />
          {renderSkillsSection()}
          {renderJobSection(
            "Application Deadline",
            Calendar,
            editedJob.deadline
          )}

          <div>
            <Label label="Application Link" onEdit={() => handleEdit("link")} />
            <EditableField
              isEditing={editingField === "link"}
              value={editedJob.link}
              onChange={(value) => updateField("link", value)}
              renderDisplay={(value) => (
                <a
                  href={value}
                  className="text-amber-600 hover:text-amber-700 underline"
                >
                  Apply Now
                </a>
              )}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[70%] space-y-8">
          {["Responsibilities", "Requirements", "Benefits"].map((section) => (
            <div key={section}>
              <Label
                label={section}
                onEdit={() => handleEdit(section.toLowerCase())}
                withBar
              />
              <EditableField
                isEditing={editingField === section.toLowerCase()}
                value={editedJob[section.toLowerCase()]}
                onChange={(value) => updateField(section.toLowerCase(), value)}
                type="textarea"
                renderDisplay={(value) => (
                  <div className="space-y-2">
                    {splitAndFilter(value).map((item, i) => (
                      <div key={i} className="flex items-start">
                        <TbComponents
                          size={12}
                          className="mr-2 mt-1.5 text-amber-700"
                        />

                        <span className="text-gray-600">{item.trim()}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      {editingField && (
        <div className="fixed bottom-4 right-4 flex space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default JobInfoCard;
