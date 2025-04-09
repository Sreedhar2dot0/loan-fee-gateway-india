
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, QrCode, Link, ExternalLink, ChevronRight, Check } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { LoanApplication } from '../loans/LoanApplicationCard';

interface FeeCollectionModalProps {
  open: boolean;
  onClose: () => void;
  application: LoanApplication | null;
}

const FeeCollectionModal: React.FC<FeeCollectionModalProps> = ({
  open,
  onClose,
  application
}) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentLink, setPaymentLink] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  if (!application) return null;
  
  const handleGeneratePaymentLink = () => {
    // In a real implementation, this would call an API to generate the link
    const fakeLink = `https://pay.loanpro.in/fee/${application.id}`;
    setPaymentLink(fakeLink);
    toast.success("Payment link generated successfully");
  };
  
  const handleMarkAsPaid = () => {
    setPaymentCompleted(true);
    toast.success("Payment marked as completed");
    
    // In a real app, you would update the status in your backend
    setTimeout(() => {
      onClose();
    }, 1500);
  };
  
  const renderUPISection = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center">
        <div className="mb-4 bg-white p-2 rounded-md border">
          <QrCode className="h-48 w-48 text-finance-800" />
        </div>
        <p className="text-sm text-gray-600 text-center mt-2">
          Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm)
          to pay the processing fee
        </p>
        <div className="mt-4 bg-blue-50 p-3 rounded-md w-full text-center">
          <p className="text-sm font-medium text-blue-800">UPI ID: loanpro@ybl</p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline">Download QR</Button>
        <Button variant="outline" onClick={handleMarkAsPaid}>
          Mark as Paid
        </Button>
      </div>
    </div>
  );
  
  const renderBankTransferSection = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium mb-4">Bank Account Details</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Name:</span>
            <span className="font-medium">LoanPro Financial Services</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Number:</span>
            <span className="font-medium">1234567890123456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IFSC Code:</span>
            <span className="font-medium">HDFC0001234</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bank:</span>
            <span className="font-medium">HDFC Bank</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Branch:</span>
            <span className="font-medium">Mumbai Main Branch</span>
          </div>
        </div>
        
        <div className="mt-4 bg-yellow-50 p-3 rounded-md text-sm">
          <p className="font-medium text-yellow-800">Important Note:</p>
          <p className="text-yellow-800 mt-1">
            Please ask the customer to mention the Application ID ({application.id}) 
            in the payment reference to ensure proper tracking.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline">Copy Details</Button>
        <Button variant="outline" onClick={handleMarkAsPaid}>
          Mark as Paid
        </Button>
      </div>
    </div>
  );
  
  const renderPaymentLinkSection = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium mb-4">Generate Payment Link</h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Create a payment link that can be shared with the customer via SMS, 
          WhatsApp, or email. The customer can use this link to make the payment online.
        </p>
        
        {paymentLink ? (
          <div className="mt-4">
            <div className="relative">
              <Input 
                value={paymentLink} 
                readOnly 
                className="pr-10"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={() => {
                navigator.clipboard.writeText(paymentLink);
                toast.success("Link copied to clipboard");
              }}>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            <div className="flex space-x-3 mt-4">
              <Button size="sm" variant="outline" className="flex-1">
                <Smartphone className="h-4 w-4 mr-2" />
                Send via SMS
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Send via Email
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={handleGeneratePaymentLink} className="w-full">
            Generate Payment Link
          </Button>
        )}
      </div>
      
      <div className="flex justify-end mt-6">
        <Button variant="outline" onClick={handleMarkAsPaid} disabled={!paymentLink}>
          Mark as Paid
        </Button>
      </div>
    </div>
  );
  
  const renderCustomerScreenSection = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium mb-4">Customer Facing Payment Screen</h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Turn your device to face the customer so they can select a payment method
          and complete the transaction.
        </p>
        
        <div className="border rounded-lg p-4 bg-white">
          <div className="text-center mb-6">
            <h4 className="font-medium text-lg">Processing Fee Payment</h4>
            <p className="text-gray-500">Application #{application.id}</p>
            <div className="text-2xl font-bold my-3">₹{application.feeAmount}</div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <QrCode className="h-4 w-4 text-green-700" />
                </div>
                <span>Pay with UPI</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <CreditCard className="h-4 w-4 text-blue-700" />
                </div>
                <span>Pay with Card</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Smartphone className="h-4 w-4 text-purple-700" />
                </div>
                <span>Pay with Wallet</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <Button variant="outline" onClick={handleMarkAsPaid}>
          Mark as Paid
        </Button>
      </div>
    </div>
  );
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        {paymentCompleted ? (
          <div className="py-12 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-center">Payment Complete!</h2>
            <p className="text-gray-600 text-center mt-2">
              The processing fee has been marked as paid and the loan application 
              is now ready for underwriting.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Collect Processing Fee</DialogTitle>
              <DialogDescription>
                Collect the processing fee of ₹{application.feeAmount} for loan application #{application.id} 
                from {application.customerName}.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="upi" className="mt-3" onValueChange={setPaymentMethod}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="upi" className="flex flex-col items-center py-2">
                  <QrCode className="h-4 w-4 mb-1" />
                  <span className="text-xs">UPI</span>
                </TabsTrigger>
                <TabsTrigger value="bank" className="flex flex-col items-center py-2">
                  <CreditCard className="h-4 w-4 mb-1" />
                  <span className="text-xs">Bank</span>
                </TabsTrigger>
                <TabsTrigger value="link" className="flex flex-col items-center py-2">
                  <Link className="h-4 w-4 mb-1" />
                  <span className="text-xs">Link</span>
                </TabsTrigger>
                <TabsTrigger value="screen" className="flex flex-col items-center py-2">
                  <Smartphone className="h-4 w-4 mb-1" />
                  <span className="text-xs">Screen</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upi">
                {renderUPISection()}
              </TabsContent>
              
              <TabsContent value="bank">
                {renderBankTransferSection()}
              </TabsContent>
              
              <TabsContent value="link">
                {renderPaymentLinkSection()}
              </TabsContent>
              
              <TabsContent value="screen">
                {renderCustomerScreenSection()}
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={onClose}
              >
                Cancel
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeeCollectionModal;
