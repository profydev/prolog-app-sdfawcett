import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  useEffect(() => {
    function detectWindowSize() {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    }
    window.addEventListener("resize", detectWindowSize);
    return () => {
      window.removeEventListener("resize", detectWindowSize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
