'use client';

import { useState, useEffect } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  checkoutRequestID: string;
  orderRef: string;
  phone: string;
  testMode: boolean;
  testAmount: number;
  actualAmount: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function PaymentModal({
  isOpen,
  checkoutRequestID,
  orderRef,
  phone,
  testMode,
  testAmount,
  actualAmount,
  onSuccess,
  onClose,
}: PaymentModalProps) {
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [message, setMessage] = useState('');
  const [mpesaReceipt, setMpesaReceipt] = useState('');

  useEffect(() => {
    if (!isOpen || !checkoutRequestID) return;

    // Poll for payment status every 2 seconds
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/payment/status/${checkoutRequestID}`);
        const data = await response.json();

        if (data.success) {
          setStatus(data.status);
          setMessage(data.resultDesc || '');
          
          if (data.mpesaReceiptNumber) {
            setMpesaReceipt(data.mpesaReceiptNumber);
          }

          if (data.status === 'success') {
            clearInterval(interval);
            setTimeout(() => onSuccess(), 2000);
          } else if (data.status === 'failed') {
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen, checkoutRequestID, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-cyan-500/30 p-8 max-w-md w-full mx-4 shadow-2xl">
        {status === 'pending' && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
                <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Check Your Phone</h3>
              <p className="text-slate-300">Enter your M-Pesa PIN to complete payment</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Phone Number:</span>
                <span className="text-white font-medium">{phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Order Ref:</span>
                <span className="text-cyan-400 font-mono">{orderRef}</span>
              </div>
              {testMode && (
                <>
                  <div className="border-t border-slate-600 my-2" />
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <p className="text-emerald-400 text-sm font-medium text-center">
                      🧪 Test Mode: Paying KSh {testAmount}
                    </p>
                    <p className="text-slate-400 text-xs text-center mt-1">
                      (Actual order: KSh {actualAmount.toLocaleString()})
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-4">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200" />
            </div>

            <p className="text-center text-slate-400 text-sm">
              Waiting for payment confirmation...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
              <p className="text-slate-300 mb-6">{message}</p>

              {mpesaReceipt && (
                <div className="bg-slate-800/50 border border-emerald-500/30 rounded-xl p-4 mb-6">
                  <p className="text-slate-400 text-sm mb-1">M-Pesa Receipt:</p>
                  <p className="text-emerald-400 font-mono text-lg">{mpesaReceipt}</p>
                </div>
              )}

              <p className="text-slate-400 text-sm">Redirecting...</p>
            </div>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Payment Failed</h3>
              <p className="text-slate-300 mb-6">{message || 'Payment was cancelled or failed'}</p>

              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

