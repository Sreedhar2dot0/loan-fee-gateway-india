
import React from 'react';
import { Clock, Calendar, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

export interface LoanApplication {
  id: string;
  customerName: string;
  loanAmount: number;
  loanType: string;
  applicationDate: string;
  status: 'pending' | 'fee_pending' | 'processing' | 'approved' | 'rejected';
  feeAmount: number;
}

interface LoanApplicationCardProps {
  application: LoanApplication;
  onCollectFee: (application: LoanApplication) => void;
}

const LoanApplicationCard: React.FC<LoanApplicationCardProps> = ({ 
  application, 
  onCollectFee 
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'fee_pending':
        return 'bg-orange-100 text-orange-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'fee_pending':
        return 'Fee Payment Pending';
      case 'processing':
        return 'Under Processing';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{application.customerName}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <span className="mr-2">Application #{application.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(application.status)}`}>
                {getStatusLabel(application.status)}
              </span>
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">₹{application.loanAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{application.loanType}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm mt-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Applied on {application.applicationDate}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            <span>Loan Applicant</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
            <span>Processing Fee: ₹{application.feeAmount}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>2 days ago</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline">View Details</Button>
        {application.status === 'fee_pending' && (
          <Button 
            onClick={() => onCollectFee(application)}
            className="bg-finance-700 hover:bg-finance-800 text-white"
          >
            Collect Fee
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoanApplicationCard;
