import { NextResponse } from 'next/server';
import { initiateSTKPush, validatePhoneNumber } from '@/lib/daraja';

// In-memory storage for payment sessions (for hackathon)
// In production, use a database
const paymentSessions = new Map<string, any>();

export async function POST(request: Request) {
  try {
    const { phone, amount, customerName, customerEmail, cartItems } = await request.json();

    // Validate inputs
    if (!phone || !amount || !customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone number. Use format: 0712345678 or 254712345678',
        },
        { status: 400 }
      );
    }

    // Generate order reference
    const orderRef = `FC${Date.now()}`;

    // Initiate STK Push
    const result = await initiateSTKPush(
      phone,
      amount,
      orderRef,
      `FutureCart Order ${orderRef}`
    );

    if (result.success && result.data.ResponseCode === '0') {
      // Store payment session
      const checkoutRequestID = result.data.CheckoutRequestID;
      paymentSessions.set(checkoutRequestID, {
        orderRef,
        phone,
        amount,
        customerName,
        customerEmail,
        cartItems,
        status: 'pending',
        createdAt: new Date().toISOString(),
        testMode: result.testMode,
        testAmount: result.testAmount,
        actualAmount: result.actualAmount,
      });

      return NextResponse.json({
        success: true,
        message: result.data.CustomerMessage,
        checkoutRequestID: checkoutRequestID,
        merchantRequestID: result.data.MerchantRequestID,
        orderRef,
        testMode: result.testMode,
        testAmount: result.testAmount,
        actualAmount: result.actualAmount,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.data.errorMessage || 'Failed to initiate payment',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred while initiating payment',
      },
      { status: 500 }
    );
  }
}

// Export the payment sessions map for use in other routes
export { paymentSessions };

