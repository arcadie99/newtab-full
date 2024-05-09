import { Inter } from "next/font/google";
import SearchComponent from "@/Components/SearchComponent";
import SettingsManager from "@/Components/SettingsManager";
import ServiceStatus from "@/Components/ServiceStatus";
import ShortcutLinks from "@/Components/ShortcutLinks";
import SettingManager from "@/Components/SettingManager";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const links = [
    { label: "Google", url: "https://google.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "Stack Overflow", url: "https://stackoverflow.com" },
    { label: "Google", url: "https://google.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "Stack Overflow", url: "https://stackoverflow.com" },
  ];

  const services = [
    { label: "Nginx", service: 'nginx' },
    { label: "MySQL", service: 'mysql' },
    { label: "Redis", service: 'redis' },
    { label: "Broker Rabbit", service: 'broker' },
  ]


  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`} >

        <SettingManager />

        <SearchComponent />

        <ShortcutLinks links={links} />        

        <div className="w-full flex flex-wrap justify-center gap-4">
            <ServiceStatus serviceName="Nginx" />
            <ServiceStatus serviceName="MySQL" />
            <ServiceStatus serviceName="Redis" />
            <ServiceStatus serviceName="Broker Rabbit" />
            <ServiceStatus serviceName="Nginx" />
            <ServiceStatus serviceName="MySQL" />
        </div>
    </main>
  );
}
