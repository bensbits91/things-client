const Heading = ({ children, level, variant = 'normal' }) => {
   const Tag = `h${level}`;
   return <Tag className={`h${level} heading-${variant}`}>{children}</Tag>;
};

export default Heading;
