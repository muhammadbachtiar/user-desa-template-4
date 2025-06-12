"use client"
import {
  FaUsers,
  FaVenusMars,
  FaHome,
  FaMale,
  FaFemale,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, TooltipItem, ChartOptions } from "chart.js"
import { Doughnut, Bar } from "react-chartjs-2"
import HeadingBadge from "@/components/shared/headingBadge"
import { BsBarChartFill } from "react-icons/bs";
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels)

const Demography = () => {

    const genderData = {
        labels: ["Laki-laki", "Perempuan"],
        datasets: [
          {
            data: [61, 39],
            backgroundColor: ["#5555FF", "#FF55AA"],
            borderColor: ["white", "white"],
            borderWidth: 1,
            hoverOffset: 4,
          },
        ],
      }
    
      const ageData = {
        labels: [
          "Balita (0-5)",
          "Anak (6-12)",
          "Remaja (13-18)",
          "Dewasa Muda (19-30)",
          "Dewasa (31-45)",
          "Paruh Baya (46-60)",
          "Lansia (>60)",
        ],
        datasets: [
          {
            label: "Jumlah Penduduk",
            data: [1, 2, 1, 3, 7, 4, 5],
            backgroundColor: [
              "#22DDAA", // Balita
              "#FFBB33", // Anak
              "#FF6677", // Remaja
              "#9966FF", // Dewasa Muda
              "#44DD88", // Dewasa
              "#FF8844", // Paruh Baya
              "#55AAFF", // Lansia
            ],
            borderWidth: 0,
          },
        ],
      }
    
      const educationData = {
        labels: ["SD", "SMP", "SMA", "D3", "S1", "S2/S3"],
        datasets: [
          {
            data: [20, 15, 30, 10, 15, 10],
            backgroundColor: [
              "#66AAFF", // SD
              "#7755FF", // SMP
              "#FF66AA", // SMA
              "#FFAA33", // D3
              "#33DD88", // S1
              "#FF5555", // S2/S3
            ],
            borderColor: ["#66AAFF", "#7755FF", "#FF66AA", "#FFAA33", "#33DD88", "#FF5555"],
            borderWidth: 1,
            hoverOffset: 4,
          },
        ],
      }
    
      const occupationData = {
        labels: ["Petani", "Ibu Rumah Tangga", "Guru", "Karyawan Swasta", "Pedagang", "Nelayan"],
        datasets: [
          {
            data: [35, 20, 10, 15, 15, 5],
            backgroundColor: [
              "#FF8833", // Petani
              "#3388FF", // Ibu Rumah Tangga
              "#8855FF", // Guru
              "#FF5577", // Karyawan Swasta
              "#33DDCC", // Pedagang
              "#BBAA33", // Nelayan
            ],
            borderColor: ["#FF8833", "#3388FF", "#8855FF", "#FF5577", "#33DDCC", "#BBAA33"],
            borderWidth: 1,
            hoverOffset: 4,
          },
        ],
      }
      
      const doughnutOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            color: '#ffffff',
            font: {
              weight: 'normal',
              size: 16,
            },
            textAlign: 'center',
            anchor: 'center',
            align: 'center',
            offset: 0,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context: TooltipItem<"doughnut">) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                const percentage = ((value / total) * 100).toFixed(0);
                return `${label}: ${percentage}%`;
              },
            },
          },
        },
      };

      const barOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
          },
        },
      }
    
  
    return (
       <>
        <div className="w-full dark:bg-gray-700 rounded-2xl min-h-[400px] flex flex-col items-start space-y-6">
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                    <HeadingBadge title="Kependudukan Desa"/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                        <FaUsers className="text-emerald-500 text-xl" />
                        </div>
                        <div className="ml-4">
                        <p className="text-gray-500 text-sm">Total Penduduk</p>
                        <h2 className="text-4xl font-bold text-emerald-600">23</h2>
                        <p className="text-xs text-gray-400 mt-1">Jumlah warga tercatat di desa</p>
                        </div>
                    </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                        <div className="p-2 bg-blue-100 rounded-lg">
                        <FaVenusMars className="text-blue-500 text-xl" />
                        </div>
                        <div className="ml-4">
                        <p className="text-gray-500 text-sm">Rasio Gender</p>
                        <h2 className="text-2xl font-bold">
                            <span className="text-blue-600">61%</span> : <span className="text-pink-500">39%</span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Perbandingan laki-laki dan perempuan</p>
                        </div>
                    </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start">
                        <div className="p-2 bg-orange-100 rounded-lg">
                        <FaHome className="text-orange-500 text-xl" />
                        </div>
                        <div className="ml-4">
                        <p className="text-gray-500 text-sm">Kepala Keluarga</p>
                        <h2 className="text-4xl font-bold text-orange-500">5</h2>
                        <p className="text-xs text-gray-400 mt-1">Total KK tercatat di desa</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                    <HeadingBadge title="Grafik Demografi"/>
                </div>
                <div className="w-full dark:bg-gray-700 rounded-2xl min-h-[400px] flex flex-col items-center space-y-6">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-gray-700 font-semibold mb-4 flex items-center">
                                <FaVenusMars className="mr-2 text-blue-500" /> Distribusi Jenis Kelamin
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="w-64 h-64 relative">
                                    <Doughnut data={genderData} options={doughnutOptions} />
                                </div>
                                <div className="flex justify-center mt-4 space-x-6">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                    <span className="text-sm flex items-center">
                                    <FaMale className="mr-1 text-blue-500" /> Laki-laki
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                                    <span className="text-sm flex items-center">
                                    <FaFemale className="mr-1 text-pink-500" /> Perempuan
                                    </span>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-gray-700 font-semibold mb-4 flex items-center">
                                <BsBarChartFill className="mr-2 text-blue-500" /> Kelompok Umur
                            </h3>
                            <div className="h-full">
                                <Bar data={ageData} options={barOptions} />
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-gray-700 font-semibold mb-4 flex items-center">
                                <FaGraduationCap className="mr-2 text-blue-500" /> Tingkat Pendidikan
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="w-64 h-64 relative">
                                    <Doughnut data={educationData} options={doughnutOptions} />
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-4 w-full">
                                {educationData.labels.map((label, index) => (
                                    <div key={index} className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: educationData.datasets[0].backgroundColor[index] }}
                                    ></div>
                                    <span className="text-xs">{label}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-gray-700 font-semibold mb-4 flex items-center">
                                <FaBriefcase className="mr-2 text-blue-500" /> Pekerjaan
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="w-64 h-64 relative">
                                    <Doughnut data={occupationData} options={doughnutOptions} />
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-4 w-full">
                                {occupationData.labels.map((label, index) => (
                                    <div key={index} className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: occupationData.datasets[0].backgroundColor[index] }}
                                    ></div>
                                    <span className="text-xs">{label}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </>
  );
};

export default Demography;