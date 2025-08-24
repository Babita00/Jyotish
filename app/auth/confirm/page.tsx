'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');

        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });

          if (error) {
            setStatus('error');
            setMessage(error.message);
          } else {
            setStatus('success');
            setMessage('Email confirmed successfully! You can now sign in.');
            // Redirect to login after 3 seconds
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          }
        } else {
          setStatus('error');
          setMessage('Invalid confirmation link.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during confirmation.');
      }
    };

    handleEmailConfirmation();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Email Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {status === 'loading' && (
                <>
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-500" />
                  <p className="text-gray-600">Confirming your email...</p>
                </>
              )}

              {status === 'success' && (
                <>
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                  <p className="text-green-600 font-semibold">{message}</p>
                  <p className="text-gray-500 text-sm">
                    Redirecting to login page...
                  </p>
                </>
              )}

              {status === 'error' && (
                <>
                  <XCircle className="h-12 w-12 mx-auto text-red-500" />
                  <p className="text-red-600 font-semibold">{message}</p>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => router.push('/login')}
                      className="w-full"
                    >
                      Go to Login
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => router.push('/register')}
                      className="w-full"
                    >
                      Try Again
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}

