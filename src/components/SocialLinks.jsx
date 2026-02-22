// src/components/SocialLinks.jsx
import React from "react";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";

const SocialLinks = ({ 
  variant = "light", 
  size = "md",
  showLabel = false,
  className = "",
  iconClassName = "",
  links = {
    github: "https://github.com/iamsouane",
    linkedin: "https://www.linkedin.com/in/serigne-ismaila-souane-b78b04392/",
    twitter: "https://x.com/iamsouane",
    portfolio: "#"
  }
}) => {
  
  const socialItems = [
    {
      name: "GitHub",
      icon: Github,
      href: links.github,
      color: "text-dark",
      bgColor: "bg-dark",
      label: "GitHub"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: links.linkedin,
      color: "text-primary",
      bgColor: "bg-primary",
      label: "LinkedIn"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: links.twitter,
      color: "text-info",
      bgColor: "bg-info",
      label: "Twitter"
    },
    {
      name: "Portfolio",
      icon: Globe,
      href: links.portfolio,
      color: "text-success",
      bgColor: "bg-success",
      label: "Portfolio"
    }
  ];

  const getSizeDimensions = () => {
    switch(size) {
      case "sm": return { container: "35px", icon: 16 };
      case "lg": return { container: "55px", icon: 24 };
      default: return { container: "45px", icon: 20 };
    }
  };

  const dimensions = getSizeDimensions();

  if (variant === "light") {
    return (
      <div className={`social-links d-flex gap-3 ${className}`}>
        {socialItems.map(({ name, icon: Icon, href, color, bgColor, label }) => (
          <a
            key={name}
            href={href}
            className={`social-link bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center ${iconClassName}`}
            style={{ 
              width: dimensions.container, 
              height: dimensions.container,
              transition: "all 0.3s ease"
            }}
            target="_blank"
            rel="noreferrer"
            title={label}
          >
            <Icon size={dimensions.icon} />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "colored") {
    return (
      <div className={`social-links d-flex gap-3 ${className}`}>
        {socialItems.map(({ name, icon: Icon, href, bgColor, label }) => (
          <a
            key={name}
            href={href}
            className={`social-link ${bgColor} text-white rounded-circle d-inline-flex align-items-center justify-content-center ${iconClassName}`}
            style={{ 
              width: dimensions.container, 
              height: dimensions.container,
              transition: "all 0.3s ease"
            }}
            target="_blank"
            rel="noreferrer"
            title={label}
          >
            <Icon size={dimensions.icon} />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "outline") {
    return (
      <div className={`social-links d-flex gap-3 ${className}`}>
        {socialItems.map(({ name, icon: Icon, href, color, label }) => (
          <a
            key={name}
            href={href}
            className={`social-link btn btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center p-0 ${iconClassName}`}
            style={{ 
              width: dimensions.container, 
              height: dimensions.container,
              borderWidth: "2px"
            }}
            target="_blank"
            rel="noreferrer"
            title={label}
          >
            <Icon size={dimensions.icon} />
          </a>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`social-links d-flex flex-wrap gap-4 ${className}`}>
        {socialItems.map(({ name, icon: Icon, href, label }) => (
          <a
            key={name}
            href={href}
            className="text-white-50 text-decoration-none d-inline-flex align-items-center gap-2 hover-link"
            target="_blank"
            rel="noreferrer"
            style={{ transition: "all 0.3s ease" }}
          >
            <Icon size={18} className="text-primary" />
            {showLabel && <span>{label}</span>}
          </a>
        ))}
      </div>
    );
  }

  // Version par défaut avec labels
  return (
    <div className={`social-links ${className}`}>
      {showLabel && <h6 className="text-white mb-3">Suivez-nous</h6>}
      <div className="d-flex gap-3">
        {socialItems.map(({ name, icon: Icon, href, color, label }) => (
          <a
            key={name}
            href={href}
            className="social-link bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{ 
              width: dimensions.container, 
              height: dimensions.container,
              transition: "all 0.3s ease"
            }}
            target="_blank"
            rel="noreferrer"
            title={label}
          >
            <Icon size={dimensions.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;