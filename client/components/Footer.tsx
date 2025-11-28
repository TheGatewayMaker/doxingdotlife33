import {
  HomeIcon,
  LinkIcon,
  SearchAltIcon,
  MessageIcon,
  FileTextIcon,
  ScaleIcon,
  AlertIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-700 mt-12 shadow-md animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                <img
                  src="https://i.ibb.co/rG8yDddq/doxingdotlifelogogeniune888175141.png"
                  alt="Doxing Dot Life Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-white">Doxing Dot Life</h3>
            </div>
            <p className="text-sm text-gray-400">
              A comprehensive database for information sharing and research
            </p>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <HomeIcon className="w-4 h-4" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <SearchAltIcon className="w-4 h-4" />
                  Browse Database
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <MessageIcon className="w-4 h-4" />
                  Discord Community
                </a>
              </li>
            </ul>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <FileTextIcon className="w-4 h-4" />
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <FileTextIcon className="w-4 h-4" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <ScaleIcon className="w-4 h-4" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <AlertIcon className="w-4 h-4" />
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <h4 className="font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <ShoppingCartIcon className="w-4 h-4" />
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <CreditCardIcon className="w-4 h-4" />
                  Premium Access
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4" />
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <MailIcon className="w-4 h-4" />
                  Report Issues
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; 2024 - 2027 Doxing Dot Life. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
