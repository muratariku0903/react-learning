import { Component, Fragment, type ReactNode } from "react";

// ヒント: getDerivedStateFromError と componentDidCatch を使用します

type Props = {
  children: ReactNode;
  fallback: (args: { reset: () => void }) => ReactNode;
};

type State = {
  hasError: boolean;
  retryKey: number;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, retryKey: 0 };

  static getDerivedStateFromError(error: unknown) {
    if (error) {
      return { hasError: true };
    }

    return {};
  }

  static componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo);
  }

  private reset = () => {
    this.setState((prev) => ({
      hasError: false,
      retryKey: prev.retryKey + 1,
    }));
  };

  render() {
    if (this.state.hasError) return this.props.fallback({ reset: this.reset });
    return <Fragment key={this.state.retryKey}>{this.props.children}</Fragment>;
  }
}
