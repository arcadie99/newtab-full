// components/SettingsModal.tsx
import React, { useEffect, useState } from 'react';


interface Link {
  id?: number
  name: string;
  link: string;
}

interface Service {
  id?: number
  name: string;
  service: string;
}

interface SettingsModalProps {
  db_links: Link[];
  db_services: Service[];
  refetchData: any;
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

const SettingsModal: React.FC<SettingsModalProps> = ({db_links, db_services, refetchData}) => {
  const [links, setLinks] = useState<Link[]>(db_links);
  const [services, setServices] = useState<Service[]>(db_services);
  const [newLink, setNewLink] = useState<Link>({ name: '', link: '' });
  const [newService, setNewService] = useState<Service>({ name: '', service: '' });

  const [isModalOpen, setIsModalOpen] = useState(false);  // This line should exist in your component

  useEffect(() => {
  //   fetch('/api/links').then(res => res.json()).then(data => setLinks(data));
  //   fetch('/api/services').then(res => res.json()).then(data => setServices(data));
    fetchLinks();
    fetchServices();
  }, []);

  const fetchData = async () => {
    refetchData();
    fetchLinks();
    fetchServices();
  }

  const fetchLinks = async () => {
    const response = await fetch('/api/links');
    if (response.ok) {
        const data = await response.json();
        setLinks(data);
    } else {
        console.error('Failed to fetch links');
    }
};

const fetchServices = async () => {
  const response = await fetch('/api/services');
  if (response.ok) {
      const data = await response.json();
      setServices(data);
  } else {
      console.error('Failed to fetch links');
  }
};

  const addLink = async () => {
    const response = await fetch('/api/links/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLink)
    });
    if (response.ok) {
      const link = await response.json();
      setLinks(prev => [...prev, link]);
      setNewLink({ name: '', link: '' });
    }
    fetchData();
  };

  const addService = async () => {
    const response = await fetch('/api/services/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newService)
    });
    if (response.ok) {
      const service = await response.json();
      setServices(prev => [...prev, service]);
      setNewService({ name: '', service: '' });
    }
    fetchData();

  };


    // Handle delete link
    const handleDeleteLink = async (id: number|undefined) => {
      if (id){
      const response = await fetch('/api/links/delete', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
      });
      if (response.ok) {
          setLinks(links.filter(link => link.id !== id));
      }
    }
    fetchData();

  };

  // Handle delete service
  const handleDeleteService = async (id: number|undefined) => {
    if (id) {
        const response = await fetch('/api/services/delete', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
      });
      if (response.ok) {
          setServices(services.filter(service => service.id !== id));
      }
    }
    fetchData();

  };

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
    if (newLink.name && newLink.link) {
      setLinks([...links, newLink]);
      setNewLink({ name: '', link: '' });
      addLink();
    }
  };

  const handleSubmitService = (event: React.FormEvent) => {
    event.preventDefault();
    if (newService.name && newService.service) {
      setServices([...services, newService]);
      setNewService({ name: '', service: '' });
      addService();
    }
  };

  return (
    <>
      <button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Open Settings ⚙️
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="space-y-8">
          <h2 className="text-lg font-semibold text-gray-800">Manage Links</h2>
            <div className="space-y-4">
            {links.map(service => (
                <div key={service.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 flex justify-between items-center">
                    <div className="text-sm text-gray-900">
                        <span className="font-bold">{service.name}</span> - {service.link}
                    </div>
                    <button
                        onClick={() => handleDeleteLink(service?.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Delete
                    </button>
                </div>
            ))}
          </div>

          <form onSubmit={handleSubmitLink} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={newLink.name}
              onChange={handleLinkChange}
              placeholder="Label"
              className="p-2 border rounded border-gray-300"
            />
            <input
              type="text"
              name="link"
              value={newLink.link}
              onChange={handleLinkChange}
              placeholder="URL"
              className="p-2 border rounded border-gray-300"
            />
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Add Link
            </button>
          </form>

          <h2 className="text-lg font-semibold text-gray-800">Manage Services</h2>

          <div className="space-y-4">
            {services.map(service => (
                <div key={service.id} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 flex justify-between items-center">
                    <div className="text-sm text-gray-900">
                        <span className="font-bold">{service.name}</span> - {service.service}
                    </div>
                    <button
                        onClick={() => handleDeleteService(service?.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Delete
                    </button>
                </div>
            ))}
          </div>

          <form onSubmit={handleSubmitService} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={newService.name}
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