import React from "react";

const Spinner = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black z-[9999] bg-opacity-75">
            <div className="border-4 border-dashed border-white border-t-transparent animate-spin rounded-full p-5"></div>
        </div>
    );
};

export default Spinner;
