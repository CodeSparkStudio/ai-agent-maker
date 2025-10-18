import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
export async function GET(req:Request){const token=req.headers.get('sb-access-token')||'';const {data:{user},error}=await supabaseAdmin.auth.getUser(token);if(error||!user)return NextResponse.json({error:'Unauthorized'},{status:401});const {data}=await supabaseAdmin.from('agents').select('id,name').eq('user_id',user.id).order('created_at',{ascending:false});return NextResponse.json({agents:data||[]});}
