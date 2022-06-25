import { useEffect } from "react";
import anime from "animejs";


export function useParallax({ parallaxItems = [] }: any) {
    function getChoordPosition(position: any, maxDistance: any) {
        const viewportWidth: any = window.innerWidth || document.documentElement.clientWidth;
        //  @ts-ignore
        const mousePercentage: any = parseInt((position / (viewportWidth / 2)) * 100, 10);
        let distancePercentage = (mousePercentage / 100) * maxDistance;
        
        //  @ts-ignore
      return parseInt(distancePercentage, 10);
    }
  
    const mouseMove = (e: any) => {
      requestAnimationFrame(() => {
        parallaxItems.forEach((item: any) => {
          const position = item.reverse ? -e.pageX : e.pageX;
          const X = getChoordPosition(position, item.maxDistance);
  
          anime({
            targets: "#" + item.id,
            translateX: X,
            easing: "linear",
          });
        });
      });
    };
  
    useEffect(() => {
      document.addEventListener("mousemove", mouseMove);
  
      return () => document.removeEventListener("mousemove", mouseMove);
    }, []);
}
  
