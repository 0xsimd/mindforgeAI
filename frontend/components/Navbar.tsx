import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-terminal-black/80 backdrop-blur-md border-b border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                className="stroke-cyber-blue"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                className="stroke-cyber-purple"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                className="stroke-cyber-pink"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Mindforge
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyber-blue transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Home</span>
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
              <span>Laboratory</span>
            </Link>

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
              <span>Archives</span>
            </Link>

            <a
              href="https://github.com/yourusername/Mindforge"
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
          </div>
        </div>
      </div>
    </nav>
  );
} 