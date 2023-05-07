import React, {ErrorInfo} from 'react';
import ServerError from '../../pages/serverError/ServerError';

interface Props {
    children: React.ReactNode;
}

interface State {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    static getDerivedStateFromError(error: Error) {
        return { error };
    }
    
    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        console.log(error, errorInfo);
    }

    render() {
        if (this.state.error !== null) {
            return <ServerError />;
        }

        return this.props.children;
    }
}
