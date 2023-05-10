import {Component, ErrorInfo, ReactNode} from 'react';
import ServerError from '../../pages/serverError/ServerError';

interface Props {
    children: ReactNode;
}

interface State {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
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
    }

    render() {
        if (this.state.error !== null) {
            return <ServerError />;
        }

        return this.props.children;
    }
}
