import { useState } from "react";

const JobInfo = ({ job, onSave }) => {
  const [formData, setFormData] = useState(job);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Required
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded h-32"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobInfo;
