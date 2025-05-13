
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const WelcomePage = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  
  useEffect(() => {
    // Set theme to dark by default for welcome page
    setTheme('dark');
    
    if (isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate, setTheme]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-subline-darkBg noise-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-subline-indigo/5 to-subline-coral/5 z-0 pointer-events-none"></div>
      
      <header className="p-4 flex justify-between items-center relative z-10">
        <img
          src="/subline.png"
          alt="Subline Logo"
          className="h-8 w-auto"
        />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
        <div className="max-w-md space-y-10 animate-in fade-in">
          <div className="space-y-4">
            <div className="inline-block mb-4 p-3 rounded-full bg-gradient-to-br from-subline-indigo/10 to-subline-coral/10 backdrop-blur-lg">
              <div className="h-20 w-20 bg-gradient-indigo-coral rounded-full flex items-center justify-center shadow-subline">
                <span className="text-3xl font-bold text-white">S</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gradient">Discover the Stories Behind the Headlines</h2>
            <p className="mt-4 text-lg text-gray-300">
              Access premium insights with context that matters, delivered in a sleek, modern experience.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center p-4">
              <ConnectButton />
            </div>
            <p className="text-sm text-gray-400">
              Connect your wallet on Base to continue
            </p>
          </div>
          
          <div className="pt-10 space-y-8">
            <h3 className="text-xl font-medium text-gradient">Premium Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <li className="flex items-start p-4 rounded-xl bg-gradient-card backdrop-blur-md border border-gray-800/30">
                <div className="mr-3 bg-gradient-indigo-coral p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div>
                  <span className="font-medium text-white">Premium Headlines</span>
                  <p className="text-sm text-gray-400">Focused on critical events that matter</p>
                </div>
              </li>
              <li className="flex items-start p-4 rounded-xl bg-gradient-card backdrop-blur-md border border-gray-800/30">
                <div className="mr-3 bg-gradient-indigo-coral p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <div>
                  <span className="font-medium text-white">Intelligent Search</span>
                  <p className="text-sm text-gray-400">Find exactly what you need, when you need it</p>
                </div>
              </li>
              <li className="flex items-start p-4 rounded-xl bg-gradient-card backdrop-blur-md border border-gray-800/30">
                <div className="mr-3 bg-gradient-indigo-coral p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                </div>
                <div>
                  <span className="font-medium text-white">Deep Context</span>
                  <p className="text-sm text-gray-400">AI-powered analysis beyond the headlines</p>
                </div>
              </li>
              <li className="flex items-start p-4 rounded-xl bg-gradient-card backdrop-blur-md border border-gray-800/30">
                <div className="mr-3 bg-gradient-indigo-coral p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                </div>
                <div>
                  <span className="font-medium text-white">Instant Insights</span>
                  <p className="text-sm text-gray-400">Get the full picture in seconds</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="p-4 text-center text-sm text-gray-500 relative z-10">
        <p>Base Batch India Hackathon Project</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
