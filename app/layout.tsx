import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            font-family: '${montserrat.style.fontFamily}', sans-serif;
          }
        `}</style>
      </head>
      <body>
        <main>
          {children}</main>
      </body>
    </html>
  );
}
