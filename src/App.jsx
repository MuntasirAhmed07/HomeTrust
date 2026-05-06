// // import { AnimatePresence, motion } from 'framer-motion'

// import './App.css';
// import locations from './Data/locations';
// import Map from './components/Map';

// import { useEffect, useState } from 'react';

// import { realEstate } from './Data/data';
// import building from './assets/building.avif';
// import Carousel from './components/Carousel/Carousel';
// import Sidebar from './components/Sidebar';
// import TextEffect from './components/TextEffect';
// import styles from './style.module.scss';

// function App() {
//   useEffect(() => {
//     (async () => {
//       const LocomotiveScroll = (await import('locomotive-scroll')).default;
//       const locomotiveScroll = new LocomotiveScroll();
//     })();
//   }, []);

//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [showPanel, setShowPanel] = useState(false);
//   const [isActive, setIsActive] = useState(showPanel);

//   return (
//     <>
//       <div
//         className={`background ${showPanel ? 'open' : ''}`}
//         onClick={() => setShowPanel(false)}></div>
//       <Sidebar
//         selectedLocation={selectedLocation}
//         showPanel={showPanel}
//         setShowPanel={setShowPanel}
//       />
//       <div className="hero-section">
//         <div className="page-banner-cover">
//           <TextEffect />
//           <img src={building} alt="building" />
//         </div>
//       </div>
//       <Carousel images={realEstate} />
//       <Map
//         locations={locations}
//         selectedLocation={selectedLocation}
//         setSelectedLocation={setSelectedLocation}
//         showPanel={showPanel}
//         setShowPanel={setShowPanel}
//       />
//     </>
//   );
// }

// export default App;

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Layout/AppLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';
import LifeAtHomeTrust from './pages/LifeAtHomeTrust';
import Landowners from './pages/Landowners';
import OurBusiness from './pages/OurBusiness';
import OurPartners from './pages/OurPartners';
import OurStory from './pages/OurStory';
import OurTeam from './pages/OurTeam';
import WhyHomeTrust from './pages/WhyHomeTrust';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'ourstory', element: <OurStory /> },
        { path: 'ourteam', element: <OurTeam /> },
        { path: 'ourpartners', element: <OurPartners /> },
        { path: 'ourbusiness', element: <OurBusiness /> },
        { path: 'whyhometrust', element: <WhyHomeTrust /> },
        { path: 'lifeathometrust', element: <LifeAtHomeTrust /> },
        { path: 'landowners', element: <Landowners /> },
        { path: 'contactus', element: <ContactUs /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
