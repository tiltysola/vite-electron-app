import Example from '@/components/Example';

const Index = () => {
  return (
    <Example
      data={{
        title: 'Sorry, something went wrong.',
        desc: [
          {
            text: 'The resource you request was not found on this app.',
            type: 'primary',
          },
          {
            text: 'Error Code: 404',
          },
          {
            text: `Location: ${location.href}`,
          },
          {
            text: `Time: ${new Date().toString()}`,
          },
          {
            text: <a href="/">Get Back!</a>,
          },
        ],
        footer: 'Vite Electron App',
      }}
    />
  );
};

export default Index;
