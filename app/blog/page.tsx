"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Hash, Clock, ArrowLeft, Share2, Bookmark, Terminal, ChevronRight, Sparkles, GitBranch, Database, Shield } from "lucide-react";
import { cn } from "@/components/lib/utils";
import NavBar from "@/components/navbar";

// --- BLOG DATA (Professional Full-Stack Focus) ---
const blogPosts = [
  {
    id: "LOG_001",
    title: "The Death of Waterfall: Why Modern Backends Need Event-Driven Architecture",
    excerpt: "Moving beyond REST and CRUD—how event-driven systems are reshaping backend infrastructure for real-time, scalable applications.",
    date: "04.APR.2026",
    readTime: "10 MIN",
    tags: ["BACKEND", "ARCHITECTURE", "EVENT-DRIVEN"],
    category: "TECHNICAL",
    content: `For years, we've built backends the same way: request comes in, server processes it, response goes out. But in 2026, this synchronous, blocking model is starting to show its age.

The shift toward event-driven architecture (EDA) isn't just hype—it's a response to real problems. When your user base grows from 100 to 100,000, those database transactions start piling up. Your API response times creep from 50ms to 500ms. And suddenly, your "scalable" monolith becomes your bottleneck.

EDA solves this by decoupling producers from consumers. When a user signs up, you don't wait for the welcome email, analytics update, and CRM sync to complete. You just emit a "user.created" event and move on. Each service consumes what it needs, when it can.

The tools have matured too. Apache Kafka isn't just for Netflix anymore. RabbitMQ, Redis Streams, and even Postgres' LISTEN/NOTIFY give you options at every scale. I've personally moved three production systems to event-driven patterns this year, and the results speak for themselves: 60% lower latency, 40% better throughput, and significantly cleaner code.

But here's the human truth: EDA requires a mental shift. You can't think in transactions anymore. You think in flows. You accept eventual consistency. And you build better monitoring because debugging distributed systems is harder. But once it clicks? You'll never go back.`,
    codeExample: `// Traditional REST approach
app.post('/api/users', async (req, res) => {
  const user = await db.users.create(req.body);
  await emailService.sendWelcome(user.email);
  await analytics.track('signup', user.id);
  await crm.sync(user);
  res.json(user);
});

// Event-driven approach
app.post('/api/users', async (req, res) => {
  const user = await db.users.create(req.body);
  await eventBus.emit('user.created', user);
  res.json(user);
});`
  },
  {
    id: "LOG_002",
    title: "TypeScript at Scale: Patterns That Save Your Team 100+ Hours",
    excerpt: "Beyond basic types—advanced TypeScript patterns for maintainable, self-documenting codebases that your future self will thank you for.",
    date: "01.APR.2026",
    readTime: "12 MIN",
    tags: ["TYPESCRIPT", "BEST PRACTICES", "DSA"],
    category: "TECHNICAL",
    content: `I've inherited six TypeScript codebases in the last two years. Three were nightmares. Three were dreams. The difference wasn't talent—it was discipline.

The bad ones had "any" everywhere. They had 500-line functions. They treated TypeScript like JavaScript with extra steps. The good ones? They used discriminated unions, branded types, and never wrote a runtime validation they could encode in the type system.

Here's what actually works in production:

**1. Discriminated Unions for State Management**
Instead of boolean flags scattered everywhere, model your states explicitly. TypeScript will force you to handle every case.

**2. Branded Types for Domain Primitives**
An email isn't just a string. A UserId isn't just a number. Use branded types to make the compiler enforce your business rules.

**3. Exhaustiveness Checking**
Let TypeScript catch missing cases at compile time. That switch statement you're afraid to refactor? TypeScript has your back.

The human lesson here: TypeScript isn't about satisfying the compiler. It's about communicating intent to the next developer (who might be you at 3 AM during an outage). Good types are documentation that never goes stale.

I've watched teams reduce bug rates by 70% just by adopting strict mode and proper discriminated unions. The upfront cost is real, but the maintenance savings are transformative.`,
    codeExample: `// Bad: Magic strings and boolean flags
type OrderStatus = 'pending' | 'shipped' | 'delivered';
let isPaid = false;
let isRefunded = false;

// Good: Discriminated union
type Order = 
  | { status: 'draft'; items: CartItem[] }
  | { status: 'pending_payment'; orderId: string; total: number }
  | { status: 'paid'; orderId: string; shippedAt?: Date }
  | { status: 'refunded'; orderId: string; refundAmount: number };

function handleOrder(order: Order) {
  switch (order.status) {
    case 'draft': return saveDraft(order);
    case 'pending_payment': return initiatePayment(order);
    case 'paid': return scheduleShipping(order);
    case 'refunded': return processRefund(order);
    default: const _exhaustive: never = order;
  }
}`
  },
  {
    id: "LOG_003",
    title: "Database Optimization: The 5 Queries Killing Your Performance (And How to Fix Them)",
    excerpt: "Real-world SQL optimization techniques that cut query times from 8 seconds to 80ms—without changing your infrastructure.",
    date: "28.MAR.2026",
    readTime: "15 MIN",
    tags: ["DATABASE", "PERFORMANCE", "BACKEND"],
    category: "TECHNICAL",
    content: `Last month, I debugged a dashboard that took 12 seconds to load. The CEO was furious. The CTO was panicking. And the root cause? Five poorly written queries hiding in plain sight.

Here's what I found, and how you can avoid the same mistakes:

**The N+1 Problem**
Your ORM is hiding a disaster. When you fetch 100 users and then loop to fetch each user's orders, that's 101 queries. The fix? Eager loading or a simple JOIN.

**SELECT \* in Production**
You don't need all 47 columns. You need 4. Each unnecessary column adds IO, memory, and network overhead. Be explicit.

**Missing Indexes on Foreign Keys**
That join that scans 2 million rows? Add an index. Your database will thank you. I've seen this single change cut query times by 99%.

**Inefficient Pagination**
OFFSET is lying to you. For large datasets, OFFSET 100000 scans 100,000 rows just to skip them. Use keyset pagination (WHERE id > last_id) instead.

**Unused Indexes**
Indexes aren't free. Each one slows down writes. Drop indexes that aren't being used. Your INSERT performance will improve immediately.

The human side: Nobody writes perfect queries the first time. The key is monitoring. Set up slow query logs. Use EXPLAIN ANALYZE. Make performance reviews part of your PR process. And remember—the most optimized query is the one you never run. Cache aggressively.`,
    codeExample: `-- Bad: N+1 with ORM
const users = await db.users.findMany();
for (const user of users) {
  const orders = await db.orders.findMany({ 
    where: { userId: user.id } 
  });
}

-- Good: Single query with JOIN
SELECT u.*, o.* 
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > NOW() - INTERVAL '30 days';

-- Bad: OFFSET pagination
SELECT * FROM logs ORDER BY id LIMIT 50 OFFSET 10000;

-- Good: Keyset pagination
SELECT * FROM logs 
WHERE id > 10000 
ORDER BY id LIMIT 50;`
  },
  {
    id: "LOG_004",
    title: "Code Reviews Are Broken: How to Fix Your Team's Most Painful Ritual",
    excerpt: "Stop wasting hours on nitpicking syntax and start catching real bugs—a practical guide to humane, effective code reviews.",
    date: "25.MAR.2026",
    readTime: "8 MIN",
    tags: ["BEST PRACTICES", "TEAM", "PRODUCTIVITY"],
    category: "STRATEGY",
    content: `I've seen code reviews destroy team morale. I've seen them delay features by weeks. And I've seen them catch exactly zero bugs while arguing about trailing commas.

Code reviews are broken. But they don't have to be.

**The Problem: Nitpicking Over Substance**
We spend 20 minutes discussing variable naming while a race condition sits unnoticed. We block PRs for personal style preferences. We confuse "different" with "wrong."

**The Solution: Automate the Obvious**
Linters, formatters, and type checkers exist. Use them. No human should ever comment on spacing, semicolons, or import order. That's what CI is for.

**The Shift: Focus on What Matters**
Code reviews should answer three questions:
1. Does this solve the problem correctly?
2. Will this be maintainable in six months?
3. Are there edge cases we missed?

Everything else is noise.

**The Human Element**
Reviews aren't about being right. They're about making the codebase better together. When you see something suboptimal, ask a question instead of making a demand: "What do you think about extracting this logic?" vs "This should be a separate function."

I've watched teams reduce review time by 70% just by adopting automated formatting and focusing on logic over style. The code got better. The team got happier. And features started shipping faster.

The best code review is the one that happens before the PR. Pair programming. Design docs. Early conversations. Those catch 90% of issues before anyone hits "Open Pull Request."`,
    codeExample: `// Before: Nitpicky review comments
// "Rename 'x' to 'userCount'"
// "Add space after if"
// "This should be a const not let"
// "Add JSDoc comment"

// After: Automated + focused review
// ✅ Linter handles formatting
// ✅ TypeScript handles type safety
// ✅ Review focuses on logic:

// "What happens if users array is empty?"
// "Could this cause a race condition with the cache?"
// "Should we add a timeout for the fetch?"`
  }
];

