"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-screen-bg p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-text-primary">
            Design System
          </h1>
          <p className="text-lg text-text-secondary">
            Comprehensive design tokens and semantic color system for light and
            dark modes
          </p>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="usage">Usage Guide</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8 mt-8">
            <ColorSection
              title="Background Colors"
              description="Main background and surface colors for layouts"
              colors={[
                {
                  name: "Screen Background",
                  token: "--screen-bg",
                  class: "bg-screen-bg",
                },
                {
                  name: "Screen Background 2",
                  token: "--screen-bg-2",
                  class: "bg-screen-bg-2",
                },
                {
                  name: "Surface 1",
                  token: "--surface-1",
                  class: "bg-surface-1",
                },
                {
                  name: "Surface 2",
                  token: "--surface-2",
                  class: "bg-surface-2",
                },
              ]}
            />

            <ColorSection
              title="Text Colors"
              description="Primary and secondary text colors"
              colors={[
                {
                  name: "Text Primary",
                  token: "--text-primary",
                  class: "text-text-primary",
                },
                {
                  name: "Text Secondary",
                  token: "--text-secondary",
                  class: "text-text-secondary",
                },
                {
                  name: "Text Grey 900",
                  token: "--text-grey-900",
                  class: "text-text-grey-900",
                },
              ]}
            />

            <ColorSection
              title="Stroke & Borders"
              description="Border and divider colors"
              colors={[
                { name: "Stroke", token: "--stroke", class: "border-stroke" },
                {
                  name: "Stroke Table",
                  token: "--stroke-table",
                  class: "border-stroke-table",
                },
                {
                  name: "Stroke Disable",
                  token: "--stroke-disable",
                  class: "border-stroke-disable",
                },
                {
                  name: "Stroke Info",
                  token: "--stroke-info",
                  class: "border-stroke-info",
                },
              ]}
            />

            <ColorSection
              title="Blue Scale"
              description="Primary blue colors for actions and highlights"
              colors={[
                {
                  name: "Blue Primary",
                  token: "--blue-primary",
                  class: "bg-blue-primary",
                },
                {
                  name: "Blue Darker 1",
                  token: "--blue-darker-1",
                  class: "bg-blue-darker-1",
                },
                {
                  name: "Blue Darker 2",
                  token: "--blue-darker-2",
                  class: "bg-blue-darker-2",
                },
                {
                  name: "Blue Lighter 1",
                  token: "--blue-lighter-1",
                  class: "bg-blue-lighter-1",
                },
                {
                  name: "Blue Lighter 2",
                  token: "--blue-lighter-2",
                  class: "bg-blue-lighter-2",
                },
                {
                  name: "Blue Background",
                  token: "--blue-bg",
                  class: "bg-blue-bg",
                },
              ]}
            />

            <ColorSection
              title="Violet Scale"
              description="Accent colors for special elements"
              colors={[
                {
                  name: "Violet Background",
                  token: "--violet-bg",
                  class: "bg-violet-bg",
                },
                {
                  name: "Violet Icons",
                  token: "--violet-icons",
                  class: "text-violet-icons",
                },
                {
                  name: "Violet Selected",
                  token: "--violet-selected",
                  class: "bg-violet-selected",
                },
                {
                  name: "Violet Primary",
                  token: "--violet-primary",
                  class: "bg-violet-primary",
                },
                {
                  name: "Violet Hover",
                  token: "--violet-hover",
                  class: "bg-violet-hover",
                },
                {
                  name: "Violet Selected State",
                  token: "--violet-selected-state",
                  class: "bg-violet-selected-state",
                },
              ]}
            />

            <ColorSection
              title="Success Colors"
              description="Positive states and confirmations"
              colors={[
                {
                  name: "Success Primary",
                  token: "--success-primary",
                  class: "bg-success-primary text-white",
                },
                {
                  name: "Success Darker",
                  token: "--success-darker",
                  class: "bg-success-darker text-white",
                },
                {
                  name: "Success Lighter",
                  token: "--success-lighter",
                  class: "bg-success-lighter",
                },
                {
                  name: "Success Background",
                  token: "--success-bg",
                  class: "bg-success-bg",
                },
              ]}
            />

            <ColorSection
              title="Error Colors"
              description="Error states and destructive actions"
              colors={[
                {
                  name: "Error Primary",
                  token: "--error-primary",
                  class: "bg-error-primary text-white",
                },
                {
                  name: "Error Darker",
                  token: "--error-darker",
                  class: "bg-error-darker text-white",
                },
                {
                  name: "Error Lighter",
                  token: "--error-lighter",
                  class: "bg-error-lighter",
                },
                {
                  name: "Error Background",
                  token: "--error-bg",
                  class: "bg-error-bg",
                },
              ]}
            />

            <ColorSection
              title="Warning Colors"
              description="Warning states and cautionary messages"
              colors={[
                {
                  name: "Warning Primary",
                  token: "--warning-primary",
                  class: "bg-warning-primary text-white",
                },
                {
                  name: "Warning Darker",
                  token: "--warning-darker",
                  class: "bg-warning-darker text-white",
                },
                {
                  name: "Warning Lighter",
                  token: "--warning-lighter",
                  class: "bg-warning-lighter",
                },
                {
                  name: "Warning Background",
                  token: "--warning-bg",
                  class: "bg-warning-bg",
                },
              ]}
            />

            <ColorSection
              title="Navigation Colors"
              description="Left navigation bar colors"
              colors={[
                {
                  name: "Nav Main",
                  token: "--nav-main",
                  class: "bg-nav-main text-white",
                },
                {
                  name: "Nav Selected",
                  token: "--nav-selected",
                  class: "bg-nav-selected text-white",
                },
                {
                  name: "Nav Hover",
                  token: "--nav-hover",
                  class: "bg-nav-hover text-white",
                },
                {
                  name: "Nav Separator",
                  token: "--nav-separator",
                  class: "bg-nav-separator",
                },
              ]}
            />

            <ColorSection
              title="Chart Colors"
              description="Data visualization color palette"
              colors={[
                {
                  name: "Royal Blue",
                  token: "--chart-royal-blue",
                  class: "bg-[var(--chart-royal-blue)]",
                },
                {
                  name: "Mint Green",
                  token: "--chart-mint-green",
                  class: "bg-[var(--chart-mint-green)]",
                },
                {
                  name: "Yellow",
                  token: "--chart-yellow",
                  class: "bg-[var(--chart-yellow)]",
                },
                {
                  name: "Crimson Red",
                  token: "--chart-crimson-red",
                  class: "bg-[var(--chart-crimson-red)]",
                },
                {
                  name: "Deep Purple",
                  token: "--chart-deep-purple",
                  class: "bg-[var(--chart-deep-purple)]",
                },
                {
                  name: "Teal",
                  token: "--chart-teal",
                  class: "bg-[var(--chart-teal)]",
                },
                {
                  name: "Burnt Orange",
                  token: "--chart-burnt-orange",
                  class: "bg-[var(--chart-burnt-orange)]",
                },
                {
                  name: "Indigo",
                  token: "--chart-indigo",
                  class: "bg-[var(--chart-indigo)]",
                },
              ]}
            />
          </TabsContent>

          {/* Usage Guide Tab */}
          <TabsContent value="usage" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Semantic Token Usage</CardTitle>
                <CardDescription>
                  Best practices for using design tokens in components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <UsageExample
                  title="Backgrounds"
                  description="Use semantic background tokens instead of hardcoded colors"
                  badCode='<div className="bg-white">'
                  goodCode='<div className="bg-screen-bg">'
                />

                <UsageExample
                  title="Text Colors"
                  description="Use text-primary and text-secondary for consistent typography"
                  badCode='<p className="text-[#404040]">'
                  goodCode='<p className="text-text-primary">'
                />

                <UsageExample
                  title="Borders"
                  description="Use stroke tokens for consistent borders"
                  badCode='<div className="border border-[#dedede]">'
                  goodCode='<div className="border border-stroke">'
                />

                <UsageExample
                  title="Primary Actions"
                  description="Use blue-primary for primary buttons and links"
                  badCode='<button className="bg-blue-500">'
                  goodCode='<button className="bg-blue-primary">'
                />

                <UsageExample
                  title="Alert States"
                  description="Use semantic alert colors for feedback"
                  badCode='<div className="bg-red-100 text-red-800">'
                  goodCode='<div className="bg-error-bg text-error-primary">'
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CSS Variable Usage</CardTitle>
                <CardDescription>
                  How to use tokens in custom styles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-surface-1 p-4 rounded-lg border border-stroke">
                    <code className="text-sm">
                      {`/* Use CSS variables directly */
.custom-component {
  background: var(--screen-bg);
  color: var(--text-primary);
  border: 1px solid var(--stroke);
}

/* Use in inline styles */
<div style={{ background: 'var(--blue-bg)' }}>
  Content
</div>`}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
                <CardDescription>
                  Consistent spacing tokens for layouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Very Small",
                      token: "--spacing-vsmall",
                      value: "4px",
                    },
                    { name: "Small", token: "--spacing-small", value: "8px" },
                    {
                      name: "Medium",
                      token: "--spacing-medium",
                      value: "12px",
                    },
                    { name: "Large", token: "--spacing-large", value: "16px" },
                    {
                      name: "XLarge",
                      token: "--spacing-xlarge",
                      value: "20px",
                    },
                    {
                      name: "XXLarge",
                      token: "--spacing-xxlarge",
                      value: "24px",
                    },
                    {
                      name: "XXXLarge",
                      token: "--spacing-xxxlarge",
                      value: "32px",
                    },
                    { name: "Huge", token: "--spacing-huge", value: "40px" },
                  ].map((spacing) => (
                    <div
                      key={spacing.token}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="bg-blue-primary h-8"
                        style={{ width: `var(${spacing.token})` }}
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {spacing.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {spacing.token} = {spacing.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Border Radius</CardTitle>
                <CardDescription>Corner radius tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Small", token: "--radius-small", value: "4px" },
                    { name: "Medium", token: "--radius-medium", value: "8px" },
                    { name: "Large", token: "--radius-large", value: "12px" },
                  ].map((radius) => (
                    <div key={radius.token} className="space-y-2">
                      <div
                        className="h-24 bg-blue-primary"
                        style={{ borderRadius: `var(${radius.token})` }}
                      />
                      <p className="text-sm font-medium text-text-primary">
                        {radius.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {radius.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
                <CardDescription>Text sizes and weights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl font-bold text-text-primary">
                  Heading 1
                </div>
                <div className="text-3xl font-bold text-text-primary">
                  Heading 2
                </div>
                <div className="text-2xl font-semibold text-text-primary">
                  Heading 3
                </div>
                <div className="text-xl font-semibold text-text-primary">
                  Heading 4
                </div>
                <div className="text-lg font-medium text-text-primary">
                  Heading 5
                </div>
                <div className="text-base text-text-primary">
                  Body text - Regular
                </div>
                <div className="text-base font-medium text-text-primary">
                  Body text - Medium
                </div>
                <div className="text-sm text-text-secondary">
                  Small text - Secondary
                </div>
                <div className="text-xs text-text-secondary">
                  Extra small text
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Component Examples</CardTitle>
                <CardDescription>
                  Real-world usage of design tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Button Examples */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Buttons
                  </h3>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-primary text-white rounded-lg hover:bg-blue-darker-1 transition-colors">
                      Primary Button
                    </button>
                    <button className="px-4 py-2 bg-surface-1 text-text-primary border border-stroke rounded-lg hover:bg-surface-2 transition-colors">
                      Secondary Button
                    </button>
                    <button className="px-4 py-2 bg-error-primary text-white rounded-lg hover:bg-error-darker transition-colors">
                      Destructive Button
                    </button>
                  </div>
                </div>

                {/* Alert Examples */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Alerts
                  </h3>
                  <div className="bg-success-bg border border-success-primary rounded-lg p-4">
                    <p className="text-success-primary font-medium">
                      Success alert message
                    </p>
                  </div>
                  <div className="bg-error-bg border border-error-primary rounded-lg p-4">
                    <p className="text-error-primary font-medium">
                      Error alert message
                    </p>
                  </div>
                  <div className="bg-warning-bg border border-warning-primary rounded-lg p-4">
                    <p className="text-warning-primary font-medium">
                      Warning alert message
                    </p>
                  </div>
                </div>

                {/* Card Examples */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Cards
                  </h3>
                  <div className="bg-surface-1 border border-stroke rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-text-primary mb-2">
                      Card Title
                    </h4>
                    <p className="text-text-secondary mb-4">
                      Card content using semantic tokens for consistent theming.
                    </p>
                    <Badge className="bg-violet-primary text-white">
                      Featured
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ColorSection({ title, description, colors }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colors.map((color) => (
            <div key={color.token} className="space-y-2">
              <div
                className={`h-20 rounded-lg border border-stroke ${color.class}`}
              />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {color.name}
                </p>
                <p className="text-xs text-text-secondary font-mono">
                  {color.token}
                </p>
                <p className="text-xs text-text-secondary font-mono">
                  {color.class}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UsageExample({ title, description, badCode, goodCode }) {
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-text-primary">{title}</h4>
      <p className="text-sm text-text-secondary">{description}</p>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="space-y-1">
          <p className="text-xs font-medium text-error-primary">❌ Don't</p>
          <div className="bg-surface-1 p-3 rounded border border-stroke">
            <code className="text-xs">{badCode}</code>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-success-primary">✓ Do</p>
          <div className="bg-surface-1 p-3 rounded border border-stroke">
            <code className="text-xs">{goodCode}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
