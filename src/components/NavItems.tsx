"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null); 

  const isAnyOpen = activeIndex !== null // to know is there opened NavItem or not

  // for interactivity 'click Esc' to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { //properti dari object event
        setActiveIndex(null) // change to null
      }
    }

    document.addEventListener('keydown', handler)  // is there 'keydown' event handler is called 

    // preventing memory leak when we unmount components by cleaning up after useEffect
    return () => {
      document.removeEventListener('keydown', handler) 
    }
  }, [])


  //to close when we click the outside of NavItem
  const navRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(navRef, () => setActiveIndex(null)) // null if we click outside navitems



  return <div className="flex gap-4 h-full" ref={navRef}>

    {PRODUCT_CATEGORIES.map((category, i) => {
      const handleOpen = () => { // to change the value of activeIndex
        if(activeIndex === i) { 
          setActiveIndex(null)
        } else {
          setActiveIndex(i)
        }
      }

      const isOpen = i === activeIndex // boolean

      return (
        <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen} />
      )
    })}
  </div>;
};

export default NavItems;
