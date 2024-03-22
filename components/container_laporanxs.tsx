import React from 'react'

interface Props {
  title: string;
  total: string;
  bgColor: string;
  textColor: string;
}

function ContainerLaporanXS({ title, total, bgColor, textColor }: Props) {

  return (
    <div className={`w-[29vw] text-center rounded overflow-hidden shadow-lg ${bgColor} ${textColor}`}>
      <div className="px-2 py-1">
        <p className={`text-[16px]`}>
          {total}
        </p>
        <div className="font-bold text-[12px]">{title}</div>
      </div>
    </div>
  )
}

export default ContainerLaporanXS