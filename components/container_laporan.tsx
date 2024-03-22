import React from 'react'

interface Props {
  title: string;
  total: string;
}

function ContainerLaporan({ title, total }: Props) {

  return (
    <div className="w-[35vw] text-center rounded overflow-hidden shadow-lg bg-gray-200">
      <div className=" px-6 py-2">
        <p className="text-black text-3xl">
          {total}
        </p>
        <div className="font-bold text-sm text-black">{title}</div>
      </div>
    </div>
  )
}

export default ContainerLaporan