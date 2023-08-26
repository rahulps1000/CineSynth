import { Teko } from "next/font/google";

const teko = Teko({ subsets: ["latin"], weight: "600" });

function NavBar() {
  return (
    <nav>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-white text-4xl">
            <a href="/" className={teko.className}>
              CINE SYNTH
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/rahulps1000"
              className="text-gray-400 hover:text-white"
              target="_blank"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.3 1.1 2.9.9.1-.6.4-1.1.8-1.3-3.1-.3-6.4-1.5-6.4-6.7 0-1.5.5-2.8 1.1-3.8-.1-.3-.5-1.8.1-3.8 0 0 1.2-.4 3.9 1.5 1.1-.3 2.3-.4 3.5-.4s2.4.1 3.5.4c2.7-1.9 3.9-1.5 3.9-1.5.6 2 .2 3.5.1 3.8.6 1 .9 2.2.9 3.5 0 5.2-3.3 6.3-6.5 6.6.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 0"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
