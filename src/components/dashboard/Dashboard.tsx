
import React, { useState } from 'react';
import { 
  FileText, Search, Filter, ChevronDown, 
  CalendarRange, BarChart4, CreditCard, Users
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import LoanApplicationCard, { LoanApplication } from '../loans/LoanApplicationCard';
import FeeCollectionModal from '../payments/FeeCollectionModal';

// Mock data
const mockApplications: LoanApplication[] = [
  {
    id: 'LOAN23456',
    customerName: 'Amit Patel',
    loanAmount: 250000,
    loanType: 'Personal Loan',
    applicationDate: '04 Apr 2025',
    status: 'fee_pending',
    feeAmount: 1500
  },
  {
    id: 'LOAN23457',
    customerName: 'Priya Sharma',
    loanAmount: 1500000,
    loanType: 'Home Loan',
    applicationDate: '03 Apr 2025',
    status: 'processing',
    feeAmount: 4500
  },
  {
    id: 'LOAN23458',
    customerName: 'Rahul Singh',
    loanAmount: 500000,
    loanType: 'Business Loan',
    applicationDate: '01 Apr 2025',
    status: 'fee_pending',
    feeAmount: 2500
  },
  {
    id: 'LOAN23459',
    customerName: 'Neha Gupta',
    loanAmount: 350000,
    loanType: 'Personal Loan',
    applicationDate: '31 Mar 2025',
    status: 'approved',
    feeAmount: 1750
  },
  {
    id: 'LOAN23460',
    customerName: 'Vikram Malhotra',
    loanAmount: 750000,
    loanType: 'Business Loan',
    applicationDate: '28 Mar 2025',
    status: 'rejected',
    feeAmount: 3000
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [showFeeModal, setShowFeeModal] = useState(false);
  
  const handleCollectFee = (application: LoanApplication) => {
    setSelectedApplication(application);
    setShowFeeModal(true);
  };
  
  const handleCloseFeeModal = () => {
    setShowFeeModal(false);
    setTimeout(() => setSelectedApplication(null), 300);
  };
  
  const filteredApplications = mockApplications.filter(app => 
    app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="md:ml-64 flex-1">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, manage loan applications and process fees</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-finance-700 hover:bg-finance-800 text-white">
                <FileText className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Applications</p>
                    <h3 className="text-2xl font-bold mt-1">157</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span>↑ 12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fee Collections</p>
                    <h3 className="text-2xl font-bold mt-1">₹84,500</h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span>↑ 8% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                    <h3 className="text-2xl font-bold mt-1">23</h3>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <BarChart4 className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-red-600 flex items-center">
                  <span>↑ 5% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Customers</p>
                    <h3 className="text-2xl font-bold mt-1">1,248</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 flex items-center">
                  <span>↑ 15% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle>Recent Loan Applications</CardTitle>
                  <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="text"
                        placeholder="Search applications..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <span>Filter</span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>All Applications</DropdownMenuItem>
                        <DropdownMenuItem>Fee Pending</DropdownMenuItem>
                        <DropdownMenuItem>Under Processing</DropdownMenuItem>
                        <DropdownMenuItem>Approved</DropdownMenuItem>
                        <DropdownMenuItem>Rejected</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <CalendarRange className="mr-2 h-4 w-4" />
                          <span>Last 30 days</span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Today</DropdownMenuItem>
                        <DropdownMenuItem>Yesterday</DropdownMenuItem>
                        <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                        <DropdownMenuItem>This month</DropdownMenuItem>
                        <DropdownMenuItem>Last month</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Custom range</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredApplications.map((application) => (
                    <LoanApplicationCard
                      key={application.id}
                      application={application}
                      onCollectFee={handleCollectFee}
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" disabled>
                  Previous
                </Button>
                <Button variant="ghost">
                  Next
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <FeeCollectionModal
        open={showFeeModal}
        onClose={handleCloseFeeModal}
        application={selectedApplication}
      />
    </div>
  );
};

export default Dashboard;
