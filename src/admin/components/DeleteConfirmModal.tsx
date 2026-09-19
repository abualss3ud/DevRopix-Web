import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  message,
  itemName,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isDeleting = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="delete-confirm-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        id="delete-confirm-dialog"
        className="w-full max-w-md bg-white rounded-2xl border border-[#e4e4e7] p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 text-start"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 id="delete-dialog-title" className="text-base font-bold text-[#27272a]">
                {title}
              </h3>
              <p className="text-xs text-[#71717a] mt-0.5">This action cannot be undone.</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="p-1.5 rounded-lg text-[#71717a] hover:bg-[#f4f4f5] hover:text-[#27272a] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-[#fafafa] border border-[#e4e4e7] text-xs text-[#52525b] leading-relaxed">
          <p>{message}</p>
          {itemName && (
            <p className="mt-2 font-mono font-semibold text-[#27272a] truncate bg-white p-2 rounded-lg border border-[#e4e4e7]">
              {itemName}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-medium rounded-xl border border-[#e4e4e7] bg-white text-[#27272a] hover:bg-[#f4f4f5] transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl bg-red-600 text-white hover:bg-red-700 active:scale-98 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Deleting...' : confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
