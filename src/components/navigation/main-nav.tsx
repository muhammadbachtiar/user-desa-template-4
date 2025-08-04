"use client"

import { useState, useEffect } from "react"
import type { MenuWithContent } from "@/types/menu"
import { MenuItem } from "./menu-item"
import { MobileSidebar } from "./mobile-sidebar"
import { BiDotsHorizontalRounded } from "react-icons/bi"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface MainNavProps {
  menuData: MenuWithContent
}

export function MainNav({ menuData }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);

  const sortedMenuItems = [...menuData].sort((a, b) => a.order - b.order)


    useEffect(() => {
    const updateMenuLength = () => {
      if (window.innerWidth >= 1380) {
        setVisibleItems(5);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(3); 
      } else {
        setVisibleItems(3); 
      }
    };

    window.addEventListener("resize", updateMenuLength);
    updateMenuLength();

    return () => {
      window.removeEventListener("resize", updateMenuLength);
    };
  }, []);

  return (
    <nav className={classNames("relative z-10 transition-all duration-300")}>

      <MobileSidebar menuData={sortedMenuItems} setIsOpen={setIsOpen} isOpen={isOpen} />

      <div className="hidden lg:block">
        <ul className="flex items-center space-x-1">
            {sortedMenuItems.slice(0,visibleItems).map((item) => (
              <li key={`${item.title}-${item.order}`}>
                <MenuItem item={item} />
              </li>
            ))}
            {sortedMenuItems.length > visibleItems && (
              <li className="relative">
                <button
                  onClick={() => setIsOpen(true)}
                  className="px-3 py-2 bg-none text-white hover:text-gray-200 rounded-md transition-colors flex items-center space-x-1 text-sm font-medium"
                  aria-label="More menu items"
                >
                  <BiDotsHorizontalRounded size={18}/>
                </button>
              </li>
            )}
        </ul>
      </div>
    </nav>
  )
}
