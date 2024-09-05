import { ReactNode } from 'react';

import './GlobalStyles.css';

interface GlobalStyleProps {
    children: ReactNode;
}

const GlobalStyles = ({ children }: GlobalStyleProps) => {
    return children;
};

export default GlobalStyles;