import React from "react";
import { useSelector } from 'react-redux';

function AttendanceTable() {
  const prediction = useSelector(state => state.train.prediction);
  const location = useSelector(state => state.train.location);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  return (
    <div className="att-table overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {prediction &&
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{prediction}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">Present</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{location && `${location.latitude}, ${location.longitude}`}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{formatDate(Date.now())}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{formatTime(Date.now())}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
