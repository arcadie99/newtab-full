import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface SettingItem {
  id?: number;
  name: string;
  value: string;
}

interface Settings {
  links: SettingItem[];
  services: SettingItem[];
}

const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({ links: [], services: [] } || false);
  const [isOpen, setIsOpen] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkValue, setNewLinkValue] = useState('');
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceValue, setNewServiceValue] = useState('');

  // Fetch settings from the API when the component mounts
  useEffect(() => {
    fetch('http://161.97.163.75:4000/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({ links: data.links, services: data.services });
      })
      .catch(err => console.error('Failed to load settings:', err));
  }, []);

  // Function to add or update links and services
  const handleSave = (type: 'links' | 'services', item: SettingItem) => {
    fetch(`http://161.97.163.75:4000/settings/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(data => {
      setSettings(prev => ({
        ...prev,
        [type]: prev[type].some(x => x.id === data.id) ?
               prev[type].map(x => x.id === data.id ? data : x) :
               [...prev[type], data]
      }));
      setNewLinkName('');
      setNewLinkValue('');
      setNewServiceName('');
      setNewServiceValue('');
    })
    .catch(err => console.error('Failed to save:', err));
  };

  // Handle adding new links or services
  const handleAddLink = () => handleSave('links', { name: newLinkName, value: newLinkValue });
  const handleAddService = () => handleSave('services', { name: newServiceName, value: newServiceValue });

  const handleRemoveLink = (id: number) => handleSave('links', { id, name: '', value: '' });
  const handleRemoveService = (id: number) => handleSave('services', { id, name: '', value: '' });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setNewLinkName('');
    setNewLinkValue('');
    setNewServiceName('');
    setNewServiceValue('');
  };

  return (
    <div>
      <button
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        onClick={openModal}
      >
        Settings
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Manage Settings
                  </Dialog.Title>

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700">Links:</h4>
                    {settings.links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between mt-1">
                        <span className="text-gray-800">{link.name} - {link.value}</span>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleRemoveLink(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="flex mt-3">
                      <input
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Link name"
                        value={newLinkName}
                        onChange={(e) => setNewLinkName(e.target.value)}
                      />
                      <input
                        type="text"
                        className=" ml-2 mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Link"
                        value={newLinkValue}
                        onChange={(e) => setNewLinkValue(e.target.value)}
                      />
                      <button
                        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={handleAddLink}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700">Services:</h4>
                    {settings.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between mt-1">
                        <span className="text-gray-800">{service.name} - {service.value}</span>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleRemoveService(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="flex mt-3">
                      <input
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Service name"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="ml-2 mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Service"
                        value={newServiceValue}
                        onChange={(e) => setNewServiceValue(e.target.value)}
                      />
                      <button
                        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={handleAddService}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
 );
};

export default SettingsManager;
