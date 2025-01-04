import Link from "next/link";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-terminal-black/80 backdrop-blur-md border-b border-cyber-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <img
                  src="/mindforge.png"
                  alt="Mindforge Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
                Mindforge
              </span>
            </Link>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link
                href="/sessions"
                className="flex items-center space-x-2 text-gray-400 hover:text-cyber-pink transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Experiment Library</span>
              </Link>

              <Link
                href="/laboratory"
                className="flex items-center space-x-2 text-gray-400 hover:text-cyber-purple transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 3L9 21M15 3L15 21M3 9L21 9M3 15L21 15M3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Lab</span>
              </Link>

              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/0xsimd/mindforgeAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 22V18.109C10.438 18.109 9.875 18.109 9.156 18.109C7.75 18.109 7.063 17.063 6.813 16.266C6.625 15.766 6.25 15.234 5.781 15.078C5.391 14.953 5.188 14.828 5.188 14.641C5.188 14.359 5.594 14.328 5.781 14.328C6.5 14.328 7.031 15.016 7.25 15.391C7.969 16.516 8.906 16.766 9.156 16.766C9.719 16.766 10.156 16.734 10.438 16.641C10.594 15.828 10.969 15.016 11.563 14.578C8.438 14.109 6.656 12.578 6.656 10.078C6.656 9.016 7.094 7.953 7.844 7.078C7.719 6.828 7.344 5.828 7.938 4.516C7.938 4.516 9.031 4.516 10.438 5.516C11.219 5.266 12.094 5.141 12.969 5.141C13.844 5.141 14.719 5.266 15.5 5.516C16.906 4.516 18 4.516 18 4.516C18.594 5.828 18.219 6.828 18.094 7.078C18.844 7.953 19.281 9.016 19.281 10.078C19.281 12.578 17.5 14.109 14.375 14.578C15.156 15.141 15.563 16.266 15.563 17.016V22C20.344 21.128 24 16.991 24 12C24 6.477 19.523 2 14 2H12Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden lg:inline">GitHub</span>
                </a>
                <a
                  href="https://x.com/mindforge__ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden lg:inline">Twitter</span>
                </a>
                <a
                  href="https://mindforgeai.gitbook.io/mindforgeai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 7H17M7 12H17M7 17H13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="hidden lg:inline">Docs</span>
                </a>
                <a
                  href="https://pump.fun/coin/H96vSNGEEXgc2vUkz2rcHxt7FAoFMnRfsiZfHL8epump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 12h4l2-8 4 16 2-8h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17h20M2 7h20"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeOpacity="0.3"
                    />
                  </svg>
                  <span className="hidden lg:inline">Pump.fun</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden bg-terminal-black/95 border-b border-cyber-blue/20`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/sessions"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyber-pink transition-colors py-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Experiment Library</span>
            </Link>

            <Link
              href="/laboratory"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyber-purple transition-colors py-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 3L9 21M15 3L15 21M3 9L21 9M3 15L21 15M3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Lab</span>
            </Link>

            <div className="grid grid-cols-2 gap-4 py-2">
              <a
                href="https://github.com/0xsimd/mindforgeAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.657 21.128 10.438 22V18.109C10.438 18.109 9.875 18.109 9.156 18.109C7.75 18.109 7.063 17.063 6.813 16.266C6.625 15.766 6.25 15.234 5.781 15.078C5.391 14.953 5.188 14.828 5.188 14.641C5.188 14.359 5.594 14.328 5.781 14.328C6.5 14.328 7.031 15.016 7.25 15.391C7.969 16.516 8.906 16.766 9.156 16.766C9.719 16.766 10.156 16.734 10.438 16.641C10.594 15.828 10.969 15.016 11.563 14.578C8.438 14.109 6.656 12.578 6.656 10.078C6.656 9.016 7.094 7.953 7.844 7.078C7.719 6.828 7.344 5.828 7.938 4.516C7.938 4.516 9.031 4.516 10.438 5.516C11.219 5.266 12.094 5.141 12.969 5.141C13.844 5.141 14.719 5.266 15.5 5.516C16.906 4.516 18 4.516 18 4.516C18.594 5.828 18.219 6.828 18.094 7.078C18.844 7.953 19.281 9.016 19.281 10.078C19.281 12.578 17.5 14.109 14.375 14.578C15.156 15.141 15.563 16.266 15.563 17.016V22C20.344 21.128 24 16.991 24 12C24 6.477 19.523 2 14 2H12Z"
                    fill="currentColor"
                  />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/mindforge__ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    fill="currentColor"
                  />
                </svg>
                <span>Twitter</span>
              </a>
              <a
                href="https://mindforgeai.gitbook.io/mindforgeai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 7H17M7 12H17M7 17H13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Docs</span>
              </a>
              <a
                href="https://pump.fun/coin/H96vSNGEEXgc2vUkz2rcHxt7FAoFMnRfsiZfHL8epump"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 12h4l2-8 4 16 2-8h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17h20M2 7h20"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeOpacity="0.3"
                  />
                </svg>
                <span>Pump.fun</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Cyber Grid Background */}
        <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

        {/* Content */}
        {children}

        {/* Global Overlay Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
          <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-5" />
        </div>
      </main>
    </div>
  );
}
