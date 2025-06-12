"use client";

import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface TabListProps {
    tabList: {name: string, content: React.ReactNode}[] 
}

const TabGroupCard = ({tabList}: TabListProps) => {
    
return (
       
        <TabGroup>
           <TabList className="ps-2 flex justify-start mb-6 dark:border-gray-600">
            <div className="flex gap-8 overflow-x-auto scroll-smooth">
              {tabList.map(({ name }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    `px-1 py-3 flex flex-none text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none relative whitespace-nowrap
                ${
                  selected
                    ? 'text-[#850000] dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`
                  }
                >
                  {({ selected }) => (
                    <>
                      {name}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out
                        ${selected ? 'bg-[#850000] dark:bg-blue-400' : 'bg-transparent'}`}
                      />
                    </>
                  )}
                </Tab>
              ))}
            </div>
          </TabList>
          <TabPanels className="w-full bg-white">
              {tabList.map(({ name, content }) => (
                    <TabPanel key={name} as={Fragment}>
                    {({ selected }) => (
                      <Transition
                        show={selected}
                        as={Fragment}
                        enter="transform transition duration-500 ease-in-out"
                        enterFrom="opacity-0 translate-y-4"
                        enterTo="opacity-100 translate-y-0"
                        leave="transform transition duration-300 ease-in-out"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-4"
                      >
                        
                        <div>{content}</div>
                      </Transition>
                    )}
                  </TabPanel>
                  ))}
          </TabPanels>
      </TabGroup>
      )
}

export default TabGroupCard;