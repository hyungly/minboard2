import ThemeToggle from './ThemeToggle';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-50">
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
