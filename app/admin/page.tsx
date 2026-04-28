"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, Clock, User, Mail, Trash2, Lock, Unlock, RefreshCw, Eye, Database, AlertCircle } from "lucide-react";
import { supabase } from "@/components/lib/supabase";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [connectionTest, setConnectionTest] = useState<{ status: string; message: string } | null>(null);

  // Test Supabase connection
  const testConnection = async () => {
    setConnectionTest(null);
    try {
      const { data, error } = await supabase
        .from('client_requests')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        setConnectionTest({ status: 'error', message: error.message });
      } else {
        setConnectionTest({ status: 'success', message: 'Connected successfully' });
      }
    } catch (err: any) {
      setConnectionTest({ status: 'error', message: err.message });
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching requests from Supabase...");
      
      const { data, error } = await supabase
        .from("client_requests")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Fetch Error Details:", error);
        setError(`Failed to fetch: ${error.message}`);
        return;
      }
      
      console.log("Fetched data:", data);
      
      if (data) {
        setRequests(data);
        if (data.length === 0) {
          setError("No client requests found in the database.");
        }
      }
    } catch (err: any) {
      console.error("Network/Catch Error:", err);
      setError(`Connection error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    setIsDeleting(id);
    try {
      const { error } = await supabase
        .from("client_requests")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete error:", error);
        alert(`Delete failed: ${error.message}`);
      } else {
        setRequests(requests.filter(req => req.id !== id));
      }
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    } finally {
      setIsDeleting(null);
    }
  };

  const checkAuth = () => {
    if (password === "DiamondStar1@$") {
      setIsAuth(true);
      testConnection();
      fetchRequests();
    } else {
      alert("UNAUTHORIZED ACCESS DETECTED. SYSTEM LOCK REMAINS.");
    }
  };

  // LOGIN UI
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
        <div className="max-w-sm w-full space-y-8 text-center">
          <div className="relative inline-block">
            <ShieldAlert size={60} className="text-red-600 mx-auto animate-pulse" />
            <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={18} />
          </div>
          
          <div>
            <h1 className="text-white font-black italic uppercase tracking-tighter text-4xl">Admin_Entry</h1>
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-2">Restricted Archive Access</p>
          </div>

          <div className="space-y-4">
            <input 
              type="password" 
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && checkAuth()}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-white text-center outline-none focus:border-red-600 transition-all placeholder:text-zinc-800"
              placeholder="ENTER_SYSTEM_KEY"
            />
            <button 
              onClick={checkAuth} 
              className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all"
            >
              Authorize_Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD UI
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/5 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-500 text-[10px] uppercase tracking-[0.4em] mb-2">
              <Unlock size={12} /> Session_Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter">CLIENT_INBOUND_LOGS</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => { testConnection(); fetchRequests(); }}
              className="flex items-center gap-2 text-[10px] text-zinc-500 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:text-blue-500 transition-all"
            >
              <RefreshCw size={12} /> Refresh_Data
            </button>
            <div className="text-[10px] text-zinc-500 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              TOTAL_CAPTURED: <span className="text-blue-500 font-bold">{requests.length}</span>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        {connectionTest && (
          <div className={`mb-6 p-4 rounded-xl border ${
            connectionTest.status === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
              : 'bg-red-500/10 border-red-500/20 text-red-500'
          }`}>
            <div className="flex items-center gap-2 text-xs">
              {connectionTest.status === 'success' ? <Database size={14} /> : <AlertCircle size={14} />}
              <span className="font-mono uppercase tracking-wider">SUPABASE_STATUS: {connectionTest.message}</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 text-xs font-mono flex items-start gap-3">
            <AlertCircle size={14} className="mt-0.5" />
            <div>
              <div className="font-bold uppercase mb-1">System_Alert:</div>
              <div>{error}</div>
              <button 
                onClick={fetchRequests}
                className="mt-2 text-blue-500 hover:text-blue-400 underline text-[10px] uppercase"
              >
                Retry_Connection
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-zinc-600 text-xs uppercase tracking-wider">Fetching_Client_Data...</p>
          </div>
        )}

        {/* No Data State */}
        {!loading && requests.length === 0 && !error && (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
            <Eye className="mx-auto mb-4 text-zinc-700" size={40} />
            <p className="text-zinc-700 uppercase italic tracking-widest text-sm">No incoming data detected in buffer.</p>
            <p className="text-zinc-800 text-[10px] mt-2">Submit a test request from the hire form to see it appear here.</p>
            <button 
              onClick={fetchRequests}
              className="mt-6 text-blue-500 hover:text-blue-400 text-xs uppercase tracking-wider underline"
            >
              Scan_Again
            </button>
          </div>
        )}

        {/* Requests List */}
        {!loading && requests.length > 0 && (
          <div className="grid gap-6">
            {requests.map((req) => (
              <div key={req.id} className="group p-6 border border-white/5 bg-[#0d0d0d] rounded-2xl hover:bg-zinc-900/50 transition-all relative overflow-hidden">
                {/* Debug info - remove in production */}
                <div className="text-[8px] text-zinc-700 mb-2 font-mono break-all">
                  ID: {req.id}
                </div>
                
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                      <span className="text-lg font-black italic text-white uppercase">{req.full_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs hover:text-zinc-300 transition-colors">
                      <Mail size={12} /> {req.email}
                    </div>
                  </div>

                  <div className="flex items-start md:items-end flex-col gap-2">
                    <div className="text-2xl font-black text-emerald-500 italic tracking-tighter">
                      ${Number(req.budget).toLocaleString()}
                    </div>
                    <div className="text-[9px] text-zinc-600 uppercase flex items-center gap-2">
                      <Clock size={10} /> {new Date(req.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-black/50 rounded-xl text-[13px] text-zinc-400 border border-white/5 leading-relaxed relative group-hover:border-blue-500/20 transition-all">
                  <span className="text-blue-500 block text-[9px] font-bold mb-3 uppercase tracking-widest opacity-50">
                    [Requirement_Payload]
                  </span>
                  {req.requirements}
                </div>

                <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-2">
                    <span className="text-[8px] font-bold px-3 py-1.5 rounded-md bg-zinc-800 text-zinc-400 uppercase tracking-widest border border-white/5">
                      {req.project_type}
                    </span>
                    <span className={cn(
                      "text-[8px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest border",
                      req.priority_level?.includes("CRITICAL") 
                        ? "border-red-900/50 text-red-500 bg-red-950/20" 
                        : "border-white/5 text-zinc-500 bg-zinc-800"
                    )}>
                      {req.priority_level}
                    </span>
                  </div>

                  <button 
                    onClick={() => deleteRequest(req.id)}
                    disabled={isDeleting === req.id}
                    className="p-3 text-zinc-700 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  >
                    {isDeleting === req.id ? "..." : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Debug Section - Remove in production */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <details className="text-[10px] text-zinc-600">
            <summary className="cursor-pointer hover:text-zinc-400 uppercase tracking-wider">
              System_Diagnostics
            </summary>
            <div className="mt-4 space-y-2">
              <div>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</div>
              <div>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</div>
              <div>Total Records: {requests.length}</div>
              <button 
                onClick={() => console.log("Current requests:", requests)}
                className="text-blue-500 underline"
              >
                Console_Log_Data
              </button>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}