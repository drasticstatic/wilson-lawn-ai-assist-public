import Navigation from "./Navigation";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import WelcomeModal from "./WelcomeModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatWidget />
      <WelcomeModal />
    </div>
  );
};

export default Layout;