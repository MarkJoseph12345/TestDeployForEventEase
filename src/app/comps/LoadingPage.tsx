import React from 'react';

const LoadingPage = () => {
    const loadingText = "Loading...";
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full border-8 border-t-8 border-customYellow border-t-transparent h-16 w-16 mb-4"></div>
            <div className="flex">
                {loadingText.split('').map((char, index) => (
                    <span key={index} className={`animate-bounce inline-block`} style={{ animationDelay: `${index * 0.1}s` }}>
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LoadingPage;