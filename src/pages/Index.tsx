
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the welcome page
    navigate('/welcome');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center space-y-4">
        <img src="/subline.png" alt="Subline Logo" className="h-16 w-auto animate-pulse" />
        <p className="text-gray-400">Loading Subline...</p>
      </div>
    </div>
  );
};

export default Index;
