import './globals.css';
import  Navbar  from './components/Navbar';
import  Footer  from './components/Footer';



export const metadata = {
  title: "Onyii's Services | Plumbing Tools and Services",
  description: 'Top quality plumbing tools and services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-light text-dark antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
