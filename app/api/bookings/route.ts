import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['full_name', 'phone', 'email', 'service_id', 'consultation_type', 'preferred_date', 'preferred_time'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create booking
    const booking = await api.createBooking({
      service_id: body.service_id,
      full_name: body.full_name,
      phone: body.phone,
      email: body.email,
      consultation_type: body.consultation_type,
      preferred_date: body.preferred_date,
      preferred_time: body.preferred_time,
      payment_method: body.payment_method,
      transaction_id: body.transaction_id,
      payment_screenshot_url: body.payment_screenshot_url,
      notes: body.notes,
      user_id: body.user_id
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    
    const bookings = await api.getBookings(userId || undefined);
    
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}