import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const InstrumentDetailModal = ({ instrument, isOpen, onClose }: any) => {
  if (!instrument) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">{instrument.type}</h3>
            <p className="text-sm opacity-80">Reference: {instrument.ref}</p>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={onClose}>
            Close
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Amount/Value</p>
                <p className="text-2xl font-bold text-primary">{instrument.amount}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Status</p>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {instrument.status}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Issue Date</p>
                <p className="font-medium">{instrument.issueDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Expiry Date</p>
                <p className="font-medium">{instrument.expiryDate}</p>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t">
              <h4 className="font-bold text-lg">Instrument Body / Message</h4>
              <div className="bg-slate-50 p-6 rounded-lg font-mono text-sm leading-relaxed whitespace-pre-wrap border">
                {instrument.type === 'Key Tested Telex (KTT)' ? (
                  `ZCZC 123456789
PRIORITY: URGENT
FROM: PROMINENCE BANK CORP
TO: GLOBAL CORRESPONDENT BANK
REF: ${instrument.ref}

WE HEREBY CONFIRM THE ISSUANCE OF KEY TESTED TELEX FOR THE SUM OF ${instrument.amount}.
FUNDS ARE CLEAN AND OF NON-CRIMINAL ORIGIN.
THIS INSTRUMENT IS FULLY NEGOTIABLE AND ASSIGNABLE.

TEST KEY: 998877665544332211
AUTHORIZED SIGNATORY: CHIEF OPERATIONS OFFICER
END OF MESSAGE
NNNN`
                ) : (
                  `This is a certified digital record of the ${instrument.type} issued by Prominence Bank.
The value of ${instrument.amount} is secured against the assets held in account ${instrument.ref}.
This document serves as primary evidence of the instrument's validity.`
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <Button className="flex-1">Download Certified PDF</Button>
              <Button variant="outline" className="flex-1">Print Record</Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
