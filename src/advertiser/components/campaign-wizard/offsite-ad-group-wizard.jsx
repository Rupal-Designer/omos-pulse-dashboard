import { useState, useRef } from 'react';
import {
  Button, Input, Select, Checkbox, Icon,
  CheckIcon, CloseIcon, ChevronRightIcon, PlusIcon,
  TrashIcon, InfoIcon, UploadIcon, SearchBar,
} from '../../../ui';

const WHITE    = '#ffffff';
const BORDER   = 'var(--osmos-border)';
const ACCENT   = 'var(--osmos-brand-primary)';
const ACCENT_M = 'var(--osmos-brand-primary-muted)';
const GREEN    = 'var(--osmos-brand-green)';
const GREEN_M  = 'var(--osmos-brand-green-muted)';
const BG_SUB   = 'var(--osmos-bg-subtle)';
const BG_MUT   = 'var(--osmos-bg-muted)';
const TEXT_HI  = 'var(--osmos-fg)';
const TEXT_MID = 'var(--osmos-fg-muted)';
const TEXT_LO  = 'var(--osmos-fg-subtle)';
const FONT     = "'Open Sans', sans-serif";

const GlobeIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </Icon>
);
const StoreIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </Icon>
);
const UsersIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </Icon>
);
const TagIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </Icon>
);
const ShoppingBagIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </Icon>
);
const VideoIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </Icon>
);
const ImageSvgIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </Icon>
);
const PackageIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </Icon>
);
const WandIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
    <path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/>
    <path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/>
  </Icon>
);
const SparklesIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </Icon>
);
const BarChartIcon = ({ size = 24, color = 'currentColor' }) => (
  <Icon size={size} color={color}>
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </Icon>
);

