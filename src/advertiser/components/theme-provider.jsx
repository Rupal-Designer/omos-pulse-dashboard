// next-themes was used in the v0 source for dark/light switching.
// We don't ship dark mode in the advertiser app yet — passthrough.
export function ThemeProvider({ children }) {
  return <>{children}</>;
}
