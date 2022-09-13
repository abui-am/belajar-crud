import React, { useEffect } from 'react';
import { getCustomerOrderApi } from '../api/customer';

const Customer = () => {
  useEffect(() => {
    getCustomerOrderApi();
  }, []);
  return <div>Customer</div>;
};

export default Customer;
