import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY as string,{apiVersion:'2024-06-20'});
export async function POST(){try{const price=process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;const site=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';if(!price)return NextResponse.json({error:'Missing price id'},{status:400});const {data:{user}}=await supabaseAdmin.auth.getUser(null as any);const session=await stripe.checkout.sessions.create({mode:'subscription',line_items:[{price,quantity:1}],success_url:`${site}/?checkout=success`,cancel_url:`${site}/pricing`,allow_promotion_codes:true,client_reference_id:user?.id||undefined});return NextResponse.json({url:session.url});}catch(e:any){return NextResponse.json({error:e?.message||'Stripe error'},{status:500});}}
