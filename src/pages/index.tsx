
import SearchComponent from "@/Components/SearchComponent";
import ServiceStatus from "@/Components/ServiceStatus";
import ShortcutLinks from "@/Components/ShortcutLinks";
import SettingManager from "@/Components/SettingManager";
import { prisma } from '@/lib/prisma';

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
interface Link {
  id: number;
  name: string;
  link: string;
}

interface Service {
  id: number;
  name: string;
  service: string;
}

interface SettingsModalProps {
  db_links: Link[];
  db_services: Service[];
}

export const getServerSideProps = async () => {
  const db_links = await prisma.link.findMany();
  const db_services = await prisma.service.findMany();

  return {
    props: { db_links, db_services }, // Pass this data to the page component
  };
};

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    const linksResponse = await fetch('/api/links');
    const linksData = await linksResponse.json();
    setLinks(linksData);
    
    const servicesResponse = await fetch('/api/services');
    const servicesData = await servicesResponse.json();
    setServices(servicesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`} >
       
        <SettingManager db_links={links} db_services={services} refetchData={fetchData} />

        <SearchComponent />

        <ShortcutLinks links={links} />

        <div className="w-full flex flex-wrap justify-center gap-4">
            {services.map(service => (
                <ServiceStatus key={service.name} serviceName={service.name} />
            ))}
        </div>

    </main>
  );
}
