import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  Settings,
  AlertCircle,
} from "lucide-react";

const ShortlistingCriteriaTab = () => {
  const [criteria, setCriteria] = useState([
    {
      id: 1,
      title: "Education Level",
      type: "dropdown",
      options: ["Bachelor's Degree", "Master's Degree", "PhD"],
      weight: 30,
      required: true,
      autoReject: true,
      scoringLogic: "exact",
    },
    {
      id: 2,
      title: "Years of Experience",
      type: "range",
      min: 0,
      max: 20,
      weight: 25,
      required: true,
      autoReject: true,
      scoringLogic: "minimum",
    },
    {
      id: 3,
      title: "Technical Skills",
      type: "multi-select",
      options: ["React", "Node.js", "Python", "Java", "AWS", "Docker"],
      weight: 20,
      required: false,
      autoReject: false,
      scoringLogic: "percentage",
      minimumMatch: 60,
    },
    {
      id: 4,
      title: "Certifications",
      type: "checklist",
      options: ["PMP", "AWS Certified", "CISSP", "Scrum Master"],
      weight: 15,
      required: false,
      autoReject: false,
      scoringLogic: "bonus",
    },
  ]);

  const [showNewCriterion, setShowNewCriterion] = useState(false);
  const [editingCriterion, setEditingCriterion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showWeightDistribution, setShowWeightDistribution] = useState(false);

  const defaultNewCriterion = {
    title: "",
    type: "dropdown",
    options: [],
    weight: 0,
    required: false,
    autoReject: false,
    scoringLogic: "exact",
    minimumMatch: 0,
  };

  const [newCriterion, setNewCriterion] = useState(defaultNewCriterion);

  const calculateTotalWeight = () => {
    return criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
  };

  const addCriterion = () => {
    if (newCriterion.title.trim()) {
      setCriteria([
        ...criteria,
        {
          id: Date.now(),
          ...newCriterion,
        },
      ]);
      setNewCriterion(defaultNewCriterion);
      setShowNewCriterion(false);
    }
  };

  const CriterionCard = ({ criterion, isEditing }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div
        className={`bg-white rounded-xl border border-gray-200 transition-all duration-300 ${
          isEditing ? "ring-2 ring-amber-500" : "hover:shadow-md"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-primary">
                {criterion.title}
              </h2>
              {criterion.required && (
                <span className="px-4 py-1 text-xs bg-red-100 text-red-600 rounded-xl">
                  Required
                </span>
              )}
              {criterion.autoReject && (
                <span className="px-4 py-1 text-xs bg-orange-100 text-orange-700 rounded-xl">
                  Auto-reject
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-amber-600">
                Weight: {criterion.weight}%
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-gray-600"
              >
                {isExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Type
                  </label>
                  <div className="text-gray-800">{criterion.type}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Scoring Logic
                  </label>
                  <div className="text-gray-800">{criterion.scoringLogic}</div>
                </div>
              </div>

              {criterion.options && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {criterion.options.map((option, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingCriterion(criterion.id)}
                  className="px-4 py-2 text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this criterion?"
                      )
                    ) {
                      setCriteria(
                        criteria.filter((c) => c.id !== criterion.id)
                      );
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto px-8 py-8 border bg-gray-50 rounded-2xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-600">
              Candidate Shortlisting Criteria
            </h1>
            <p className="text-gray-500 mt-1">
              Configure and weight your candidate evaluation criteria
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowWeightDistribution(!showWeightDistribution)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <Settings size={18} />
              <span>Weight Distribution</span>
            </button>
            <button
              onClick={() => setShowNewCriterion(true)}
              className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Plus size={18} />
              Add Criterion
            </button>
          </div>
        </div>

        {showWeightDistribution && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Weight Distribution ({calculateTotalWeight()}% allocated)
            </h3>
            <div className="space-y-3">
              {criteria.map((criterion) => (
                <div key={criterion.id} className="flex items-center gap-4">
                  <div className="w-48 text-gray-600">{criterion.title}</div>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${criterion.weight}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-gray-600">
                    {criterion.weight}%
                  </div>
                </div>
              ))}
            </div>
            {calculateTotalWeight() !== 100 && (
              <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-lg flex items-center gap-2">
                <AlertCircle size={18} />
                <span>
                  Total weight should equal 100%. Please adjust the weights.
                </span>
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 "
            size={20}
          />
          <input
            type="text"
            placeholder="Search criteria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 font-semibold text-gray-600 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="space-y-4">
          {criteria
            .filter((c) =>
              c.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((criterion) => (
              <CriterionCard
                key={criterion.id}
                criterion={criterion}
                isEditing={editingCriterion === criterion.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShortlistingCriteriaTab;
