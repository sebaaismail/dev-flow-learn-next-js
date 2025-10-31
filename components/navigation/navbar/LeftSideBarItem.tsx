"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { text } from "stream/consumers";
import { bg } from "zod/locales";

const LeftSideBarItem = ({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon?: string | null;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block p-4 rounded-lg hover:bg-dark-300 transition-colors ${
        isActive
          ? "primary-gradient text-white base-bold font-inter"
          : "font-normal"
      }`}
    >
      <div className="flex-center md:justify-start md:gap-4">
        {icon && (
          <img
            src={icon}
            alt={`${text} icon`}
            className="w-6 h-6 md:w-5 md:h-5"
          />
        )}
        <span className="hidden md:flex">{text}</span>
      </div>
    </Link>
  );
};

export default LeftSideBarItem;
