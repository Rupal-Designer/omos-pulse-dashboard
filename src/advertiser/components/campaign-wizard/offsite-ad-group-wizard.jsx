"use client";

import { Switch } from "@/components/ui/switch";

import { useState, useRef } from "react";
import {
  X,
  ChevronRight,
  Check,
  HelpCircle,
  Upload,
  ImageIcon,
  Video,
  Store,
  Users,
  Tag,
  ShoppingBag,
  Globe,
  Trash2,
  Search,
  Sparkles,
  Plus,
  Wand2,
  Info,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MetaIcon = () => (
  <svg viewBox="0 0 36 36" className="w-10 h-10">
    <defs>
      <linearGradient id="meta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0081FB" />
        <stop offset="50%" stopColor="#0064E0" />
        <stop offset="100%" stopColor="#0099FF" />
      </linearGradient>
    </defs>
    <path
      fill="url(#meta-gradient)"
      d="M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0zm8.027 21.734c-1.133 2.297-3.348 3.891-5.961 3.891-1.668 0-3.191-.695-4.312-1.828-.465-.469-.852-.996-1.152-1.574-.301.578-.688 1.105-1.153 1.574-1.121 1.133-2.644 1.828-4.312 1.828-2.613 0-4.828-1.594-5.961-3.891-.344-.699-.535-1.48-.535-2.305 0-1.742.871-3.293 2.207-4.242l.047-.033c.82-.582 1.801-.926 2.863-.926 1.668 0 3.191.695 4.312 1.828.465.469.852.996 1.152 1.574.301-.578.688-1.105 1.153-1.574 1.121-1.133 2.644-1.828 4.312-1.828 1.062 0 2.043.344 2.863.926l.047.033c1.336.949 2.207 2.5 2.207 4.242 0 .825-.191 1.606-.535 2.305zm-1.699-1.805c0-1.293-.785-2.406-1.91-2.891-.336-.145-.703-.223-1.086-.223-1.566 0-2.836 1.27-2.836 2.836 0 .023 0 .047.002.07-.035.871-.438 1.641-1.059 2.199-.516.465-1.195.75-1.939.75-.742 0-1.422-.285-1.938-.75-.621-.558-1.024-1.328-1.059-2.199.002-.047.002-.047.002-.07 0-1.566-1.27-2.836-2.836-2.836-.383 0-.75.078-1.086.223-1.125.485-1.91 1.598-1.91 2.891 0 .512.121.996.336 1.426.844 1.711 2.586 2.891 4.594 2.891 1.277 0 2.445-.473 3.336-1.254.398-.348.746-.758 1.031-1.219.285.461.633.871 1.031 1.219.891.781 2.059 1.254 3.336 1.254 2.008 0 3.75-1.18 4.594-2.891.215-.43.336-.914.336-1.426z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />

    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />

    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />

    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const AdFormatIllustrations = {
  // Google Ad Formats
  googleSearch: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="5" y="5" width="110" height="70" fill="#f8f9fa" rx="4" />
      <rect x="10" y="10" width="60" height="8" fill="#1a73e8" rx="2" />
      <rect x="10" y="22" width="80" height="4" fill="#006621" rx="1" />
      <rect x="10" y="30" width="95" height="4" fill="#5f6368" rx="1" />
      <rect x="10" y="38" width="85" height="4" fill="#5f6368" rx="1" />
      <rect
        x="8"
        y="50"
        width="104"
        height="22"
        fill="#fff"
        stroke="#dadce0"
        rx="2"
      />
      <rect x="12" y="54" width="50" height="6" fill="#1a73e8" rx="1" />
      <rect x="12" y="63" width="70" height="3" fill="#5f6368" rx="1" />
    </svg>
  ),
  googleDisplay: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="5" y="5" width="110" height="70" fill="#f8f9fa" rx="4" />
      <rect x="10" y="10" width="70" height="40" fill="#e8f0fe" rx="2" />
      <rect
        x="15"
        y="15"
        width="60"
        height="20"
        fill="#fbbc04"
        rx="2"
        opacity="0.6"
      />
      <rect x="15" y="38" width="40" height="4" fill="#5f6368" rx="1" />
      <rect x="15" y="44" width="30" height="3" fill="#80868b" rx="1" />
      <rect
        x="85"
        y="10"
        width="25"
        height="60"
        fill="#e8f0fe"
        stroke="#dadce0"
        rx="2"
      />
      <text x="90" y="25" fontSize="4" fill="#5f6368">
        AD
      </text>
      <rect
        x="88"
        y="30"
        width="19"
        height="15"
        fill="#34a853"
        opacity="0.3"
        rx="1"
      />
      <rect x="88" y="48" width="19" height="3" fill="#5f6368" rx="1" />
    </svg>
  ),
  googleVideo: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="5" y="5" width="110" height="70" fill="#0f0f0f" rx="4" />
      <rect x="15" y="15" width="90" height="50" fill="#282828" rx="2" />
      <polygon points="50,30 50,50 70,40" fill="#ff0000" />
      <rect x="15" y="58" width="40" height="4" fill="#ff0000" />
      <rect x="60" y="58" width="45" height="4" fill="#3d3d3d" />
      <rect
        x="20"
        y="20"
        width="30"
        height="4"
        fill="#fff"
        opacity="0.8"
        rx="1"
      />
      <text x="22" y="23" fontSize="3" fill="#0f0f0f">
        Ad
      </text>
    </svg>
  ),
  googleShopping: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="5" y="5" width="110" height="70" fill="#f8f9fa" rx="4" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${10 + i * 26}, 12)`}>
          <rect width="24" height="55" fill="#fff" stroke="#dadce0" rx="2" />
          <rect x="2" y="3" width="20" height="25" fill="#e8f0fe" rx="1" />
          <rect x="2" y="31" width="16" height="3" fill="#5f6368" rx="1" />
          <rect x="2" y="36" width="12" height="3" fill="#1a73e8" rx="1" />
          <text x="2" y="46" fontSize="4" fill="#202124" fontWeight="bold">
            $29
          </text>
        </g>
      ))}
    </svg>
  ),
  googlePerformanceMax: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="5" y="5" width="110" height="70" fill="#f8f9fa" rx="4" />
      <rect x="10" y="10" width="45" height="30" fill="#e8f0fe" rx="2" />
      <rect x="60" y="10" width="50" height="30" fill="#fce8e6" rx="2" />
      <rect x="10" y="45" width="30" height="25" fill="#e6f4ea" rx="2" />
      <rect x="45" y="45" width="30" height="25" fill="#fff8e1" rx="2" />
      <rect x="80" y="45" width="30" height="25" fill="#f3e8fd" rx="2" />
      <circle cx="32" cy="25" r="8" fill="#4285f4" opacity="0.5" />
      <polygon points="80,20 80,30 90,25" fill="#ea4335" opacity="0.5" />
    </svg>
  ),
  // Meta Ad Formats
  metaImage: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect
        x="5"
        y="5"
        width="110"
        height="70"
        fill="#fff"
        rx="4"
        stroke="#e4e6eb"
      />
      <circle cx="18" cy="15" r="6" fill="#1877f2" />
      <rect x="28" y="11" width="40" height="4" fill="#050505" rx="1" />
      <rect x="28" y="17" width="25" height="3" fill="#65676b" rx="1" />
      <rect x="10" y="25" width="100" height="40" fill="#e4e6eb" rx="2" />
      <rect
        x="35"
        y="35"
        width="50"
        height="20"
        fill="#1877f2"
        opacity="0.3"
        rx="2"
      />
      <rect x="10" y="68" width="50" height="4" fill="#050505" rx="1" />
    </svg>
  ),
  metaVideo: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect
        x="5"
        y="5"
        width="110"
        height="70"
        fill="#fff"
        rx="4"
        stroke="#e4e6eb"
      />
      <circle cx="18" cy="15" r="6" fill="#1877f2" />
      <rect x="28" y="11" width="40" height="4" fill="#050505" rx="1" />
      <rect x="10" y="25" width="100" height="40" fill="#000" rx="2" />
      <polygon points="50,35 50,55 70,45" fill="#fff" opacity="0.9" />
      <rect x="12" y="58" width="30" height="3" fill="#f02849" />
      <rect x="10" y="68" width="50" height="4" fill="#050505" rx="1" />
    </svg>
  ),
  metaCarousel: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect
        x="5"
        y="5"
        width="110"
        height="70"
        fill="#fff"
        rx="4"
        stroke="#e4e6eb"
      />
      <circle cx="18" cy="12" r="5" fill="#1877f2" />
      <rect x="26" y="9" width="35" height="3" fill="#050505" rx="1" />
      <g>
        <rect x="8" y="20" width="45" height="45" fill="#e4e6eb" rx="2" />
        <rect
          x="13"
          y="25"
          width="35"
          height="25"
          fill="#1877f2"
          opacity="0.2"
          rx="1"
        />
        <rect x="13" y="53" width="30" height="3" fill="#050505" rx="1" />
        <rect x="13" y="58" width="20" height="3" fill="#1877f2" rx="1" />
      </g>
      <g>
        <rect x="56" y="20" width="45" height="45" fill="#e4e6eb" rx="2" />
        <rect
          x="61"
          y="25"
          width="35"
          height="25"
          fill="#42b72a"
          opacity="0.2"
          rx="1"
        />
        <rect x="61" y="53" width="30" height="3" fill="#050505" rx="1" />
        <rect x="61" y="58" width="20" height="3" fill="#1877f2" rx="1" />
      </g>
      <polygon points="103,42 108,38 108,47" fill="#65676b" />
    </svg>
  ),
  metaCollection: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect
        x="5"
        y="5"
        width="110"
        height="70"
        fill="#fff"
        rx="4"
        stroke="#e4e6eb"
      />
      <rect x="10" y="10" width="100" height="35" fill="#e4e6eb" rx="2" />
      <rect
        x="30"
        y="18"
        width="60"
        height="18"
        fill="#1877f2"
        opacity="0.3"
        rx="2"
      />
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${10 + i * 25}, 48)`}>
            <rect
              width="23"
              height="25"
              fill="#f0f2f5"
              stroke="#e4e6eb"
              rx="2"
            />
            <rect x="2" y="2" width="19" height="14" fill="#e4e6eb" rx="1" />
            <rect x="2" y="18" width="15" height="2" fill="#050505" rx="0.5" />
            <rect x="2" y="21" width="10" height="2" fill="#1877f2" rx="0.5" />
          </g>
        ))}
      </g>
    </svg>
  ),
  // TikTok Ad Formats
  tiktokInFeed: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="30" y="2" width="60" height="76" fill="#000" rx="8" />
      <rect x="33" y="5" width="54" height="70" fill="#161823" rx="6" />
      <rect
        x="35"
        y="8"
        width="50"
        height="50"
        fill="#25f4ee"
        opacity="0.2"
        rx="4"
      />
      <polygon points="55,25 55,40 68,32" fill="#fff" opacity="0.9" />
      <circle cx="80" cy="35" r="4" fill="#fff" opacity="0.8" />
      <circle cx="80" cy="45" r="4" fill="#fe2c55" opacity="0.8" />
      <circle cx="80" cy="55" r="4" fill="#fff" opacity="0.8" />
      <rect x="38" y="62" width="35" height="3" fill="#fff" rx="1" />
      <rect
        x="38"
        y="67"
        width="25"
        height="2"
        fill="#fff"
        opacity="0.6"
        rx="1"
      />
    </svg>
  ),
  tiktokImage: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="30" y="2" width="60" height="76" fill="#000" rx="8" />
      <rect x="33" y="5" width="54" height="70" fill="#161823" rx="6" />
      <rect
        x="35"
        y="8"
        width="50"
        height="50"
        fill="#fe2c55"
        opacity="0.2"
        rx="4"
      />
      <rect
        x="40"
        y="15"
        width="40"
        height="35"
        fill="#25f4ee"
        opacity="0.3"
        rx="2"
      />
      <rect x="38" y="62" width="35" height="3" fill="#fff" rx="1" />
      <rect
        x="38"
        y="67"
        width="25"
        height="2"
        fill="#fff"
        opacity="0.6"
        rx="1"
      />
      <text x="38" y="72" fontSize="3" fill="#fe2c55">
        Sponsored
      </text>
    </svg>
  ),
  tiktokCarousel: () => (
    <svg viewBox="0 0 120 80" className="w-full h-24">
      <rect x="30" y="2" width="60" height="76" fill="#000" rx="8" />
      <rect x="33" y="5" width="54" height="70" fill="#161823" rx="6" />
      <g>
        <rect
          x="36"
          y="10"
          width="30"
          height="45"
          fill="#25f4ee"
          opacity="0.3"
          rx="3"
        />
        <rect
          x="54"
          y="10"
          width="30"
          height="45"
          fill="#fe2c55"
          opacity="0.3"
          rx="3"
        />
      </g>
      <circle cx="52" cy="60" r="2" fill="#fff" />
      <circle cx="58" cy="60" r="2" fill="#fff" opacity="0.4" />
      <circle cx="64" cy="60" r="2" fill="#fff" opacity="0.4" />
      <rect x="38" y="67" width="30" height="3" fill="#fff" rx="1" />
    </svg>
  ),
};

