import { exec } from 'child_process';

const restartService = (serviceName) => {
  return new Promise((resolve, reject) => {
    const command = `systemctl restart ${serviceName}.service`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error restarting ${serviceName}: ${error.message}`);
        return;
      }
      resolve(`${serviceName} restarted successfully.`);
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
    const message = await restartService(serviceName);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
