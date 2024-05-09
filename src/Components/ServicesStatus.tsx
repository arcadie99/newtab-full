import { useState } from 'react';
import { motion } from 'framer-motion';

const ServiceStatusComponent = ({ serviceName }: {serviceName: string}) => {
    const [isActive, setIsActive] = useState(true);  // Simulated state of the service

    // Function to toggle service state
    const toggleServiceStatus = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="text-center p-4 shadow-lg rounded-lg border border-gray-300 bg-white">
                <motion.div
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-10 h-10 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} border-4 border-white`}
                    style={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}
                />
                <p className="text-xl font-semibold mt-3">{serviceName}</p>
                <p className={`text-md mt-1 font-medium ${isActive ? 'text-green-700' : 'text-red-700'}`}>
                    {isActive ? 'Active' : 'Inactive'}
                </p>
                <button
                    onClick={toggleServiceStatus}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                    Toggle Status
                </button>
            </div>
        </div>
    );
};

export default ServiceStatusComponent;
