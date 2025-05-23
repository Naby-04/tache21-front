import React from 'react'
import { topReports } from '../../data/topRaports'
import ReportCard from './ReportCard'
import { Link } from 'react-router-dom';

function TopReports() {
  return (
    <section className="p-10 bg-white">
    <div className="flex justify-center mb-8">
      <h2 className="relative text-2xl font-bold text-gray-800 after:content-[''] after:block after:h-[3px] after:w-[50%] after:mx-auto after:bg-amber-300 after:mt-2">Top rapports</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topReports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
    <Link to="/rapports" className="px-5 py-3 bg-gray-800 text-white hover:bg-amber-300 hover:text-gray-800 transition duration-100 cursor-pointer text-md mt-80 relative top-10 rounded text-center">Decouvrir Plus</Link>
  </section>
  )
}

export default TopReports;  