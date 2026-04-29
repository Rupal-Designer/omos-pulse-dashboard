import React, { useState } from "react";
import { Toast, useToast } from '../../ui/atoms/Toast';

const FEATURES = [
  {
    color: "#4f46e5",
    title: "Geo & Store Targeting",
    description:
      "Empower advertisers to capitalize on local preferences with location based targeting, right down to the store level.",
  },
  {
    color: "#0891b2",
    title: "Self-Serve Audience Targeting",
    description:
      "Enable precise targeting for advertisers by allowing them to curate audiences using first party data, without sharing any PII data.",
  },
  {
    color: "#7c3aed",
    title: "Self-Serve Inventory Management",
    description:
      "Dynamically respond to demand by creating new supply, change floor CPMs & introduce new ad formats in real-time.",
  },
  {
    color: "#b45309",
    title: "Flexible Buying Models",
    description:
      "Enable CPM-based or CPC-based buying across ad formats, giving advertisers the flexibility to choose between awareness & performance.",
  },
  {
    color: "#047857",
    title: "End-to-End Insights",
    description:
      "Provide end-to-end insights, from impressions to ROAS at campaign, ad inventory & banner level, along with detailed order logs.",
  },
];

function FeatureIcon({ color }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <circle cx="16" cy="16" r="14" fill={color} fillOpacity="0.12" />
      <circle cx="16" cy="16" r="7" fill={color} fillOpacity="0.35" />
      <circle cx="16" cy="16" r="3.5" fill={color} />
    </svg>
  );
}

export default function AppStorePage() {
  const { toast, showToast } = useToast();

  return (
    <div
      style={{
        fontFamily: "'Open Sans', sans-serif",
        background: "var(--osmos-bg-subtle)",
        minHeight: "100vh",
        padding: "24px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <Toast {...toast} />

      {/* Back button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => showToast("Navigating back...")}
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--osmos-fg)",
            background: "transparent",
            border: "1.5px solid var(--osmos-border)",
            borderRadius: "8px",
            padding: "8px 18px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7L9 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Featured App Card */}
      <div
        style={{
          background: "var(--osmos-bg)",
          border: "1px solid var(--osmos-border)",
          borderRadius: "12px",
          padding: "28px 32px",
          marginBottom: "20px",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
          <span
            style={{
              background: "var(--osmos-brand-primary)",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "700",
              padding: "3px 9px",
              borderRadius: "999px",
              letterSpacing: "0.04em",
              marginTop: "4px",
              flexShrink: 0,
            }}
          >
            PRO
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "700",
              color: "var(--osmos-fg)",
              lineHeight: 1.25,
            }}
          >
            Display Ads
          </h1>
        </div>

        <p
          style={{
            margin: "0 0 6px 0",
            fontSize: "14px",
            color: "var(--osmos-fg-muted)",
            lineHeight: "1.55",
          }}
        >
          Intent driven, localized campaigns rooted in first-party audience targeting.
        </p>

        <p
          style={{
            margin: "0 0 18px 0",
            fontSize: "12px",
            color: "var(--osmos-brand-green)",
            fontWeight: "600",
          }}
        >
          Go live in 2–3 weeks
        </p>

        <p
          style={{
            margin: "0 0 28px 0",
            fontSize: "13.5px",
            color: "var(--osmos-fg-muted)",
            lineHeight: "1.7",
            maxWidth: "760px",
          }}
        >
          Sponsored Display Ads is a campaign type that unlocks access to multiple rich media and
          interactive ad formats across your Retail Media Network. It allows advertisers to run
          localized, intent-driven campaigns using store-level and first-party audience targeting,
          helping them scale reach while maintaining privacy and shopper relevance.
        </p>

        {/* Features section */}
        <div>
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "14px",
              fontWeight: "700",
              color: "var(--osmos-fg)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Features
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <FeatureIcon color={feature.color} />
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "var(--osmos-fg)",
                      marginBottom: "3px",
                    }}
                  >
                    {feature.title}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--osmos-fg-muted)",
                      lineHeight: "1.6",
                      maxWidth: "640px",
                    }}
                  >
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add-Ons row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Included Add-Ons */}
        <div
          style={{
            background: "var(--osmos-bg)",
            border: "1px solid var(--osmos-border)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--osmos-fg)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Included Add-Ons
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 0",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              style={{ marginBottom: "10px", opacity: 0.35 }}
            >
              <rect
                x="6"
                y="6"
                width="24"
                height="24"
                rx="4"
                stroke="var(--osmos-fg-subtle)"
                strokeWidth="1.8"
              />
              <path
                d="M12 18h12M18 12v12"
                stroke="var(--osmos-fg-subtle)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--osmos-fg-subtle)",
                textAlign: "center",
              }}
            >
              No add-ons included
            </p>
          </div>
        </div>

        {/* Excluded Add-Ons */}
        <div
          style={{
            background: "var(--osmos-bg)",
            border: "1px solid var(--osmos-border)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--osmos-fg)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Excluded Add-Ons
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 0",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              style={{ marginBottom: "10px", opacity: 0.35 }}
            >
              <circle
                cx="18"
                cy="18"
                r="12"
                stroke="var(--osmos-fg-subtle)"
                strokeWidth="1.8"
              />
              <path
                d="M12 18h12"
                stroke="var(--osmos-fg-subtle)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--osmos-fg-subtle)",
                textAlign: "center",
              }}
            >
              Contact support to enable
            </p>
          </div>
        </div>
      </div>

      {/* Related Apps */}
      <div
        style={{
          background: "var(--osmos-bg)",
          border: "1px solid var(--osmos-border)",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: "13px",
            fontWeight: "700",
            color: "var(--osmos-fg)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Related Apps
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 0",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            style={{ marginBottom: "12px", opacity: 0.3 }}
          >
            <rect
              x="4"
              y="4"
              width="14"
              height="14"
              rx="3"
              stroke="var(--osmos-fg-subtle)"
              strokeWidth="1.8"
            />
            <rect
              x="22"
              y="4"
              width="14"
              height="14"
              rx="3"
              stroke="var(--osmos-fg-subtle)"
              strokeWidth="1.8"
            />
            <rect
              x="4"
              y="22"
              width="14"
              height="14"
              rx="3"
              stroke="var(--osmos-fg-subtle)"
              strokeWidth="1.8"
            />
            <rect
              x="22"
              y="22"
              width="14"
              height="14"
              rx="3"
              stroke="var(--osmos-fg-subtle)"
              strokeWidth="1.8"
            />
          </svg>
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              color: "var(--osmos-fg-subtle)",
              textAlign: "center",
            }}
          >
            No related apps at this time
          </p>
        </div>
      </div>
    </div>
  );
}
