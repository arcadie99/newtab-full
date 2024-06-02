import { exec } from 'child_process';

const stopService = (serviceName) => {
  return new Promise((resolve, reject) => {
    const command = `systemctl stop ${serviceName}.service`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error stopping ${serviceName}: ${error.message}`);
        return;
      }
      resolve(`${serviceName} stopped successfully.`);
    });
  });
};

export default async (req, res) => {
  const { serviceName } = req.body;
  if (!serviceName) {
    res.status(400).json({ error: 'Service name is required' });
    return;
  }

  try {
    const message = await stopService(serviceName);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
