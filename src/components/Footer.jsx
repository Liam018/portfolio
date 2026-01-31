const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="font-display font-bold accent-gradient">Liam Kurt Kasten Edaño</span>
        </div>
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Liam Kurt Edaño. All rights reserved.
        </p>
        <p className="text-xs text-text-muted/50 mt-2">
          Built with React, Tailwind 4, and Framer Motion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
