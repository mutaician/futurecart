import axios from 'axios';

const DARAJA_BASE_URL =
  process.env.DARAJA_ENVIRONMENT === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

const CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET!;
const BUSINESS_SHORT_CODE = process.env.DARAJA_BUSINESS_SHORT_CODE!;
const PASSKEY = process.env.DARAJA_PASSKEY!;
const CALLBACK_URL = process.env.DARAJA_CALLBACK_URL || 'https://mydomain.com/api';
const TEST_MODE = process.env.DARAJA_TEST_MODE === 'true';
const TEST_AMOUNT = parseInt(process.env.DARAJA_TEST_AMOUNT || '1');

/**
 * Get OAuth access token from Daraja API
 */
export async function getAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    
    const response = await axios.get(
      `${DARAJA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to get Daraja access token');
  }
}

/**
 * Initiate STK Push (Lipa Na M-Pesa Online)
 */
export async function initiateSTKPush(
  phoneNumber: string,
  amount: number,
  accountReference: string,
  transactionDesc: string
) {
  try {
    const accessToken = await getAccessToken();
    
    // Use test amount (KSh 1) if in test mode
    const finalAmount = TEST_MODE ? TEST_AMOUNT : amount;
    
    // Format phone number (remove + or leading 0, ensure 254 prefix)
    let formattedPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    // Generate timestamp (YYYYMMDDHHmmss)
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);

    // Generate password
    const password = Buffer.from(
      `${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`
    ).toString('base64');

    const payload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: finalAmount,
      PartyA: formattedPhone,
      PartyB: BUSINESS_SHORT_CODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };

    const response = await axios.post(
      `${DARAJA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      data: response.data,
      testMode: TEST_MODE,
      testAmount: TEST_MODE ? TEST_AMOUNT : null,
      actualAmount: amount,
    };
  } catch (error: any) {
    console.error('Error initiating STK push:', error.response?.data || error);
    throw new Error(
      error.response?.data?.errorMessage || 'Failed to initiate M-Pesa payment'
    );
  }
}

/**
 * Query STK Push transaction status
 */
export async function querySTKPushStatus(checkoutRequestID: string) {
  try {
    const accessToken = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);

    const password = Buffer.from(
      `${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`
    ).toString('base64');

    const payload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestID,
    };

    const response = await axios.post(
      `${DARAJA_BASE_URL}/mpesa/stkpushquery/v1/query`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error querying STK push status:', error.response?.data || error);
    throw new Error('Failed to query payment status');
  }
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  let formatted = phone.replace(/\D/g, '');
  if (formatted.startsWith('254')) {
    formatted = '0' + formatted.substring(3);
  }
  return formatted;
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Must be 10 digits starting with 0, or 12 digits starting with 254
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return true;
  }
  if (cleaned.length === 12 && cleaned.startsWith('254')) {
    return true;
  }
  
  return false;
}

