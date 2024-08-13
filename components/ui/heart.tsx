import React, { useState, useEffect } from 'react';

// Heart Component
const Heart = ({ counter, onLike }) => {
    const [liked, setLiked] = useState(false);

    // Function to handle heart click
    const handleClick = () => {
        if (!liked) {
            setLiked(true);
            onLike();
        }
    };

    // Inline styles for the heart
    const heartStyle = {
        width: '50px',
        height: '50px',
        backgroundColor: liked ? 'linear-gradient(135deg, #ff007f, #ff4b2b)' : '#d3d3d3',
        clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)',
        transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
        transform: liked ? 'scale(1.2)' : 'scale(1)',
        cursor: 'pointer',
    };

    return (
        <div>
            <div style={heartStyle} onClick={handleClick}></div>
            <p>Likes: {counter}</p>
        </div>
    );
};

export default Heart;
