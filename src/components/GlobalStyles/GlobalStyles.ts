import { ReactNode } from 'react';

import './GlobalStyles.css';
import './Responsive.css';

interface GlobalStyleProps {
    children: ReactNode;
}

const GlobalStyles = ({ children }: GlobalStyleProps) => {
    return children;
};

export default GlobalStyles;
