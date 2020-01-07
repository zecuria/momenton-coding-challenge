import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data.json';
import dataToTable from './dataToTable';

const App: React.FC = () => {
  const table = dataToTable(data);
  return (
    <div className="App">
      <body>
        <table>{
          table.map((row)=> ( 
            <tr>
              {row.map(cell => (
                <td>{cell}</td>
              ))}
            </tr>
          ))
        }</table>
        </body>
    </div>
  );
}

export default App;
