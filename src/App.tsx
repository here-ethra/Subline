
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { ThemeProvider } from 'next-themes';
import { wagmiConfig } from './lib/rainbowKit';

import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import SearchPage from "./pages/SearchPage";
import WelcomePage from "./pages/WelcomePage";
import NotFound from "./pages/NotFound";
import TipPage from "./pages/TipPage";
import WalletRequired from "./components/WalletRequired";

const queryClient = new QueryClient();

const App = () => {
  console.log("App rendering with routes");
  
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/welcome" element={<WelcomePage />} />
                  <Route path="/search" element={
                    <WalletRequired>
                      <SearchPage />
                    </WalletRequired>
                  } />
                  <Route path="/tip" element={
                    <WalletRequired>
                      <TipPage />
                    </WalletRequired>
                  } />
                  <Route path="/" element={
                    <WalletRequired>
                      <HomePage />
                    </WalletRequired>
                  } />
                  <Route path="/article/:id" element={
                    <WalletRequired>
                      <ArticlePage />
                    </WalletRequired>
                  } />
                  <Route path="*" element={
                    <WalletRequired>
                      <NotFound />
                    </WalletRequired>
                  } />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

export default App;
