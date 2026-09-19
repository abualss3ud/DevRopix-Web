import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (title: string, type?: ToastType, message?: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, type: ToastType = 'success', message?: string, duration: number = 4000) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC<{ toasts: ToastItem[]; onDismiss: (id: string) => void }> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      id="admin-toast-portal"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let borderClass = 'border-[#1bb152]/30 bg-white text-[#0B1220]';
        let icon = <CheckCircle2 className="w-5 h-5 text-[#1bb152] shrink-0" />;

        if (toast.type === 'error') {
          borderClass = 'border-red-200 bg-white text-[#0B1220]';
          icon = <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-200 bg-white text-[#0B1220]';
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
        } else if (toast.type === 'info') {
          borderClass = 'border-[#6a5ed9]/30 bg-white text-[#0B1220]';
          icon = <Info className="w-5 h-5 text-[#6a5ed9] shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 transition-all animate-in slide-in-from-bottom-3 duration-200 ${borderClass}`}
            role="alert"
          >
            {icon}
            <div className="flex-1 min-w-0 text-start">
              <p className="text-xs font-semibold text-[#27272a]">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-[#71717a] mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-[#a1a1aa] hover:text-[#27272a] rounded-lg transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
