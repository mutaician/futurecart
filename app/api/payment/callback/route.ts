import { NextResponse } from 'next/server';

// Import payment sessions from initiate route
let paymentSessions: Map<string, any>;
try {
  const initiateModule = await import('../initiate/route');
  paymentSessions = initiateModule.paymentSessions;
} catch {
  paymentSessions = new Map();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('📲 M-Pesa Callback received:', JSON.stringify(body, null, 2));

    const { Body } = body;
    const { stkCallback } = Body;

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = stkCallback;

    // Get payment session
    const session = paymentSessions.get(CheckoutRequestID);

    if (session) {
      if (ResultCode === 0) {
        // Payment successful
        session.status = 'success';
        session.resultDesc = ResultDesc;
        
        // Extract payment details
        if (CallbackMetadata && CallbackMetadata.Item) {
          const metadata = CallbackMetadata.Item;
          session.mpesaReceiptNumber = metadata.find(
            (item: any) => item.Name === 'MpesaReceiptNumber'
          )?.Value;
          session.transactionDate = metadata.find(
            (item: any) => item.Name === 'TransactionDate'
          )?.Value;
        }

        console.log('✅ Payment successful:', CheckoutRequestID);
      } else {
        // Payment failed or cancelled
        session.status = 'failed';
        session.resultDesc = ResultDesc;
        console.log('❌ Payment failed:', ResultDesc);
      }

      paymentSessions.set(CheckoutRequestID, session);
    }

    // Always return success to M-Pesa
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: 'Success',
    });
  } catch (error) {
    console.error('Callback error:', error);
    
    // Still return success to M-Pesa to avoid retries
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: 'Success',
    });
  }
}

