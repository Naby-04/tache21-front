import React from 'react';

function ReportCard({ report }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
      {report.image && (
        <img
          src={report.image}
          alt={report.title}
          className="w-full h-40 object-cover  mb-4"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
      <p className="text-gray-600 mb-4">{report.description}</p>
      <a
        href={report.fileUrl}
        className="text-yellow-700 font-medium underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Télécharger {report.fileType}
      </a>
    </div>
  );
}

export default ReportCard;