const platforms = [
  {
    id: "meta",
    name: "Meta Ads",
    description: "Facebook, Instagram, Messenger, Audience Network",
    icon: <MetaIcon />,
  },
  {
    id: "google",
    name: "Google Ads",
    description: "Search, Display, YouTube, Shopping, Discover",
    icon: <GoogleIcon />,
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    description: "In-Feed Ads, Spark Ads, Pangle Network",
    icon: <TikTokIcon />,
  },
];

const adFormats = {
  meta: [
    {
      id: "image",
      name: "Single Image",
      description:
        "Use a compelling image to showcase your product or service.",
      illustration: AdFormatIllustrations.metaImage(),
      specs: "1080x1080px",
    },
    {
      id: "video",
      name: "Single Video",
      description: "Engage your audience with a dynamic video ad.",
      illustration: AdFormatIllustrations.metaVideo(),
      specs: "1080x1080px",
    },
    {
      id: "carousel",
      name: "Carousel",
      description:
        "Showcase multiple products or features in a swipeable format.",
      illustration: AdFormatIllustrations.metaCarousel(),
      specs: "1080x1080px per card",
    },
    {
      id: "collection",
      name: "Collection",
      description: "Create an immersive, full-screen mobile experience.",
      illustration: AdFormatIllustrations.metaCollection(),
      specs: "1080x1920px",
    },
  ],
  google: [
    {
      id: "search",
      name: "Search Ads",
      description:
        "Reach users actively searching for your products or services.",
      illustration: AdFormatIllustrations.googleSearch(),
      specs: "Text only",
    },
    {
      id: "display",
      name: "Display Ads",
      description: "Build brand awareness with visually appealing banner ads.",
      illustration: AdFormatIllustrations.googleDisplay(),
      specs: "1200x628px (Responsive)",
    },
    {
      id: "video",
      name: "Video Ads",
      description: "Engage viewers on YouTube and partner sites.",
      illustration: AdFormatIllustrations.googleVideo(),
      specs: "16:9",
    },
    {
      id: "shopping",
      name: "Shopping Ads",
      description: "Promote products directly to potential buyers.",
      illustration: AdFormatIllustrations.googleShopping(),
      specs: "Various",
    },
    {
      id: "performanceMax",
      name: "Performance Max",
      description: "AI-powered ads across all Google channels.",
      illustration: AdFormatIllustrations.googlePerformanceMax(),
      specs: "Various",
    },
  ],
  tiktok: [
    {
      id: "infeed",
      name: "In-Feed Ads",
      description: "Native ads that appear in the For You feed.",
      illustration: AdFormatIllustrations.tiktokInFeed(),
      specs: "1080x1920px",
    },
    {
      id: "image",
      name: "Image Ads",
      description: "Static image ads for quick impact.",
      illustration: AdFormatIllustrations.tiktokImage(),
      specs: "1080x1920px",
    },
    {
      id: "carousel",
      name: "Carousel Ads",
      description: "Showcase multiple images or videos in a swipeable format.",
      illustration: AdFormatIllustrations.tiktokCarousel(),
      specs: "1080x1920px per card",
    },
  ],
};

const steps = [
  { id: "basics", label: "Basics", description: "Platform and ad group name" },
  { id: "format", label: "Ad Format", description: "Choose your ad type" },
  { id: "targeting", label: "Targeting", description: "Define your audience" },
  { id: "creative", label: "Creative", description: "Design your ads" },
  { id: "placement", label: "Placements", description: "Where ads appear" },
  {
    id: "config",
    label: "Budget & Bidding",
    description: "Set campaign parameters",
  },
];

// Mock data for audiences
const audienceSegments = [
  {
    id: "1",
    name: "Highest Spending Audience",
    reach: 4800000,
    premium: "10%",
    recommended: true,
  },
  {
    id: "2",
    name: "Loyal Customers",
    reach: 4500000,
    premium: "20%",
    recommended: true,
  },
  {
    id: "3",
    name: "Recent Purchasers",
    reach: 800000,
    premium: "25%",
    recommended: false,
  },
  {
    id: "4",
    name: "Gpay Customers",
    reach: 1800000,
    premium: "30%",
    recommended: false,
  },
  {
    id: "5",
    name: "Target Group Delta",
    reach: 1800000,
    premium: "10%",
    recommended: false,
  },
  {
    id: "6",
    name: "Target Group Zeta",
    reach: 8300000,
    premium: "15%",
    recommended: false,
  },
  {
    id: "7",
    name: "Clippers Non-Redeemers",
    reach: 15000,
    premium: "5%",
    recommended: false,
  },
  {
    id: "8",
    name: "Lapsed Shoppers: Sports & Energy",
    reach: 15000,
    premium: "10%",
    recommended: false,
  },
  {
    id: "9",
    name: "Gift for Kids",
    reach: 15000,
    premium: "15%",
    recommended: false,
  },
  {
    id: "10",
    name: "New Audiences",
    reach: 15000,
    premium: "5%",
    recommended: false,
  },
];

// Mock data for stores
const storeLocations = [
  {
    id: "s1",
    name: "Downtown Manhattan",
    city: "New York",
    state: "NY",
    reach: 125000,
  },
  {
    id: "s2",
    name: "Brooklyn Heights",
    city: "New York",
    state: "NY",
    reach: 89000,
  },
  {
    id: "s3",
    name: "Santa Monica",
    city: "Los Angeles",
    state: "CA",
    reach: 156000,
  },
  {
    id: "s4",
    name: "Beverly Hills",
    city: "Los Angeles",
    state: "CA",
    reach: 112000,
  },
  {
    id: "s5",
    name: "Chicago Loop",
    city: "Chicago",
    state: "IL",
    reach: 98000,
  },
  {
    id: "s6",
    name: "Lincoln Park",
    city: "Chicago",
    state: "IL",
    reach: 76000,
  },
  { id: "s7", name: "Miami Beach", city: "Miami", state: "FL", reach: 134000 },
  { id: "s8", name: "Coral Gables", city: "Miami", state: "FL", reach: 67000 },
];

// Mock data for products
const productCatalog = [
  {
    id: "p1",
    name: "Premium Headphones",
    category: "Electronics",
    price: 299,
    inventory: 1500,
  },
  {
    id: "p2",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 149,
    inventory: 3200,
  },
  {
    id: "p3",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 399,
    inventory: 890,
  },
  {
    id: "p4",
    name: "Running Shoes",
    category: "Sports",
    price: 129,
    inventory: 2100,
  },
  {
    id: "p5",
    name: "Yoga Mat Premium",
    category: "Sports",
    price: 49,
    inventory: 4500,
  },
  {
    id: "p6",
    name: "Protein Powder",
    category: "Nutrition",
    price: 59,
    inventory: 1800,
  },
  {
    id: "p7",
    name: "Vitamin D3",
    category: "Nutrition",
    price: 24,
    inventory: 6200,
  },
  {
    id: "p8",
    name: "Organic Coffee",
    category: "Food",
    price: 18,
    inventory: 8900,
  },
];

// Mock data for locations
const geoLocations = [
  { id: "g1", name: "United States", type: "country", reach: 250000000 },
  {
    id: "g2",
    name: "California",
    type: "state",
    parent: "United States",
    reach: 39500000,
  },
  {
    id: "g3",
    name: "New York",
    type: "state",
    parent: "United States",
    reach: 19450000,
  },
  {
    id: "g4",
    name: "Texas",
    type: "state",
    parent: "United States",
    reach: 29500000,
  },
  {
    id: "g5",
    name: "Los Angeles",
    type: "city",
    parent: "California",
    reach: 3970000,
  },
  {
    id: "g6",
    name: "New York City",
    type: "city",
    parent: "New York",
    reach: 8340000,
  },
  { id: "g7", name: "Houston", type: "city", parent: "Texas", reach: 2300000 },
  { id: "g8", name: "Canada", type: "country", reach: 38000000 },
  { id: "g9", name: "United Kingdom", type: "country", reach: 67000000 },
];

