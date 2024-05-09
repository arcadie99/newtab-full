// pages/api/serviceStatus.js
import { exec } from 'child_process';

function checkSystemService(serviceName) {
    return new Promise((resolve, reject) => {
        const command = process.platform === 'darwin' ? `launchctl list | grep ${serviceName}` : `systemctl is-active ${serviceName}.service`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error checking ${serviceName}: ${error.message}`);
                return;
            }
            const isActive = process.platform === 'darwin' ? stdout.trim() !== '' : stdout.trim() === 'active';
            resolve(`${serviceName} service status: ${isActive ? 'running' : 'not running'}`);
        });
    });
}

export default async (req, res) => {
    const { serviceName } = req.query;
    if (!serviceName) {
        res.status(400).json({ error: "Service name is required" });
        return;
    }

    try {
        const status = await checkSystemService(serviceName);
        res.status(200).json({ status });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
