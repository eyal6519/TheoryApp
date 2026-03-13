import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, AlertCircle } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onRetry: () => void;
  onContinue: () => void;
}

export function ReviewModal({ isOpen, onRetry, onContinue }: ReviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            onClick={onContinue}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden pointer-events-auto"
              dir="rtl"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">סיימת את הביקורת</h3>
                <p className="text-slate-600 mb-8">
                  האם ברצונך לנסות שוב את השאלות שבהן טעית או להמשיך בשאלות הבאות?
                </p>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={onRetry}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <RotateCcw className="w-5 h-5" />
                    נסה שוב את השאלות שטעיתי
                  </button>
                  
                  <button
                    onClick={onContinue}
                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    המשך לשאלות הבאות
                    <ArrowRight className="w-5 h-5 flip-rtl" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
