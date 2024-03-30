import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PButtonProps {
    src: string;
    alt: string;
    width: number;
    onClick: () => void;
    route: string;
}

const PButton: React.FC<PButtonProps> = ({ src, alt, width, onClick, route }) => {
    const navigate = useNavigate();
    
    return (
        <img
            src={src} // Use the src prop directly
            alt={alt}
            width={width}
            onClick={() => {
                onClick(); // Call the onClick function provided by parent
                navigate(route); // Navigate to the specified route
            }}
        />
    );
};

export default PButton;
