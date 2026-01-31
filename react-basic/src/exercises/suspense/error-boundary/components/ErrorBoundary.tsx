import { Component, ReactNode } from "react";

// TODO: ErrorBoundary を実装してください
// ヒント: getDerivedStateFromError と componentDidCatch を使用します

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = {
  // TODO: 必要な state を定義してください
};

export class ErrorBoundary extends Component<Props, State> {
  // TODO: 実装してください

  render() {
    return this.props.children;
  }
}
