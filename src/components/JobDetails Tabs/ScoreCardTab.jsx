import React, { useState } from "react";
import { Plus, X, Edit2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { PiTrashDuotone, PiTrashSimpleDuotone } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";

const ScoreCard = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Technical Skills",
      isOpen: true,
      skills: [
        {
          id: 1,
          name: "Web Development with React",
          weight: 30,
          requiredScore: 4,
        },
        {
          id: 2,
          name: "API Integration to frontend",
          weight: 20,
          requiredScore: 3,
        },
      ],
    },
    {
      id: 2,
      title: "Soft Skills",
      isOpen: true,
      skills: [
        {
          id: 3,
          name: "Language & Communication",
          weight: 25,
          requiredScore: 4,
        },
        {
          id: 4,
          name: "Adaptability & Problem-Solving",
          weight: 25,
          requiredScore: 3,
        },
        { id: 4, name: "Team Collaboration ", weight: 25, requiredScore: 3 },
      ],
    },
  ]);

  const [editingSection, setEditingSection] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showNewSectionInput, setShowNewSectionInput] = useState(false);

  const getTotalWeight = (skills) => {
    return skills.reduce((total, skill) => total + skill.weight, 0);
  };

  const toggleSection = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const addNewSection = () => {
    if (newSectionTitle.trim()) {
      setSections([
        ...sections,
        {
          id: Date.now(),
          title: newSectionTitle,
          isOpen: true,
          skills: [],
        },
      ]);
      setNewSectionTitle("");
      setShowNewSectionInput(false);
    }
  };

  const addNewSkill = (sectionId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            skills: [
              ...section.skills,
              {
                id: Date.now(),
                name: "New Skill",
                weight: 0,
                requiredScore: 5,
              },
            ],
          };
        }
        return section;
      })
    );
  };

  const updateSkill = (sectionId, skillId, updates) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            skills: section.skills.map((skill) =>
              skill.id === skillId ? { ...skill, ...updates } : skill
            ),
          };
        }
        return section;
      })
    );
  };

  const deleteSkill = (sectionId, skillId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            skills: section.skills.filter((skill) => skill.id !== skillId),
          };
        }
        return section;
      })
    );
  };

  const deleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  return (
    <div className="w-full mx-auto px-8 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-500">
          Candidate Evaluation Scorecard
        </h1>
        <button
          onClick={() => setShowNewSectionInput(true)}
          className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus size={20} />
          Add Evaluation Section
        </button>
      </div>

      {showNewSectionInput && (
        <div className="flex gap-2 items-center mb-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter section title"
            className="flex-1 px-4 py-2 font-semibold text-gray-600 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-primary-light"
          />
          <button
            onClick={addNewSection}
            className="px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => setShowNewSectionInput(false)}
            className="px-4 py-2 bg-gray-300 border text-red-500 rounded-lg hover:bg-gray-400"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-4 ">
              <button
                onClick={() => toggleSection(section.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                {section.isOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {editingSection === section.id ? (
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    setSections(
                      sections.map((s) =>
                        s.id === section.id
                          ? { ...s, title: e.target.value }
                          : s
                      )
                    );
                  }}
                  className="px-2 py-1 border rounded"
                  onBlur={() => setEditingSection(null)}
                  autoFocus
                />
              ) : (
                <h2 className="text-lg font-semibold text-amber-700 ">
                  {section.title}
                </h2>
              )}
            </div>
            <div className="flex items-center gap-8 pr-8 ">
              <span className="text-sm text-gray-600">
                Total Weight:{" "}
                <span className="font-bold text-amber-600 font-nunito">
                  {getTotalWeight(section.skills)}%
                </span>
              </span>
              <button
                onClick={() => addNewSkill(section.id)}
                className="flex items-center gap-3 font-semibold text-primary hover:text-gray-800"
              >
                <Plus size={24} /> Add Test
              </button>
              <button
                onClick={() => deleteSection(section.id)}
                className="flex items-center gap-3 font-semibold p-1 text-red-600 hover:text-red-800"
              >
                <PiTrashDuotone size={24} /> Delete Section
              </button>
            </div>
          </div>

          {section.isOpen && (
            <div className="p-4 space-y-4 pr-14">
              {section.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 font-semibold  rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {editingSkill === skill.id ? (
                    <>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) =>
                          updateSkill(section.id, skill.id, {
                            name: e.target.value,
                          })
                        }
                        className="flex-1 px-2 py-1 border rounded"
                        onBlur={() => setEditingSkill(null)}
                        autoFocus
                      />
                      <input
                        type="number"
                        value={skill.weight}
                        onChange={(e) =>
                          updateSkill(section.id, skill.id, {
                            weight: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-20 px-2 py-1 border rounded"
                        min="0"
                        max="100"
                      />
                      <input
                        type="number"
                        value={skill.requiredScore}
                        onChange={(e) =>
                          updateSkill(section.id, skill.id, {
                            requiredScore: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-20 px-2 py-1 border rounded"
                        min="0"
                        max="10"
                      />
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-gray-500">{skill.name}</span>
                      <span className="w-24 text-center font-nunito font-bold text-gray-500">
                        {skill.weight}%
                      </span>
                      <div className="flex justify-center">
                        {/* <span className="text-gray-500">Required: </span> */}
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`w-2 h-5 rounded-full mx-1 ${
                              i < skill.requiredScore
                                ? "bg-primary/85"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="flex pl-6 gap-6">
                    <button
                      onClick={() =>
                        setEditingSkill(
                          editingSkill === skill.id ? null : skill.id
                        )
                      }
                      className="p-1 flex items-center gap-2.5 text-gray-600 hover:text-gray-800"
                    >
                      <TbEdit size={18} /> Edit
                    </button>
                    <button
                      onClick={() => deleteSkill(section.id, skill.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScoreCard;
