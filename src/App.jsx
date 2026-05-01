import React, { useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';

function App() {
  const [activePage, setActivePage] = useState('about');

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <About />;
      case 'resume':
        return <Resume />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcwE9QsAAAAAC3wllW-kDZpAQUqiV_0NHUU1NP6">
      <main>
        <Sidebar />
        <div className="main-content">
          <Navbar activePage={activePage} setActivePage={setActivePage} />
          {renderPage()}
        </div>
      </main>
    </GoogleReCaptchaProvider>
  );
}

export default App;
