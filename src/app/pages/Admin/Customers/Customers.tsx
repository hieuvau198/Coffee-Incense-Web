import React, { useState } from 'react';
import { Card } from 'antd';
import CustomerList from './partials/CustomerList';

const Customers: React.FC = () => {

  return (
    <Card className="shadow-sm h-full overflow-hidden">
        <CustomerList/>

    </Card>
  );
};

export default Customers; 