import React from "react";
import { Clock, User, AlertCircle } from "lucide-react";

const ActivityTab = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "status_change":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case "candidate_application":
        return <User className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Activity Log</h2>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="mt-1">{getActivityIcon(activity.type)}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{activity.description}</div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span>{activity.user}</span>
                <span className="mx-2">•</span>
                <span>{new Date(activity.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTab;
