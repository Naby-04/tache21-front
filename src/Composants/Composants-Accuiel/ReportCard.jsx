import React from 'react';
import { Rapport } from '../../pages/DashboardUsers/Rapport';
import { HiMiniDocument } from "react-icons/hi2";

function ReportCard({ report }) {
  return (

    <div className='w-full rounded shadow-lg bg-white text-gray-800 border-b-2 border-gray-800'>
      <div className="w-full h-60 relative mb-3">
        {report.image && (
          <>
            <img
              src={report.image}
              alt={report.title}
              className="w-full h-full object-cover rounded-t"
            />
            <div className="absolute inset-0 bg-gray-800/10 rounded-t"></div>
          </>
        )}
      </div>
      <div className="relative px-4 pt-2 pb-6 h-35 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2"> - {report.title}</h3>
          <p className="text-md text-gray-700 mb-3">{report.description}</p>
        </div>
        <p
          href={report.fileUrl}
          className="text-gray-500 font-semibold underline cursor-pointer text-sm hover:text-gray-800 transition flex gap-1 items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir le {report.fileType}
          <HiMiniDocument className='text-[12px]' />
        </p>
      </div>
    </div>


    // <div className="mx-auto bg-white rounded shadow-2xl border-2 border-gray-800/20">
    //   <div className="w-full relative h-60 object-cover mb-4 border-b-2 border-gray-800/20">
    //     {report.image && (
    //       <img
    //         src={report.image}
    //         alt={report.title}
    //         className="w-full h-full absolute object-cover mb-4"
    //       />
    //     )}
    //   </div>
    //   <div className="relative pb-4 px-4">
    //     <h3 className="text-md font-semibold mb-2 text-gray-800"> - {report.title}</h3>
    //     <p className="text-gray-600 text-md mb-4">{report.description}</p>
    //     <a
    //       href={report.fileUrl}
    //       className="text-blue-700 font-medium underline text-md"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Voir le {report.fileType}
    //     </a>
    //   </div>
    // </div>
  );
}

export default ReportCard;
