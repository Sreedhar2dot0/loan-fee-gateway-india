
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Users, FileText, CreditCard, 
  Settings, PieChart, BarChart3, 
  ChevronRight, ChevronDown
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';

const Sidebar = () => {
  return (
    <div className="w-64 hidden md:block h-screen bg-finance-900 text-white pt-6 fixed">
      <div className="px-4 py-2">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="text-xs uppercase text-finance-400 px-2 mb-2">
              Main
            </div>
            
            <Link to="/" className="flex items-center py-2 px-2 bg-finance-800 rounded-md font-medium">
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between py-2 px-2 w-full hover:bg-finance-800 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3" />
                  <span>Applications</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-10 text-sm">
                <Link to="/" className="block py-2 hover:text-finance-300">All Applications</Link>
                <Link to="/" className="block py-2 hover:text-finance-300">Pending Approval</Link>
                <Link to="/" className="block py-2 hover:text-finance-300">Under Review</Link>
              </CollapsibleContent>
            </Collapsible>
            
            <Link to="/" className="flex items-center py-2 px-2 hover:bg-finance-800 rounded-md">
              <CreditCard className="h-5 w-5 mr-3" />
              Payments
            </Link>
            
            <Link to="/" className="flex items-center py-2 px-2 hover:bg-finance-800 rounded-md">
              <Users className="h-5 w-5 mr-3" />
              Customers
            </Link>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs uppercase text-finance-400 px-2 mb-2">
              Reports
            </div>
            
            <Link to="/" className="flex items-center py-2 px-2 hover:bg-finance-800 rounded-md">
              <BarChart3 className="h-5 w-5 mr-3" />
              Performance
            </Link>
            
            <Link to="/" className="flex items-center py-2 px-2 hover:bg-finance-800 rounded-md">
              <PieChart className="h-5 w-5 mr-3" />
              Analytics
            </Link>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs uppercase text-finance-400 px-2 mb-2">
              System
            </div>
            
            <Link to="/" className="flex items-center py-2 px-2 hover:bg-finance-800 rounded-md">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
