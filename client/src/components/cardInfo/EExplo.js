import React from 'react';

function EExplo({ cardInfo, color = 'pink' }) {
    const { type, question } = cardInfo;
    return (
        <>
            <div
                className={`text-sm text-white py-2 font-bold text-center rounded-t bg-${color}-600`}
            >
                {type.toUpperCase()}
            </div>
            {type === 'texto' && (
                <p className="p-2 text-gray-800">
                    {question.length > 50
                        ? question.slice(47) + '...'
                        : question}
                </p>
            )}
        </>
    );
}

export default EExplo;
