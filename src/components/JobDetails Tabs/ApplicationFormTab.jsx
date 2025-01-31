import { Plus } from "lucide-react";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ApplicationFormTab = ({ formData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState(formData.sections);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = [...sections];
    const [removed] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, removed);

    setSections(newSections);
  };

  const addField = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields.push({
      type: "text",
      label: "New Field",
      required: false,
    });
    setSections(newSections);
  };

  const removeField = (sectionIndex, fieldIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].fields.splice(fieldIndex, 1);
    setSections(newSections);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Application Form</h2>
        <div className="space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Save Changes" : "Edit Form"}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                setSections([
                  ...sections,
                  {
                    title: "New Section",
                    fields: [],
                  },
                ]);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Add Section
            </button>
          )}
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, sectionIndex) => (
                <Draggable
                  key={sectionIndex}
                  draggableId={`section-${sectionIndex}`}
                  index={sectionIndex}
                  isDragDisabled={!isEditing}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-6 bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => {
                              const newSections = [...sections];
                              newSections[sectionIndex].title = e.target.value;
                              setSections(newSections);
                            }}
                            className="text-lg font-medium px-2 py-1 border rounded"
                          />
                        ) : (
                          <h3 className="text-lg font-medium">
                            {section.title}
                          </h3>
                        )}
                        <div {...provided.dragHandleProps}>⋮</div>
                      </div>
                      <div className="space-y-4">
                        {section.fields.map((field, fieldIndex) => (
                          <div
                            key={fieldIndex}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex-1">
                              {isEditing ? (
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => {
                                      const newSections = [...sections];
                                      newSections[sectionIndex].fields[
                                        fieldIndex
                                      ].label = e.target.value;
                                      setSections(newSections);
                                    }}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                  <select
                                    value={field.type}
                                    onChange={(e) => {
                                      const newSections = [...sections];
                                      newSections[sectionIndex].fields[
                                        fieldIndex
                                      ].type = e.target.value;
                                      setSections(newSections);
                                    }}
                                    className="px-2 py-1 border rounded"
                                  >
                                    <option value="text">Text</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                    <option value="file">File</option>
                                  </select>
                                </div>
                              ) : (
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                    {field.required && " *"}
                                  </label>
                                  <input
                                    type={field.type}
                                    disabled
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                  />
                                </div>
                              )}
                            </div>
                            {isEditing && (
                              <button
                                onClick={() =>
                                  removeField(sectionIndex, fieldIndex)
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => addField(sectionIndex)}
                          className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Field
                        </button>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ApplicationFormTab;
