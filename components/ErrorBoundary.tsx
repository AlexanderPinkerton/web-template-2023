import * as React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error: any, errorInfo: any) {
      // You can also log the error to an error reporting service
      console.log(`the error is ${error}`)
      console.log(`the error info is ${errorInfo}`)
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Failed to load.</h1>;
      }
  
      return this.props.children; 
    }
  }