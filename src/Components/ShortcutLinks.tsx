// components/ShortcutLinks.tsx
import React from 'react';

// Define the type for individual link
interface Link {
  label: string;
  url: string;
}

// Define the type for component props
interface ShortcutLinksProps {
  links: Link[];
}

const ShortcutLinks: React.FC<ShortcutLinksProps> = ({ links }) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-4 p-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-blue-700 rounded-lg group bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default ShortcutLinks;
