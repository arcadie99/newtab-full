import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRedo, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const ServiceStatusComponent = ({ serviceName }: { serviceName: string }) => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchServiceStatus = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/serviceStatus?serviceName=${encodeURIComponent(serviceName)}`);
            const data = await response.json();
            if (response.ok) {
                setIsActive(data.status.includes('running'));
            } else {
                throw new Error(data.error || 'Failed to fetch service status');
            }
        } catch (error) {
            console.error('Error fetching service status:', error);
            setIsActive(false);
        }
        setIsLoading(false);
    }, [serviceName]);

    useEffect(() => {
        fetchServiceStatus();
    }, [fetchServiceStatus]);

    const handleServiceAction = async (action: any) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/services/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serviceName }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                fetchServiceStatus();
            } else {
                throw new Error(data.error || `Failed to ${action} service`);
            }
        } catch (error) {
            console.error(`Error ${action} service:`, error);
        }
        setIsLoading(false);
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
                    {isLoading ? 'Loading...' : (isActive ? 'Active' : 'Inactive')}
                </p>
                <button
                    onClick={() => handleServiceAction('start')}
                    className="mt-2 m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faPlay} />
                </button>
                <button
                    onClick={() => handleServiceAction('stop')}
                    className="mt-2 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faStop} />
                </button>
                <button
                    onClick={() => handleServiceAction('restart')}
                    className="mt-2 m-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faRedo} />
                </button>
                <button
                    onClick={fetchServiceStatus}
                    className="mt-4 m-2  bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                    <FontAwesomeIcon icon={faSyncAlt} />
                </button>
            </div>
        </div>
    );
};

export default ServiceStatusComponent;
