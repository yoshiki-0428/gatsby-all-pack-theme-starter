import React from 'react';
import { Link } from 'gatsby';
import "twin.macro"

const Menu = ({ items }) => {
  return (
      <div tw="m-2">
        {items.map((item) => (
            <div key={item.path} tw="p-1 text-right text-base text-accent">
              {item.path.match('http') ? (
                      <a href={item.path}>
                        {item.label} >
                      </a>
                  ) :
                  <Link to={item.path}>
                    {item.label} >
                  </Link>
              }
            </div>
        ))}
      </div>
  );
};

export default Menu;