export default function BlogSpace() {
  const [activeTab, setActiveTab] = useState("ALL_LOGS");
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = activeTab === "ALL_LOGS" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeTab);

  if (selectedPost) {
    return (
      <section className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5">
        <NavBar />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <button 
            onClick={() => setSelectedPost(null)}
            className="group flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-white transition-all mb-12 uppercase"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Archive
          </button>
          
          <article className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-mono text-blue-500 uppercase">
                <span>{selectedPost.id}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex gap-2 flex-wrap">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="text-[8px] font-mono px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-white/10 uppercase tracking-widest">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-zinc-400 text-lg leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </p>
              
              {selectedPost.codeExample && (
                <div className="mt-8 p-6 bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-x-auto">
                  <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-zinc-500 uppercase">
                    <Terminal size={12} />
                    <span>Implementation_Example</span>
                  </div>
                  <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap">
                    <code>{selectedPost.codeExample}</code>
                  </pre>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="relative min-h-screen w-full bg-[#0a0a0a] border-t border-white/5 flex flex-col md:flex-row">
      <NavBar />
      
      {/* --- LEFT SIDE: THE ARCHIVE INDEX (30%) --- */}
      <div className="w-full md:w-[30%] p-8 md:p-12 border-r border-white/5 bg-[#0d0d0d] md:sticky md:top-0 md:h-screen flex flex-col justify-between">
        
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <BookOpen size={16} className="text-blue-500" />
            <span className="text-[10px] font-mono tracking-[0.5em] text-blue-500 uppercase">Archive_System</span>
          </motion.div>

          <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none mb-12">
            ENGINEERING <br />
            <span className="text-zinc-800 not-italic font-bold">LOGS.</span>
          </h2>

          <p className="text-zinc-500 text-sm mb-8 font-mono">
            Practical insights from production systems. No theory—just battle-tested patterns that ship.
          </p>

          {/* Navigation/Filters */}
          <nav className="space-y-2">
            {["ALL_LOGS", "TECHNICAL", "STRATEGY"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-[10px] font-mono tracking-widest uppercase",
                  activeTab === tab 
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                    : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-300 hover:border-white/5"
                )}
              >
                <span>{tab}</span>
                {activeTab === tab && <ChevronRight size={12} />}
              </button>
            ))}
          </nav>
        </div>

        {/* STATS FOOTER */}
        <div className="mt-20 p-4 rounded-xl border border-white/5 bg-black/40 font-mono text-[9px] text-zinc-700 space-y-2">
          <div className="flex justify-between uppercase">
            <span>Total_Entries</span>
            <span className="text-blue-500">{blogPosts.length}</span>
          </div>
          <div className="flex justify-between uppercase">
            <span>Last_Update</span>
            <span className="text-blue-500">04.04.2026</span>
          </div>
          <div className="flex justify-between uppercase">
            <span>Reading_Time</span>
            <span className="text-blue-500">45 MIN</span>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE CONTENT FEED (70%) --- */}
      <div className="w-full md:w-[70%] p-6 md:p-20 bg-black flex flex-col items-center">
        
        <div className="w-full max-w-3xl space-y-20">
          {filteredPosts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer relative"
            >
              {/* Post Metadata */}
              <div className="flex items-center gap-6 mb-6">
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em]">{post.id}</span>
                <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-blue-500/30 transition-colors" />
                <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-600 uppercase">
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-tight italic group-hover:text-blue-500 transition-colors mb-6">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[8px] font-mono px-2 py-1 rounded bg-zinc-900 text-zinc-500 border border-white/5 uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-zinc-700">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(window.location.href + `#${post.id}`);
                    }}
                    className="hover:text-blue-500 transition-colors"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Hover Blueprint Decor */}
              <div className="absolute -left-10 top-0 h-full w-[2px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
            </motion.article>
          ))}

          {/* LOAD MORE PLACEHOLDER */}
          <div className="pt-20 border-t border-white/5 flex justify-center">
             <button className="group flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] hover:border-blue-500 hover:text-white transition-all">
                Subscribe_For_Updates <Sparkles size={14} className="group-hover:text-blue-500" />
             </button>
          </div>
        </div>

        {/* Background Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
      </div>
    </section>
  );
}