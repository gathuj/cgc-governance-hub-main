import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollIndicator = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show scroll up when not at top
      setShowScrollUp(scrollTop > 200);
      
      // Show scroll down when not at bottom
      setShowScrollDown(scrollTop + windowHeight < documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: "smooth" 
    });
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-2">
      {showScrollUp && (
        <Button
          onClick={scrollToTop}
          variant="default"
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </Button>
      )}
      {showScrollDown && (
        <Button
          onClick={scrollToBottom}
          variant="default"
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg animate-fade-in"
          aria-label="Scroll to bottom"
        >
          <ChevronDown size={24} />
        </Button>
      )}
    </div>
  );
};

export default ScrollIndicator;
