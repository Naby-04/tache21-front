// ./Diagramme.jsx
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ utilisateursCompte, rapportsCompte, topRapportsCompte }) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: utilisateursCompte, label: 'Utilisateurs' },
            { id: 1, value: rapportsCompte, label: 'Rapports' },
            { id: 2, value: topRapportsCompte, label: "Top Rapports"}
          ],
        },
      ]}
      width={200}
      height={200}
    />
  );
}
