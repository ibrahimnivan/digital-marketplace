"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null

  // for accesibility 'click Esc' to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { //properti dari object event
        setActiveIndex(null)
      }
    }

    document.addEventListener('keydown', handler)

    // preventing memory leak when we unmount components by cleaning up after useEffect
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])


  //to close when we click the outside of NavItem
  const navRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return <div className="flex gap-4 h-full" ref={navRef}>
    {PRODUCT_CATEGORIES.map((category, i) => {

      const handleOpen = () => {
        if(activeIndex === i) {
          setActiveIndex(null)
        } else {
          setActiveIndex(i)
        }
      }

      const isOpen = i === activeIndex

      return (
        <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen} />
      )
    })}
  </div>;
};

export default NavItems;
