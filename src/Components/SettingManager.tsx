// components/SettingsModal.tsx
import React, { useState } from 'react';

interface Link {
  label: string;
  url: string;
}

interface Service {
  label: string;
  service: string;
}

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-800 hover:text-red-500">
          <span className="text-2xl">&times;</span>
        </button>
        {children}
      </div>
    </div>
  );
};

const SettingsModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [newLink, setNewLink] = useState<Link>({ label: '', url: '' });
  const [newService, setNewService] = useState<Service>({ label: '', service: '' });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink({ ...newLink, [event.target.name]: event.target.value });
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({ ...newService, [event.target.name]: event.target.value });
  };

  const handleSubmitLink = (event: React.FormEvent) => {
    event.preventDefault();
    if (newLink.label && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ label: '', url: '' });
    }
  };

  const handleSubmitService = (event: React.FormEvent) => {
    event.preventDefault();
    if (newService.label && newService.service) {
      setServices([...services, newService]);
      setNewService({ label: '', service: '' });
    }
  };

  return (
    <>
      <button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Open Settings
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="space-y-8">
          <h2 className="text-lg font-semibold text-gray-800">Manage Links</h2>
          <form onSubmit={handleSubmitLink} className="flex flex-col space-y-4">
            <input
              type="text"
              name="label"
              value={newLink.label}
              onChange={handleLinkChange}
              placeholder="Label"
              className="p-2 border rounded border-gray-300"
            />
            <input
              type="text"
              name="url"
              value={newLink.url}
              onChange={handleLinkChange}
              placeholder="URL"
              className="p-2 border rounded border-gray-300"
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add Link
            </button>
          </form>

          <h2 className="text-lg font-semibold text-gray-800">Manage Services</h2>
          <form onSubmit={handleSubmitService} className="flex flex-col space-y-4">
            <input
              type="text"
              name="label"
              value={newService.label}
              onChange={handleServiceChange}
              placeholder="Service Label"
              className="p-2 border rounded border-gray-300"
            />
            <input
              type="text"
              name="service"
              value={newService.service}
              onChange={handleServiceChange}
              placeholder="Service Name"
              className="p-2 border rounded border-gray-300"
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add Service
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SettingsModal;