const MetaIcon = () => (
  <svg viewBox="0 0 36 36" style={{width:40,height:40}}>
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
  <svg viewBox="0 0 24 24" style={{width:40,height:40}}>
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
  <svg viewBox="0 0 24 24" style={{width:40,height:40}}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const AdFormatIllustrations = {
  // Google Ad Formats
  googleSearch: () => (
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
    <svg viewBox="0 0 120 80" style={{width:'100%',height:96}}>
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
  const [searchQuery, setSearchQuery] = useState('');
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
    <div style={{ position:'fixed', inset:0, zIndex:120, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div style={{ position:'relative', background:WHITE, borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,0.3)', width:900, maxHeight:'80vh', display:'flex', overflow:'hidden' }}>
        {/* Main Content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:24, borderBottom:'1px solid '+BORDER }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h2 style={{ fontFamily:FONT, fontSize:20, fontWeight:600, color:TEXT_HI, margin:0 }}>Geo Location Targeting</h2>
              <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:4 }}>
                <CloseIcon size={20} />
              </button>
            </div>
            <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search countries, states, or cities..." />
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:16 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {filteredLocations.map((location) => {
                const isSelected = selectedLocations.includes(location.id);
                const isExcluded = excludedLocations.includes(location.id);
                return (
                  <div
                    key={location.id}
                    style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      padding:16, border:'1px solid '+(isSelected ? GREEN : isExcluded ? '#ef4444' : BORDER),
                      borderRadius:8, cursor:'pointer',
                      background: isSelected ? GREEN_M : isExcluded ? 'rgba(239,68,68,0.06)' : WHITE,
                    }}
                    onClick={() => toggleLocation(location.id)}
                  >
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <GlobeIcon size={20} color={TEXT_MID} />
                      <div>
                        <div style={{ fontFamily:FONT, fontWeight:500, color:TEXT_HI }}>{location.name}</div>
                        <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID, textTransform:'capitalize' }}>{location.type}</div>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                      <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Reach: {(location.reach / 1000000).toFixed(1)}M</span>
                      {isSelected && <span style={{ background:GREEN, color:WHITE, borderRadius:4, padding:'2px 8px', fontSize:11, fontWeight:600 }}>Included</span>}
                      {isExcluded && <span style={{ background:'#ef4444', color:WHITE, borderRadius:4, padding:'2px 8px', fontSize:11, fontWeight:600 }}>Excluded</span>}
                      <Button variant="ghost" onClick={(e) => { e.stopPropagation(); toggleLocation(location.id, true); }} style={{ fontSize:12, color:TEXT_MID }}>Exclude</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding:16, borderTop:'1px solid '+BORDER, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>{selectedLocations.length} locations selected</span>
            <div style={{ display:'flex', gap:8 }}>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={() => onApply({ included: selectedLocations, excluded: excludedLocations })}>Apply</Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width:280, borderLeft:'1px solid '+BORDER, background:BG_SUB, padding:16 }}>
          <h3 style={{ fontFamily:FONT, fontWeight:600, color:TEXT_HI, marginBottom:16, marginTop:0 }}>Location Summary</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:WHITE, borderRadius:8, padding:16, border:'1px solid '+BORDER }}>
              <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Est. Reach</div>
              <div style={{ fontFamily:FONT, fontSize:24, fontWeight:600, color:TEXT_HI }}>{(totalReach / 1000000).toFixed(1)}M</div>
            </div>
            <div>
              <div style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI, marginBottom:8 }}>Included ({selectedLocations.length})</div>
              {selectedLocations.map((id) => {
                const loc = geoLocations.find((l) => l.id === id);
                return loc ? (
                  <div key={id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 0', fontFamily:FONT, fontSize:13 }}>
                    <span style={{ color:TEXT_HI }}>{loc.name}</span>
                    <button onClick={() => toggleLocation(id)} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:2 }}>
                      <CloseIcon size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
            {excludedLocations.length > 0 && (
              <div>
                <div style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:'#ef4444', marginBottom:8 }}>Excluded ({excludedLocations.length})</div>
                {excludedLocations.map((id) => {
                  const loc = geoLocations.find((l) => l.id === id);
                  return loc ? (
                    <div key={id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 0', fontFamily:FONT, fontSize:13 }}>
                      <span style={{ color:TEXT_HI }}>{loc.name}</span>
                      <button onClick={() => setExcludedLocations((prev) => prev.filter((l) => l !== id))} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:2 }}>
                        <CloseIcon size={14} />
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStores, setSelectedStores] = useState(initialData);
  const [filterState, setFilterState] = useState('all');

  const states = [...new Set(storeLocations.map((s) => s.state))];

  const filteredStores = storeLocations.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = filterState === 'all' || store.state === filterState;
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
    <div style={{ position:'fixed', inset:0, zIndex:120, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div style={{ position:'relative', background:WHITE, borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,0.3)', width:900, maxHeight:'80vh', display:'flex', overflow:'hidden' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:24, borderBottom:'1px solid '+BORDER }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div>
                <h2 style={{ fontFamily:FONT, fontSize:20, fontWeight:600, color:TEXT_HI, margin:0 }}>Store Targeting</h2>
                <p style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID, marginTop:4, marginBottom:0 }}>Select stores to localize your ads to specific locations</p>
              </div>
              <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:4 }}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <div style={{ flex:1 }}>
                <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search stores..." />
              </div>
              <Select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                options={[{ value:'all', label:'All States' }, ...states.map((s) => ({ value:s, label:s }))]}
                style={{ width:150 }}
              />
            </div>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:16 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {filteredStores.map((store) => {
                const isSel = selectedStores.includes(store.id);
                return (
                  <div
                    key={store.id}
                    style={{ padding:16, border:'1px solid '+(isSel ? GREEN : BORDER), borderRadius:8, cursor:'pointer', background: isSel ? GREEN_M : WHITE }}
                    onClick={() => toggleStore(store.id)}
                  >
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{ width:40, height:40, borderRadius:8, background:'#fef3c7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <StoreIcon size={20} color="#f59e0b" />
                        </div>
                        <div>
                          <div style={{ fontFamily:FONT, fontWeight:500, color:TEXT_HI }}>{store.name}</div>
                          <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>{store.city}, {store.state}</div>
                        </div>
                      </div>
                      {isSel && <CheckIcon size={20} color={GREEN} />}
                    </div>
                    <div style={{ marginTop:12, fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Est. Reach: {(store.reach / 1000).toFixed(0)}K</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding:16, borderTop:'1px solid '+BORDER, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>{selectedStores.length} stores selected</span>
            <div style={{ display:'flex', gap:8 }}>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={() => onApply(selectedStores)}>Apply</Button>
            </div>
          </div>
        </div>

        <div style={{ width:280, borderLeft:'1px solid '+BORDER, background:BG_SUB, padding:16 }}>
          <h3 style={{ fontFamily:FONT, fontWeight:600, color:TEXT_HI, marginBottom:16, marginTop:0 }}>Store Summary</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:WHITE, borderRadius:8, padding:16, border:'1px solid '+BORDER }}>
              <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Total Reach</div>
              <div style={{ fontFamily:FONT, fontSize:24, fontWeight:600, color:TEXT_HI }}>{(totalReach / 1000).toFixed(0)}K</div>
            </div>
            <div style={{ background:WHITE, borderRadius:8, padding:16, border:'1px solid '+BORDER }}>
              <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Stores Selected</div>
              <div style={{ fontFamily:FONT, fontSize:24, fontWeight:600, color:TEXT_HI }}>{selectedStores.length}</div>
            </div>
            <div style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID, padding:12, background:'#fef3c7', borderRadius:8, display:'flex', alignItems:'flex-start', gap:6 }}>
              <InfoIcon size={14} color={TEXT_MID} />
              Store targeting helps localize your ads to specific retail locations, improving relevance and conversion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceTargetingModal({ open, onClose, onApply, initialData = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAudiences, setSelectedAudiences] = useState(initialData);
  const [audienceType, setAudienceType] = useState('1st_party');

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
    <div style={{ position:'fixed', inset:0, zIndex:120, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div style={{ position:'relative', background:WHITE, borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,0.3)', width:950, maxHeight:'85vh', display:'flex', overflow:'hidden' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:24, borderBottom:'1px solid '+BORDER }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h2 style={{ fontFamily:FONT, fontSize:20, fontWeight:600, color:TEXT_HI, margin:0 }}>Audience Targeting</h2>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <Button variant="outline" style={{ color:ACCENT, borderColor:ACCENT }}>
                  <PlusIcon size={16} color={ACCENT} /> Create New Audience
                </Button>
                <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:4 }}>
                  <CloseIcon size={20} />
                </button>
              </div>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <UsersIcon size={18} color={TEXT_MID} />
              <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Select Audience Segments to Include or Exclude</span>
              <span title="Target specific customer segments based on their behavior and attributes">
                <InfoIcon size={14} color={TEXT_MID} />
              </span>
            </div>

            <div style={{ display:'flex', gap:12 }}>
              <Select
                value={audienceType}
                onChange={(e) => setAudienceType(e.target.value)}
                options={[
                  { value:'1st_party', label:'1st Party Audience' },
                  { value:'3rd_party', label:'3rd Party Audience' },
                  { value:'lookalike', label:'Lookalike Audience' },
                ]}
                style={{ width:180 }}
              />
              <div style={{ flex:1 }}>
                <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search audience segment to add" />
              </div>
            </div>
          </div>

          <div style={{ flex:1, overflowY:'auto' }}>
            {filteredAudiences.map((audience) => {
              const isSel = selectedAudiences.includes(audience.id);
              return (
                <div
                  key={audience.id}
                  style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:16, cursor:'pointer', background: isSel ? ACCENT_M : WHITE, borderBottom:'1px solid '+BORDER }}
                  onClick={() => toggleAudience(audience.id)}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <Checkbox checked={isSel} onChange={() => toggleAudience(audience.id)} />
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontFamily:FONT, fontWeight:500, color:TEXT_HI }}>{audience.name}</span>
                        {audience.recommended && (
                          <span style={{ background:ACCENT_M, color:ACCENT, borderRadius:4, padding:'2px 6px', fontSize:11, display:'inline-flex', alignItems:'center', gap:3 }}>
                            <SparklesIcon size={12} color={ACCENT} /> Sofie's Recommended
                          </span>
                        )}
                      </div>
                      <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>
                        Estimated reach: {(audience.reach / 1000000).toFixed(1)}M | {audience.premium} premium on each inventory's minimum CPM
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    {isSel ? (
                      <span style={{ color:GREEN, fontFamily:FONT, fontWeight:500, display:'flex', alignItems:'center', gap:4 }}>
                        <CheckIcon size={16} color={GREEN} /> Selected
                      </span>
                    ) : (
                      <span style={{ color:ACCENT, fontFamily:FONT, fontWeight:500 }}>Select</span>
                    )}
                    <button style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:4 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding:16, borderTop:'1px solid '+BORDER, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI }}>Audience selected: {selectedAudiences.length}</span>
            <div style={{ display:'flex', gap:8 }}>
              <Button variant="outline" style={{ color:ACCENT, borderColor:ACCENT }}>
                <PlusIcon size={16} color={ACCENT} /> Add
              </Button>
              <Button variant="primary" onClick={() => onApply(selectedAudiences)}>Apply</Button>
            </div>
          </div>
        </div>

        <div style={{ width:280, borderLeft:'1px solid '+BORDER, background:BG_SUB, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:16, borderBottom:'1px solid '+BORDER }}>
            <h3 style={{ fontFamily:FONT, fontWeight:600, color:TEXT_HI, margin:0 }}>Audience Reach</h3>
          </div>
          <div style={{ padding:16, flex:1 }}>
            {selectedAudiences.length === 0 ? (
              <div style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ width:64, height:64, margin:'0 auto 16px', background:BG_MUT, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <UsersIcon size={32} color={TEXT_MID} />
                </div>
                <p style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Add audience from the left panel to see your audience reach or create new audience segment</p>
              </div>
            ) : (
              <div style={{ background:WHITE, borderRadius:8, padding:16, border:'1px solid '+BORDER }}>
                <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Total Reach</div>
                <div style={{ fontFamily:FONT, fontSize:24, fontWeight:600, color:TEXT_HI }}>{(totalReach / 1000000).toFixed(1)}M</div>
              </div>
            )}
          </div>
          <div style={{ padding:16, borderTop:'1px solid '+BORDER }}>
            <h4 style={{ fontFamily:FONT, fontWeight:500, color:TEXT_HI, marginBottom:12, marginTop:0 }}>Audience Summary</h4>
            <div style={{ display:'flex', flexDirection:'column', gap:8, fontFamily:FONT, fontSize:13 }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:TEXT_MID }}>All Cohorts:</span><span style={{ color:TEXT_HI }}>{selectedAudiences.length}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:TEXT_MID }}>Included:</span><span style={{ color:TEXT_HI }}>{selectedAudiences.length}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:TEXT_MID }}>Excluded:</span><span style={{ color:TEXT_HI }}>0</span>
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
  const [bulkInput, setBulkInput] = useState('');
  const [activeTab, setActiveTab] = useState('manual');
  const [generatedKeywords, setGeneratedKeywords] = useState([]);
  const [productCategory, setProductCategory] = useState('');
  const [manualInput, setManualInput] = useState('');

  const handleBulkAdd = () => {
    const newKeywords = bulkInput
      .split('\n')
      .map((k) => k.trim())
      .filter((k) => k.length > 0 && !keywords.includes(k));
    setKeywords([...keywords, ...newKeywords]);
    setBulkInput('');
  };

  const generateKeywords = () => {
    const suggestions = ['premium headphones','wireless audio','noise canceling','bluetooth earbuds','studio quality','bass boost','comfortable fit','long battery life','premium sound'];
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
    <div style={{ position:'fixed', inset:0, zIndex:120, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div style={{ position:'relative', background:WHITE, borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,0.3)', width:900, maxHeight:'85vh', display:'flex', overflow:'hidden' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:24, borderBottom:'1px solid '+BORDER }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <h2 style={{ fontFamily:FONT, fontSize:20, fontWeight:600, color:TEXT_HI, margin:0 }}>Keyword Targeting</h2>
              <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:4 }}>
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Hand-rolled tabs */}
            <div style={{ display:'flex', gap:4, background:BG_SUB, borderRadius:6, padding:4, marginBottom:16 }}>
              {[['manual','Manual Entry'],['bulk','Bulk Upload'],['generate','AI Generate']].map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding:'6px 12px', borderRadius:4, border:'none', cursor:'pointer',
                  background: activeTab === tab ? WHITE : 'transparent',
                  color: activeTab === tab ? TEXT_HI : TEXT_MID,
                  fontFamily: FONT, fontSize:13, fontWeight: activeTab === tab ? 600 : 400,
                  boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                }}>{label}</button>
              ))}
            </div>

            {activeTab === 'manual' && (
              <div style={{ display:'flex', gap:8 }}>
                <div style={{ flex:1 }}>
                  <Input
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Enter a keyword..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && manualInput.trim()) {
                        if (!keywords.includes(manualInput.trim())) setKeywords([...keywords, manualInput.trim()]);
                        setManualInput('');
                      }
                    }}
                  />
                </div>
                <Button variant="outline" onClick={() => { if (manualInput.trim() && !keywords.includes(manualInput.trim())) { setKeywords([...keywords, manualInput.trim()]); setManualInput(''); } }}>Add</Button>
              </div>
            )}

            {activeTab === 'bulk' && (
              <div>
                <textarea
                  placeholder={'Enter keywords (one per line)\nelectronics\nsmartphones\nlaptops\ngadgets'}
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  style={{ width:'100%', minHeight:150, fontFamily:'monospace', fontSize:13, border:'1px solid '+BORDER, borderRadius:6, padding:'8px 12px', resize:'vertical', outline:'none', boxSizing:'border-box' }}
                />
                <div style={{ marginTop:12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <p style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID, margin:0 }}>Keywords will be considered under Phrase match type. Max 50 keywords.</p>
                  <Button variant="primary" onClick={handleBulkAdd}>Add Keywords</Button>
                </div>
              </div>
            )}

            {activeTab === 'generate' && (
              <div>
                <div style={{ background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:8, padding:16, marginBottom:16 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                    <WandIcon size={20} color="#0284c7" />
                    <span style={{ fontFamily:FONT, fontWeight:500, color:'#0c4a6e' }}>AI Keyword Generator</span>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <div style={{ flex:1 }}>
                      <Select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        options={[
                          { value:'', label:'Select product category' },
                          { value:'electronics', label:'Electronics' },
                          { value:'fashion', label:'Fashion' },
                          { value:'sports', label:'Sports & Fitness' },
                          { value:'home', label:'Home & Garden' },
                        ]}
                      />
                    </div>
                    <Button variant="primary" onClick={generateKeywords} style={{ background:'#0284c7' }}>
                      <SparklesIcon size={16} color={WHITE} /> Generate
                    </Button>
                  </div>
                </div>
                {generatedKeywords.length > 0 && (
                  <div style={{ border:'1px solid '+BORDER, borderRadius:8, padding:16 }}>
                    <div style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI, marginBottom:12 }}>Suggested Keywords</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      {generatedKeywords.map((keyword) => (
                        <span key={keyword} onClick={() => addGeneratedKeyword(keyword)} style={{ border:'1px solid '+BORDER, borderRadius:4, padding:'2px 6px', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:4, fontFamily:FONT, fontSize:12, color:TEXT_MID }}>
                          <PlusIcon size={12} color={TEXT_MID} /> {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:16 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <div style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI }}>NEW KEYWORDS ADDED ({keywords.length})</div>
              <div style={{ width:256 }}>
                <SearchBar placeholder="Search" />
              </div>
            </div>

            {keywords.length === 0 ? (
              <div style={{ textAlign:'center', padding:'48px 0', color:TEXT_MID }}>
                <div style={{ marginBottom:16, opacity:0.5 }}><TagIcon size={48} color={TEXT_MID} /></div>
                <p style={{ fontFamily:FONT, fontSize:14 }}>You have not added any keyword to your campaign yet!</p>
              </div>
            ) : (
              <div style={{ border:'1px solid '+BORDER, borderRadius:8, overflow:'hidden' }}>
                <div style={{ background:BG_SUB, padding:'8px 16px', borderBottom:'1px solid '+BORDER, display:'flex', alignItems:'center', gap:12 }}>
                  <Checkbox checked={false} onChange={() => {}} />
                  <span style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_MID }}>Keyword</span>
                </div>
                {keywords.map((keyword, index) => (
                  <div key={index} style={{ padding:'12px 16px', borderBottom: index < keywords.length-1 ? '1px solid '+BORDER : 'none', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <Checkbox checked={false} onChange={() => {}} />
                      <span style={{ fontFamily:FONT, color:TEXT_HI }}>{keyword}</span>
                    </div>
                    <button onClick={() => removeKeyword(keyword)} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:4 }}>
                      <CloseIcon size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding:16, borderTop:'1px solid '+BORDER, display:'flex', justifyContent:'center' }}>
            <Button variant="primary" onClick={() => onApply(keywords)} style={{ minWidth:100 }}>Save</Button>
          </div>
        </div>

        <div style={{ width:250, borderLeft:'1px solid '+BORDER, background:BG_SUB, padding:16 }}>
          <h3 style={{ fontFamily:FONT, fontWeight:600, color:TEXT_HI, marginBottom:16, marginTop:0 }}>Keyword Summary</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ background:WHITE, borderRadius:8, padding:16, border:'1px solid '+BORDER }}>
              <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Total Keywords</div>
              <div style={{ fontFamily:FONT, fontSize:24, fontWeight:600, color:TEXT_HI }}>{keywords.length}</div>
            </div>
            <div style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID, padding:12, background:'#fef3c7', borderRadius:8, display:'flex', alignItems:'flex-start', gap:6 }}>
              <InfoIcon size={14} color={TEXT_MID} />
              Keywords help match your ads to relevant search queries and content.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCatalogModal({ open, onClose, onApply, initialData = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(initialData);
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [...new Set(productCatalog.map((p) => p.category))];

  const filteredProducts = productCatalog.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  if (!open) return null;

  return (
    <div style={{ position:'fixed', inset:0, zIndex:120, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)' }} onClick={onClose} />
      <div style={{ position:'relative', background:WHITE, borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,0.3)', width:950, maxHeight:'85vh', display:'flex', overflow:'hidden' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:24, borderBottom:'1px solid '+BORDER }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div>
                <h2 style={{ fontFamily:FONT, fontSize:20, fontWeight:600, color:TEXT_HI, margin:0 }}>Product Catalog Targeting</h2>
                <p style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID, marginTop:4, marginBottom:0 }}>Select products from your catalog to promote</p>
              </div>
              <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:4 }}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <div style={{ flex:1 }}>
                <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." />
              </div>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                options={[{ value:'all', label:'All Categories' }, ...categories.map((c) => ({ value:c, label:c }))]}
                style={{ width:150 }}
              />
            </div>
          </div>

          <div style={{ flex:1, overflowY:'auto', padding:16 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {filteredProducts.map((product) => {
                const isSel = selectedProducts.includes(product.id);
                return (
                  <div
                    key={product.id}
                    style={{ padding:16, border:'1px solid '+(isSel ? GREEN : BORDER), borderRadius:8, cursor:'pointer', background: isSel ? GREEN_M : WHITE }}
                    onClick={() => toggleProduct(product.id)}
                  >
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{ width:48, height:48, borderRadius:8, background:BG_MUT, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <ShoppingBagIcon size={24} color={TEXT_MID} />
                        </div>
                        <div>
                          <div style={{ fontFamily:FONT, fontWeight:500, color:TEXT_HI }}>{product.name}</div>
                          <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>{product.category}</div>
                        </div>
                      </div>
                      {isSel && <CheckIcon size={20} color={GREEN} />}
                    </div>
                    <div style={{ marginTop:12, display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:FONT, fontSize:13 }}>
                      <span style={{ fontWeight:600, color:TEXT_HI }}>${product.price}</span>
                      <span style={{ color:TEXT_MID }}>Stock: {product.inventory}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding:16, borderTop:'1px solid '+BORDER, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>{selectedProducts.length} products selected</span>
            <div style={{ display:'flex', gap:8 }}>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={() => onApply(selectedProducts)}>Apply</Button>
            </div>
          </div>
        </div>

        <div style={{ width:280, borderLeft:'1px solid '+BORDER, background:BG_SUB, padding:16 }}>
          <h3 style={{ fontFamily:FONT, fontWeight:600, color:TEXT_HI, marginBottom:16, marginTop:0 }}>Product Summary</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:WHITE, borderRadius:8, padding:16, border:'1px solid '+BORDER }}>
              <div style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Products Selected</div>
              <div style={{ fontFamily:FONT, fontSize:24, fontWeight:600, color:TEXT_HI }}>{selectedProducts.length}</div>
            </div>
            {selectedProducts.length > 0 && (
              <div>
                <div style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI, marginBottom:8 }}>Selected Products</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:300, overflowY:'auto' }}>
                  {selectedProducts.map((id) => {
                    const product = productCatalog.find((p) => p.id === id);
                    return product ? (
                      <div key={id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:WHITE, padding:8, borderRadius:4, border:'1px solid '+BORDER }}>
                        <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_HI, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{product.name}</span>
                        <button onClick={() => toggleProduct(id)} style={{ background:'none', border:'none', cursor:'pointer', color:TEXT_MID, padding:2, flexShrink:0 }}>
                          <CloseIcon size={14} />
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
  const [accordionOpen, setAccordionOpen] = useState(false);
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
        <div style={{ width:280, background:WHITE, borderRadius:12, border:'1px solid #e5e7eb', boxShadow:'0 1px 2px rgba(0,0,0,0.05)', overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:12, borderBottom:'1px solid #e5e7eb' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#1877f2,#0866ff)', flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <p style={{ fontFamily:FONT, fontSize:12, fontWeight:600, color:'#050505', margin:0 }}>Your Brand</p>
                <div style={{ width:4, height:4, borderRadius:'50%', background:'#65676b' }} />
                <span style={{ fontFamily:FONT, fontSize:10, fontWeight:600, color:'#65676b' }}>Sponsored</span>
              </div>
              <p style={{ fontFamily:FONT, fontSize:10, color:'#65676b', margin:0 }}>2h ago</p>
            </div>
          </div>

          {hasCreative ? (
            data.creative.videoUrl ? (
              <video src={data.creative.videoUrl} style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', display:'block' }} muted playsInline />
            ) : (
              <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', display:'block' }} />
            )
          ) : (
            <div style={{ width:'100%', aspectRatio:'1/1', background:'linear-gradient(135deg,#f0f2f5,#e4e6eb)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <ImageSvgIcon size={40} color="#bcc0c4" />
            </div>
          )}

          <div style={{ padding:12, borderTop:'1px solid #e5e7eb' }}>
            <p style={{ fontFamily:FONT, fontSize:12, fontWeight:500, color:'#050505', margin:'0 0 4px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
              {data.creative.headline || "Your compelling headline goes here"}
            </p>
            <p style={{ fontFamily:FONT, fontSize:10, color:'#65676b', margin:'0 0 8px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
              {data.creative.description || "Engaging description text"}
            </p>
            <button style={{ width:'100%', padding:'8px 0', background:'#0866ff', color:WHITE, fontFamily:FONT, fontSize:12, fontWeight:600, border:'none', borderRadius:8, cursor:'pointer' }}>
              {data.creative.cta || "Learn More"}
            </button>
          </div>
        </div>
      );
    }

    // Stories & Reels (9:16 phone mockup)
    if (["stories", "instagram-stories", "reels", "instagram-reels"].includes(placement.id)) {
      return (
        <div style={{ position:'relative' }}>
          <div style={{ width:180, height:320, background:'#000', borderRadius:28, boxShadow:'0 20px 40px rgba(0,0,0,0.4)', padding:8, position:'relative' }}>
            <div style={{ position:'absolute', top:8, left:'50%', transform:'translateX(-50%)', width:96, height:24, background:'#000', borderRadius:'0 0 12px 12px', zIndex:10 }} />
            <div style={{ width:'100%', height:'100%', borderRadius:20, overflow:'hidden', position:'relative' }}>
              {hasCreative ? (
                data.creative.videoUrl ? (
                  <video src={data.creative.videoUrl} style={{ width:'100%', height:'100%', objectFit:'cover' }} muted playsInline loop />
                ) : (
                  <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                )
              ) : (
                <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ImageSvgIcon size={48} color="rgba(255,255,255,0.5)" />
                </div>
              )}

              <div style={{ position:'absolute', top:0, left:0, right:0, padding:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,0.9)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width:20, height:20, borderRadius:'50%', background:'linear-gradient(135deg,#1877f2,#0866ff)' }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:FONT, color:WHITE, fontSize:10, fontWeight:600, margin:0, textShadow:'0 1px 2px rgba(0,0,0,0.5)' }}>Your Brand</p>
                    <p style={{ fontFamily:FONT, color:'rgba(255,255,255,0.8)', fontSize:8, margin:0, textShadow:'0 1px 2px rgba(0,0,0,0.5)' }}>Sponsored</p>
                  </div>
                </div>
              </div>

              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:16, background:'linear-gradient(to top,rgba(0,0,0,0.6),transparent)' }}>
                <p style={{ fontFamily:FONT, color:WHITE, fontSize:12, fontWeight:600, margin:'0 0 8px', textShadow:'0 1px 2px rgba(0,0,0,0.5)', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                  {data.creative.headline || "Swipe up to learn more"}
                </p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'8px 16px', background:'rgba(255,255,255,0.95)', borderRadius:999 }}>
                  <span style={{ fontFamily:FONT, fontSize:12, fontWeight:600, color:'#050505' }}>{data.creative.cta || "Learn More"}</span>
                  <ChevronRightIcon size={14} color="#050505" />
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
        <div style={{ width:360, background:'#000', borderRadius:8, boxShadow:'0 4px 12px rgba(0,0,0,0.3)', overflow:'hidden' }}>
          <div style={{ position:'relative', aspectRatio:'16/9', background:'#000' }}>
            {hasCreative ? (
              data.creative.videoUrl ? (
                <video src={data.creative.videoUrl} style={{ width:'100%', height:'100%', objectFit:'cover' }} muted playsInline loop />
              ) : (
                <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              )
            ) : (
              <div style={{ width:'100%', height:'100%', background:'#1f1f1f', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <VideoIcon size={48} color="#909090" />
              </div>
            )}

            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:12, background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ padding:'1px 8px', background:'#ffd700', color:'#000', fontFamily:FONT, fontSize:10, fontWeight:700, borderRadius:3 }}>AD</span>
                  <p style={{ fontFamily:FONT, color:WHITE, fontSize:12, fontWeight:500, margin:0 }}>{data.creative.headline || "Ad Title"}</p>
                </div>
                <button style={{ padding:'4px 12px', background:WHITE, color:'#000', fontFamily:FONT, fontSize:12, fontWeight:600, border:'none', borderRadius:4, cursor:'pointer' }}>
                  {data.creative.cta || "Visit Site"}
                </button>
              </div>
            </div>

            <div style={{ position:'absolute', top:12, right:12 }}>
              <div style={{ padding:'3px 8px', background:'rgba(0,0,0,0.6)', color:WHITE, fontFamily:FONT, fontSize:10, borderRadius:4 }}>
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
        <div style={{ width:400, background:WHITE, borderRadius:8, border:'1px solid #e5e7eb', boxShadow:'0 1px 2px rgba(0,0,0,0.05)', padding:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <div style={{ padding:'1px 6px', background:'#f8f9fa', border:'1px solid #dadce0', borderRadius:3, fontFamily:FONT, fontSize:10, fontWeight:500, color:'#5f6368' }}>Ad</div>
            <span style={{ fontFamily:FONT, fontSize:12, color:'#202124' }}>www.yourbrand.com</span>
          </div>
          <h3 style={{ fontFamily:FONT, fontSize:18, color:'#1a0dab', fontWeight:400, margin:'0 0 4px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', cursor:'pointer' }}>
            {data.creative.headline || "Your Headline - Brand Name | Product Category"}
          </h3>
          <p style={{ fontFamily:FONT, fontSize:14, color:'#4d5156', margin:'0 0 8px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
            {data.creative.description || "Your ad description appears here in the search results. Make it compelling and relevant to the search query."}
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:12, fontFamily:FONT, fontSize:12, color:'#1a0dab' }}>
            <span style={{ cursor:'pointer' }}>Shop Now</span>
            <span style={{ cursor:'pointer' }}>Learn More</span>
            <span style={{ cursor:'pointer' }}>Contact Us</span>
          </div>
        </div>
      );
    }

    // Google Shopping Ads (Product grid)
    if (placement.id.includes("shopping")) {
      return (
        <div style={{ width:160, background:WHITE, borderRadius:8, border:'1px solid #e5e7eb', boxShadow:'0 1px 2px rgba(0,0,0,0.05)', overflow:'hidden' }}>
          {hasCreative ? (
            <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Product" style={{ width:'100%', aspectRatio:'1/1', objectFit:'cover', display:'block' }} />
          ) : (
            <div style={{ width:'100%', aspectRatio:'1/1', background:'#f8f9fa', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <ShoppingBagIcon size={32} color="#dadce0" />
            </div>
          )}
          <div style={{ padding:8 }}>
            <div style={{ marginBottom:4 }}>
              <span style={{ padding:'1px 4px', background:'#f8f9fa', border:'1px solid #dadce0', borderRadius:3, fontFamily:FONT, fontSize:8, fontWeight:500, color:'#5f6368' }}>Sponsored</span>
            </div>
            <p style={{ fontFamily:FONT, fontSize:12, fontWeight:500, color:'#202124', margin:'0 0 4px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
              {data.creative.headline || "Product Name"}
            </p>
            <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
              <span style={{ fontFamily:FONT, fontSize:14, fontWeight:600, color:'#202124' }}>$49.99</span>
              <span style={{ fontFamily:FONT, fontSize:10, color:'#70757a', textDecoration:'line-through' }}>$79.99</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:4 }}>
              <div style={{ display:'flex' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width={10} height={10} fill="#fbbc04" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily:FONT, fontSize:9, color:'#70757a' }}>(234)</span>
            </div>
          </div>
        </div>
      );
    }

    // Google Display Network (Banner ads)
    if (placement.id.includes("display") || placement.id.includes("banner")) {
      return (
        <div style={{ width:320, background:WHITE, borderRadius:8, border:'1px solid '+BORDER, boxShadow:'0 1px 2px rgba(0,0,0,0.05)', overflow:'hidden' }}>
          {hasCreative ? (
            <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Banner Ad" style={{ width:'100%', height:100, objectFit:'cover' }} />
          ) : (
            <div style={{ width:'100%', height:100, background:'linear-gradient(to right,#4285f4,#ea4335,#fbbc04)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <ImageSvgIcon size={36} color="rgba(255,255,255,0.5)" />
            </div>
          )}
          <div style={{ padding:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:FONT, fontSize:12, fontWeight:500, color:'#202124', margin:'0 0 2px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{data.creative.headline || "Your Ad Headline"}</p>
              <p style={{ fontFamily:FONT, fontSize:10, color:'#5f6368', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{data.creative.description || "Description"}</p>
            </div>
            <button style={{ padding:'4px 12px', background:'#1a73e8', color:WHITE, fontSize:12, fontWeight:500, borderRadius:4, border:'none', cursor:'pointer', flexShrink:0, marginLeft:8 }}>{data.creative.cta || "Shop"}</button>
          </div>
        </div>
      );
    }

    // Right Column / Sidebar Ads (Small vertical format)
    if (placement.id.includes("right-column") || placement.id.includes("sidebar")) {
      return (
        <div style={{ width:220, background:WHITE, borderRadius:8, border:'1px solid '+BORDER, boxShadow:'0 1px 2px rgba(0,0,0,0.05)', overflow:'hidden' }}>
          {hasCreative ? (
            <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:'100%', height:120, objectFit:'cover' }} />
          ) : (
            <div style={{ width:'100%', height:120, background:'#f0f2f5', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <ImageSvgIcon size={28} color="#bcc0c4" />
            </div>
          )}
          <div style={{ padding:8 }}>
            <span style={{ fontSize:9, fontWeight:600, color:'#65676b' }}>Sponsored</span>
            <p style={{ fontFamily:FONT, fontSize:12, fontWeight:500, color:'#050505', margin:'2px 0', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{data.creative.headline || "Ad Headline"}</p>
            <p style={{ fontFamily:FONT, fontSize:10, color:'#65676b', margin:0, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{data.creative.description || "Description text"}</p>
          </div>
        </div>
      );
    }

    // TikTok Feed (Vertical phone-style)
    if (placement.id.includes("tiktok")) {
      return (
        <div style={{ position:'relative' }}>
          <div style={{ width:160, height:280, background:'#000', borderRadius:16, boxShadow:'0 10px 40px rgba(0,0,0,0.4)', overflow:'hidden', position:'relative' }}>
            {hasCreative ? (
              data.creative.videoUrl ? (
                <video src={data.creative.videoUrl} style={{ width:'100%', height:'100%', objectFit:'cover' }} muted playsInline loop />
              ) : (
                <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              )
            ) : (
              <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#25f4ee,#fe2c55,#000)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <VideoIcon size={40} color="rgba(255,255,255,0.5)" />
              </div>
            )}
            {/* TikTok UI elements */}
            <div style={{ position:'absolute', right:8, bottom:80, display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <UsersIcon size={20} color={WHITE} />
              </div>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:WHITE, fontSize:12, fontWeight:700 }}>♥</span>
              </div>
            </div>
            {/* Ad info overlay */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:12, background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <div style={{ width:24, height:24, borderRadius:'50%', background:'rgba(255,255,255,0.9)' }} />
                <div>
                  <p style={{ color:WHITE, fontSize:10, fontWeight:600, margin:0 }}>@yourbrand</p>
                  <p style={{ color:'rgba(255,255,255,0.7)', fontSize:8, margin:0 }}>Sponsored</p>
                </div>
              </div>
              <p style={{ color:WHITE, fontSize:12, fontWeight:500, margin:'0 0 8px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{data.creative.headline || "Check this out!"}</p>
              <button style={{ width:'100%', padding:'6px 0', background:'#fe2c55', color:WHITE, fontSize:12, fontWeight:700, borderRadius:8, border:'none', cursor:'pointer' }}>{data.creative.cta || "Shop Now"}</button>
            </div>
          </div>
        </div>
      );
    }

    // Messenger Inbox (Chat interface)
    if (placement.id.includes("messenger")) {
      return (
        <div style={{ width:280, background:WHITE, borderRadius:12, border:'1px solid '+BORDER, boxShadow:'0 4px 12px rgba(0,0,0,0.1)', overflow:'hidden' }}>
          <div style={{ padding:12, borderBottom:'1px solid '+BORDER, display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#00b2ff,#0078ff)' }} />
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:FONT, fontSize:12, fontWeight:600, color:'#050505', margin:0 }}>Your Brand</p>
              <p style={{ fontFamily:FONT, fontSize:10, color:'#65676b', margin:0 }}>Sponsored Message</p>
            </div>
          </div>
          <div style={{ padding:12, display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ background:'#e4e6eb', borderRadius:'16px 16px 16px 4px', padding:12, maxWidth:200 }}>
              {hasCreative && <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:'100%', aspectRatio:'16/9', objectFit:'cover', borderRadius:8, marginBottom:8 }} />}
              <p style={{ fontFamily:FONT, fontSize:12, color:'#050505', margin:'0 0 4px', fontWeight:500 }}>{data.creative.headline || "Hey! Check this out"}</p>
              <p style={{ fontFamily:FONT, fontSize:10, color:'#65676b', margin:0 }}>{data.creative.description || "Special offer just for you"}</p>
            </div>
            <button style={{ width:'100%', padding:'8px 0', background:'#0084ff', color:WHITE, fontSize:12, fontWeight:600, borderRadius:999, border:'none', cursor:'pointer' }}>{data.creative.cta || "View Offer"}</button>
          </div>
        </div>
      );
    }

    // Gmail Ads (Email-like format)
    if (placement.id.includes("gmail")) {
      return (
        <div style={{ width:340, background:WHITE, borderRadius:8, border:'1px solid '+BORDER, boxShadow:'0 1px 2px rgba(0,0,0,0.05)' }}>
          <div style={{ padding:12, borderBottom:'1px solid '+BORDER, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#4285f4,#ea4335)' }} />
              <div>
                <p style={{ fontFamily:FONT, fontSize:12, fontWeight:500, color:'#202124', margin:0 }}>Your Brand</p>
                <p style={{ fontFamily:FONT, fontSize:10, color:'#5f6368', margin:0 }}>Promotional</p>
              </div>
            </div>
            <span style={{ padding:'2px 8px', background:'#fef7e0', border:'1px solid #fbbc04', borderRadius:4, fontSize:9, fontWeight:500, color:'#ea8600' }}>Ad</span>
          </div>
          <div style={{ padding:12 }}>
            <h4 style={{ fontFamily:FONT, fontSize:14, fontWeight:500, color:'#202124', margin:'0 0 4px' }}>{data.creative.headline || "Special Offer Inside"}</h4>
            <p style={{ fontFamily:FONT, fontSize:12, color:'#5f6368', margin:'0 0 12px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{data.creative.description || "Limited time offer on our best products. Don't miss out!"}</p>
            {hasCreative && <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:'100%', height:120, objectFit:'cover', borderRadius:4, marginBottom:12 }} />}
            <button style={{ width:'100%', padding:'8px 0', background:'#1a73e8', color:WHITE, fontSize:12, fontWeight:500, borderRadius:4, border:'none', cursor:'pointer' }}>{data.creative.cta || "Shop Now"}</button>
          </div>
        </div>
      );
    }

    // Audience Network / Pangle (Generic mobile banner)
    if (placement.id.includes("audience-network") || placement.id.includes("pangle")) {
      return (
        <div style={{ width:280, background:'#f5f5f5', borderRadius:8, padding:8 }}>
          <div style={{ background:WHITE, borderRadius:8, border:'1px solid '+BORDER, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:8 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:4 }}>
                  <span style={{ fontSize:8, padding:'1px 4px', background:'#f0f2f5', borderRadius:2, color:'#65676b', fontWeight:600 }}>AD</span>
                  <span style={{ fontSize:9, color:'#65676b' }}>Your Brand</span>
                </div>
                <p style={{ fontFamily:FONT, fontSize:10, fontWeight:500, color:'#050505', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{data.creative.headline || "Sponsored Content"}</p>
              </div>
              {hasCreative ? (
                <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Ad" style={{ width:56, height:56, objectFit:'cover', borderRadius:4 }} />
              ) : (
                <div style={{ width:56, height:56, background:'#e4e6eb', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ImageSvgIcon size={20} color="#bcc0c4" />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Default fallback
    return (
      <div style={{ width:240, background:WHITE, borderRadius:8, border:'1px solid '+BORDER, boxShadow:'0 1px 2px rgba(0,0,0,0.05)', padding:12 }}>
        <p style={{ fontFamily:FONT, fontSize:12, fontWeight:500, color:TEXT_HI, margin:'0 0 8px' }}>{placement.label}</p>
        <div style={{ width:'100%', height:128, background:BG_MUT, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <ImageSvgIcon size={32} color="#9ca3af" />
        </div>
        <p style={{ fontFamily:FONT, fontSize:10, color:TEXT_MID, marginTop:8, marginBottom:0 }}>{placement.description}</p>
      </div>
    );
  };

  const renderPlacementStep = () => {
    if (!data.platform || !data.adFormat) {
      return (
        <div style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID }}>
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
      <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
        <div>
          <h2 style={{ fontFamily:FONT, fontSize:22, fontWeight:600, color:TEXT_HI, margin:'0 0 8px' }}>
            Select Placements
          </h2>
          <p style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, margin:0 }}>
            Choose where your ads will appear across the selected platform.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
          {Object.entries(groupedPlacements).map(([category, placements]) => (
            <div key={category} style={{ background:WHITE, border:'1px solid '+BORDER, borderRadius:10, padding:24 }}>
              <h3 style={{ fontFamily:FONT, fontSize:16, fontWeight:600, color:TEXT_HI, margin:'0 0 16px' }}>
                {category}
              </h3>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
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
            </div>
          ))}
        </div>

        {/* Live Preview Section */}
        <div style={{ background:WHITE, border:'1px solid '+BORDER, borderRadius:10, padding:24 }}>
          <h3 style={{ fontFamily:FONT, fontSize:16, fontWeight:600, color:TEXT_HI, margin:'0 0 16px' }}>
            Live Preview
          </h3>
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:16, flexWrap:'wrap' }}>
            {data.placements.length > 0 ? (
              data.placements.map((placementId) => {
                const placement = currentPlatformPlacements.find(
                  (p) => p.id === placementId,
                );
                return placement ? (
                  <div key={placementId} style={{ textAlign:'center' }}>
                    <p style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID, margin:'0 0 8px' }}>
                      {placement.label}
                    </p>
                    {renderPlacementPreview(placement)}
                  </div>
                ) : null;
              })
            ) : (
              <div style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, textAlign:'center' }}>
                Select placements to see previews.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const targetingOptions = [
    {
      id: "geoLocation",
      title: "Geo Location",
      icon: <GlobeIcon size={28} color="#4285f4" />,
      iconBg: '#e8f0fe',
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
      icon: <StoreIcon size={28} color="#34a853" />,
      iconBg: '#e6f4ea',
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
      icon: <UsersIcon size={28} color="#fbbc04" />,
      iconBg: '#fef7e0',
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
      icon: <TagIcon size={28} color="#ea4335" />,
      iconBg: '#fce8e6',
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
      icon: <ShoppingBagIcon size={28} color="#1a73e8" />,
      iconBg: '#e8f0fe',
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
    <>
      {/* Overlay */}
      <div
        style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:60 }}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        style={{ position:'fixed', right:0, top:0, zIndex:60, height:'100%', width:'85%', background:BG_SUB, boxShadow:'0 10px 40px rgba(0,0,0,0.18)', display:'flex', flexDirection:'column', transition:'transform 0.3s' }}
      >
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', background:WHITE, borderBottom:'1px solid '+BORDER }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <button
              onClick={onClose}
              style={{ padding:8, background:'transparent', border:'none', borderRadius:8, cursor:'pointer' }}
            >
              <CloseIcon size={20} color={TEXT_MID} />
            </button>
            <div>
              <h2 style={{ fontFamily:FONT, fontSize:16, fontWeight:600, color:TEXT_HI, margin:0 }}>
                {mode === "add_ad_group"
                  ? `Add Ad Group to ${selectedCampaign?.name}`
                  : "Create Offsite Ad Group"}
              </h2>
              <p style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID, margin:0 }}>
                Step {stepIndex + 1} of {visibleSteps.length} •{" "}
                {currentStepInfo.description}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ padding:8, background:'transparent', border:'none', borderRadius:8, cursor:'pointer' }}
          >
            <CloseIcon size={20} color={TEXT_MID} />
          </button>
        </div>

        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
          {/* Steps Sidebar */}
          <div style={{ width:256, background:WHITE, borderRight:'1px solid '+BORDER, display:'flex', flexDirection:'column', flexShrink:0 }}>
            <div style={{ flex:1, padding:16, display:'flex', flexDirection:'column', gap:4, overflowY:'auto' }}>
              {visibleSteps.map((step, index) => {
                const isCompleted = index < stepIndex;
                const isCurrent = step.id === currentStep;
                const isDisabled = index > stepIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => !isDisabled && setCurrentStep(step.id)}
                    disabled={isDisabled}
                    style={{
                      width:'100%', display:'flex', alignItems:'center', gap:12,
                      padding:'10px 12px', borderRadius:8, textAlign:'left',
                      border: isCurrent ? '1px solid '+ACCENT : '1px solid transparent',
                      background: isCurrent ? ACCENT_M : 'transparent',
                      opacity: isDisabled ? 0.5 : 1,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      transition:'all 0.15s',
                    }}
                  >
                    <div
                      style={{
                        width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:13, fontFamily:FONT, fontWeight:500, flexShrink:0,
                        background: isCompleted ? GREEN : isCurrent ? ACCENT : BG_MUT,
                        color: (isCompleted || isCurrent) ? WHITE : TEXT_MID,
                      }}
                    >
                      {isCompleted ? <CheckIcon size={14} color={WHITE} /> : index + 1}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{
                        fontFamily:FONT, fontSize:13, fontWeight:500,
                        color: isCurrent ? ACCENT : isCompleted ? TEXT_HI : TEXT_LO,
                        overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                      }}>
                        {step.label}
                      </div>
                      <div style={{ fontFamily:FONT, fontSize:11, color:TEXT_MID, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                        {step.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ad Group Summary */}
            <div style={{ borderTop:'1px solid '+BORDER, padding:16, background:BG_SUB }}>
              <h4 style={{ fontFamily:FONT, fontSize:11, fontWeight:600, color:TEXT_MID, textTransform:'uppercase', letterSpacing:'0.05em', margin:'0 0 12px' }}>
                Ad Group Summary
              </h4>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  { label:'Name', value: data.name || '-', truncate:true },
                  { label:'Platform', value: data.platform || '-' },
                  { label:'Format', value: data.adFormat || '-' },
                  { label:'Placements', value: String(data.placements.length || 0) },
                  { label:'Budget', value: data.budget ? `$${data.budget}/day` : '-' },
                ].map(({ label, value, truncate }) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>{label}</span>
                    <span style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI, maxWidth:truncate?120:undefined, overflow:truncate?'hidden':undefined, textOverflow:truncate?'ellipsis':undefined, whiteSpace:truncate?'nowrap':undefined }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Media Estimator FAB */}
              <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid '+BORDER }}>
                <button
                  onClick={() => setEstimatorOpen(!estimatorOpen)}
                  style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'10px 16px', background:ACCENT, color:WHITE, border:'none', borderRadius:8, fontFamily:FONT, fontSize:13, fontWeight:500, cursor:'pointer' }}
                >
                  <BarChartIcon size={16} color={WHITE} />
                  Media Estimator
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex:1, overflowY:'auto', padding:24 }}>
            {estimatorOpen && (
              <div style={{ position:'fixed', inset:0, zIndex:70, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div
                  style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)' }}
                  onClick={() => setEstimatorOpen(false)}
                />
                <div style={{ position:'relative', background:WHITE, borderRadius:16, border:'1px solid '+BORDER, boxShadow:'0 20px 60px rgba(0,0,0,0.18)', width:380, overflow:'hidden' }}>
                  {/* Estimator Header */}
                  <div style={{ background:ACCENT, padding:16, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <BarChartIcon size={20} color={WHITE} />
                      <span style={{ fontFamily:FONT, fontWeight:600, color:WHITE, fontSize:14 }}>Media Estimator</span>
                    </div>
                    <button
                      onClick={() => setEstimatorOpen(false)}
                      style={{ padding:4, background:'transparent', border:'none', borderRadius:4, cursor:'pointer' }}
                    >
                      <CloseIcon size={16} color={WHITE} />
                    </button>
                  </div>

                  {/* Estimator Content */}
                  <div style={{ padding:16, display:'flex', flexDirection:'column', gap:16 }}>
                    {/* Estimated Results */}
                    <div style={{ background:GREEN_M, border:'1px solid '+GREEN, borderRadius:8, padding:16 }}>
                      <div style={{ fontFamily:FONT, fontSize:12, color:GREEN, fontWeight:500, marginBottom:8 }}>
                        Estimated Results
                      </div>
                      {[
                        { label:'Daily Reach', value:'12K - 35K' },
                        { label:'Est. Clicks', value:'180 - 450' },
                        { label:'Est. CPM', value:'$4.50 - $8.20' },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                          <span style={{ fontFamily:FONT, fontSize:13, color:GREEN }}>{label}</span>
                          <span style={{ fontFamily:FONT, fontSize:13, fontWeight:600, color:GREEN }}>{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Targeting Summary (hand-rolled accordion) */}
                    <div style={{ border:'1px solid '+BORDER, borderRadius:8 }}>
                      <button
                        onClick={() => setAccordionOpen(!accordionOpen)}
                        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background:'transparent', border:'none', cursor:'pointer', borderRadius:8 }}
                      >
                        <span style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI }}>Targeting Summary</span>
                        <ChevronRightIcon size={14} color={TEXT_MID} style={{ transform: accordionOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition:'transform 0.2s' }} />
                      </button>
                      {accordionOpen && (
                        <div style={{ padding:'0 12px 12px', display:'flex', flexDirection:'column', gap:8 }}>
                          {[
                            { label:'Locations', value: data.targeting.locations.length > 0 ? `${data.targeting.locations.length} selected` : 'None' },
                            { label:'Audiences', value: data.targeting.audiences.length > 0 ? `${data.targeting.audiences.length} selected` : 'None' },
                            { label:'Keywords', value: data.targeting.keywords.length > 0 ? `${data.targeting.keywords.length} added` : 'None' },
                            { label:'Stores', value: data.targeting.stores.length > 0 ? `${data.targeting.stores.length} selected` : 'None' },
                          ].map(({ label, value }) => (
                            <div key={label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                              <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>{label}</span>
                              <span style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:TEXT_HI }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Budget Impact */}
                    <div style={{ background:'#fefce8', border:'1px solid #fde047', borderRadius:8, padding:12 }}>
                      <div style={{ fontFamily:FONT, fontSize:12, color:'#713f12', fontWeight:500, marginBottom:4 }}>
                        Budget Impact
                      </div>
                      <div style={{ fontFamily:FONT, fontSize:13, color:'#854d0e' }}>
                        With ${data.budget || "50"}/day budget, you could reach
                        up to{" "}
                        <span style={{ fontWeight:600 }}>~17K users daily</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStepInfo.id === "basics" && (
              <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
                <div>
                  <h2 style={{ fontFamily:FONT, fontSize:22, fontWeight:600, color:TEXT_HI, margin:'0 0 8px' }}>
                    Ad Group Basics
                  </h2>
                  <p style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, margin:0 }}>
                    Name your ad group and select the advertising platform.
                  </p>
                </div>

                <div style={{ background:WHITE, border:'1px solid '+BORDER, borderRadius:10, padding:24, display:'flex', flexDirection:'column', gap:24 }}>
                  <Input
                    label="Ad Group Name *"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="e.g., Summer Sale - US Audience"
                  />

                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                      <span style={{ fontFamily:FONT, fontSize:13, fontWeight:600, color:TEXT_HI }}>Select Platform *</span>
                      <span title="Choose where your ads will run. Each platform has different strengths and audience types.">
                        <InfoIcon size={14} color={TEXT_MID} />
                      </span>
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
                      {platforms.map((platform) => (
                        <div
                          key={platform.id}
                          style={{
                            padding:16, borderRadius:8, cursor:'pointer', transition:'all 0.15s',
                            border: data.platform === platform.id ? '2px solid '+ACCENT : '1px solid '+BORDER,
                            background: data.platform === platform.id ? ACCENT_M : WHITE,
                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                          }}
                          onClick={() =>
                            setData({ ...data, platform: platform.id, adFormat: null, placements: [] })
                          }
                        >
                          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:8 }}>
                            <div style={{ width:40, height:40 }}>{platform.icon}</div>
                            <div style={{ fontFamily:FONT, fontWeight:600, color:TEXT_HI }}>{platform.name}</div>
                            <div style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID }}>{platform.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStepInfo.id === "format" && data.platform && (
              <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
                <div>
                  <h2 style={{ fontFamily:FONT, fontSize:22, fontWeight:600, color:TEXT_HI, margin:'0 0 8px' }}>
                    Choose Ad Format
                  </h2>
                  <p style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, margin:0 }}>
                    Select the type of ad you want to create on{" "}
                    {data.platform === "meta" ? "Meta" : data.platform === "google" ? "Google" : "TikTok"}{" "}
                    Ads.
                  </p>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
                  {adFormats[data.platform].map((format) => (
                    <div
                      key={format.id}
                      style={{
                        position:'relative', cursor:'pointer', transition:'all 0.15s', borderRadius:8,
                        border: data.adFormat === format.id ? '2px solid '+ACCENT : '1px solid '+BORDER,
                        background: data.adFormat === format.id ? '#fafafa' : WHITE,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                      }}
                      onClick={() => setData({ ...data, adFormat: format.id })}
                    >
                      {data.adFormat === format.id && (
                        <div style={{ position:'absolute', top:12, right:12, zIndex:1, width:20, height:20, background:GREEN, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}>
                          <CheckIcon size={12} color={WHITE} />
                        </div>
                      )}
                      <div style={{ padding:12, background:BG_MUT, borderRadius:'8px 8px 0 0', display:'flex', alignItems:'center', justifyContent:'center', height:140 }}>
                        {format.illustration}
                      </div>
                      <div style={{ padding:16 }}>
                        <div style={{ fontFamily:FONT, fontWeight:600, color:TEXT_HI, marginBottom:4 }}>{format.name}</div>
                        <div style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID, marginBottom:8 }}>{format.description}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:4, fontFamily:FONT, fontSize:12, color:ACCENT }}>
                          <InfoIcon size={12} color={ACCENT} />
                          <span>Specs: {format.specs}</span>
                        </div>
                      </div>
                    </div>
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
              <div>
                <div style={{ marginBottom:24 }}>
                  <h2 style={{ fontFamily:FONT, fontSize:22, fontWeight:600, color:TEXT_HI, margin:'0 0 8px' }}>
                    Set Your Targets
                  </h2>
                  <p style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, margin:0 }}>
                    Select your preferred targeting options for this campaign.
                  </p>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
                  {targetingOptions.map((option) => (
                    <div
                      key={option.id}
                      style={{ position:'relative', padding:24, border:'1px solid '+BORDER, borderRadius:12, cursor:'pointer', transition:'all 0.15s', background:WHITE }}
                      onClick={option.onClick}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
                        <div style={{ width:64, height:64, borderRadius:16, background:option.iconBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {option.icon}
                        </div>

                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, marginBottom:8 }}>
                            <h3 style={{ fontFamily:FONT, fontWeight:600, fontSize:14, color:TEXT_HI, margin:0 }}>{option.title}</h3>
                            <span style={{
                              flexShrink:0, padding:'2px 8px', borderRadius:4, fontSize:11, fontFamily:FONT, fontWeight:600,
                              background: option.configured ? GREEN_M : BG_MUT,
                              color: option.configured ? GREEN : TEXT_MID,
                              border: '1px solid ' + (option.configured ? GREEN : BORDER),
                            }}>
                              {option.configured ? "CONFIGURED" : "NOT SET"}
                            </span>
                          </div>

                          <p style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID, margin:'0 0 12px', lineHeight:1.5 }}>
                            {option.description}
                          </p>

                          {option.summary && (
                            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
                              <div style={{ height:1, flex:1, background:BORDER }} />
                              <span style={{ fontFamily:FONT, color:ACCENT, fontWeight:500 }}>{option.summary}</span>
                              <div style={{ height:1, flex:1, background:BORDER }} />
                            </div>
                          )}
                        </div>

                        <ChevronRightIcon size={20} color={TEXT_LO} style={{ flexShrink:0 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStepInfo.id === "creative" && (
              <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
                <div>
                  <h2 style={{ fontFamily:FONT, fontSize:22, fontWeight:600, color:TEXT_HI, margin:'0 0 8px' }}>
                    Ad Creative
                  </h2>
                  <p style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, margin:0 }}>
                    Create compelling ad content that drives engagement.
                  </p>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
                  {/* Creative inputs */}
                  <div style={{ background:WHITE, border:'1px solid '+BORDER, borderRadius:10, padding:24, display:'flex', flexDirection:'column', gap:20 }}>
                    <div>
                      <Input
                        label="Headline *"
                        value={data.creative.headline}
                        onChange={(e) => setData({ ...data, creative: { ...data.creative, headline: e.target.value } })}
                        placeholder="Your attention-grabbing headline"
                        maxLength={60}
                      />
                      <p style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID, marginTop:4 }}>
                        {data.creative.headline.length}/60 characters
                      </p>
                    </div>

                    <div>
                      <span style={{ fontFamily:FONT, fontSize:13, fontWeight:600, color:TEXT_HI, display:'block', marginBottom:6 }}>Description *</span>
                      <textarea
                        value={data.creative.description}
                        onChange={(e) => setData({ ...data, creative: { ...data.creative, description: e.target.value } })}
                        placeholder="Describe your product or service"
                        rows={3}
                        maxLength={150}
                        style={{ width:'100%', fontFamily:FONT, fontSize:13, color:TEXT_HI, border:'1px solid '+BORDER, borderRadius:6, padding:'8px 10px', resize:'vertical', boxSizing:'border-box', outline:'none' }}
                      />
                      <p style={{ fontFamily:FONT, fontSize:12, color:TEXT_MID, marginTop:4 }}>
                        {data.creative.description.length}/150 characters
                      </p>
                    </div>

                    <Select
                      label="Call to Action"
                      value={data.creative.cta}
                      onChange={(e) => setData({ ...data, creative: { ...data.creative, cta: e.target.value } })}
                      options={[
                        { value:'Learn More', label:'Learn More' },
                        { value:'Shop Now', label:'Shop Now' },
                        { value:'Sign Up', label:'Sign Up' },
                        { value:'Download', label:'Download' },
                        { value:'Get Quote', label:'Get Quote' },
                        { value:'Contact Us', label:'Contact Us' },
                      ]}
                    />

                    {/* Image Upload */}
                    {(data.adFormat === "image" || data.adFormat === "carousel" || data.adFormat === "collection" || data.adFormat === "display" || data.adFormat === "shopping" || data.adFormat === "static" || data.adFormat === "performanceMax" || data.adFormat === "google-search" || data.adFormat === "gmail-promotions" || data.adFormat === "gmail-social" || data.adFormat === "discover-feed" || data.adFormat === "discover-youtube" || data.adFormat === "display-responsive" || data.adFormat === "display-banner" || data.adFormat === "display-native") && (
                      <div>
                        {data.adFormat === "performanceMax" && (
                          <div style={{ marginBottom:16, padding:16, background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:8 }}>
                            <div style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:12 }}>
                              <InfoIcon size={16} color="#0284c7" style={{ marginTop:2 }} />
                              <div>
                                <div style={{ fontFamily:FONT, fontSize:13, fontWeight:500, color:'#0c4a6e' }}>Performance Max Assets</div>
                                <div style={{ fontFamily:FONT, fontSize:12, color:'#075985', marginTop:4 }}>
                                  Upload custom images or connect your product catalog. Minimum: 1 landscape (1.91:1) and 1 square (1:1) image.
                                </div>
                              </div>
                            </div>
                            <div style={{ display:'flex', gap:8 }}>
                              <Button variant="outline" style={{ flex:1 }} onClick={() => setProductModalOpen(true)}>
                                <PackageIcon size={14} /> Use Product Catalog
                              </Button>
                              <Button variant="outline" style={{ flex:1 }} onClick={() => fileInputRef.current?.click()}>
                                <UploadIcon size={14} /> Upload Custom Assets
                              </Button>
                            </div>
                          </div>
                        )}

                        <span style={{ fontFamily:FONT, fontSize:13, fontWeight:600, color:TEXT_HI, display:'block', marginBottom:6 }}>
                          {data.adFormat === "performanceMax" ? "Upload Images (Landscape & Square) *" : "Upload Image *"}
                        </span>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display:'none' }} multiple={data.adFormat === "performanceMax"} />
                        {data.creative.imageUrl ? (
                          <div style={{ marginTop:8, position:'relative' }}>
                            <img src={data.creative.imageUrl || "/placeholder.svg"} alt="Uploaded creative" style={{ width:'100%', maxHeight:200, objectFit:'cover', borderRadius:8, border:'1px solid '+BORDER }} />
                            <button onClick={() => removeMedia("image")} style={{ position:'absolute', top:8, right:8, padding:6, background:WHITE, border:'none', borderRadius:'50%', boxShadow:'0 1px 4px rgba(0,0,0,0.2)', cursor:'pointer' }}>
                              <TrashIcon size={16} color="#dc2626" />
                            </button>
                            {data.adFormat === "performanceMax" && (
                              <div style={{ position:'absolute', top:8, left:8, padding:'2px 8px', background:'rgba(255,255,255,0.9)', borderRadius:4, fontFamily:FONT, fontSize:12, fontWeight:500 }}>
                                Landscape (1.91:1)
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            style={{ marginTop:8, width:'100%', height:150, border:'2px dashed '+BORDER, borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:'transparent', cursor:'pointer', transition:'all 0.15s' }}
                          >
                            <UploadIcon size={24} color={TEXT_MID} />
                            <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>
                              {data.adFormat === "performanceMax" ? "Click to upload images (landscape & square)" : "Click to upload image"}
                            </span>
                            <span style={{ fontFamily:FONT, fontSize:12, color:TEXT_LO }}>
                              {data.adFormat === "performanceMax" ? "1200x628px (landscape), 1200x1200px (square)" : "PNG, JPG up to 10MB"}
                            </span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Video Upload */}
                    {(data.adFormat === "video" || data.adFormat === "infeed" || data.adFormat === "youtube-watch" || data.adFormat === "youtube-shorts" || data.adFormat === "fb-instream-reels" || data.adFormat === "audience-network-rewarded") && (
                      <div>
                        <span style={{ fontFamily:FONT, fontSize:13, fontWeight:600, color:TEXT_HI, display:'block', marginBottom:6 }}>Upload Video *</span>
                        <input ref={videoInputRef} type="file" accept="video/*" onChange={handleVideoUpload} style={{ display:'none' }} />
                        {data.creative.videoUrl ? (
                          <div style={{ marginTop:8, position:'relative' }}>
                            <video src={data.creative.videoUrl} controls style={{ width:'100%', maxHeight:200, objectFit:'cover', borderRadius:8, border:'1px solid '+BORDER }} />
                            <button onClick={() => removeMedia("video")} style={{ position:'absolute', top:8, right:8, padding:6, background:WHITE, border:'none', borderRadius:'50%', boxShadow:'0 1px 4px rgba(0,0,0,0.2)', cursor:'pointer' }}>
                              <TrashIcon size={16} color="#dc2626" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => videoInputRef.current?.click()}
                            style={{ marginTop:8, width:'100%', height:150, border:'2px dashed '+BORDER, borderRadius:8, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, background:'transparent', cursor:'pointer', transition:'all 0.15s' }}
                          >
                            <VideoIcon size={24} color={TEXT_MID} />
                            <span style={{ fontFamily:FONT, fontSize:13, color:TEXT_MID }}>Click to upload video</span>
                            <span style={{ fontFamily:FONT, fontSize:12, color:TEXT_LO }}>MP4, MOV up to 500MB</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Live Preview */}
                  <div style={{ background:WHITE, border:'1px solid '+BORDER, borderRadius:10, padding:24 }}>
                    <h3 style={{ fontFamily:FONT, fontSize:14, fontWeight:500, color:TEXT_HI, margin:'0 0 16px' }}>
                      Live Preview
                    </h3>
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100%' }}>
                      {data.platform && data.adFormat ? (
                        (() => {
                          const platformPlacements = placementConfigs[data.platform];

                          // Determine preview type based on format id (no className inspection needed)
                          let previewType = "feed";
                          if (["search","google-search","search-text","search-shopping","search-local","fb-search","ig-search"].includes(data.adFormat)) {
                            previewType = "search";
                          } else if (["video","youtube-watch","youtube-shorts","fb-instream-reels","audience-network-rewarded"].includes(data.adFormat)) {
                            previewType = "video";
                          } else if (["display","googleDisplay","display-responsive","display-banner","display-native"].includes(data.adFormat)) {
                            previewType = "display";
                          } else if (["infeed","tiktok-feed","story","ig-stories","fb-stories"].includes(data.adFormat)) {
                            previewType = "story";
                          }

                          const representativePlacement = platformPlacements.find((p) => p.preview === previewType);
                          return representativePlacement ? (
                            renderPlacementPreview(representativePlacement)
                          ) : (
                            <div style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, textAlign:'center' }}>
                              No preview available for this format.
                            </div>
                          );
                        })()
                      ) : (
                        <div style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, textAlign:'center' }}>
                          Select platform and ad format to see preview.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStepInfo.id === "placement" &&
              data.platform &&
              renderPlacementStep()}

            {currentStepInfo.id === "config" && (
              <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
                <div>
                  <h2 style={{ fontFamily:FONT, fontSize:22, fontWeight:600, color:TEXT_HI, margin:'0 0 8px' }}>
                    Budget & Bidding
                  </h2>
                  <p style={{ fontFamily:FONT, fontSize:14, color:TEXT_MID, margin:0 }}>
                    Set your daily budget and bidding strategy.
                  </p>
                </div>

                <div style={{ background:WHITE, border:'1px solid '+BORDER, borderRadius:10, padding:24 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
                    <div>
                      <span style={{ fontFamily:FONT, fontSize:13, fontWeight:600, color:TEXT_HI, display:'block', marginBottom:6 }}>Daily Budget *</span>
                      <div style={{ position:'relative' }}>
                        <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontFamily:FONT, fontSize:13, color:TEXT_MID, pointerEvents:'none' }}>$</span>
                        <Input
                          type="number"
                          value={data.budget}
                          onChange={(e) => setData({ ...data, budget: e.target.value })}
                          placeholder="0.00"
                          style={{ paddingLeft:24 }}
                        />
                      </div>
                    </div>

                    <Select
                      label="Bid Strategy"
                      value={data.bidStrategy}
                      onChange={(e) => setData({ ...data, bidStrategy: e.target.value })}
                      options={[
                        { value:'lowest_cost', label:'Lowest Cost' },
                        { value:'cost_cap', label:'Cost Cap' },
                        { value:'bid_cap', label:'Bid Cap' },
                        { value:'target_cost', label:'Target Cost' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop:'1px solid '+BORDER, background:WHITE, padding:'16px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:12 }}>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            {stepIndex > 0 && (
              <Button variant="outline" onClick={handlePrevious}>Back</Button>
            )}
            <Button variant="primary" style={{ minWidth:120 }} onClick={handleNext}>
              {isLastStep ? "Create Ad Group" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const FONT_PO = "'Open Sans', sans-serif";
const BORDER_PO = 'var(--osmos-border)';
const TEXT_HI_PO = 'var(--osmos-fg)';
const TEXT_MID_PO = 'var(--osmos-fg-muted)';
const ACCENT_PO = 'var(--osmos-brand-primary)';

function PlacementOption({ id, label, description, checked, onChange }) {
  return (
    <div
      style={{ display:'flex', alignItems:'flex-start', gap:12, padding:16, border:'1px solid '+BORDER_PO, borderRadius:8, transition:'border-color 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT_PO}
      onMouseLeave={e => e.currentTarget.style.borderColor = BORDER_PO}
    >
      {/* Hand-rolled toggle switch */}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          flexShrink:0, marginTop:2, width:36, height:20, borderRadius:10, border:'none', cursor:'pointer', padding:2, transition:'background 0.2s',
          background: checked ? ACCENT_PO : '#d1d5db',
          display:'flex', alignItems:'center',
        }}
      >
        <span style={{
          width:16, height:16, borderRadius:'50%', background:'#ffffff',
          transform: checked ? 'translateX(16px)' : 'translateX(0)',
          transition:'transform 0.2s',
          display:'block',
        }} />
      </button>
      <div style={{ flex:1 }}>
        <label htmlFor={id} style={{ fontFamily:FONT_PO, fontSize:13, fontWeight:500, color:TEXT_HI_PO, cursor:'pointer' }}>{label}</label>
        <p style={{ fontFamily:FONT_PO, fontSize:12, color:TEXT_MID_PO, margin:'4px 0 0' }}>{description}</p>
      </div>
    </div>
  );
}
