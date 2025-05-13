
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FileText, Search, Layers, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#004eff]/5 via-transparent to-[#004eff]/5 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,78,255,0.03),transparent_70%)] z-0 pointer-events-none"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40 z-0 pointer-events-none"></div>
      
      <header className="p-4 flex justify-between items-center relative z-10 border-b border-gray-800/30">
        <div className="flex-1">
          <img
            src="/subline.png"
            alt="Subline Logo"
            className="h-8 w-auto mx-auto"
          />
        </div>
        <div className="rainbowkit-connect-button">
          <ConnectButton showBalance={false} />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
        <div className="max-w-3xl w-full space-y-12 animate-fade-in">
          {/* Hero section */}
          <div className="space-y-6 pt-8">
            <div className="pt-8 text-center">
              <img src="/subline.png" alt="Subline logo" className="inline-block" />
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#004eff] via-[#004eff]/90 to-[#004eff]/70 bg-clip-text text-transparent px-4">
              Discover the Stories Behind the Headlines
            </h2>
            
            <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
              Access premium insights with context that matters, delivered in a sleek, modern experience built on Base.
            </p>
          </div>
          
          {/* Connect section */}
          <div className="space-y-5">
            <div className="flex justify-center p-4">
              <Button 
                className="py-6 px-8 text-lg font-medium border border-[#004eff]/50 bg-black text-[#004eff] hover:bg-[#004eff] hover:text-black shadow-[0_0_15px_rgba(0,78,255,0.15)] transition-all duration-300 rounded-xl"
                onClick={() => document.querySelector<HTMLElement>('.rainbowkit-connect-button button')?.click()}
              >
                Connect Wallet to Continue
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              Connect your wallet on Base to access premium features
            </p>
          </div>
          
          {/* Features */}
          <div className="pt-8 space-y-8">
            <h3 className="text-2xl font-medium bg-gradient-to-r from-[#004eff] to-[#004eff]/80 bg-clip-text text-transparent">
              Premium Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start p-5 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-[#004eff]/30 hover:shadow-[0_4px_20px_rgba(0,78,255,0.1)] transition-all duration-300">
                <div className="mr-4 bg-gradient-to-br from-[#004eff] to-[#004eff]/70 p-3 rounded-lg shadow-[0_0_10px_rgba(0,78,255,0.2)]">
                  <FileText size={22} className="text-black" />
                </div>
                <div>
                  <span className="font-semibold text-white text-lg">Premium Headlines</span>
                  <p className="text-gray-400">Focused on critical events that matter to you</p>
                </div>
              </div>
              
              <div className="flex items-start p-5 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-[#004eff]/30 hover:shadow-[0_4px_20px_rgba(0,78,255,0.1)] transition-all duration-300">
                <div className="mr-4 bg-gradient-to-br from-[#004eff] to-[#004eff]/70 p-3 rounded-lg shadow-[0_0_10px_rgba(0,78,255,0.2)]">
                  <Search size={22} className="text-black" />
                </div>
                <div>
                  <span className="font-semibold text-white text-lg">Intelligent Search</span>
                  <p className="text-gray-400">Find exactly what you need, when you need it</p>
                </div>
              </div>
              
              <div className="flex items-start p-5 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-[#004eff]/30 hover:shadow-[0_4px_20px_rgba(0,78,255,0.1)] transition-all duration-300">
                <div className="mr-4 bg-gradient-to-br from-[#004eff] to-[#004eff]/70 p-3 rounded-lg shadow-[0_0_10px_rgba(0,78,255,0.2)]">
                  <Layers size={22} className="text-black" />
                </div>
                <div>
                  <span className="font-semibold text-white text-lg">Deep Context</span>
                  <p className="text-gray-400">AI-powered analysis beyond the headlines</p>
                </div>
              </div>
              
              <div className="flex items-start p-5 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-[#004eff]/30 hover:shadow-[0_4px_20px_rgba(0,78,255,0.1)] transition-all duration-300">
                <div className="mr-4 bg-gradient-to-br from-[#004eff] to-[#004eff]/70 p-3 rounded-lg shadow-[0_0_10px_rgba(0,78,255,0.2)]">
                  <Zap size={22} className="text-black" />
                </div>
                <div>
                  <span className="font-semibold text-white text-lg">Instant Insights</span>
                  <p className="text-gray-400">Get the full picture in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="p-6 text-center text-sm text-gray-500 relative z-10 border-t border-gray-800/30">
        <p>© 2024 Subline · Built on Base</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
