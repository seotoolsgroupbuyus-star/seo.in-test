import labels from '../../content/ui-labels.json';
import {Outlet} from 'react-router-dom';
import {Navbar} from '../components/Navbar';
import {Footer} from '../components/Footer';
import {ChatWidget} from '../components/ChatWidget';
import {ScrollToTop} from '../components/ScrollToTop';

export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-blue-500/30">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <ChatWidget whatsappLink={labels.chat.whatsappUrl} facebookLink={labels.chat.facebookUrl} />
    </div>
  );
}
