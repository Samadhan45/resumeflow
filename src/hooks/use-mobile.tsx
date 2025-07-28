import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkIsMobile = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  if (!mounted) {
    return false;
  }

  return isMobile
}

    