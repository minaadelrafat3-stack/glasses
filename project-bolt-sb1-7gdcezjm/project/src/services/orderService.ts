import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ApiError } from '@/types';
import type { Order, OrderStatus } from '@/types';

/**
 * Order service — reads order history for the signed-in user.
 * Writes (checkout) are handled server-side via an edge function.
 */

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new ApiError(error.message, 500, error.code);
  return (data ?? []) as unknown as Order[];
}

export async function fetchOrderById(orderId: string): Promise<Order | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .maybeSingle();

  if (error) throw new ApiError(error.message, 500, error.code);
  return (data ?? null) as unknown as Order | null;
}

export function orderStatusToLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: 'Pending',
    paid: 'Paid',
    fulfilled: 'Fulfilled',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  };
  return labels[status];
}
