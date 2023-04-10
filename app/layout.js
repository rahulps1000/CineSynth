import "./globals.css";

export const metadata = {
  title: "Cine Synth",
  description: "GPT Powered Recomendation System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
