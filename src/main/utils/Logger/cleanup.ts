export const stopHandler: Array<() => void> = [];

const cleanUpServer = (eventType: string) => {
  if (eventType !== 'exit') {
    process.exit();
  } else {
    stopHandler.forEach((handle) => handle());
  }
};

['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'].forEach((eventType) => {
  process.on(eventType, cleanUpServer.bind(null, eventType));
});
