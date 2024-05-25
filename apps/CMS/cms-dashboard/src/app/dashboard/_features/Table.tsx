import React from 'react';
import { TableRow } from '../_components/TableRow';
const data = [
  {
    number: 0,
    name: 'Cy Ganderton',
    job: 'Quality Control Specialist',
    color: 'Blue',
  },
  {
    number: 0,
    name: 'Cy Ganderton',
    job: 'Quality Control Specialist',
    color: 'Blue',
  },
  {
    number: 0,
    name: 'Cy Ganderton',
    job: 'Quality Control Specialist',
    color: 'Blue',
  },
  {
    number: 0,
    name: 'Cy Ganderton',
    job: 'Quality Control Specialist',
    color: 'Blue',
  },
];
export const Table = () => {
  return (
    <div className="overflow-visible">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return <TableRow key={index} {...item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
