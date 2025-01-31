// components/AutomationTab.jsx
import React, { useState } from "react";
import { Play, Pause, Plus, Settings, AlertCircle } from "lucide-react";

const AutomationTab = ({ automations, onUpdate }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    type: "Email",
    trigger: "",
    actions: [],
    status: "Inactive",
  });

  const toggleStatus = (id) => {
    const updatedAutomations = automations.map((automation) =>
      automation.id === id
        ? {
            ...automation,
            status: automation.status === "Active" ? "Inactive" : "Active",
          }
        : automation
    );
    onUpdate(updatedAutomations);
  };

  const addNewAction = () => {
    setNewAutomation({
      ...newAutomation,
      actions: [...newAutomation.actions, ""],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Automations</h2>
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Automation
          </button>
        </div>
      </div>

      {isAddingNew && (
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Create New Automation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={newAutomation.name}
                onChange={(e) =>
                  setNewAutomation({ ...newAutomation, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                value={newAutomation.type}
                onChange={(e) =>
                  setNewAutomation({ ...newAutomation, type: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option>Email</option>
                <option>Integration</option>
                <option>Notification</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trigger
              </label>
              <select
                value={newAutomation.trigger}
                onChange={(e) =>
                  setNewAutomation({
                    ...newAutomation,
                    trigger: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                <option value="">Select a trigger</option>
                <option>On Application Submit</option>
                <option>After Initial Screening</option>
                <option>Before Interview</option>
                <option>After Interview</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actions
              </label>
              {newAutomation.actions.map((action, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={action}
                    onChange={(e) => {
                      const newActions = [...newAutomation.actions];
                      newActions[index] = e.target.value;
                      setNewAutomation({
                        ...newAutomation,
                        actions: newActions,
                      });
                    }}
                    className="flex-1 rounded-md border-gray-300 shadow-sm"
                    placeholder="Enter action description"
                  />
                  <button
                    onClick={() => {
                      const newActions = newAutomation.actions.filter(
                        (_, i) => i !== index
                      );
                      setNewAutomation({
                        ...newAutomation,
                        actions: newActions,
                      });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={addNewAction}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Action
              </button>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdate([
                    ...automations,
                    { ...newAutomation, id: Date.now() },
                  ]);
                  setIsAddingNew(false);
                  setNewAutomation({
                    name: "",
                    type: "Email",
                    trigger: "",
                    actions: [],
                    status: "Inactive",
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Create Automation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="divide-y">
        {automations.map((automation) => (
          <div key={automation.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {automation.type === "Email" ? (
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-6 h-6 text-blue-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-purple-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{automation.name}</h3>
                  <p className="text-sm text-gray-500">
                    Triggers: {automation.trigger}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    automation.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {automation.status}
                </span>
                <button
                  onClick={() => toggleStatus(automation.id)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  {automation.status === "Active" ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Actions:
              </h4>
              <ul className="space-y-1">
                {automation.actions.map((action, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationTab;
