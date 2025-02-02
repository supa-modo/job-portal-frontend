import React, { useState } from "react";
import { Plus, X, Edit2, Check, ChevronDown, ChevronUp } from "lucide-react";

const ScoreCard = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Technical Skills",
      isOpen: true,
      skills: [
        { id: 1, name: "React Development", weight: 30, requiredScore: 8 },
        { id: 2, name: "API Integration", weight: 20, requiredScore: 7 },
      ],
    },
    {
      id: 2,
      title: "Soft Skills",
      isOpen: true,
      skills: [
        { id: 3, name: "Communication", weight: 25, requiredScore: 8 },
        { id: 4, name: "Team Collaboration", weight: 25, requiredScore: 7 },
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
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Candidate Evaluation Scorecard
        </h1>
        <button
          onClick={() => setShowNewSectionInput(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
        >
          <Plus size={20} />
          Add Section
        </button>
      </div>

      {showNewSectionInput && (
        <div className="flex gap-2 items-center mb-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter section title"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={addNewSection}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => setShowNewSectionInput(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
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
            <div className="flex items-center gap-4">
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
                <h2 className="text-lg font-semibold text-gray-800">
                  {section.title}
                </h2>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Total Weight: {getTotalWeight(section.skills)}%
              </span>
              <button
                onClick={() => addNewSkill(section.id)}
                className="p-1 text-gray-600 hover:text-gray-800"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={() => deleteSection(section.id)}
                className="p-1 text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {section.isOpen && (
            <div className="p-4 space-y-4">
              {section.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
                      <span className="flex-1 text-gray-800">{skill.name}</span>
                      <span className="w-20 text-center text-gray-600">
                        {skill.weight}%
                      </span>
                      <div className="w-20 flex justify-center">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <span
                            key={i}
                            className={`w-2 h-2 rounded-full mx-0.5 ${
                              i < skill.requiredScore
                                ? "bg-primary"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setEditingSkill(
                          editingSkill === skill.id ? null : skill.id
                        )
                      }
                      className="p-1 text-gray-600 hover:text-gray-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteSkill(section.id, skill.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <X size={16} />
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
