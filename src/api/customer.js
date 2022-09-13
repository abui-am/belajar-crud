import axios from 'axios';
import { myApi } from './api';

export const getCustomerOrderApi = async () => {
  try {
    const res = await myApi.get('/customer/order');
    return res;
  } catch (e) {
    console.error(e);
  }
};
