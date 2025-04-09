
import React from 'react';
import { 
  Bell, ChevronDown, Home, Search, Users, FileText, 
  CreditCard, Settings, User
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <div className="text-finance-900 font-bold text-xl flex items-center">
            <Home className="mr-2 h-5 w-5" />
            <span>LoanPro India</span>
          </div>
          
          <div className="hidden md:flex bg-gray-100 items-center rounded-md px-3 py-1.5">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search applications..."
              className="bg-transparent border-none focus:outline-none text-sm px-3 py-1 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-1.5 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-finance-700 text-white flex items-center justify-center text-sm">
                RS
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">Rahul Sharma</div>
                <div className="text-xs text-gray-500">Loan Officer</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
