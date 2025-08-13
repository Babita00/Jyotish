import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/supabase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const bookingId = params.id;

    if (body.status) {
      await api.updateBookingStatus(bookingId, body.status, body.admin_notes);
    }

    if (body.payment_status) {
      await api.updatePaymentStatus(bookingId, body.payment_status);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}