function GeoLocationModal({ open, onClose, onApply, initialData = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState(initialData);
  const [excludedLocations, setExcludedLocations] = useState([]);

  const filteredLocations = geoLocations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleLocation = (id, exclude = false) => {
    if (exclude) {
      setExcludedLocations((prev) =>
        prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
      );
      setSelectedLocations((prev) => prev.filter((l) => l !== id));
    } else {
      setSelectedLocations((prev) =>
        prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
      );
      setExcludedLocations((prev) => prev.filter((l) => l !== id));
    }
  };

  const totalReach = geoLocations
    .filter((loc) => selectedLocations.includes(loc.id))
    .reduce((sum, loc) => sum + loc.reach, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-[900px] max-h-[80vh] flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#404040]">
                Geo Location Targeting
              </h2>
              <button
                onClick={onClose}
                className="text-[#7b7b7b] hover:text-[#404040]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                size={18}
              />
              <Input
                placeholder="Search countries, states, or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedLocations.includes(location.id)
                      ? "border-[#10b981] bg-[#ecfdf5]"
                      : excludedLocations.includes(location.id)
                        ? "border-[#ef4444] bg-[#fef2f2]"
                        : "border-[#e5e7eb] hover:border-[#d1d5db]"
                  }`}
                  onClick={() => toggleLocation(location.id)}
                >
                  <div className="flex items-center gap-3">
                    <Globe size={20} className="text-[#7b7b7b]" />
                    <div>
                      <div className="font-medium text-[#404040]">
                        {location.name}
                      </div>
                      <div className="text-sm text-[#7b7b7b] capitalize">
                        {location.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#7b7b7b]">
                      Reach: {(location.reach / 1000000).toFixed(1)}M
                    </span>
                    {selectedLocations.includes(location.id) && (
                      <Badge className="bg-[#10b981] text-white">
                        Included
                      </Badge>
                    )}
                    {excludedLocations.includes(location.id) && (
                      <Badge className="bg-[#ef4444] text-white">
                        Excluded
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLocation(location.id, true);
                      }}
                      className="text-xs text-[#7b7b7b]"
                    >
                      Exclude
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-[#e5e7eb] flex items-center justify-between">
            <span className="text-sm text-[#7b7b7b]">
              {selectedLocations.length} locations selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                onClick={() =>
                  onApply({
                    included: selectedLocations,
                    excluded: excludedLocations,
                  })
                }
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[280px] border-l border-[#e5e7eb] bg-[#f9fafb] p-4">
          <h3 className="font-semibold text-[#404040] mb-4">
            Location Summary
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb]">
              <div className="text-sm text-[#7b7b7b]">Est. Reach</div>
              <div className="text-2xl font-semibold text-[#404040]">
                {}
                {(totalReach / 1000000).toFixed(1)}M
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-[#404040] mb-2">
                Included ({selectedLocations.length})
              </div>
              {selectedLocations.map((id) => {
                const loc = geoLocations.find((l) => l.id === id);
                return loc ? (
                  <div
                    key={id}
                    className="flex items-center justify-between py-1 text-sm"
                  >
                    <span className="text-[#404040]">{loc.name}</span>
                    <button
                      onClick={() => toggleLocation(id)}
                      className="text-[#7b7b7b] hover:text-[#ef4444]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
            {excludedLocations.length > 0 && (
              <div>
                <div className="text-sm font-medium text-[#ef4444] mb-2">
                  Excluded ({excludedLocations.length})
                </div>
                {excludedLocations.map((id) => {
                  const loc = geoLocations.find((l) => l.id === id);
                  return loc ? (
                    <div
                      key={id}
                      className="flex items-center justify-between py-1 text-sm"
                    >
                      <span className="text-[#404040]">{loc.name}</span>
                      <button
                        onClick={() =>
                          setExcludedLocations((prev) =>
                            prev.filter((l) => l !== id),
                          )
                        }
                        className="text-[#7b7b7b] hover:text-[#ef4444]"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreTargetingModal({ open, onClose, onApply, initialData = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStores, setSelectedStores] = useState(initialData);
  const [filterState, setFilterState] = useState("all");

  const states = [...new Set(storeLocations.map((s) => s.state))];

  const filteredStores = storeLocations.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = filterState === "all" || store.state === filterState;
    return matchesSearch && matchesState;
  });

  const toggleStore = (id) => {
    setSelectedStores((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const totalReach = storeLocations
    .filter((store) => selectedStores.includes(store.id))
    .reduce((sum, store) => sum + store.reach, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-[900px] max-h-[80vh] flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#404040]">
                  Store Targeting
                </h2>
                <p className="text-sm text-[#7b7b7b]">
                  Select stores to localize your ads to specific locations
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[#7b7b7b] hover:text-[#404040]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                  size={18}
                />
                <Input
                  placeholder="Search stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedStores.includes(store.id)
                      ? "border-[#10b981] bg-[#ecfdf5]"
                      : "border-[#e5e7eb] hover:border-[#d1d5db]"
                  }`}
                  onClick={() => toggleStore(store.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center">
                        <Store size={20} className="text-[#f59e0b]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#404040]">
                          {store.name}
                        </div>
                        <div className="text-sm text-[#7b7b7b]">
                          {store.city}, {store.state}
                        </div>
                      </div>
                    </div>
                    {selectedStores.includes(store.id) && (
                      <Check size={20} className="text-[#10b981]" />
                    )}
                  </div>
                  <div className="mt-3 text-sm text-[#7b7b7b]">
                    Est. Reach: {(store.reach / 1000).toFixed(0)}K
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-[#e5e7eb] flex items-center justify-between">
            <span className="text-sm text-[#7b7b7b]">
              {selectedStores.length} stores selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                onClick={() => onApply(selectedStores)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[280px] border-l border-[#e5e7eb] bg-[#f9fafb] p-4">
          <h3 className="font-semibold text-[#404040] mb-4">Store Summary</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb]">
              <div className="text-sm text-[#7b7b7b]">Total Reach</div>
              <div className="text-2xl font-semibold text-[#404040]">
                {(totalReach / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb]">
              <div className="text-sm text-[#7b7b7b]">Stores Selected</div>
              <div className="text-2xl font-semibold text-[#404040]">
                {selectedStores.length}
              </div>
            </div>
            <div className="text-xs text-[#7b7b7b] p-3 bg-[#fef3c7] rounded-lg">
              <Info size={14} className="inline mr-1" />
              Store targeting helpsTo localize your ads to specific retail
              locations, improving relevance and conversion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceTargetingModal({ open, onClose, onApply, initialData = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudiences, setSelectedAudiences] = useState(initialData);
  const [audienceType, setAudienceType] = useState("1st_party");

  const filteredAudiences = audienceSegments.filter((aud) =>
    aud.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleAudience = (id) => {
    setSelectedAudiences((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const totalReach = audienceSegments
    .filter((aud) => selectedAudiences.includes(aud.id))
    .reduce((sum, aud) => sum + aud.reach, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-[950px] max-h-[85vh] flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#404040]">
                Audience Targeting
              </h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="text-[#2563eb] border-[#2563eb] bg-transparent"
                >
                  <Plus size={16} className="mr-1" />
                  Create New Audience
                </Button>
                <button
                  onClick={onClose}
                  className="text-[#7b7b7b] hover:text-[#404040]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className="text-[#7b7b7b]" />
              <span className="text-sm text-[#7b7b7b]">
                Select Audience Segments to Include or Exclude
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle size={14} className="text-[#7b7b7b]" />
                </TooltipTrigger>
                <TooltipContent>
                  Target specific customer segments based on their behavior and
                  attributes
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex gap-3">
              <Select value={audienceType} onValueChange={setAudienceType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Audience Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st_party">1st Party Audience</SelectItem>
                  <SelectItem value="3rd_party">3rd Party Audience</SelectItem>
                  <SelectItem value="lookalike">Lookalike Audience</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                  size={18}
                />
                <Input
                  placeholder="Search audience segment to add"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-[#e5e7eb]">
              {filteredAudiences.map((audience) => (
                <div
                  key={audience.id}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-all hover:bg-[#f9fafb] ${
                    selectedAudiences.includes(audience.id)
                      ? "bg-[#eff6ff]"
                      : ""
                  }`}
                  onClick={() => toggleAudience(audience.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedAudiences.includes(audience.id)}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#404040]">
                          {audience.name}
                        </span>
                        {audience.recommended && (
                          <Badge className="bg-[#eff6ff] text-[#2563eb] border-0 text-xs">
                            <Sparkles size={12} className="mr-1" />
                            Sofie's Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-[#7b7b7b]">
                        Estimated reach: {(audience.reach / 1000000).toFixed(1)}
                        M | {audience.premium} premium on each inventory's
                        minimum CPM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedAudiences.includes(audience.id) ? (
                      <span className="text-[#10b981] font-medium flex items-center gap-1">
                        <Check size={16} />
                        Selected
                      </span>
                    ) : (
                      <span className="text-[#2563eb] font-medium">Select</span>
                    )}
                    <button className="text-[#7b7b7b] hover:text-[#404040] p-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-[#e5e7eb] flex items-center justify-between">
            <span className="text-sm text-[#404040] font-medium">
              Audience selected: {selectedAudiences.length}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-[#2563eb] border-[#2563eb] bg-transparent"
              >
                <Plus size={16} className="mr-1" />
                Add
              </Button>
              <Button
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                onClick={() => onApply(selectedAudiences)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[280px] border-l border-[#e5e7eb] bg-[#f9fafb] flex flex-col">
          <div className="p-4 border-b border-[#e5e7eb]">
            <h3 className="font-semibold text-[#404040]">Audience Reach</h3>
          </div>
          <div className="p-4 flex-1">
            {selectedAudiences.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#e5e7eb] rounded-full flex items-center justify-center">
                  <Users size={32} className="text-[#7b7b7b]" />
                </div>
                <p className="text-sm text-[#7b7b7b]">
                  Add audience from the left panel to see your audience reach or
                  create new audience segment
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-[#e5e7eb]">
                  <div className="text-sm text-[#7b7b7b]">Total Reach</div>
                  <div className="text-2xl font-semibold text-[#404040]">
                    {(totalReach / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-[#e5e7eb]">
            <h4 className="font-medium text-[#404040] mb-3">
              Audience Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#7b7b7b]">All Cohorts:</span>
                <span className="text-[#404040]">
                  {selectedAudiences.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7b7b7b]">Included:</span>
                <span className="text-[#404040]">
                  {selectedAudiences.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7b7b7b]">Excluded:</span>
                <span className="text-[#404040]">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeywordTargetingModal({ open, onClose, onApply, initialData = [] }) {
  const [keywords, setKeywords] = useState(initialData);
  const [bulkInput, setBulkInput] = useState("");
  const [activeTab, setActiveTab] = useState("manual");
  const [generatedKeywords, setGeneratedKeywords] = useState([]);
  const [productCategory, setProductCategory] = useState("");

  const handleBulkAdd = () => {
    const newKeywords = bulkInput
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0 && !keywords.includes(k));
    setKeywords([...keywords, ...newKeywords]);
    setBulkInput("");
  };

  const generateKeywords = () => {
    // Mock AI-generated keywords
    const suggestions = [
      "premium headphones",
      "wireless audio",
      "noise canceling",
      "bluetooth earbuds",
      "studio quality",
      "bass boost",
      "comfortable fit",
      "long battery life",
      "premium sound",
    ];
    setGeneratedKeywords(suggestions.filter((k) => !keywords.includes(k)));
  };

  const addGeneratedKeyword = (keyword) => {
    if (!keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
      setGeneratedKeywords(generatedKeywords.filter((k) => k !== keyword));
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-[900px] max-h-[85vh] flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#404040]">
                Keyword Targeting
              </h2>
              <button
                onClick={onClose}
                className="text-[#7b7b7b] hover:text-[#404040]"
              >
                <X size={20} />
              </button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-[#f3f4f6]">
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                <TabsTrigger value="generate">AI Generate</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="mt-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a keyword..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        const value = e.currentTarget.value.trim();
                        if (!keywords.includes(value)) {
                          setKeywords([...keywords, value]);
                        }
                        e.currentTarget.value = "";
                      }
                    }}
                  />

                  <Button variant="outline">Add</Button>
                </div>
              </TabsContent>

              <TabsContent value="bulk" className="mt-4">
                <Textarea
                  placeholder="Enter keywords (one per line)&#10;electronics&#10;smartphones&#10;laptops&#10;gadgets"
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  className="min-h-[150px] font-mono text-sm"
                />

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-[#7b7b7b]">
                    Keywords will be considered under Phrase match type. Max 50
                    keywords.
                  </p>
                  <Button
                    onClick={handleBulkAdd}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                  >
                    Add Keywords
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="generate" className="mt-4">
                <div className="bg-[#f09ff] border border-[#bae6fd] rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Wand2 size={20} className="text-[#0284c7]" />
                    <span className="font-medium text-[#0c4ae6]">
                      AI Keyword Generator
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={productCategory}
                      onValueChange={setProductCategory}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="sports">Sports & Fitness</SelectItem>
                        <SelectItem value="home">Home & Garden</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={generateKeywords}
                      className="bg-[#0284c7] hover:bg-[#0369a1] text-white"
                    >
                      <Sparkles size={16} className="mr-1" />
                      Generate
                    </Button>
                  </div>
                </div>

                {generatedKeywords.length > 0 && (
                  <div className="border border-[#e5e7eb] rounded-lg p-4">
                    <div className="text-sm font-medium text-[#404040] mb-3">
                      Suggested Keywords
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {generatedKeywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="cursor-pointer hover:bg-[#eff6ff] hover:border-[#2563eb]"
                          onClick={() => addGeneratedKeyword(keyword)}
                        >
                          <Plus size={12} className="mr-1" />
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-[#404040]">
                NEW KEYWORDS ADDED ({keywords.length})
              </div>
              <div className="relative w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                  size={16}
                />
                <Input placeholder="Search" className="pl-9 h-8" />
              </div>
            </div>

            {keywords.length === 0 ? (
              <div className="text-center py-12 text-[#7b7b7b]">
                <Tag size={48} className="mx-auto mb-4 opacity-50" />
                <p>You have not added any keyword to your campaign yet!</p>
              </div>
            ) : (
              <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                <div className="bg-[#f9fafb] px-4 py-2 border-b border-[#e5e7eb] flex items-center gap-3">
                  <Checkbox />
                  <span className="text-sm font-medium text-[#7b7b7b]">
                    Keyword
                  </span>
                </div>
                {keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 border-b border-[#e5e7eb] last:border-0 flex items-center justify-between hover:bg-[#f9fafb]"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox />
                      <span className="text-[#404040]">{keyword}</span>
                    </div>
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="text-[#7b7b7b] hover:text-[#ef4444]"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[#e5e7eb] flex justify-center">
            <Button
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8"
              onClick={() => onApply(keywords)}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="w-[250px] border-l border-[#e5e7eb] bg-[#f9fafb] p-4">
          <h3 className="font-semibold text-[#404040] mb-4">Keyword Summary</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb]">
              <div className="text-sm text-[#7b7b7b]">Total Keywords</div>
              <div className="text-2xl font-semibold text-[#404040]">
                {keywords.length}
              </div>
            </div>
            <div className="text-xs text-[#7b7b7b] p-3 bg-[#fef3c7] rounded-lg">
              <Info size={14} className="inline mr-1" />
              Keywords help match your ads to relevant search queries and
              content.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCatalogModal({ open, onClose, onApply, initialData = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState(initialData);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = [...new Set(productCatalog.map((p) => p.category))];

  const filteredProducts = productCatalog.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-[950px] max-h-[85vh] flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-[#e5e7eb]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#404040]">
                  Product Catalog Targeting
                </h2>
                <p className="text-sm text-[#7b7b7b]">
                  Select products from your catalog to promote
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[#7b7b7b] hover:text-[#404040]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]"
                  size={18}
                />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedProducts.includes(product.id)
                      ? "border-[#10b981] bg-[#ecfdf5]"
                      : "border-[#e5e7eb] hover:border-[#d1d5db]"
                  }`}
                  onClick={() => toggleProduct(product.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#f3f4f6] flex items-center justify-center">
                        <ShoppingBag size={24} className="text-[#7b7b7b]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#404040]">
                          {product.name}
                        </div>
                        <div className="text-sm text-[#7b7b7b]">
                          {product.category}
                        </div>
                      </div>
                    </div>
                    {selectedProducts.includes(product.id) && (
                      <Check size={20} className="text-[#10b981]" />
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#404040]">
                      ${product.price}
                    </span>
                    <span className="text-[#7b7b7b]">
                      Stock: {product.inventory}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-[#e5e7eb] flex items-center justify-between">
            <span className="text-sm text-[#7b7b7b]">
              {selectedProducts.length} products selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                onClick={() => onApply(selectedProducts)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[280px] border-l border-[#e5e7eb] bg-[#f9fafb] p-4">
          <h3 className="font-semibold text-[#404040] mb-4">Product Summary</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-[#e5e7eb]">
              <div className="text-sm text-[#7b7b7b]">Products Selected</div>
              <div className="text-2xl font-semibold text-[#404040]">
                {selectedProducts.length}
              </div>
            </div>
            {selectedProducts.length > 0 && (
              <div>
                <div className="text-sm font-medium text-[#404040] mb-2">
                  Selected Products
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {selectedProducts.map((id) => {
                    const product = productCatalog.find((p) => p.id === id);
                    return product ? (
                      <div
                        key={id}
                        className="flex items-center justify-between bg-white p-2 rounded border border-[#e5e7eb]"
                      >
                        <span className="text-sm text-[#404040] truncate">
                          {product.name}
                        </span>
                        <button
                          onClick={() => toggleProduct(id)}
                          className="text-[#7b7b7b] hover:text-[#ef4444]"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OffsiteAdGroupWizard({
  open,
  onClose,
  onSave,
  editingAdGroup,
  adGroupName = "",
  campaignObjective = "",
  mode = "create_campaign",
  selectedCampaign,
}) {
  const visibleSteps =
    mode === "add_ad_group"
      ? steps.filter((s) => !["config"].includes(s.id)) // Ad group mode excludes budget steps
      : steps;

  const [currentStep, setCurrentStep] = useState(visibleSteps[0].id);
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [data, setData] = useState({
    name: editingAdGroup?.name || adGroupName,
    platform: editingAdGroup?.platform || null,
    adFormat: editingAdGroup?.adFormat || null,
    budget: editingAdGroup?.budget || "",
    bidStrategy: editingAdGroup?.bidStrategy || "lowest_cost",
    targeting: editingAdGroup?.targeting || {
      locations: [],
      ageMin: "18",
      ageMax: "65",
      gender: "all",
      interests: [],
      keywords: [],
      audiences: [],
      stores: [],
      productCatalogs: [],
    },
    creative: editingAdGroup?.creative || {
      headline: "",
      description: "",
      cta: "Learn More",
      imageUrl: "",
      videoUrl: "",
      imageFile: null,
      videoFile: null,
    },
    placements: editingAdGroup?.placements || [],
  });

  const [expandedTargetingSections, setExpandedTargetingSections] = useState(
    [],
  );

  const [geoModalOpen, setGeoModalOpen] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [audienceModalOpen, setAudienceModalOpen] = useState(false);
  const [keywordModalOpen, setKeywordModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [targetingConfigured, setTargetingConfigured] = useState({
    geoLocation: "not_configured",
    storeTargeting: "not_configured",
    audienceTargeting: "not_configured",
    keywordTargeting: "not_configured",
    productCatalog: "not_configured",
  });

  const currentStepInfo = steps.find((s) => s.id === currentStep); // Find the full step info
  const stepIndex = visibleSteps.findIndex((s) => s.id === currentStep);
  const isLastStep = stepIndex === visibleSteps.length - 1;

  // Declaring the missing functions
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (data.adFormat === "performanceMax") {
      // Handle multiple uploads for Performance Max
      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (imageFiles.length === 0) return;

      const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

      setData((prev) => ({
        ...prev,
        creative: {
          ...prev.creative,
          // For simplicity, we'll just take the first one for display, but keep all files
          imageUrl: imageUrls[0] || "",
          imageFile: imageFiles[0] || null, // Store the first file as imageFile
          // Potentially store all files if needed for backend upload
        },
      }));
    } else {
      // Handle single upload for other formats
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setData((prev) => ({
            ...prev,
            creative: {
              ...prev.creative,
              imageUrl: e.target?.result,
              imageFile: file,
            },
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setData((prev) => ({
          ...prev,
          creative: {
            ...prev.creative,
            videoUrl: e.target?.result,
            videoFile: file,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = (type) => {
    setData((prev) => ({
      ...prev,
      creative: {
        ...prev.creative,
        imageUrl: type === "image" ? "" : prev.creative.imageUrl,
        imageFile: type === "image" ? null : prev.creative.imageFile,
        videoUrl: type === "video" ? "" : prev.creative.videoUrl,
        videoFile: type === "video" ? null : prev.creative.videoFile,
      },
    }));
  };

  const canProceed = () => {
    switch (currentStepInfo.id) {
      case "basics":
        return data.name && data.platform;
      case "format":
        return data.adFormat;
      case "targeting":
        return true;
      case "creative":
        // Basic check for creative fields
        if (
          data.adFormat === "image" ||
          data.adFormat === "carousel" ||
          data.adFormat === "collection" ||
          data.adFormat === "display" ||
          data.adFormat === "shopping" ||
          data.adFormat === "static" ||
          data.adFormat === "performanceMax" || // Added performanceMax check
          data.adFormat === "google-search" || // Added google search as static text
          data.adFormat === "gmail-promotions" || // Added gmail
          data.adFormat === "gmail-social" || // Added gmail
          data.adFormat === "discover-feed" || // Added discover
          data.adFormat === "discover-youtube" || // Added discover
          data.adFormat === "display-responsive" ||
          data.adFormat === "display-banner" ||
          data.adFormat === "display-native"
        ) {
          // For formats that primarily use images/static content
          return (
            data.creative.headline &&
            data.creative.description &&
            data.creative.imageUrl
          );
        }
        if (
          data.adFormat === "video" ||
          data.adFormat === "infeed" ||
          data.adFormat === "youtube-watch" ||
          data.adFormat === "youtube-shorts" ||
          data.adFormat === "fb-instream-reels" ||
          data.adFormat === "audience-network-rewarded"
        ) {
          // For formats that primarily use video
          return (
            data.creative.headline &&
            data.creative.description &&
            data.creative.videoUrl
          );
        }
        // For text-based ads like search (if no image/video is required)
        return data.creative.headline && data.creative.description;
      case "placement":
        return data.placements.length > 0;
      case "config":
        return data.budget;
      default:
        return true;
    }
  };

  const handleNext = () => {
    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex < visibleSteps.length) {
      setCurrentStep(visibleSteps[nextStepIndex].id);
    } else {
      // Last step - save and close
      onSave(data);
      onClose();
    }
  };

  const handlePrevious = () => {
    const prevStepIndex = stepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(visibleSteps[prevStepIndex].id);
    }
  };

  const togglePlacement = (placementId, checked) => {
    setData((prev) => {
      const newPlacements = checked
        ? [...prev.placements, placementId]
        : prev.placements.filter((p) => p !== placementId);
      return { ...prev, placements: newPlacements };
    });
  };

  // Mock placement configurations for Meta, Google, and TikTok
  const placementConfigs = {
    meta: [
      // Feeds Category
      {
        id: "fb-feed",
        category: "Feeds",
        label: "Facebook Feed",
        description:
          "Ads appear in the Facebook News Feed on desktop and mobile devices",
        aspectRatio: "1:1 or 4:5",
        preview: "feed",
      },
      {
        id: "threads-feed",
        category: "Feeds",
        label: "Threads Feed",
        description:
          "Ads appear in the Threads feed when people access the Threads app via mobile devices",
        aspectRatio: "1:1 or 4:5",
        preview: "feed",
      },
      {
        id: "ig-feed",
        category: "Feeds",
        label: "Instagram Feed",
        description:
          "Ads appear on the Instagram home feed from the mobile app, desktop and mobile web browser",
        aspectRatio: "1:1 or 4:5",
        preview: "feed",
      },
      {
        id: "ig-profile-feed",
        category: "Feeds",
        label: "Instagram Profile Feed",
        description:
          "Ads appear within the feed view of public Instagram profiles of people aged 18+",
        aspectRatio: "1:1 or 4:5",
        preview: "feed",
      },
      {
        id: "fb-marketplace",
        category: "Feeds",
        label: "Facebook Marketplace",
        description:
          "Ads appear in the Marketplace home page or when someone browses Marketplace",
        aspectRatio: "1:1",
        preview: "feed",
      },
      {
        id: "fb-right-column",
        category: "Feeds",
        label: "Facebook Right Column",
        description:
          "Ads appear in the right column on Facebook (desktop only)",
        aspectRatio: "1:1",
        preview: "display",
      },
      {
        id: "fb-notifications",
        category: "Feeds",
        label: "Facebook Notifications",
        description:
          "Ads appear in the Facebook notifications tab alongside other recent notifications",
        aspectRatio: "1:1",
        preview: "feed",
      },
      {
        id: "fb-business-explore",
        category: "Feeds",
        label: "Facebook Business Explore",
        description:
          "Ads appear in Facebook Business Explore when someone taps on a business post",
        aspectRatio: "1:1",
        preview: "feed",
      },
      {
        id: "ig-explore",
        category: "Feeds",
        label: "Instagram Explore",
        description:
          "Ads appear in the browsing experience when someone clicks on a photo or video",
        aspectRatio: "1:1 or 4:5",
        preview: "feed",
      },
      {
        id: "ig-explore-home",
        category: "Feeds",
        label: "Instagram Explore Home",
        description:
          "Ads appear as a tile in the Explore grid with other recommended content",
        aspectRatio: "1:1",
        preview: "feed",
      },

      // Stories, Status and Reels Category
      {
        id: "fb-stories",
        category: "Stories, Status & Reels",
        label: "Facebook Stories",
        description: "Full-screen vertical ads in Facebook Stories",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "ig-stories",
        category: "Stories, Status & Reels",
        label: "Instagram Stories",
        description:
          "Ads appear in people's Stories on Instagram (mobile app, desktop and mobile web)",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "ig-profile-reels",
        category: "Stories, Status & Reels",
        label: "Instagram Profile Reels",
        description:
          "Ads appear within the reels feed of public Instagram profiles of people aged 18+",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "messenger-stories",
        category: "Stories, Status & Reels",
        label: "Messenger Stories",
        description: "Ads appear in people's stories on Messenger",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "ig-reels",
        category: "Stories, Status & Reels",
        label: "Instagram Reels",
        description:
          "Vertical video ads in Instagram Reels tab (mobile app, desktop and mobile web)",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "fb-reels",
        category: "Stories, Status & Reels",
        label: "Facebook Reels",
        description: "Vertical video ads in the Facebook Reels tab",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "whatsapp-status",
        category: "Stories, Status & Reels",
        label: "WhatsApp Status",
        description: "Ads appear in WhatsApp status in the Updates tab",
        aspectRatio: "9:16",
        preview: "story",
      },

      // In-stream Ads Category
      {
        id: "fb-instream-reels",
        category: "In-stream Ads",
        label: "Facebook In-stream",
        description:
          "Ads appear in video on demand and approved partner live streams on Facebook",
        aspectRatio: "16:9 or 1:1",
        preview: "video",
      },
      {
        id: "fb-reels-banner",
        category: "In-stream Ads",
        label: "Ads on Facebook Reels",
        description:
          "Reach people with banner or video ads as they watch reels",
        aspectRatio: "9:16",
        preview: "story",
      },

      // Search Category
      {
        id: "fb-search",
        category: "Search",
        label: "Facebook Search Results",
        description:
          "Ads appear next to relevant Facebook and Marketplace search results",
        aspectRatio: "1:1",
        preview: "search",
      },
      {
        id: "ig-search",
        category: "Search",
        label: "Instagram Search Results",
        description:
          "Ads appear in search results when people enter a keyword in Instagram",
        aspectRatio: "1:1 or 4:5",
        preview: "search",
      },

      // Apps and Sites Category
      {
        id: "audience-network",
        category: "Apps & Sites",
        label: "Audience Network",
        description:
          "Ads appear on apps in Audience Network (native, banner and interstitial)",
        aspectRatio: "Varies",
        preview: "display",
      },
      {
        id: "audience-network-rewarded",
        category: "Apps & Sites",
        label: "Audience Network Rewarded Videos",
        description:
          "Video ads people can watch in exchange for a reward in an app",
        aspectRatio: "16:9 or 9:16",
        preview: "video",
      },
    ],

    google: [
      // YouTube Category
      {
        id: "youtube-watch",
        category: "YouTube",
        label: "YouTube Watch Pages",
        description:
          "Video ads that appear before, during, or after YouTube videos",
        aspectRatio: "16:9",
        preview: "video",
      },
      {
        id: "youtube-home",
        category: "YouTube",
        label: "YouTube Home Feed",
        description:
          "Ads appear in the YouTube home feed alongside recommended videos",
        aspectRatio: "16:9",
        preview: "display",
      },
      {
        id: "youtube-search",
        category: "YouTube",
        label: "YouTube Search Results",
        description: "Ads appear at the top of YouTube search results",
        aspectRatio: "16:9",
        preview: "display",
      },
      {
        id: "youtube-shorts",
        category: "YouTube",
        label: "YouTube Shorts",
        description: "Vertical video ads between YouTube Shorts",
        aspectRatio: "9:16",
        preview: "story",
      },

      // Discover Category
      {
        id: "discover-feed",
        category: "Discover",
        label: "Google Discover Feed",
        description:
          "Ads appear in the personalized Discover feed on Google mobile app",
        aspectRatio: "1.91:1 or 1:1",
        preview: "feed",
      },
      {
        id: "discover-youtube",
        category: "Discover",
        label: "Discover on YouTube",
        description:
          "Ads appear in the YouTube Home feed and Watch Next recommendations",
        aspectRatio: "1.91:1",
        preview: "display",
      },

      // Gmail Category
      {
        id: "gmail-promotions",
        category: "Gmail",
        label: "Gmail Promotions Tab",
        description:
          "Expandable ads appear at the top of the Gmail Promotions tab",
        aspectRatio: "Variable",
        preview: "display",
      },
      {
        id: "gmail-social",
        category: "Gmail",
        label: "Gmail Social Tab",
        description: "Ads appear in the Gmail Social tab inbox",
        aspectRatio: "Variable",
        preview: "display",
      },

      // Display Network Category
      {
        id: "display-responsive",
        category: "Display",
        label: "Responsive Display Ads",
        description:
          "Flexible ads that adjust to available ad space across the Display Network",
        aspectRatio: "1.91:1 or 1:1",
        preview: "display",
      },
      {
        id: "display-banner",
        category: "Display",
        label: "Display Banner Ads",
        description: "Standard banner ads across millions of websites and apps",
        aspectRatio: "Multiple sizes",
        preview: "display",
      },
      {
        id: "display-native",
        category: "Display",
        label: "Native Display Ads",
        description:
          "Ads that match the look and feel of the content around them",
        aspectRatio: "Variable",
        preview: "feed",
      },

      // Search Category
      {
        id: "search-text",
        category: "Search",
        label: "Google Search Text Ads",
        description:
          "Text ads that appear at the top and bottom of Google search results",
        aspectRatio: "Text only",
        preview: "search",
      },
      {
        id: "search-shopping",
        category: "Search",
        label: "Google Shopping Ads",
        description:
          "Product listing ads that appear in Google Shopping and search results",
        aspectRatio: "1:1 image",
        preview: "search",
      },
      {
        id: "search-local",
        category: "Search",
        label: "Local Search Ads",
        description: "Ads that appear in Google Maps and local search results",
        aspectRatio: "Variable",
        preview: "search",
      },
    ],

    tiktok: [
      {
        id: "tiktok-feed",
        category: "In-Feed",
        label: "TikTok For You",
        description: "Full-screen ads in the For You feed",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "tiktok-search",
        category: "Search",
        label: "TikTok Search",
        description: "Ads in TikTok search results",
        aspectRatio: "9:16",
        preview: "story",
      },
      {
        id: "pangle",
        category: "Audience Network",
        label: "Pangle Network",
        description: "Ads across TikTok's Audience Network apps",
        aspectRatio: "9:16",
        preview: "story",
      },
    ],
  };

  const renderPlacementPreview = (placement) => {
    const hasCreative = data.creative.imageUrl || data.creative.videoUrl;

    // Meta Feed Placements (Square/Portrait in feed context)
    if (["feed", "instagram-feed", "marketplace-feed"].includes(placement.id)) {
      return (
        <div className="w-[280px] bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
          {/* Feed post header */}
          <div className="flex items-center gap-2 p-3 border-b border-[#e5e7eb]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1877f2] to-[#0866ff]"></div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-semibold text-[#050505]">
                  Your Brand
                </p>
                <div className="w-1 h-1 rounded-full bg-[#65676b]"></div>
                <span className="text-[10px] font-semibold text-[#65676b]">
                  Sponsored
                </span>
              </div>
              <p className="text-[10px] text-[#65676b]">2h ago</p>
            </div>
          </div>

          {/* Creative area */}
          {hasCreative ? (
            data.creative.videoUrl ? (
              <video
                src={data.creative.videoUrl}
                className="w-full aspect-square object-cover"
                muted
                playsInline
              />
            ) : (
              <img
                src={data.creative.imageUrl || "/placeholder.svg"}
                alt="Ad"
                className="w-full aspect-square object-cover"
              />
            )
          ) : (
            <div className="w-full aspect-square bg-gradient-to-br from-[#f0f2f5] to-[#e4e6eb] flex items-center justify-center">
              <ImageIcon size={40} className="text-[#bcc0c4]" />
            </div>
          )}

          {/* Engagement bar */}
          <div className="p-3 border-t border-[#e5e7eb]">
            <p className="text-xs font-medium text-[#050505] mb-1 line-clamp-2">
              {data.creative.headline || "Your compelling headline goes here"}
            </p>
            <p className="text-[10px] text-[#65676b] mb-2 line-clamp-2">
              {data.creative.description || "Engaging description text"}
            </p>
            <button className="w-full py-2 bg-[#0866ff] text-white text-xs font-semibold rounded-lg hover:bg-[#0756d4] transition-colors">
              {data.creative.cta || "Learn More"}
            </button>
          </div>
        </div>
      );
    }

    // Stories & Reels (9:16 phone mockup)
    if (
      ["stories", "instagram-stories", "reels", "instagram-reels"].includes(
        placement.id,
      )
    ) {
      return (
        <div className="relative">
          {/* Phone mockup frame */}
          <div className="w-[180px] h-[320px] bg-black rounded-[28px] shadow-2xl p-2 relative">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10"></div>

            {/* Screen content */}
            <div className="w-full h-full rounded-[20px] overflow-hidden relative">
              {hasCreative ? (
                data.creative.videoUrl ? (
                  <video
                    src={data.creative.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                  />
                ) : (
                  <img
                    src={data.creative.imageUrl || "/placeholder.svg"}
                    alt="Ad"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center">
                  <ImageIcon size={48} className="text-white/50" />
                </div>
              )}

              {/* Story UI overlay */}
              <div className="absolute top-0 left-0 right-0 p-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#1877f2] to-[#0866ff]"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-[10px] font-semibold drop-shadow-lg">
                      Your Brand
                    </p>
                    <p className="text-white/80 text-[8px] drop-shadow-lg">
                      Sponsored
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA button at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-xs font-semibold mb-2 drop-shadow-lg line-clamp-2">
                  {data.creative.headline || "Swipe up to learn more"}
                </p>
                <div className="flex items-center justify-center gap-2 py-2 px-4 bg-white/95 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-semibold text-[#050505]">
                    {data.creative.cta || "Learn More"}
                  </span>
                  <ChevronRight size={14} className="text-[#050505]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // YouTube Video Placements (16:9 video player)
    if (placement.id.includes("youtube") || placement.id.includes("video")) {
      return (
        <div className="w-[360px] bg-black rounded-lg shadow-lg overflow-hidden">
          {/* Video player */}
          <div className="relative aspect-video bg-black">
            {hasCreative ? (
              data.creative.videoUrl ? (
                <video
                  src={data.creative.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                />
              ) : (
                <img
                  src={data.creative.imageUrl || "/placeholder.svg"}
                  alt="Ad"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="w-full h-full bg-[#1f1f1f] flex items-center justify-center">
                <Video size={48} className="text-[#909090]" />
              </div>
            )}

            {/* YouTube Ad overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#ffd700] text-black text-[10px] font-bold rounded">
                    AD
                  </span>
                  <p className="text-white text-xs font-medium">
                    {data.creative.headline || "Ad Title"}
                  </p>
                </div>
                <button className="px-3 py-1 bg-white text-black text-xs font-semibold rounded hover:bg-[#f1f1f1] transition-colors">
                  {data.creative.cta || "Visit Site"}
                </button>
              </div>
            </div>

            {/* Skip ad button (top right) */}
            <div className="absolute top-3 right-3">
              <div className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] rounded">
                Ad • 0:05
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Google Search Ads (Text-only search result)
    if (placement.id.includes("search") && !placement.id.includes("shopping")) {
      return (
        <div className="w-[400px] bg-white rounded-lg border border-[#e5e7eb] shadow-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-1.5 py-0.5 bg-[#f8f9fa] border border-[#dadce0] rounded text-[10px] font-medium text-[#5f6368]">
              Ad
            </div>
            <span className="text-xs text-[#202124]">www.yourbrand.com</span>
          </div>
          <h3 className="text-lg text-[#1a0dab] font-normal mb-1 hover:underline cursor-pointer line-clamp-1">
            {data.creative.headline ||
              "Your Headline - Brand Name | Product Category"}
          </h3>
          <p className="text-sm text-[#4d5156] line-clamp-2 mb-2">
            {data.creative.description ||
              "Your ad description appears here in the search results. Make it compelling and relevant to the search query."}
          </p>
          <div className="flex items-center gap-3 text-xs text-[#1a0dab]">
            <span className="hover:underline cursor-pointer">Shop Now</span>
            <span className="hover:underline cursor-pointer">Learn More</span>
            <span className="hover:underline cursor-pointer">Contact Us</span>
          </div>
        </div>
      );
    }

    // Google Shopping Ads (Product grid)
    if (placement.id.includes("shopping")) {
      return (
        <div className="w-[160px] bg-white rounded-lg border border-[#e5e7eb] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          {hasCreative ? (
            <img
              src={data.creative.imageUrl || "/placeholder.svg"}
              alt="Product"
              className="w-full aspect-square object-cover"
            />
          ) : (
            <div className="w-full aspect-square bg-[#f8f9fa] flex items-center justify-center">
              <ShoppingBag size={32} className="text-[#dadce0]" />
            </div>
          )}
          <div className="p-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="px-1 py-0.5 bg-[#f8f9fa] border border-[#dadce0] rounded text-[8px] font-medium text-[#5f6368]">
                Sponsored
              </span>
            </div>
            <p className="text-xs text-[#202124] font-medium mb-1 line-clamp-2">
              {data.creative.headline || "Product Name"}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold text-[#202124]">
                $49.99
              </span>
              <span className="text-[10px] text-[#70757a] line-through">
                $79.99
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-2.5 h-2.5 text-[#fbbc04]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0 2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-[9px] text-[#70757a]">(234)</span>
            </div>
          </div>
        </div>
      );
    }

    // Google Display Network (Banner ads)
    if (placement.id.includes("display") || placement.id.includes("banner")) {
      return (
        <div className="w-[320px] bg-white rounded-lg border border-[#e5e7eb] shadow-sm overflow-hidden">
          {hasCreative ? (
            <img
              src={data.creative.imageUrl || "/placeholder.svg"}
              alt="Banner Ad"
              className="w-full h-[100px] object-cover"
            />
          ) : (
            <div className="w-full h-[100px] bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#fbbc04] flex items-center justify-center">
              <ImageIcon size={36} className="text-white/50" />
            </div>
          )}
          <div className="p-2 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-[#202124] line-clamp-1">
                {data.creative.headline || "Your Ad Headline"}
              </p>
              <p className="text-[10px] text-[#5f6368] line-clamp-1">
                {data.creative.description || "Description"}
              </p>
            </div>
            <button className="px-3 py-1 bg-[#1a73e8] text-white text-xs font-medium rounded hover:bg-[#1765cc] transition-colors flex-shrink-0 ml-2">
              {data.creative.cta || "Shop"}
            </button>
          </div>
        </div>
      );
    }

    // Right Column / Sidebar Ads (Small vertical format)
    if (
      placement.id.includes("right-column") ||
      placement.id.includes("sidebar")
    ) {
      return (
        <div className="w-[220px] bg-white rounded-lg border border-[#e5e7eb] shadow-sm overflow-hidden">
          {hasCreative ? (
            <img
              src={data.creative.imageUrl || "/placeholder.svg"}
              alt="Ad"
              className="w-full h-[120px] object-cover"
            />
          ) : (
            <div className="w-full h-[120px] bg-[#f0f2f5] flex items-center justify-center">
              <ImageIcon size={28} className="text-[#bcc0c4]" />
            </div>
          )}
          <div className="p-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[9px] font-semibold text-[#65676b]">
                Sponsored
              </span>
            </div>
            <p className="text-xs font-medium text-[#050505] mb-0.5 line-clamp-2">
              {data.creative.headline || "Ad Headline"}
            </p>
            <p className="text-[10px] text-[#65676b] line-clamp-2">
              {data.creative.description || "Description text"}
            </p>
          </div>
        </div>
      );
    }

    // TikTok Feed (Vertical phone-style)
    if (placement.id.includes("tiktok")) {
      return (
        <div className="relative">
          <div className="w-[160px] h-[280px] bg-black rounded-2xl shadow-xl overflow-hidden relative">
            {hasCreative ? (
              data.creative.videoUrl ? (
                <video
                  src={data.creative.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                />
              ) : (
                <img
                  src={data.creative.imageUrl || "/placeholder.svg"}
                  alt="Ad"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#25f4ee] via-[#fe2c55] to-[#000] flex items-center justify-center">
                <Video size={40} className="text-white/50" />
              </div>
            )}

            {/* TikTok UI elements */}
            <div className="absolute right-2 bottom-20 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">♥</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">💬</span>
              </div>
            </div>

            {/* Ad info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-white/90"></div>
                <div>
                  <p className="text-white text-[10px] font-semibold">
                    @yourbrand
                  </p>
                  <p className="text-white/70 text-[8px]">Sponsored</p>
                </div>
              </div>
              <p className="text-white text-xs font-medium mb-2 line-clamp-2">
                {data.creative.headline || "Check this out! 🔥"}
              </p>
              <button className="w-full py-1.5 bg-[#fe2c55] text-white text-xs font-bold rounded-lg">
                {data.creative.cta || "Shop Now"}
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Messenger Inbox (Chat interface)
    if (placement.id.includes("messenger")) {
      return (
        <div className="w-[280px] bg-white rounded-xl border border-[#e5e7eb] shadow-lg overflow-hidden">
          {/* Messenger header */}
          <div className="p-3 border-b border-[#e5e7eb] flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b2ff] to-[#0078ff]"></div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#050505]">Your Brand</p>
              <p className="text-[10px] text-[#65676b]">Sponsored Message</p>
            </div>
          </div>

          {/* Message bubble with ad */}
          <div className="p-3 space-y-2">
            <div className="bg-[#e4e6eb] rounded-2xl rounded-tl-sm p-3 max-w-[200px]">
              {hasCreative && (
                <img
                  src={data.creative.imageUrl || "/placeholder.svg"}
                  alt="Ad"
                  className="w-full aspect-video object-cover rounded-lg mb-2"
                />
              )}
              <p className="text-xs text-[#050505] mb-1 font-medium">
                {data.creative.headline || "Hey! Check this out"}
              </p>
              <p className="text-[10px] text-[#65676b]">
                {data.creative.description || "Special offer just for you"}
              </p>
            </div>
            <button className="w-full py-2 bg-[#0084ff] text-white text-xs font-semibold rounded-full">
              {data.creative.cta || "View Offer"}
            </button>
          </div>
        </div>
      );
    }

    // Gmail Ads (Email-like format)
    if (placement.id.includes("gmail")) {
      return (
        <div className="w-[340px] bg-white rounded-lg border border-[#e5e7eb] shadow-sm">
          <div className="p-3 border-b border-[#e5e7eb] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4285f4] to-[#ea4335]"></div>
              <div>
                <p className="text-xs font-medium text-[#202124]">Your Brand</p>
                <p className="text-[10px] text-[#5f6368]">Promotional</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#fef7e0] border border-[#fbbc04] rounded text-[9px] font-medium text-[#ea8600]">
              Ad
            </span>
          </div>

          <div className="p-3">
            <h4 className="text-sm font-medium text-[#202124] mb-1">
              {data.creative.headline || "Special Offer Inside"}
            </h4>
            <p className="text-xs text-[#5f6368] mb-3 line-clamp-2">
              {data.creative.description ||
                "Limited time offer on our best products. Don't miss out!"}
            </p>

            {hasCreative && (
              <img
                src={data.creative.imageUrl || "/placeholder.svg"}
                alt="Ad"
                className="w-full h-[120px] object-cover rounded mb-3"
              />
            )}

            <button className="w-full py-2 bg-[#1a73e8] text-white text-xs font-medium rounded hover:bg-[#1765cc] transition-colors">
              {data.creative.cta || "Shop Now"}
            </button>
          </div>
        </div>
      );
    }

    // Audience Network / Pangle (Generic mobile banner)
    if (
      placement.id.includes("audience-network") ||
      placement.id.includes("pangle")
    ) {
      return (
        <div className="w-[280px] bg-[#f5f5f5] rounded-lg p-2">
          <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
            <div className="flex items-center gap-2 p-2">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[8px] px-1 py-0.5 bg-[#f0f2f5] rounded-sm text-[#65676b] font-semibold">
                    AD
                  </span>
                  <span className="text-[9px] text-[#65676b]">Your Brand</span>
                </div>
                <p className="text-[10px] font-medium text-[#050505] line-clamp-1">
                  {data.creative.headline || "Sponsored Content"}
                </p>
              </div>
              {hasCreative ? (
                <img
                  src={data.creative.imageUrl || "/placeholder.svg"}
                  alt="Ad"
                  className="w-14 h-14 object-cover rounded"
                />
              ) : (
                <div className="w-14 h-14 bg-[#e4e6eb] rounded flex items-center justify-center">
                  <ImageIcon size={20} className="text-[#bcc0c4]" />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="w-[240px] bg-white rounded-lg border border-[#e5e7eb] shadow-sm p-3">
        <p className="text-xs font-medium text-[#404040] mb-2">
          {placement.label}
        </p>
        <div className="w-full h-32 bg-[#f3f4f6] rounded flex items-center justify-center">
          <ImageIcon size={32} className="text-[#9ca3af]" />
        </div>
        <p className="text-[10px] text-[#7b7b7b] mt-2">
          {placement.description}
        </p>
      </div>
    );
  };

  const renderPlacementStep = () => {
    if (!data.platform || !data.adFormat) {
      return (
        <div className="text-[#7b7b7b]">
          Please select a platform and ad format first.
        </div>
      );
    }

    const currentPlatformPlacements =
      data.platform === "meta"
        ? placementConfigs.meta
        : data.platform === "google"
          ? placementConfigs.google
          : data.platform === "tiktok"
            ? placementConfigs.tiktok
            : [];

    // Filter placements relevant to the selected ad format (this is a simplified logic)
    const relevantPlacements = currentPlatformPlacements.filter((placement) => {
      const formatId = data.adFormat;
      if (!formatId) return true; // Show all if no format is selected

      // Meta specific logic
      if (data.platform === "meta") {
        if (formatId === "image" || formatId === "video") {
          return [
            "feed",
            "story",
            "search",
            "display",
            "video",
            "rewarded",
          ].some((type) => placement.preview?.includes(type));
        }
        if (formatId === "carousel") {
          return ["feed", "story"].some((type) =>
            placement.preview?.includes(type),
          );
        }
        if (formatId === "collection") {
          return ["feed", "story"].some((type) =>
            placement.preview?.includes(type),
          );
        }
      }

      // Google specific logic
      if (data.platform === "google") {
        if (formatId === "search")
          return ["search"].includes(placement.preview || "");
        if (formatId === "display")
          return ["display", "feed"].includes(placement.preview || "");
        if (formatId === "video")
          return ["video", "story"].includes(placement.preview || "");
        if (formatId === "shopping")
          return ["search"].includes(placement.preview || ""); // Shopping ads appear in search
        if (formatId === "performanceMax")
          return ["feed", "story", "video", "search", "display"].includes(
            placement.preview || "",
          );
      }

      // TikTok specific logic
      if (data.platform === "tiktok") {
        if (formatId === "infeed")
          return ["story", "feed"].includes(placement.preview || "");
        if (formatId === "image")
          return ["story"].includes(placement.preview || "");
        if (formatId === "carousel")
          return ["story"].includes(placement.preview || "");
      }

      return true; // Default to include if no specific logic applies
    });

    // Group placements by category
    const groupedPlacements = {};
    relevantPlacements.forEach((placement) => {
      if (!groupedPlacements[placement.category]) {
        groupedPlacements[placement.category] = [];
      }
      groupedPlacements[placement.category].push(placement);
    });

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#404040] mb-2">
            Select Placements
          </h2>
          <p className="text-[#7b7b7b]">
            Choose where your ads will appear across the selected platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Object.entries(groupedPlacements).map(([category, placements]) => (
            <Card key={category} className="p-6">
              <h3 className="font-semibold text-lg text-[#404040] mb-4">
                {category}
              </h3>
              <div className="space-y-4">
                {placements.map((placement) => (
                  <PlacementOption
                    key={placement.id}
                    id={placement.id}
                    label={placement.label}
                    description={placement.description}
                    checked={data.placements.includes(placement.id)}
                    onChange={(checked) =>
                      togglePlacement(placement.id, checked)
                    }
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Live Preview Section */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-[#404040] mb-4">
            Live Preview
          </h3>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {data.placements.length > 0 ? (
              data.placements.map((placementId) => {
                const placement = currentPlatformPlacements.find(
                  (p) => p.id === placementId,
                );
                return placement ? (
                  <div key={placementId} className="text-center">
                    <p className="text-xs text-[#7b7b7b] mb-2">
                      {placement.label}
                    </p>
                    {renderPlacementPreview(placement)}
                  </div>
                ) : null;
              })
            ) : (
              <div className="text-center text-[#7b7b7b]">
                Select placements to see previews.
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  };

  const targetingOptions = [
    {
      id: "geoLocation",
      title: "Geo Location",
      icon: <Globe size={28} className="text-[#4285f4]" />,
      iconBg: "bg-[#e8f0fe]",
      description:
        "Target users in specific countries, states, cities, or zip codes.",
      onClick: () => setGeoModalOpen(true),
      configured: targetingConfigured.geoLocation === "manual",
      summary:
        data.targeting.locations.length > 0
          ? `${data.targeting.locations.length} selected`
          : "All",
    },
    {
      id: "storeTargeting",
      title: "Store Targeting",
      icon: <Store size={28} className="text-[#34a853]" />,
      iconBg: "bg-[#e6f4ea]",
      description:
        "Localize ads to specific retail locations to drive in-store visits.",
      onClick: () => setStoreModalOpen(true),
      configured: targetingConfigured.storeTargeting === "manual",
      summary:
        data.targeting.stores.length > 0
          ? `${data.targeting.stores.length} selected`
          : "None",
    },
    {
      id: "audienceTargeting",
      title: "Audience Targeting",
      icon: <Users size={28} className="text-[#fbbc04]" />,
      iconBg: "bg-[#fef7e0]",
      description:
        "Reach specific demographic or interest-based audience segments.",
      onClick: () => setAudienceModalOpen(true),
      configured: targetingConfigured.audienceTargeting === "manual",
      summary:
        data.targeting.audiences.length > 0
          ? `${data.targeting.audiences.length} selected`
          : "None",
    },
    {
      id: "keywordTargeting",
      title: "Keyword Targeting",
      icon: <Tag size={28} className="text-[#ea4335]" />,
      iconBg: "bg-[#fce8e6]",
      description:
        "Show ads to users searching for specific keywords on Google Search.",
      onClick: () => setKeywordModalOpen(true),
      configured: targetingConfigured.keywordTargeting === "manual",
      summary:
        data.targeting.keywords.length > 0
          ? `${data.targeting.keywords.length} added`
          : "None",
    },
    {
      id: "productCatalog",
      title: "Product Catalog",
      icon: <ShoppingBag size={28} className="text-[#1a73e8]" />,
      iconBg: "bg-[#e8f0fe]",
      description:
        "Promote specific products from your catalog to relevant users.",
      onClick: () => setProductModalOpen(true),
      configured: targetingConfigured.productCatalog === "manual",
      summary:
        data.targeting.productCatalogs.length > 0
          ? `${data.targeting.productCatalogs.length} selected`
          : "None",
    },
  ];

  if (!open) return null;

  return (
    <TooltipProvider>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      {/* Drawer Container - Updated to match other wizard layouts */}
      <div
        className="fixed right-0 top-0 z-[60] h-full bg-[#f8f9fb] shadow-xl flex flex-col transition-transform duration-300"
        style={{ width: "85%" }}
      >
        {/* Header - Updated to match other wizards */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#e5e7eb]">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {mode === "add_ad_group"
                  ? `Add Ad Group to ${selectedCampaign?.name}`
                  : "Create Offsite Ad Group"}
              </h2>
              <p className="text-sm text-gray-500">
                Step {stepIndex + 1} of {visibleSteps.length} •{" "}
                {currentStepInfo.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Steps Sidebar */}
          <div className="w-64 bg-white border-r flex flex-col flex-shrink-0">
            <div className="flex-1 p-4 space-y-1 overflow-y-auto">
              {visibleSteps.map((step, index) => {
                const isCompleted = index < stepIndex;
                const isCurrent = step.id === currentStep;
                const isDisabled = index > stepIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => !isDisabled && setCurrentStep(step.id)}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${
                      isCurrent
                        ? "bg-[#2563eb]/10 border border-[#2563eb]"
                        : isCompleted
                          ? "hover:bg-gray-50"
                          : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "bg-[#2563eb] text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${isCurrent ? "text-[#2563eb]" : isCompleted ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {step.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ad Group Summary */}
            <div className="border-t p-4 bg-gray-50">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Ad Group Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900 truncate max-w-[120px]">
                    {data.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Platform</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {data.platform || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Format</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {data.adFormat || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Placements</span>
                  <span className="font-medium text-gray-900">
                    {data.placements.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-medium text-gray-900">
                    {data.budget ? `$${data.budget}/day` : "-"}
                  </span>
                </div>
              </div>

              {/* Media Estimator FAB */}
              <div className="mt-4 pt-4 border-t">
                <button
                  onClick={() => setEstimatorOpen(!estimatorOpen)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Media Estimator
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {estimatorOpen && (
              <div className="fixed inset-0 z-[70] flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/30"
                  onClick={() => setEstimatorOpen(false)}
                />
                <div className="relative bg-white rounded-2xl border border-[#e5e7eb] shadow-2xl w-[380px] overflow-hidden animate-in zoom-in-95 duration-200">
                  {/* Estimator Header */}
                  <div className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <span className="font-semibold">Media Estimator</span>
                    </div>
                    <button
                      onClick={() => setEstimatorOpen(false)}
                      className="p-1 hover:bg-white/20 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Estimator Content */}
                  <div className="p-4 space-y-4">
                    {/* Estimated Results */}
                    <div className="bg-[#f0fdf4] border border-[#86efac] rounded-lg p-4">
                      <div className="text-xs text-[#166534] font-medium mb-2">
                        Estimated Results
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#15803d]">
                            Daily Reach
                          </span>
                          <span className="font-semibold text-[#166534]">
                            12K - 35K
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#15803d]">
                            Est. Clicks
                          </span>
                          <span className="font-semibold text-[#166534]">
                            180 - 450
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#15803d]">
                            Est. CPM
                          </span>
                          <span className="font-semibold text-[#166534]">
                            $4.50 - $8.20
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Current Settings Summary */}
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value="targeting"
                        className="border rounded-lg"
                      >
                        <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline">
                          <span className="font-medium">Targeting Summary</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3 pt-0">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6b7280]">Locations</span>
                              <span className="font-medium text-[#1f2937]">
                                {data.targeting.locations.length > 0
                                  ? `${data.targeting.locations.length} selected`
                                  : "None"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6b7280]">Audiences</span>
                              <span className="font-medium text-[#1f2937]">
                                {data.targeting.audiences.length > 0
                                  ? `${data.targeting.audiences.length} selected`
                                  : "None"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6b7280]">Keywords</span>
                              <span className="font-medium text-[#1f2937]">
                                {data.targeting.keywords.length > 0
                                  ? `${data.targeting.keywords.length} added`
                                  : "None"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-[#6b7280]">Stores</span>
                              <span className="font-medium text-[#1f2937]">
                                {data.targeting.stores.length > 0
                                  ? `${data.targeting.stores.length} selected`
                                  : "None"}
                              </span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Budget Impact */}
                    <div className="bg-[#fefce8] border border-[#fde047] rounded-lg p-3">
                      <div className="text-xs text-[#713f12] font-medium mb-1">
                        Budget Impact
                      </div>
                      <div className="text-sm text-[#854d0e]">
                        With ${data.budget || "50"}/day budget, you could reach
                        up to{" "}
                        <span className="font-semibold">~17K users daily</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStepInfo.id === "basics" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#404040] mb-2">
                    Ad Group Basics
                  </h2>
                  <p className="text-[#7b7b7b]">
                    Name your ad group and select the advertising platform.
                  </p>
                </div>

                <Card className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="adGroupName">Ad Group Name *</Label>
                    <Input
                      id="adGroupName"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      placeholder="e.g., Summer Sale - US Audience"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Label>Select Platform *</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle size={14} className="text-[#7b7b7b]" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Choose where your ads will run. Each platform has
                            different strengths and audience types.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {platforms.map((platform) => (
                        <Card
                          key={platform.id}
                          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                            data.platform === platform.id
                              ? "ring-2 ring-[#2563eb] bg-[#eff6ff]"
                              : "hover:border-[#d1d5db]"
                          }`}
                          onClick={() =>
                            setData({
                              ...data,
                              platform: platform.id,
                              adFormat: null,
                              placements: [],
                            })
                          }
                        >
                          <div className="flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10">{platform.icon}</div>
                            <div className="font-semibold text-[#404040]">
                              {platform.name}
                            </div>
                            <div className="text-xs text-[#7b7b7b]">
                              {platform.description}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {currentStepInfo.id === "format" && data.platform && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#404040] mb-2">
                    Choose Ad Format
                  </h2>
                  <p className="text-[#7b7b7b]">
                    Select the type of ad you want to create on{" "}
                    {data.platform === "meta"
                      ? "Meta"
                      : data.platform === "google"
                        ? "Google"
                        : "TikTok"}{" "}
                    Ads.
                  </p>
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {adFormats[data.platform].map((format) => (
                    <Card
                      key={format.id}
                      className={`cursor-pointer transition-all hover:shadow-md relative ${
                        data.adFormat === format.id
                          ? "ring-2 ring-[#2563eb] bg-[#fafafa]"
                          : "hover:border-[#d1d5db]"
                      }`}
                      onClick={() => setData({ ...data, adFormat: format.id })}
                    >
                      {data.adFormat === format.id && (
                        <div className="absolute top-3 right-3 z-10 w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center shadow-sm">
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="text-white"
                          />
                        </div>
                      )}
                      <div className="p-3 bg-[#f9fafb] rounded-t-lg flex items-center justify-center h-[140px]">
                        {format.illustration}
                      </div>
                      <div className="p-4">
                        <div className="font-semibold text-[#404040] mb-1">
                          {format.name}
                        </div>
                        <div className="text-xs text-[#7b7b7b] mb-2">
                          {format.description}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#2563eb]">
                          <HelpCircle size={12} />
                          <span>Specs: {format.specs}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <GeoLocationModal
              open={geoModalOpen}
              onClose={() => setGeoModalOpen(false)}
              onApply={(locations) => {
                setData((prev) => ({
                  ...prev,
                  targeting: {
                    ...prev.targeting,
                    locations: locations.included || [],
                  },
                }));
                setGeoModalOpen(false);
              }}
              initialData={data.targeting.locations}
            />

            <StoreTargetingModal
              open={storeModalOpen}
              onClose={() => setStoreModalOpen(false)}
              onApply={(stores) => {
                setData((prev) => ({
                  ...prev,
                  targeting: { ...prev.targeting, stores },
                }));
                setStoreModalOpen(false);
              }}
              initialData={data.targeting.stores}
            />

            <AudienceTargetingModal
              open={audienceModalOpen}
              onClose={() => setAudienceModalOpen(false)}
              onApply={(audiences) => {
                setData((prev) => ({
                  ...prev,
                  targeting: { ...prev.targeting, audiences },
                }));
                setAudienceModalOpen(false);
              }}
              initialData={data.targeting.audiences}
            />

            <KeywordTargetingModal
              open={keywordModalOpen}
              onClose={() => setKeywordModalOpen(false)}
              onApply={(keywords) => {
                setData((prev) => ({
                  ...prev,
                  targeting: { ...prev.targeting, keywords },
                }));
                setKeywordModalOpen(false);
              }}
              initialData={data.targeting.keywords}
            />

            <ProductCatalogModal
              open={productModalOpen}
              onClose={() => setProductModalOpen(false)}
              onApply={(products) => {
                setData((prev) => ({
                  ...prev,
                  targeting: { ...prev.targeting, productCatalogs: products },
                }));
                setProductModalOpen(false);
              }}
              initialData={data.targeting.productCatalogs}
            />

            {currentStepInfo.id === "targeting" && (
              <div className="relative">
                {/* Main Content - Full Width */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-[#404040] mb-2">
                      Set Your Targets
                    </h2>
                    <p className="text-[#7b7b7b]">
                      Select your preferred targeting options for this campaign.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {targetingOptions.map((option) => (
                      <div
                        key={option.id}
                        className="group relative p-6 border border-[#e5e7eb] rounded-xl hover:border-[#2563eb] hover:shadow-md cursor-pointer transition-all bg-white"
                        onClick={option.onClick}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon - Larger and more prominent */}
                          <div
                            className={`w-16 h-16 rounded-2xl ${option.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                          >
                            <div className="scale-125">{option.icon}</div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-base text-[#1f2937]">
                                {option.title}
                              </h3>
                              <Badge
                                className={`shrink-0 ${
                                  option.configured
                                    ? "bg-[#ecfdf5] text-[#050505] border-[#a7f3d0]"
                                    : "bg-[#f3f4f6] text-[#6b7280] border-[#e5e7eb]"
                                }`}
                              >
                                {option.configured ? "CONFIGURED" : "NOT SET"}
                              </Badge>
                            </div>

                            <p className="text-sm text-[#6b7280] leading-relaxed mb-3">
                              {option.description}
                            </p>

                            {/* Summary info when configured */}
                            {option.summary && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="h-px flex-1 bg-[#e5e7eb]" />
                                <span className="text-[#2563eb] font-medium">
                                  {option.summary}
                                </span>
                                <div className="h-px flex-1 bg-[#e5e7eb]" />
                              </div>
                            )}
                          </div>

                          {/* Arrow indicator */}
                          <ChevronRight
                            size={20}
                            className="text-[#9ca3af] group-hover:text-[#2563eb] group-hover:translate-x-1 transition-all shrink-0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStepInfo.id === "creative" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#404040] mb-2">
                    Ad Creative
                  </h2>
                  <p className="text-[#7b7b7b]">
                    Create compelling ad content that drives engagement.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Creative inputs */}
                  <Card className="p-6 space-y-5">
                    <div>
                      <Label htmlFor="headline">Headline *</Label>
                      <Input
                        id="headline"
                        value={data.creative.headline}
                        onChange={(e) =>
                          setData({
                            ...data,
                            creative: {
                              ...data.creative,
                              headline: e.target.value,
                            },
                          })
                        }
                        placeholder="Your attention-grabbing headline"
                        className="mt-1.5"
                        maxLength={60}
                      />

                      <p className="text-xs text-[#7b7b7b] mt-1">
                        {data.creative.headline.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={data.creative.description}
                        onChange={(e) =>
                          setData({
                            ...data,
                            creative: {
                              ...data.creative,
                              description: e.target.value,
                            },
                          })
                        }
                        placeholder="Describe your product or service"
                        className="mt-1.5"
                        rows={3}
                        maxLength={150}
                      />

                      <p className="text-xs text-[#7b7b7b] mt-1">
                        {data.creative.description.length}/150 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="cta">Call to Action</Label>
                      <Select
                        value={data.creative.cta}
                        onValueChange={(value) =>
                          setData({
                            ...data,
                            creative: { ...data.creative, cta: value },
                          })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Learn More">Learn More</SelectItem>
                          <SelectItem value="Shop Now">Shop Now</SelectItem>
                          <SelectItem value="Sign Up">Sign Up</SelectItem>
                          <SelectItem value="Download">Download</SelectItem>
                          <SelectItem value="Get Quote">Get Quote</SelectItem>
                          <SelectItem value="Contact Us">Contact Us</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Image Upload */}
                    {(data.adFormat === "image" ||
                      data.adFormat === "carousel" ||
                      data.adFormat === "collection" ||
                      data.adFormat === "display" ||
                      data.adFormat === "shopping" ||
                      data.adFormat === "static" ||
                      data.adFormat === "performanceMax" || // <-- CHANGE: Added Performance Max
                      data.adFormat === "google-search" || // Added google search as static text
                      data.adFormat === "gmail-promotions" || // Added gmail
                      data.adFormat === "gmail-social" || // Added gmail
                      data.adFormat === "discover-feed" || // Added discover
                      data.adFormat === "discover-youtube" || // Added discover
                      data.adFormat === "display-responsive" ||
                      data.adFormat === "display-banner" ||
                      data.adFormat === "display-native") && (
                      <div>
                        {/* <-- CHANGE: Show asset source selector for Performance Max */}
                        {data.adFormat === "performanceMax" && (
                          <div className="mb-4 p-4 bg-[#f0f9ff] border border-[#bae6fd] rounded-lg">
                            <div className="flex items-start gap-2 mb-3">
                              <Info
                                size={16}
                                className="text-[#0284c7] mt-0.5"
                              />
                              <div>
                                <div className="text-sm font-medium text-[#0c4a6e]">
                                  Performance Max Assets
                                </div>
                                <div className="text-xs text-[#075985] mt-1">
                                  Upload custom images or connect your product
                                  catalog. Minimum: 1 landscape (1.91:1) and 1
                                  square (1:1) image.
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs bg-transparent"
                                onClick={() => {
                                  /* Open product catalog selector */
                                  setProductModalOpen(true);
                                }}
                              >
                                <Package size={14} className="mr-1" />
                                Use Product Catalog
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs bg-white"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <Upload size={14} className="mr-1" />
                                Upload Custom Assets
                              </Button>
                            </div>
                          </div>
                        )}

                        <Label>
                          {data.adFormat === "performanceMax"
                            ? "Upload Images (Landscape & Square) *"
                            : "Upload Image *"}
                        </Label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          multiple={data.adFormat === "performanceMax"} // <-- CHANGE: Allow multiple files for Performance Max
                        />
                        {data.creative.imageUrl ? (
                          <div className="mt-2 relative">
                            <img
                              src={data.creative.imageUrl || "/placeholder.svg"}
                              alt="Uploaded creative"
                              className="w-full max-h-[200px] object-cover rounded-lg border border-[#e5e7eb]"
                            />

                            <button
                              onClick={() => removeMedia("image")}
                              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-[#f3f4f6]"
                            >
                              <Trash2 size={16} className="text-[#dc2626]" />
                            </button>
                            {data.adFormat === "performanceMax" && (
                              <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded text-xs font-medium">
                                Landscape (1.91:1)
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-2 w-full h-[150px] border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#2563eb] hover:bg-[#f9fafb] transition-colors"
                          >
                            <Upload size={24} className="text-[#7b7b7b]" />
                            <span className="text-sm text-[#7b7b7b]">
                              {data.adFormat === "performanceMax"
                                ? "Click to upload images (landscape & square)"
                                : "Click to upload image"}
                            </span>
                            <span className="text-xs text-[#9ca3af]">
                              {data.adFormat === "performanceMax"
                                ? "1200x628px (landscape), 1200x1200px (square)"
                                : "PNG, JPG up to 10MB"}
                            </span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Video Upload */}
                    {(data.adFormat === "video" ||
                      data.adFormat === "infeed" ||
                      data.adFormat === "youtube-watch" ||
                      data.adFormat === "youtube-shorts" ||
                      data.adFormat === "fb-instream-reels" ||
                      data.adFormat === "audience-network-rewarded") && (
                      <div>
                        <Label>Upload Video *</Label>
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />

                        {data.creative.videoUrl ? (
                          <div className="mt-2 relative">
                            <video
                              src={data.creative.videoUrl}
                              controls
                              className="w-full max-h-[200px] object-cover rounded-lg border border-[#e5e7eb]"
                            />

                            <button
                              onClick={() => removeMedia("video")}
                              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-[#f3f4f6]"
                            >
                              <Trash2 size={16} className="text-[#dc2626]" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => videoInputRef.current?.click()}
                            className="mt-2 w-full h-[150px] border-2 border-dashed border-[#d1d5db] rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#2563eb] hover:bg-[#f9fafb] transition-colors"
                          >
                            <Video size={24} className="text-[#7b7b7b]" />
                            <span className="text-sm text-[#7b7b7b]">
                              Click to upload video
                            </span>
                            <span className="text-xs text-[#9ca3af]">
                              MP4, MOV up to 500MB
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </Card>

                  {/* Live Preview */}
                  <Card className="p-6">
                    <h3 className="font-medium text-[#404040] mb-4">
                      Live Preview
                    </h3>
                    <div className="flex justify-center items-center h-full">
                      {data.platform && data.adFormat ? (
                        (() => {
                          const platformPlacements =
                            placementConfigs[data.platform];
                          const currentAdFormat = adFormats[data.platform].find(
                            (f) => f.id === data.adFormat,
                          );

                          let previewType = "feed"; // Default

                          if (
                            currentAdFormat?.illustration.props.className?.includes(
                              "w-full h-24",
                            )
                          ) {
                            // Crude check based on illustration rendering for common types
                            if (
                              data.adFormat === "search" ||
                              data.adFormat === "google-search" ||
                              data.adFormat === "search-text" ||
                              data.adFormat === "search-shopping" ||
                              data.adFormat === "search-local" ||
                              data.adFormat === "fb-search" ||
                              data.adFormat === "ig-search"
                            ) {
                              previewType = "search";
                            } else if (
                              data.adFormat === "video" ||
                              data.adFormat === "youtube-watch" ||
                              data.adFormat === "youtube-shorts" ||
                              data.adFormat === "fb-instream-reels" ||
                              data.adFormat === "audience-network-rewarded"
                            ) {
                              previewType = "video";
                            } else if (
                              data.adFormat === "display" ||
                              data.adFormat === "googleDisplay"
                            ) {
                              previewType = "display";
                            } else if (
                              data.adFormat === "infeed" ||
                              data.adFormat === "tiktok-feed"
                            ) {
                              previewType = "story"; // Treat in-feed as story-like for preview
                            } else {
                              previewType = "feed";
                            }
                          } else if (
                            currentAdFormat?.illustration.props.className?.includes(
                              "w-[160px]",
                            )
                          ) {
                            previewType = "story";
                          }

                          // Find a representative placement for the preview
                          const representativePlacement =
                            platformPlacements.find(
                              (p) => p.preview === previewType,
                            );

                          return representativePlacement ? (
                            renderPlacementPreview(representativePlacement)
                          ) : (
                            <div className="text-center text-[#7b7b7b]">
                              No preview available for this format.
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center text-[#7b7b7b]">
                          Select platform and ad format to see preview.
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {currentStepInfo.id === "placement" &&
              data.platform &&
              renderPlacementStep()}

            {currentStepInfo.id === "config" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#404040] mb-2">
                    Budget & Bidding
                  </h2>
                  <p className="text-[#7b7b7b]">
                    Set your daily budget and bidding strategy.
                  </p>
                </div>

                <Card className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Daily Budget *</Label>
                      <div className="relative mt-1.5">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7b7b]">
                          $
                        </span>
                        <Input
                          id="budget"
                          type="number"
                          value={data.budget}
                          onChange={(e) =>
                            setData({ ...data, budget: e.target.value })
                          }
                          placeholder="0.00"
                          className="pl-7"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bidStrategy">Bid Strategy</Label>
                      <Select
                        value={data.bidStrategy}
                        onValueChange={(value) =>
                          setData({ ...data, bidStrategy: value })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lowest_cost">
                            Lowest Cost
                          </SelectItem>
                          <SelectItem value="cost_cap">Cost Cap</SelectItem>
                          <SelectItem value="bid_cap">Bid Cap</SelectItem>
                          <SelectItem value="target_cost">
                            Target Cost
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Footer with navigation - Updated to match other wizards */}
        <div className="border-t bg-white px-6 py-4">
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {stepIndex > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Back
              </Button>
            )}
            <Button
              className="bg-[#2563eb] hover:bg-[#1d4ed8] min-w-[120px]"
              onClick={handleNext}
            >
              {isLastStep ? "Create Ad Group" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function PlacementOption({ id, label, description, checked, onChange }) {
  return (
    <div className="flex items-start space-x-3 p-4 border border-[#e0e0e0] rounded-lg hover:border-[#2681ff] transition-colors">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-1"
      />
      <div className="flex-1">
        <Label htmlFor={id} className="font-medium cursor-pointer">
          {label}
        </Label>
        <p className="text-sm text-[#7b7b7b] mt-1">{description}</p>
      </div>
    </div>
  );
}
