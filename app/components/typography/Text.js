const Text = ({ children, display = 'block', variant = 'normal' }) => {
   if (display === 'inline') {
      return <span className={`span span-${variant}`}>{children}</span>;
   }
   return <p className={`p p-${variant}`}>{children}</p>;
};

export default Text;
