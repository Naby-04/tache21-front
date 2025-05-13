import React from 'react'
import { topReports } from '../../data/topRaports'
import ReportCard from './ReportCard'

function TopReports() {
  return (
    <section className="p-10 bg-white">
    <h2 className="text-2xl font-bold text-center mb-8">Top Rapports</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topReports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  </section>
  )
}

export default TopReports;