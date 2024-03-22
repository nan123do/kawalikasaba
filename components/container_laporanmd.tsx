import React from 'react'

interface Props {
  title: string;
  total: string;
  bgColor: string;
  textColor: string;
}

function ContainerLaporanMD({ title, total, bgColor, textColor }: Props) {

  return (
    <div className={`w-40 text-center rounded overflow-hidden shadow-lg ${bgColor} ${textColor}`}>
      <div className=" px-6 py-2">
        <p className=" text-3xl">
          {total}
        </p>
        <div className="font-bold text-sm">{title}</div>
      </div>
    </div>
  )
}

export default ContainerLaporanMD