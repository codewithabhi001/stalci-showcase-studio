import { CaseStudyItem } from "@/types/project";

export const featuredCaseStudies: CaseStudyItem[] = [
  {
    id: "la-savista",
    title: "La Savista",
    client: "Accessibility Foundation",
    category: "Mobile Apps",
    summary:
      "Smart accessibility app enabling guided navigation, indoor beacon routing, and location-based audio cues for visually impaired citizens.",
    fullDescription:
      "Engineered an offline-first accessibility application for La Savista that pairs high-accuracy Bluetooth Low Energy (BLE) indoor beacons with spatial audio feedback, voice synthesis, and real-time transit routing across high-density public hubs.",
    imageUrl:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://lasavista.app",
    metrics: [
      { label: "Nav Latency", value: "<12ms" },
      { label: "Crash-Free Rate", value: "99.8%" },
      { label: "Indoor Accuracy", value: "0.5m" },
      { label: "Active Users", value: "45k+" },
    ],
    technologies: ["React Native", "TypeScript", "BLE Beacons", "Node.js", "WebSockets", "Cloudflare"],
    clientFeedback:
      "STALCI crafted an empowering, lightning-fast mobile experience that sets the gold standard for accessibility software.",
  },
  {
    id: "melly",
    title: "Melly",
    client: "Melly Health Inc.",
    category: "Mobile Apps",
    summary:
      "AI-powered mental wellness app that pairs Gemini-driven coaching with CBT exercises, journals, and streak tracking to build daily self-awareness.",
    fullDescription:
      "Architected and deployed the Melly mental wellness platform. Incorporates conversational AI agents running fine-tuned cognitive behavioral therapy (CBT) reflection models, biometric stress sync, end-to-end encrypted journaling, and positive habit gamification.",
    imageUrl:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://mellywellness.com",
    metrics: [
      { label: "Daily Active Retention", value: "78%" },
      { label: "App Store Rating", value: "4.9★" },
      { label: "Journal Encryption", value: "AES-256" },
      { label: "Response Latency", value: "<400ms" },
    ],
    technologies: ["React Native", "Expo", "Python", "FastAPI", "PostgreSQL", "Gemini AI", "Tailwind"],
    clientFeedback:
      "The STALCI engineering squad brought our AI wellness vision to life with extreme care for data privacy and user delight.",
  },
  {
    id: "streambase",
    title: "StreamBase",
    client: "StreamBase AV Networks",
    category: "Enterprise IT",
    summary:
      "AV over IP platform that replaces matrix switches with ultra-low latency streaming, real-time diagnostics, and centralized control on every connected device.",
    fullDescription:
      "Built the mission-critical distributed control plane and browser interface for StreamBase AV. Enables uncompressed 4K60 video switching over 10GbE network fabrics with sub-frame 1ms switching latency, telemetry logging, and dynamic matrix routing.",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    liveUrl: "https://streambase.io",
    metrics: [
      { label: "Switching Latency", value: "<1ms" },
      { label: "Concurrent Streams", value: "1,000+" },
      { label: "Network Uptime", value: "99.999%" },
      { label: "Bandwidth Util", value: "10GbE" },
    ],
    technologies: ["Next.js 16", "Go (Golang)", "WebSockets", "WebRTC", "Docker", "eBPF", "PostgreSQL"],
    clientFeedback:
      "StreamBase revolutionized our enterprise AV installations. The stability and responsiveness are unmatched in our industry.",
  },
  {
    id: "gr-class",
    title: "GR Class",
    client: "GR Class Directorate",
    category: "Web Platforms",
    summary:
      "Recognized Organization (RO) digital vessel classification, statutory survey tracking, and maritime certification suite across 120+ global ports.",
    fullDescription:
      "Architected and built the enterprise digital infrastructure for GR Class — a Recognized Organization (RO) and Classification Society. The platform handles statutory vessel surveys, fleet compliance tracking, digital ISO certificate issuance, and real-time surveyor dispatch.",
    imageUrl: "/projects/grclass-preview.jpg",
    liveUrl: "https://grclass.com/",
    metrics: [
      { label: "Global Ports Covered", value: "120+" },
      { label: "Certificates Issued", value: "500+" },
      { label: "ISO Aligned", value: "9001/14001" },
      { label: "Dispatch Latency", value: "<15 Mins" },
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "Cloudflare"],
    clientFeedback:
      "STALCI delivered a digital classification system that elevated our global maritime compliance operations instantly.",
  },
  {
    id: "konvo-shoes",
    title: "Konvo Shoes",
    client: "Konvo Footwear Group",
    category: "Web Platforms",
    summary:
      "High-volume B2B wholesale storefront with automated GST tax-compliant invoicing, real-time inventory reservation, and express dispatch logistics.",
    fullDescription:
      "Engineered the modern B2B wholesale storefront and ERP inventory engine for Konvo Shoes, enabling footwear retailers across India to place bulk wholesale orders with automated GST ITC invoicing, multi-warehouse stock reservation, and express dispatch integration.",
    imageUrl: "/projects/konvoshoes-preview.jpg",
    liveUrl: "https://konvoshoes.com/",
    metrics: [
      { label: "Annual GMV", value: "₹15 Cr+" },
      { label: "Retail Partners", value: "10,000+" },
      { label: "Invoice Accuracy", value: "100%" },
      { label: "Dispatch Speed", value: "Same Day" },
    ],
    technologies: ["React 19", "Vite", "TanStack Query", "Tailwind CSS", "NestJS", "PostgreSQL", "Razorpay"],
    clientFeedback:
      "STALCI built our complete wholesale engine — handling bulk ordering, GST invoicing and payments flawlessly.",
  },
  {
    id: "apnisabha",
    title: "ApniSabha",
    client: "ApniSabha Foundation",
    category: "AI Systems",
    summary:
      "Apna Manch, Apni Awaaz — Real-time community civic discussion, problem resolution escalation, and transparent public collaboration platform.",
    fullDescription:
      "Designed and implemented ApniSabha, a digital civic engagement platform where citizens raise verified local issues, participate in transparent polls, collaborate with municipal representatives, and amplify community progress.",
    imageUrl: "/projects/apnisabha-preview.jpg",
    liveUrl: "https://apnisabha.com/",
    metrics: [
      { label: "Active Citizens", value: "250k+" },
      { label: "Issues Resolved", value: "85k+" },
      { label: "Engagement", value: "4.8M Posts" },
      { label: "Platform Uptime", value: "99.9%" },
    ],
    technologies: ["React 19", "Vite", "Tailwind CSS", "Node.js", "WebSockets", "PostgreSQL", "Cloudflare"],
    clientFeedback:
      "ApniSabha gives power back to the community. STALCI engineered a fast, secure, and beautiful platform.",
  },
];
