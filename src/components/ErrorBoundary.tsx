import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in DevRopix application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-2xl bg-white border border-[#e4e4e7] shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#db5434]/10 text-[#db5434] flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h1 className="text-xl font-bold text-[#27272a]">
              Something went wrong / حدث خطأ غير متوقع
            </h1>
            <p className="text-sm text-[#71717a]">
              {this.state.error?.message || 'An unexpected error occurred while loading the application.'}
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#6a5ed9] text-white text-sm font-medium hover:bg-[#584dc7] transition-all cursor-pointer"
            >
              Reload Application / إعادة تحميل
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
