import axios from 'axios';
import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from '../constants/paymentConstants';

export const makePayment = (paymentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAYMENT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`, // optional if your route is protected
      },
    };

    const { data } = await axios.post('/api/make-payment', paymentData, config);

    dispatch({
      type: PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
