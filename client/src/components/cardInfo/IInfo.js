import React from 'react';

function IInfo({ cardInfo, color = 'teal' }) {
    const { type, datatype, value, id } = cardInfo;
    return (
        <>
            <div
                className={`text-sm text-white py-2 font-bold text-center rounded-t bg-${color}-600`}
            >
                {type.toUpperCase()}
            </div>
            {datatype === 'video' && (
                <div className={`relative bg-${color}-500 pb-full`}>
                    <iframe
                        className="w-full h-full absolute"
                        title={id}
                        src={value}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            )}
            {datatype === 'text' && (
                <p className="p-2 text-gray-800">
                    {value.length > 30 ? value.slice(27) + '...' : value}
                </p>
            )}
            {datatype === 'image' && (
                <div className={`relative bg-${color}-500 pb-full`}>
                    <img
                        src={value}
                        className="absolute object-cover w-full h-full"
                        alt={id}
                    />
                </div>
            )}
        </>
    );
}

export default IInfo;
