import "./globals.css";

export const metadata = {
  title: "Elena Gonci, Head of Product",
  description: "I lead product at Arrive, managing engineers, customers, and building agent loops and graphs to make every person in my team more efficient.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="bricolage_grotesque_320791d7-module__h-5WAW__variable clepto_838d6b45-module__my6eIq__variable"
    >
      <body className="bricolage_grotesque_320791d7-module__h-5WAW__className antialiased">{children}</body>
    </html>
  );
}
