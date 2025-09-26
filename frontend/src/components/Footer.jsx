import React from 'react';
import { Button } from '@/components/ui';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub Repository',
      href: 'https://github.com/sajjad6ansari/College-Appointment-System-API',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      tooltip: 'View source code'
    },
    {
      name: 'Developer GitHub',
      href: 'https://github.com/sajjad6ansari',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      tooltip: 'Developer Profile'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/sajjad6ansari',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      tooltip: 'Connect on LinkedIn'
    },
    {
      name: 'Email',
      href: 'mailto:sajjad6ansari@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      tooltip: 'Send an email'
    }
  ];

  const resourceLinks = [
    {
      name: 'API Documentation',
      href:'https://college-appointment-backend.onrender.com/api-docs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      tooltip: 'View API Documentation'
    },
    {
      name: 'API Specification',
      href:'https://college-appointment-backend.onrender.com/api/v1/docs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      tooltip: 'Beautiful API specification with download option'
    },
    {
      name: 'API Overview',
      href:'https://college-appointment-backend.onrender.com/api/v1/docs/info',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tooltip: 'Comprehensive API overview and endpoint reference'
    },
    {
      name: 'Live API Base',
      href: 'https://college-appointment-backend.onrender.com/api/v1',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      ),
      tooltip: 'Direct access to production API base URL'
    },
    {
      name: 'Health Check',
      href: ('https://college-appointment-backend.onrender.com') + '/health',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      tooltip: 'Check API server status and uptime'
    },
    {
      name: 'Postman Collection',
      href: 'https://www.postman.com/sajjad6ansari/ahlan/documentation/ypqujwu/college-appointmant-system',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.427 6.573.843 12.587-3.801 13.428-10.374C24.744 6.954 20.101.943 13.527.099zM6.826 13.845c-.817 0 1.486-2.193 1.486-2.193l4.11 4.112s-.663.255-1.373.255c-.71-.001-1.35-.124-4.223-2.174zm8.68 2.31c-.405-.405-.794-.44-1.279-.317 0 0-3.98-3.979-4.59-4.588-.61-.61-.61-1.501 0-2.111.61-.61 1.501-.61 2.111 0 .609.609 4.188 4.109 4.188 4.109.123.484.088.872-.317 1.279-.405.405-.794.44-1.279.317z"/>
        </svg>
      ),
      tooltip: 'View Postman Collection'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mt-auto shadow-2xl overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-green-900/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Project Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
              College Appointment System
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A comprehensive appointment management system for educational institutions, 
              connecting students with professors seamlessly.
            </p>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
              Connect
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:shadow-xl rounded-xl transition-all duration-300 border border-gray-600 hover:border-blue-400 backdrop-blur-sm transform hover:-translate-y-1"
                  title={link.tooltip}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="transition-all duration-300 group-hover:scale-125 group-hover:text-blue-400 group-hover:drop-shadow-lg">
                    {link.icon}
                  </span>
                  <span className="hidden sm:inline font-medium truncate">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
              Resources
            </h3>
            <div className="space-y-3">
              {resourceLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-lg rounded-xl transition-all duration-300 border border-gray-600 hover:border-purple-400 backdrop-blur-sm"
                  title={link.tooltip}
                >
                  <span className="transition-transform group-hover:scale-110 group-hover:text-purple-400">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>Crafted with</span>
              <svg className="w-5 h-5 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>and passion by</span>
              <a 
                href="https://github.com/sajjad6ansari" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline decoration-2 underline-offset-2"
              >
                Sajjad Ansari
              </a>
            </div>
            <div className="text-sm text-gray-400 mt-3 sm:mt-0 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              © {currentYear} College Appointment System. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;