
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const WelcomePage = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-context-blue">Context</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-8">
          <div>
            <h2 className="text-4xl font-bold">Understand the full story</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Access personalized, relevant news with complete context and deep analysis.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center p-4">
              <ConnectButton />
            </div>
            <p className="text-sm text-gray-500">
              Connect your wallet on Base to continue
            </p>
          </div>
          
          <div className="pt-10 space-y-4">
            <h3 className="text-lg font-medium">Features</h3>
            <ul className="text-left space-y-3">
              <li className="flex items-start">
                <div className="mr-3 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-context-blue"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div>
                  <span className="font-medium">Top headlines</span>
                  <p className="text-sm text-gray-500">Personalized to your location</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-context-blue"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <div>
                  <span className="font-medium">Search anything</span>
                  <p className="text-sm text-gray-500">Find news on any topic</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-context-blue"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                </div>
                <div>
                  <span className="font-medium">Full context</span>
                  <p className="text-sm text-gray-500">AI-powered analysis beyond the headlines</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="p-4 text-center text-sm text-gray-500">
        <p>Base Batch India Hackathon Project</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
