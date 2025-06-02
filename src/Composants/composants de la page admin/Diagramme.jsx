// ./Diagramme.jsx
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ utilisateursCompte, rapportsCompte, topRapportsCompte, telechargeCompte }) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: utilisateursCompte, label: 'Utilisateurs' },
            { id: 1, value: rapportsCompte, label: 'Rapports' },
            { id: 2, value: topRapportsCompte, label: "Top Rapports"},
            { id: 3, value: telechargeCompte, label: 'Telechargement'}
          ],
        },
      ]}
      width={200}
      height={200}
    />
  );
}
