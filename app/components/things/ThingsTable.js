'use client';
// import { useState } from 'react';
import { Table } from '../table';

const ThingsTable = ({ initialThings }) => {
   const columns = [
      { key: 'name', label: 'Name' }
      //   { key: 'type', label: 'Type' }
   ];
   return <Table data={initialThings} columns={columns} />;
};

export default ThingsTable;
