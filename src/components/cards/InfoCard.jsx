import React from "react";

const InfoCard = ({ label, value, color }) => {
  return (
    <div className="flex items-center justyfy-center gap-3">
      <div className={`w-3 md:w-4 h-4 md:h-5 text-center ${color} rounded-full`}>
        <p className="text-xs md:text-[14px] text-gray-500">
          <span className="text-sm md:text-[15px] text-black font-semibold">
            {value}
          </span>
        </p>
      </div>
      {label}
    </div>
  );
};

export default InfoCard;
