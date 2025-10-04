import { NextResponse } from 'next/server';
import { querySTKPushStatus } from '@/lib/daraja';

// Import payment sessions
let paymentSessions: Map<string, any>;
try {
  const initiateModule = await import('../../initiate/route');
  paymentSessions = initiateModule.paymentSessions;
} catch {
  paymentSessions = new Map();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const checkoutRequestID = id;

    // Check our local session first (updated by callback)
    const session = paymentSessions.get(checkoutRequestID);

    if (session) {
      return NextResponse.json({
        success: true,
        status: session.status,
        orderRef: session.orderRef,
        resultDesc: session.resultDesc,
        mpesaReceiptNumber: session.mpesaReceiptNumber,
        transactionDate: session.transactionDate,
        testMode: session.testMode,
        testAmount: session.testAmount,
        actualAmount: session.actualAmount,
      });
    }

    // If not in session, query Daraja API directly
    try {
      const result = await querySTKPushStatus(checkoutRequestID);
      
      let status = 'pending';
      if (result.ResultCode === '0') {
        status = 'success';
      } else if (result.ResultCode) {
        status = 'failed';
      }

      return NextResponse.json({
        success: true,
        status,
        resultDesc: result.ResultDesc,
        resultCode: result.ResultCode,
      });
    } catch (queryError) {
      // If query fails, assume still pending
      return NextResponse.json({
        success: true,
        status: 'pending',
        resultDesc: 'Payment processing...',
      });
    }
  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to check payment status',
      },
      { status: 500 }
    );
  }
}

