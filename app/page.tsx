"use client"
import { useEffect, useState } from "react";
import CreateModal from "./CreateModal";
import Modal from "@/components/modal";
import Select from 'react-select';
import { useForm } from 'react-hook-form'
import MySwal from 'sweetalert2';
import Link from 'next/link'
import { Alumni } from "@/libs/model";
import { Root } from "@/libs/jsonresponse";
// import { AddAlumni, GetAlumni, UpdateAlumni, DeleteAlumni } from "@/libs/alumniApi";
import Loading from "@/app/loading";
import ContainerLaporan from "@/components/container_laporan";
import ContainerLaporanMD from "@/components/container_laporanmd";
import ContainerLaporanXS from "@/components/container_laporanxs";

export default function Home() {
  const siswaTemp = [
    {
      "id": 1,
      "nama": "ALFI NUR LAILI",
      "kelas": "B1",
      "nowa": '',
      "status": "Blm Japri",
      "jumlah": '0',
      "created_at": ''
    },
    {
      "id": 2,
      "nama": "ANA CHUSNUL CHOTIMAH",
      "kelas": "B1",
      "nowa": '',
      "status": "Blm Japri",
      "jumlah": '0',
      "created_at": ''
    },
    {
      "id": 3,
      "nama": "ANDI RAHARDIAN PRAJITNO",
      "kelas": "B1",
      "nowa": '',
      "status": "Blm Japri",
      "jumlah": '0',
      "created_at": ''
    },
    {
      "id": 4,
      "nama": "ANTON PERDANA PUTRA",
      "kelas": "B1",
      "nowa": '',
      "status": "Blm Japri",
      "jumlah": '0',
      "created_at": ''
    },
    {
      "id": 5,
      "nama": "ARI ROSYIDA",
      "kelas": "B1",
      "nowa": '',
      "status": "Blm Japri",
      "jumlah": '0',
      "created_at": ''
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  // Handle form tambah
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isAddMode, setisAddMode] = useState(false);
  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentSiswa(null);
    setisAddMode(true);
    reset({});
    setSelectedOption(null);
    setSelectedOptionKelas(null);
    setSelectedOptionKonfirmasi(null);
  };

  // Handle form ubah
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSiswa, setCurrentSiswa]: any = useState(null);
  const openEditModal = (siswa: any) => {
    setIsEditMode(true);
    setCurrentSiswa(siswa);
    setisAddMode(false);
    reset(siswa);
    setSelectedOption(options.find(option => option.value === siswa.status));
    setSelectedOptionKelas(optionKelas.find(option => option.label === siswa.kelas));
    setSelectedOptionKonfirmasi(optionKonfirmasi.find(option => option.label === siswa.konfirmasi));
  };

  // Handle hapus data
  const handleDelete = ((id: number) => {
    closeModal();
    MySwal.fire({
      icon: 'warning',
      title: 'Konfirmasi Hapus',
      text: 'Apakah Anda yakin ingin menghapus item ini?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        // const result: Root = await DeleteAlumni(id);
        // if (result.meta.status == 'success') {
        //   alertSuccess('Data berhasil dihapus!');
        //   const updatedSiswa = [...siswa];
        //   const index = updatedSiswa.findIndex((item) => item.id === id);
        //   updatedSiswa.splice(index, 1);
        //   setSiswa(updatedSiswa);
        //   setSearchAlumni(updatedSiswa);
        // } else {
        //   alertFailed(result.meta.message);
        // }
      }
    });
  })

  // handle alert
  const alertSuccess = (message: string) => {
    MySwal.fire({
      title: message,
      icon: 'success',
      timer: 1000,
      timerProgressBar: true,
      didClose: () => {
        // router.push('/undangan');
      }
    });
  }
  const alertFailed = (result: string) => {
    MySwal.fire({
      title: 'Error!',
      icon: 'error',
      timer: 1000,
      text: result,
      timerProgressBar: true,
    });
  }

  // Close modal
  const closeModal = () => {
    setisAddMode(false);
    setIsEditMode(false);
    setCurrentSiswa(null);
    setSelectedOption(null);
    reset({});
  };

  const onSubmit = async (data: any) => {
    let konfirmasi = selectedOptionKonfirmasi?.label ?? optionKonfirmasi[optionKonfirmasi.length - 1].label;
    let statusHadir = selectedOption?.value ?? options[options.length - 1].value;
    if (statusHadir == "Hadir" && data.jumlah == 0) {
      data.jumlah = 1;
    } else {
      data.jumlah = 0;
    }

    data.nowa = data.nowa == null ? '' : data.nowa;
    const request = {
      ...data,
      kelas: selectedOptionKelas?.label ?? optionKelas[0].label,
      konfirmasi: konfirmasi,
      status: statusHadir
    };

    const idYangDiubah = currentSiswa?.id;
    const sameName = siswa.some(siswa => siswa.nama === data['nama'] && siswa.id !== idYangDiubah);
    if (sameName) {
      return alertFailed('Nama sudah dipakai');
    }


    if (isEditMode) {
      const updatedData = siswa.map(item => item.id === currentSiswa.id ? { ...request, id: currentSiswa.id } : item);
      setSiswa(updatedData);
      setSearchAlumni(updatedData);
      alertSuccess('Data berhasil diubah!');
      // const result: Root = await UpdateAlumni(request);
      // if (result.meta.status == 'success') {
      // } else {
      //   alertFailed(result.meta.message);
      // }
    } else {
      // const result: Root = await AddAlumni(request);
      // if (result.meta.status == 'success') {
      //   alertSuccess('Data berhasil ditambah!');
      //   // fetchData();
      // } else {
      //   alertFailed(result.meta.message);
      // }
    }
    closeModal();
  };

  // Filter status di Modal
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const options: any[] = [
    { value: 'Hadir', label: 'Ya' },
    { value: 'Tidak Hadir', label: 'Tidak' },
    { value: 'Ragu', label: 'Ragu2' },
    { value: 'Waiting', label: 'Blm Balas' },
    { value: 'Blm Japri', label: 'Blm Japri' },
  ];

  const optionKonfirmasi: any[] = [
    { value: 'Sudah', label: 'Sudah' },
    { value: 'Belum', label: 'Belum' },
  ];

  const optionKelas: any[] = [
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'B3', label: 'B3' },
    { value: 'B4', label: 'B4' },
    { value: 'B5', label: 'B5' },
    { value: 'B6', label: 'B6' },
    { value: 'C1', label: 'C1' },
    { value: 'C2', label: 'C2' },
    { value: 'C3', label: 'C3' },
    { value: 'C4', label: 'C4' },
  ];

  // Data Alumni
  const [siswa, setSiswa] = useState<Alumni[]>([]);
  useEffect(() => {
    setSiswa(siswaTemp);
    setSearchAlumni(siswaTemp);
    setIsLoading(false);

    // fetchData();
  }, [])
  const fetchData = async () => {
    // const result: Root = await GetAlumni({ id: '' });
    // if (result.meta.status == 'success') {
    //   setSiswa(result.data);
    //   setSearchAlumni(result.data);
    // } else {
    //   alertFailed(result.meta.message);
    // }
    // setIsLoading(false);
    // return result;
  }

  // Handle Filter
  const [searchAlumni, setSearchAlumni] = useState<Alumni[]>([]);
  const optionsKehadiran = [
    { value: 'Semua', label: 'Semua' },
    { value: 'Hadir', label: 'Ya' },
    { value: 'Tidak Hadir', label: 'Tidak' },
    { value: 'Ragu', label: 'Ragu2' },
    { value: 'Waiting', label: 'Blm Balas' },
    { value: 'Blm Japri', label: 'Blm Japri' },
  ];
  const optionsKelas = [
    { value: 'Semua', label: 'Semua' },
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'B3', label: 'B3' },
    { value: 'B4', label: 'B4' },
    { value: 'B5', label: 'B5' },
    { value: 'B6', label: 'B6' },
    { value: 'C1', label: 'C1' },
    { value: 'C2', label: 'C2' },
    { value: 'C3', label: 'C3' },
    { value: 'C4', label: 'C4' },
  ];
  const [selectedOption, setSelectedOption] = useState<any | null>(options[0]);
  const [selectedOptionKelas, setSelectedOptionKelas] = useState<any | null>(optionKelas[0]);
  const [selectedOptionKonfirmasi, setSelectedOptionKonfirmasi] = useState<any | null>(optionKonfirmasi[0]);
  const handleSelectChange = (status: any) => {
    setSelectedOption(status);
  };
  const handleSelectChangeKelas = (status: any) => {
    setSelectedOptionKelas(status);
  };

  let selectedFilters = {
    filterHadir: { value: '0', label: 'Semua' },
    filterKelas: { value: 'Semua', label: 'Semua' },
    filterSearch: { value: '', label: '' },
  };
  const [filterLabel, setFilterLabel] = useState(selectedFilters);
  const [search, setSearch] = useState("");
  const filterHadir = (filter: any) => {
    selectedFilters = {
      ...filterLabel,
      ['filterHadir']: { value: filter.value, label: filter.label },
    };
    setFilterLabel(selectedFilters);
    handleFilter();
  };
  const filterSearch = (e: any) => {
    const keyword = e.target.value;
    selectedFilters = {
      ...filterLabel,
      ['filterSearch']: { value: keyword, label: '' },
    };
    setFilterLabel(selectedFilters);
    setSearch(keyword);
    handleFilter();
  };
  const filterKelas = (filter: any) => {
    selectedFilters = {
      ...filterLabel,
      ['filterKelas']: { value: filter.value, label: filter.label },
    };
    setFilterLabel(selectedFilters);
    handleFilter();
  };
  const resetFilters = () => {
    const resetFilters = {
      filterHadir: { value: '0', label: 'Semua' },
      filterKelas: { value: 'Semua', label: 'Semua' },
      filterSearch: { value: '', label: '' },
    };

    // Mengatur ulang state untuk filter dan pencarian
    setFilterLabel(resetFilters);
    setSearch('');

    handleFilter();
  };

  const handleFilter = () => {
    let filteredData = siswa;

    if (selectedFilters.filterHadir.label !== 'Semua') {
      filteredData = filteredData.filter(val => val.status === selectedFilters.filterHadir.value);
    }

    if (selectedFilters.filterKelas.label !== 'Semua') {
      filteredData = filteredData.filter(val => val.kelas === selectedFilters.filterKelas.label);
    }

    if (selectedFilters.filterSearch.value.trim() !== '') {
      filteredData = filteredData.filter(val => val.nama.toLowerCase().includes(selectedFilters.filterSearch.value.toLowerCase()));
    }

    setSearchAlumni(filteredData);
  }


  //Laporan
  let laporanTemp = {
    "alumni": 0,
    "hadir": 0,
    "tidak hadir": 0,
    "ragu": 0,
    "blm balas": 0,
    "blm japri": 0,
    "datang": 0,
  }
  const [laporan, setlaporan] = useState(laporanTemp);
  const [showModalLaporan, setShowModalLaporan] = useState(false);

  const hitungLaporan = (data: Alumni[]) => {
    let temp = {
      "alumni": 0,
      "hadir": 0,
      "tidak hadir": 0,
      "ragu": 0,
      "blm balas": 0,
      "blm japri": 0,
      "datang": 0,
    }

    temp['alumni'] = data.length;
    let hadir = 0;
    let tidakHadir = 0;
    let ragu = 0;
    let blmBalas = 0;
    let blmJapri = 0;
    let datang = 0;

    data.forEach(item => {
      datang += parseInt(item.jumlah);
      if (item.status.toLowerCase() == 'hadir') {
        hadir++
      } else if (item.status.toLowerCase() == 'tidak hadir') {
        tidakHadir++;
      } else if (item.status.toLowerCase() == 'ragu') {
        ragu++;
      } else if (item.status.toLowerCase() == 'waiting') {
        blmBalas++;
      } else if (item.status.toLowerCase() == 'blm japri') {
        blmJapri++;
      }
    });

    temp['hadir'] = hadir;
    temp['tidak hadir'] = tidakHadir;
    temp['ragu'] = ragu;
    temp['blm balas'] = blmBalas;
    temp['blm japri'] = blmJapri;
    temp['datang'] = datang;
    setlaporan(temp);
  }

  useEffect(() => {
    hitungLaporan(searchAlumni);
  }, [siswa, searchAlumni])

  // Fungsi Styling
  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.375rem',
      marginTop: '0.25rem',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'rgba(59, 130, 246, 1)' : 'white',
      '&:hover': {
        backgroundColor: 'rgba(229, 231, 235, 1)',
      },
      color: state.isSelected ? 'white' : 'black',
      padding: '0.5rem',
    }),
  };
  const cover = (status: string) => {
    switch (status) {
      case 'Hadir':
        return 'bg-[#c6efcd] text-[#357131]';
      case 'Tidak Hadir':
        return 'bg-[#ffc8cd] text-[#91253b]';
      case 'Ragu':
        return 'bg-[#fce9d9] text-[#523e2e]';
      case 'Waiting':
        return 'bg-[#f9bf90] text-[#fdf3e4]';
      case 'Blm Japri':
        return 'bg-[#d8e4bc] text-[#565632]';

      default:
        return 'bg-gray-800';
    }
  }
  const handleWa = (nowa: string) => {
    const waAsli = nowa;
    if (nowa) {
      const escapeStr = nowa[0] == '0' ? '62' : '62';
      nowa = escapeStr + nowa.substring(1);

      return <>
        <Link
          href={`https://wa.me/${nowa}?text=${encodeURIComponent(``)}`}
          className='inline-flex items-center gap-2'
          target="_blank"
          rel="noopener noreferrer"
        >
          {waAsli}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="20px" height="20px">
            <g fill="#25d366" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(8.53333,8.53333)">
              <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,2.25121 0.63234,4.35007 1.71094,6.15039l-1.60352,5.84961l5.97461,-1.56836c1.74732,0.99342 3.76446,1.56836 5.91797,1.56836c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM10.89258,9.40234c0.195,0 0.39536,-0.00119 0.56836,0.00781c0.214,0.005 0.44692,0.02067 0.66992,0.51367c0.265,0.586 0.84202,2.05608 0.91602,2.20508c0.074,0.149 0.12644,0.32453 0.02344,0.51953c-0.098,0.2 -0.14897,0.32105 -0.29297,0.49805c-0.149,0.172 -0.31227,0.38563 -0.44727,0.51563c-0.149,0.149 -0.30286,0.31238 -0.13086,0.60938c0.172,0.297 0.76934,1.27064 1.65234,2.05664c1.135,1.014 2.09263,1.32561 2.39063,1.47461c0.298,0.149 0.47058,0.12578 0.64258,-0.07422c0.177,-0.195 0.74336,-0.86411 0.94336,-1.16211c0.195,-0.298 0.39406,-0.24644 0.66406,-0.14844c0.274,0.098 1.7352,0.8178 2.0332,0.9668c0.298,0.149 0.49336,0.22275 0.56836,0.34375c0.077,0.125 0.07708,0.72006 -0.16992,1.41406c-0.247,0.693 -1.45991,1.36316 -2.00391,1.41016c-0.549,0.051 -1.06136,0.24677 -3.56836,-0.74023c-3.024,-1.191 -4.93108,-4.28828 -5.08008,-4.48828c-0.149,-0.195 -1.21094,-1.61031 -1.21094,-3.07031c0,-1.465 0.76811,-2.18247 1.03711,-2.48047c0.274,-0.298 0.59492,-0.37109 0.79492,-0.37109z">
              </path>
            </g></g>
          </svg>
        </Link>
      </>
    } else {
      return '-';
    }
  }
  const handleMobileWa = (nowa: string) => {
    const waAsli = nowa;
    if (nowa) {
      const escapeStr = nowa[0] == '0' ? '62' : '62';
      nowa = escapeStr + nowa.substring(1);

      return <>
        <Link
          href={`https://wa.me/${nowa}?text=${encodeURIComponent(``)}`}
          className='text-[10px]'
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="inline-flex items-center gap-2">
            {waAsli}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="12px" height="12px">
              <g fill="#25d366" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(8.53333,8.53333)">
                <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,2.25121 0.63234,4.35007 1.71094,6.15039l-1.60352,5.84961l5.97461,-1.56836c1.74732,0.99342 3.76446,1.56836 5.91797,1.56836c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM10.89258,9.40234c0.195,0 0.39536,-0.00119 0.56836,0.00781c0.214,0.005 0.44692,0.02067 0.66992,0.51367c0.265,0.586 0.84202,2.05608 0.91602,2.20508c0.074,0.149 0.12644,0.32453 0.02344,0.51953c-0.098,0.2 -0.14897,0.32105 -0.29297,0.49805c-0.149,0.172 -0.31227,0.38563 -0.44727,0.51563c-0.149,0.149 -0.30286,0.31238 -0.13086,0.60938c0.172,0.297 0.76934,1.27064 1.65234,2.05664c1.135,1.014 2.09263,1.32561 2.39063,1.47461c0.298,0.149 0.47058,0.12578 0.64258,-0.07422c0.177,-0.195 0.74336,-0.86411 0.94336,-1.16211c0.195,-0.298 0.39406,-0.24644 0.66406,-0.14844c0.274,0.098 1.7352,0.8178 2.0332,0.9668c0.298,0.149 0.49336,0.22275 0.56836,0.34375c0.077,0.125 0.07708,0.72006 -0.16992,1.41406c-0.247,0.693 -1.45991,1.36316 -2.00391,1.41016c-0.549,0.051 -1.06136,0.24677 -3.56836,-0.74023c-3.024,-1.191 -4.93108,-4.28828 -5.08008,-4.48828c-0.149,-0.195 -1.21094,-1.61031 -1.21094,-3.07031c0,-1.465 0.76811,-2.18247 1.03711,-2.48047c0.274,-0.298 0.59492,-0.37109 0.79492,-0.37109z">
                </path>
              </g></g>
            </svg>
          </div>
        </Link>
      </>
    } else {
      return <p>-</p>;
    };
  }
  const getStatus = (status: string) => {
    switch (status) {
      case 'Hadir':
        return 'Ya';
      case 'Tidak Hadir':
        return 'Tidak';
      case 'Ragu':
        return 'Ragu2';
      case 'Waiting':
        return 'Blm Balas';
      case 'Blm Japri':
        return 'Blm Japri';

      default:
        break;
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-2 sm:p-5 antialiased min-h-screen">
        <div className="mx-auto max-w-screen-xl md:px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden h-auto min-h-[80vh]">
            <div className="flex justify-between items-center p-4">
              <h1 className="text-black text-xl md:text-3xl font-bold">KAWAL IKASABA {new Date().getFullYear()}</h1>
              {/* <div onClick={() => setShowFilter(!showFilter)} className="hidden md:block px-3 py-1 bg-slate-500 rounded-lg cursor-pointer text-sm md:text-lg">{showFilter ? 'Sembunyikan' : 'Tampilkan'} Filter</div> */}
            </div>
            <div className="hidden md:block">
              <div className="flex flex-wrap gap-2 md:space-y-0 md:space-x-4 p-2 md:p-4">
                <ContainerLaporanMD
                  total={laporan['alumni'].toLocaleString()} title={"Alumni"}
                  bgColor={'bg-[#dce6f0]'} textColor={"text-[#3c3f4a]"}
                />
                <ContainerLaporanMD
                  total={`${laporan['hadir'].toLocaleString()}/${laporan['datang'].toLocaleString()}`} title={"Hadir"}
                  bgColor={"bg-[#c6efcd]"} textColor={"text-[#357131]"}
                />
                <ContainerLaporanMD
                  total={laporan['tidak hadir'].toLocaleString()} title={"Tidak Hadir"}
                  bgColor={"bg-[#ffc8cd]"} textColor={"text-[#91253b]"} />
                <ContainerLaporanMD
                  total={laporan['ragu'].toLocaleString()} title={"Ragu-ragu"}
                  bgColor={"bg-[#fce9d9]"} textColor={"text-[#523e2e]"}
                />
                <ContainerLaporanMD
                  total={laporan['blm balas'].toLocaleString()} title={"Belum Balas"}
                  bgColor={"bg-[#f9bf90]"} textColor={"text-[#565632]"}
                />
                <ContainerLaporanMD
                  total={laporan['blm japri'].toLocaleString()} title={"Belum Japri"}
                  bgColor={"bg-[#d8e4bc]"} textColor={"text-[#565632]"}
                />
              </div>
            </div>
            <div className="block md:hidden px-2 py-1">
              <div className="flex flex-wrap gap-2">
                <ContainerLaporanXS
                  total={laporan['alumni'].toLocaleString()} title={"Alumni"}
                  bgColor={'bg-[#dce6f0]'} textColor={"text-[#3c3f4a]"}
                />
                <ContainerLaporanXS
                  total={`${laporan['hadir'].toLocaleString()}/${laporan['datang'].toLocaleString()}`}
                  title={"Hadir"} bgColor={"bg-[#c6efcd]"} textColor={"text-[#357131]"}
                />
                <ContainerLaporanXS
                  total={laporan['tidak hadir'].toLocaleString()} title={"Tidak Hadir"}
                  bgColor={"bg-[#ffc8cd]"} textColor={"text-[#91253b]"} />
                <ContainerLaporanXS
                  total={laporan['ragu'].toLocaleString()} title={"Ragu-ragu"}
                  bgColor={"bg-[#fce9d9]"} textColor={"text-[#523e2e]"}
                />
                <ContainerLaporanXS
                  total={laporan['blm balas'].toLocaleString()} title={"Belum Balas"}
                  bgColor={"bg-[#f9bf90]"} textColor={"text-[#565632]"}
                />
                <ContainerLaporanXS
                  total={laporan['blm japri'].toLocaleString()} title={"Belum Japri"}
                  bgColor={"bg-[#d8e4bc]"} textColor={"text-[#565632]"}
                />
              </div>
            </div>
            <div className="md:space-y-0 md:space-x-4 p-2 md:p-4">
              <div className="hidden md:block">
                <div className={`z-10 flex flex-col md:flex-row justify-start items-center w-full md:space-x-2 space-y-2 md:space-y-0 ${showFilter ? 'block' : 'hidden'}`}>
                  <input
                    className="shadow appearance-none border rounded w-full md:w-[20vw] py-2 px-3 text-gray-700 leading-tight focus:outline-[#2684ff] outline-offset-0"
                    id="search"
                    type="search"
                    placeholder="Cari Nama"
                    value={search}
                    onChange={filterSearch}
                  />
                  <Select
                    instanceId="selectKehadiran"
                    options={optionsKehadiran}
                    name="filterHadir"
                    placeholder="Pilih Kehadiran"
                    className='w-full md:w-[20vw] shadow text-gray-700 appearance-none focus:outline-[#2684ff] outline-offset-0'
                    styles={customStyles}
                    onChange={(e) => filterHadir(e)}
                    isSearchable={false}
                  />
                  <Select
                    instanceId="selectKelas"
                    options={optionsKelas}
                    name="filterKelas"
                    placeholder="Pilih Kelas"
                    className='w-full md:w-[20vw] shadow text-gray-700 appearance-none focus:outline-[#2684ff] outline-offset-0'
                    styles={customStyles}
                    onChange={(e) => filterKelas(e)}
                    isSearchable={false}
                  />
                  <div className="h-1"></div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-start flex-shrink-0">
                    <button
                      type="button"
                      onClick={openAddModal}
                      data-bs-toggle="modal"
                      data-bs-target="#modal-tambah-alumni"
                      className="text-[#424749] flex items-center justify-center bg-softblue hover:bg-primary-300 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                      <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                      </svg>
                      Tambah Alumni
                    </button>
                  </div>
                </div>
              </div>
              <div className="block md:hidden">
                <div className="flex items-center">
                  <input
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-[#2684ff] outline-offset-0"
                    id="search"
                    type="search"
                    placeholder="Cari Nama"
                    value={search}
                    onChange={filterSearch}
                  />
                  <div className="w-2"></div>
                  <button
                    type="button"
                    onClick={() => setShowModalFilter(true)}
                    data-bs-toggle="modal"
                    data-bs-target="#modal-tambah-alumni"
                    className="bg-softblue hover:bg-primary-300 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600">
                    <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <rect width="100" height="100" fill="url(#pattern0)" />
                      <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlinkHref="#image0_2703_23" transform="scale(0.01)" />
                        </pattern>
                        <image id="image0_2703_23" width="100" height="100" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZ0lEQVR4nO3dsYpTQRTG8REUH0HBWgst01go8ZyNZ87ZYGltpaUI+gBbynZWxkfQt9BiK7GzjJWoLyDIBXclK7YmhJvMNzPfD6bfO9/e/EmxbEpEREREREREREREu3YQcUMtjtX8rVq844n/3MH5HR3PZvPrOxlDc74r5j81xxlPbHwHqzubud8ZfRCx+MQhYstfRv846hiTyeSS5jjlILHVIGL+ezqdXhx1FMn+g4PEdm+IxbdRxzgfxPwFB4ltB3k++iAppQtq/kxyfOHHV2wyxKlkX97L+enq7tK+iMWCb078a8XrVNrf4Pv73kcRixN3v5wQqD64IuZfS1+Kljrm33U+v5aQTN1vi8Wv4peT936G1ZfmhOjgvj8CuKCzfR6xeJyQ9RR5QYj4JpEXiw8dvBknMBFfZ3p4eLXpyBtgxDuO/AAb8R4jL+gR7ynyUkPEe4m81BTx5iNvFUa84cgP1Ua8xchL7RFvKfJisUitqyXy0lLEq4+8NRjxiiM/NBvxGiMvrUd8Hc3xBmiMReodSuSlp4jDR946jDhw5IduI44YeTF/Uvq5oekeI8+IA0VeGHGgyBsjjhT5gREHirww4kRERESER90fjnlKP0/1dOTvIaWfp3rKQbAoB8GiHASLchAsykGwKAfBohwEi3IQLMpBsCgHwaIcBItyECzKQbAoB8GiHASLchAsykGwKAfBohwEi3IQLMpBsCgHwaLj/LXUZ8lxpO43Sz9P9ZQjYFG+CVh03cdR9qXkeMmPo4KDSPalWrzayX8/o80GEY6AQXIcSc63Sv8cRERERERERERERAnZH8iGM7dVZWk5AAAAAElFTkSuQmCC" />
                      </defs>
                    </svg>
                  </button>
                  <div className="w-2"></div>
                  <button
                    type="button"
                    onClick={openAddModal}
                    data-bs-toggle="modal"
                    data-bs-target="#modal-tambah-alumni"
                    className="text-[#424749] bg-softblue hover:bg-primary-300 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none ">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                  </button>
                  <div className="w-2"></div>
                  <button
                    type="button"
                    onClick={() => resetFilters()}
                    data-bs-toggle="modal"
                    data-bs-target="#modal-tambah-alumni"
                    className="bg-softblue hover:bg-softblue font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="20px" height="20px"><g fill="#424749" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-2.9686,0 -5.69718,1.08344 -7.79297,2.875c-0.28605,0.22772 -0.42503,0.59339 -0.36245,0.95363c0.06258,0.36023 0.31676,0.6576 0.66286,0.77549c0.3461,0.1179 0.72895,0.03753 0.99842,-0.20959c1.74821,-1.49444 4.01074,-2.39453 6.49414,-2.39453c5.19656,0 9.45099,3.93793 9.95117,9h-2.95117l4,6l4,-6h-3.05078c-0.51129,-6.14834 -5.67138,-11 -11.94922,-11zM4,10l-4,6h3.05078c0.51129,6.14834 5.67138,11 11.94922,11c2.9686,0 5.69718,-1.08344 7.79297,-2.875c0.28605,-0.22772 0.42504,-0.59339 0.36245,-0.95363c-0.06258,-0.36023 -0.31676,-0.6576 -0.66286,-0.7755c-0.3461,-0.1179 -0.72895,-0.03753 -0.99842,0.20959c-1.74821,1.49444 -4.01074,2.39453 -6.49414,2.39453c-5.19656,0 -9.45099,-3.93793 -9.95117,-9h2.95117z"></path></g></g></svg>
                  </button>
                </div>
                <div className="h-1"></div>
              </div>
              <div className="md:h-4"></div>
            </div>
            <div className="relative overflow-auto">
              {searchAlumni && searchAlumni.length > 0 ? (
                <>
                  <div className="hidden md:block">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-blue-400 uppercase bg-softblue">
                        <tr>
                          <th scope="col" className="w-20 px-4 py-4">No.</th>
                          <th scope="col" className="px-4 py-4">Nama</th>
                          <th scope="col" className="px-4 py-4 text-center">Kelas</th>
                          <th scope="col" className="px-4 py-4 text-center">Kehadiran</th>
                          <th scope="col" className="px-4 py-4">Jumlah</th>
                          <th scope="col" className="px-4 py-4">WhatsApp</th>
                          <th scope="col" className="w-32 px-4 py-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchAlumni.map((siswa, index) => (
                          <tr key={siswa.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="py-4 px-4">{index + 1}</td>
                            <td className="py-4 px-4">{siswa.nama}</td>
                            <td className="py-4 px-4 text-center">{siswa.kelas}</td>
                            <td className="py-4 px-4 text-center">
                              <span className={`justify-center w-32 rounded-full px-1 py-1 ${cover(siswa.status)} inline-flex`}>
                                <p className="font-normal text-xs capitalize">{getStatus(siswa.status)}</p>
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">{siswa.jumlah}</td>
                            <td className="py-4 px-4">
                              {handleWa(siswa.nowa)}
                            </td>
                            <td className="py-4 px-4 flex flex-col md:flex-row gap-2 text-xs text-center">
                              <div
                                onClick={() => openEditModal(siswa)}
                                className="flex items-center gap-2 bg-softblue rounded-full px-3 py-1 text-[#424749] cursor-pointer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 18.414062 2 C 18.158188 2 17.902031 2.0974687 17.707031 2.2929688 L 16 4 L 20 8 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" /></svg>
                                Edit
                              </div>
                              {/* <div
                                    onClick={() => handleDelete(siswa.id)}
                                    className="flex items-center gap-2 bg-red-700 rounded-full px-2 py-1 text-white cursor-pointer"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z" /></svg>
                                    Hapus
                                  </div> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="block md:hidden">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-[13px] text-blue-400 uppercase bg-softblue dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-1 py-5">Nama</th>
                          <th scope="col" className="px-1 text-center">Kls</th>
                          <th scope="col" className="px-1 text-center">Hadir</th>
                          <th scope="col" className="px-1 ">Jml</th>
                          <th scope="col" className="px-1 ">WHATSAPP</th>
                          <th scope="col" className="px-1 text-center">{' '}</th>
                        </tr>
                      </thead>
                      <tbody className="text-[13px]">
                        {searchAlumni.map((siswa, index) => (
                          <tr key={siswa.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-1 py-2">{siswa.nama}</td>
                            <td className="px-1 text-[10px] text-center">{siswa.kelas}</td>
                            <td className="text-center text-[11px]">
                              <p className="font-normal capitalize">{getStatus(siswa.status)}</p>
                            </td>
                            <td className="px-1 text-center text-[10px]">{siswa.jumlah}</td>
                            <td className="px-1">
                              {handleMobileWa(siswa.nowa)}
                            </td>
                            <td className="px-1 pt-[7px] text-[8px] flex flex-row gap-2 text-center items-center">
                              <div
                                onClick={() => openEditModal(siswa)}
                                className="cursor-pointer flex flex-row gap-1 text-center items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10px" height="10px"><path d="M 18.414062 2 C 18.158188 2 17.902031 2.0974687 17.707031 2.2929688 L 16 4 L 20 8 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" /></svg>
                                Edit
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-black text-center h-[40vh] flex items-center justify-center">Data tidak ditemukan!</div>
              )}
              {/* <nav aria-label="Page navigation" className="my-5">
                    <ReactPaginate
                      pageCount={30}
                      pageRangeDisplayed={1}
                      marginPagesDisplayed={1}
                      previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={"..."}
                      onPageChange={() => { }}
                      containerClassName="flex justify-center items-center space-x-2 mt-4"
                      pageClassName="rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      activeClassName="bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md rounded-xl"
                      className="flex items-center justify-center gap-3"
                      activeLinkClassName="bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-xl shadow-md"
                      pageLinkClassName="block py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-200 hover:shadow"
                      previousLinkClassName="block py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-200 hover:shadow"
                      nextLinkClassName="block py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-200 hover:shadow"
                      breakLinkClassName="block py-2 px-3 leading-tight text-gray-700 bg-white border border-gray-300 rounded-xl"
                    />
                  </nav> */}
            </div>
          </div>
        </div>
      </section>
      <CreateModal />
      <Modal
        isVisible={isAddMode || isEditMode}
        onCLose={closeModal}
        color=''
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{isAddMode ? 'Tambah' : 'Ubah'} Alumni</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="#modal-tambah-alumni" data-modal-toggle="#modal-tambah-alumni"
                onClick={closeModal}
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="text"
                    placeholder="Nama Kamu"
                    id="nama"
                    {...register("nama", { required: true })}
                  />
                  {errors.nama && <p className="text-red-500 text-xs italic mt-1">Nama harus diisi.</p>}
                </div>
                <div>
                  <label htmlFor="kelas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelas</label>
                  <Select
                    value={selectedOptionKelas}
                    placeholder="Pilih Kelas"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    options={optionKelas}
                    onChange={handleSelectChangeKelas}
                    isSearchable={false}
                  />
                </div>
                <div>
                  <label htmlFor="nowa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Wa</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="text"
                    placeholder="Nomor WhatsApp"
                    id="nowa"
                    {...register("nowa")}
                  />
                  {errors.nowa && <p className="text-red-500 text-xs italic mt-1">Nomor wa harus diisi.</p>}
                </div>
                <div>
                  <label htmlFor="kehadiran" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kehadiran</label>
                  <Select
                    value={selectedOption}
                    placeholder="Pilih Kehadiran"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    options={options}
                    onChange={handleSelectChange}
                    isSearchable={false}
                  />
                </div>
                <div>
                  <label htmlFor="jumlah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah</label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="number"
                    placeholder="Jumlah yang hadir"
                    id="jumlah"
                    {...register("jumlah", { required: true })}
                  />
                  {errors.jumlah && <p className="text-red-500 text-xs italic mt-1">Jumlah harus diisi.</p>}
                </div>
              </div>
              <div className="h-[20px]"></div>
              <div className={`${isEditMode ? 'flex justify-end' : ''}`}>
                {isEditMode ? (<>
                  {/* <button
                        className="rounded-lg m-3 mt-5 bg-red-700 hover:bg-red-800 px-5 py-2 text-white"
                        onClick={() => handleDelete(currentSiswa.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="20px" height="20px"><g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" ><g transform="scale(8.53333,8.53333)"><path d="M13,3c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-5.98633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5.98633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805zM6,8v16c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-16z"></path></g></g></svg>
                      </button> */}
                </>) : (<></>)}
                <div className="flex m-3 items-start justify-end gap-3 mt-5">
                  <button
                    className="rounded-lg bg-softblue hover:bg-primary-300 px-5 py-2 text-[#424749]"
                    onClick={handleSubmit((data) => onSubmit(data))}
                  >
                    Simpan
                  </button>
                  <button
                    className="rounded-lg bg-red-200 hover:bg-red-300 px-5 py-2 text-[#424749]"
                    onClick={closeModal}
                  >Batal</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <Modal
        isVisible={showModalFilter}
        onCLose={() => setShowModalFilter(false)}
        color=''
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="#modal-tambah-alumni" data-modal-toggle="#modal-tambah-alumni"
                onClick={() => setShowModalFilter(false)}
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kehadiran</div>
            <Select
              instanceId="selectKehadiran"
              options={optionsKehadiran}
              name="filterKonfirmasi"
              placeholder="Pilih Kehadiran"
              className='w-full md:w-[20vw] shadow text-gray-700 appearance-none focus:outline-[#2684ff] outline-offset-0'
              styles={customStyles}
              onChange={(e) => filterHadir(e)}
              isSearchable={false}
            />
            <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">Kelas</div>
            <Select
              instanceId="selectKelas"
              options={optionsKelas}
              name="filterKelas"
              placeholder="Pilih Kelas"
              className='w-full md:w-[20vw] shadow text-gray-700 appearance-none focus:outline-[#2684ff] outline-offset-0'
              styles={customStyles}
              onChange={(e) => filterKelas(e)}
              isSearchable={false}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isVisible={showModalLaporan}
        onCLose={() => setShowModalLaporan(false)}
        color=''
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Laporan</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="#modal-laporan" data-modal-toggle="#modal-laporan"
                onClick={() => setShowModalLaporan(false)}
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <ContainerLaporan total={laporan['alumni'].toLocaleString()} title={"Alumni"} />
              <ContainerLaporan
                total={`${laporan['hadir'].toLocaleString()}/${laporan['datang'].toLocaleString()}`}
                title={"Hadir"}
              />
              {/* <ContainerLaporan total={laporan['datang'].toLocaleString()} title={"Datang"} />
                  <ContainerLaporan total={laporan['hadir'].toLocaleString()} title={"Hadir"} /> */}
              <ContainerLaporan total={laporan['tidak hadir'].toLocaleString()} title={"Tidak Hadir"} />
              <ContainerLaporan total={laporan['ragu'].toLocaleString()} title={"Ragu"} />
              <ContainerLaporan total={laporan['blm balas'].toLocaleString()} title={"Blm Balas"} />
              <ContainerLaporan total={laporan['blm japri'].toLocaleString()} title={"Blm Japri"} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}