import React from 'react';
import { getContactHref, getIcon } from '../../utils';
import Icon from '../Icon';
import "twin.macro"

const Contacts = ({ contacts }) => (
    <div tw="flex justify-center">
      <ul tw="list-none flex flex-wrap p-0 mx-2 my-0">
        {Object.keys(contacts)
            .filter((c) => c !== '')
            .map((name) => (!contacts[name] ? null : (
                <li tw="m-1 rounded-full h-8 w-8 flex items-center justify-center border-solid border border-gray-800 text-base-font hover:text-primary" key={name}>
                  <a
                      tw="no-underline"
                      href={getContactHref(name, contacts[name])}
                      rel="noopener noreferrer"
                      target="_blank"
                  >
                    <Icon name={name} icon={getIcon(name)} />
                  </a>
                </li>
            )))}
      </ul>
    </div>
);

export default Contacts;
