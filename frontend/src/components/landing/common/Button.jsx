import React from 'react';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  icon, 
  children, 
  className = '', 
  href,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95";
  
  const variants = {
    primary: "bg-[#F5A623] hover:bg-[#F5C518] text-slate-900 shadow-lg shadow-amber-500/20",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component 
      href={href}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Component>
  );
};

export default Button;
