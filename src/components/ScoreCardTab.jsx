import React, { useState } from "react";
import { Plus } from "lucide-react";

const ScoreCardTab = ({ scoreCard, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(scoreCard);

  const getTotalWeight = (skills) => {
    return skills.reduce((total, skill) => total + skill.weight, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Score Card</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isEditing ? "Save Changes" : "Edit Score Card"}
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Technical Skills</h3>
            <div className="text-sm text-gray-500">
              Total Weight: {getTotalWeight(scoreCard.technicalSkills)}%
            </div>
          </div>
          <div className="space-y-4">
            {scoreCard.technicalSkills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.skill}</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={skill.weight}
                      onChange={(e) => {
                        const newSkills = [...formData.technicalSkills];
                        newSkills[index].weight = parseInt(e.target.value);
                        setFormData({
                          ...formData,
                          technicalSkills: newSkills,
                        });
                      }}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="text-gray-600">{skill.weight}%</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">
                    Required Score:
                  </span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={skill.requiredScore}
                      min="1"
                      max="10"
                      onChange={(e) => {
                        const newSkills = [...formData.technicalSkills];
                        newSkills[index].requiredScore = parseInt(
                          e.target.value
                        );
                        setFormData({
                          ...formData,
                          technicalSkills: newSkills,
                        });
                      }}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  ) : (
                    <div className="flex items-center">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-1 mx-0.5 rounded ${
                            i < skill.requiredScore
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCardTab;
