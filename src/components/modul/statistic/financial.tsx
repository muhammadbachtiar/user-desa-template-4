"use client"
import type React from "react"

import { useState } from "react"
import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaChartLine,
  FaExclamationTriangle,
  FaFilter,
  FaCalendarAlt,
} from "react-icons/fa"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import HeadingBadge from "@/components/shared/headingBadge"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement)

const monthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
  datasets: [
    {
      label: "Pemasukan",
      data: [15000000, 18000000, 22000000, 25000000, 20000000, 18000000, 22000000, 28000000, 23000000, 20000000],
      backgroundColor: "rgba(16, 185, 129, 0.7)",
      borderColor: "rgb(16, 185, 129)",
      borderWidth: 1,
    },
    {
      label: "Pengeluaran",
      data: [12000000, 16000000, 19000000, 22000000, 25000000, 24000000, 26000000, 30000000, 35000000, 40000000],
      backgroundColor: "rgba(239, 68, 68, 0.7)",
      borderColor: "rgb(239, 68, 68)",
      borderWidth: 1,
    },
  ],
}

const pemasukanData = [
  {
    id: 1,
    tanggal: "20/08/2024",
    kategori: "Bantuan Keuangan Kabupaten/Kota",
    jumlah: 45643652,
    keterangan: "Dana Alokasi Umum",
  },
  { id: 2, tanggal: "15/07/2024", kategori: "Dana Desa", jumlah: 38500000, keterangan: "Pencairan Tahap 2" },
  { id: 3, tanggal: "10/06/2024", kategori: "Pendapatan Asli Desa", jumlah: 12500000, keterangan: "Sewa Tanah Desa" },
  { id: 4, tanggal: "05/05/2024", kategori: "Bantuan Provinsi", jumlah: 25000000, keterangan: "Program Pembangunan" },
  { id: 5, tanggal: "01/04/2024", kategori: "Dana Desa", jumlah: 42000000, keterangan: "Pencairan Tahap 1" },
  {
    id: 6,
    tanggal: "15/03/2024",
    kategori: "Pendapatan Asli Desa",
    jumlah: 8500000,
    keterangan: "Retribusi Pasar Desa",
  },
]

const pengeluaranData = [
  { id: 1, tanggal: "15/09/2024", kategori: "Bantuan Sosial", jumlah: 29875557, keterangan: "Bantuan Langsung Tunai" },
  { id: 2, tanggal: "10/09/2024", kategori: "Pembangunan", jumlah: 28500000, keterangan: "Perbaikan Jalan Desa" },
  { id: 3, tanggal: "25/08/2024", kategori: "Operasional", jumlah: 15750000, keterangan: "Gaji Perangkat Desa" },
  { id: 4, tanggal: "20/08/2024", kategori: "Pembangunan", jumlah: 27500000, keterangan: "Renovasi Balai Desa" },
  { id: 5, tanggal: "15/08/2024", kategori: "Kesehatan", jumlah: 18500000, keterangan: "Program Posyandu" },
  { id: 6, tanggal: "05/08/2024", kategori: "Pendidikan", jumlah: 22500000, keterangan: "Beasiswa Anak Desa" },
]

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const Financial = () => {

  const [timeFilter, setTimeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("bar")
  const [activeTransactionTab, setActiveTransactionTab] = useState("pemasukan")

  const totalPemasukan = 211605776
  const totalPengeluaran = 249495846
  const saldoDesa = totalPemasukan - totalPengeluaran
  const isDeficit = saldoDesa < 0

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line"> | TooltipItem<"bar">) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += formatRupiah(context.parsed.y)
            }
            return label
          },
        },
      },
    }
  }

  const handleTimeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFilter(e.target.value)
  }
    
  
    return (
       <>
          <div className="w-full dark:bg-gray-700 rounded-2xl min-h-[400px] flex flex-col items-start space-y-6">
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                    <HeadingBadge title="Kependudukan Desa"/>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <p className="text-gray-600 mb-2">Statistik keuangan desa dalam berbagai periode</p>
                      <p className="text-sm text-gray-500">
                        Menampilkan data keuangan untuk periode <span className="font-medium">Semua Waktu</span>.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <FaFilter className="mr-2 text-blue-600" />
                      <select
                        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={timeFilter}
                        onChange={handleTimeFilterChange}
                      >
                        <option value="all">Semua Waktu</option>
                        <option value="2024">Tahun 2024</option>
                        <option value="q3-2024">Q3 2024</option>
                        <option value="q2-2024">Q2 2024</option>
                        <option value="q1-2024">Q1 2024</option>
                        <option value="2023">Tahun 2023</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Income */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <div className="text-sm font-medium text-gray-500 mb-2">Total Pemasukan</div>
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                          <FaArrowUp className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{formatRupiah(totalPemasukan)}</p>
                          <p className="text-xs text-gray-400">Seluruh pemasukan desa</p>
                        </div>
                      </div>
                    </div>

                    {/* Total Expenditure */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <div className="text-sm font-medium text-gray-500 mb-2">Total Pengeluaran</div>
                      <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-full mr-3">
                          <FaArrowDown className="text-red-500" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-500">{formatRupiah(totalPengeluaran)}</p>
                          <p className="text-xs text-gray-400">Seluruh pengeluaran desa</p>
                        </div>
                      </div>
                    </div>

                    {/* Village Balance */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <div className="text-sm font-medium text-gray-500 mb-2">Saldo Desa</div>
                      <div className="flex items-center">
                        <div className={`p-2 ${isDeficit ? "bg-blue-100" : "bg-blue-100"} rounded-full mr-3`}>
                          <FaWallet className={isDeficit ? "text-blue-500" : "text-blue-500"} />
                        </div>
                        <div>
                          <p className={`text-2xl font-bold ${isDeficit ? "text-blue-500" : "text-blue-600"}`}>
                            {formatRupiah(saldoDesa)}
                          </p>
                          <p className="text-xs text-gray-400">Saldo keuangan semua waktu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center mb-4">
                      <FaChartLine className="mr-2 text-blue-600" />
                      <h2 className="text-lg font-semibold">Grafik Keuangan</h2>
                    </div>

                    <div className="mb-4">
                      <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                            activeTab === "bar"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveTab("bar")}
                        >
                          Bar Chart
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                            activeTab === "line"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveTab("line")}
                        >
                          Line Chart
                        </button>
                      </div>
                    </div>

                    <div className="h-80">
                      {activeTab === "bar" ? (
                        <Bar data={monthlyData} options={chartOptions} />
                      ) : (
                        <Line data={monthlyData} options={chartOptions} />
                      )}
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                        <HeadingBadge title="Informasi Keuangan"/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="px-6 py-3 border-b flex items-center">
                          <FaArrowUp className="mr-2 text-blue-500" />
                          <h3 className="text-sm font-medium">Transaksi Pemasukan Terbesar</h3>
                        </div>
                        <div className="p-6">
                          <p className="text-xl font-bold text-blue-600 mb-1">{formatRupiah(45643652)}</p>
                          <p className="text-sm font-medium">Bantuan Keuangan Kabupaten/Kota</p>
                          <div className="flex items-center mt-2">
                            <FaCalendarAlt className="text-gray-400 mr-2 text-xs" />
                            <p className="text-xs text-gray-500">20/08/2024</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="px-6 py-3 border-b flex items-center">
                          <FaArrowDown className="mr-2 text-red-500" />
                          <h3 className="text-sm font-medium">Transaksi Pengeluaran Terbesar</h3>
                        </div>
                        <div className="p-6">
                          <p className="text-xl font-bold text-red-500 mb-1">{formatRupiah(29875557)}</p>
                          <p className="text-sm font-medium">Bantuan Sosial</p>
                          <div className="flex items-center mt-2">
                            <FaCalendarAlt className="text-gray-400 mr-2 text-xs" />
                            <p className="text-xs text-gray-500">15/09/2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <div className="w-1.5 h-12 bg-blue-600 rounded-sm mr-4"></div>
                      <h2 className="text-blue-700 font-bold text-lg flex items-center">
                        <FaChartLine className="mr-2" /> Ringkasan Status Keuangan
                      </h2>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                      <div className="flex items-start">
                        <FaExclamationTriangle className="text-red-500 mt-0.5 mr-2" />
                        <div>
                          <h3 className="font-medium text-red-800">Kondisi keuangan desa dalam keadaan defisit</h3>
                          <p className="text-red-700">Defisit sebesar {formatRupiah(Math.abs(saldoDesa))}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                      <div className="flex items-start">
                        <FaExclamationTriangle className="text-amber-500 mt-0.5 mr-2" />
                        <div>
                          <h3 className="font-medium text-amber-800">Tren keuangan perlu perhatian</h3>
                          <p className="text-amber-700">Pemasukan lebih kecil dari pengeluaran.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                            activeTransactionTab === "pemasukan"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveTransactionTab("pemasukan")}
                        >
                          Pemasukan
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                            activeTransactionTab === "pengeluaran"
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveTransactionTab("pengeluaran")}
                        >
                          Pengeluaran
                        </button>
                      </div>
                      <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
                        <FaFilter className="mr-2 h-3 w-3" /> Filter
                      </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
                      {activeTransactionTab === "pemasukan" ? (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tanggal
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Kategori
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Keterangan
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Jumlah
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {pemasukanData.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.tanggal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {item.kategori}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.keterangan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-blue-600">
                                  {formatRupiah(item.jumlah)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tanggal
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Kategori
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Keterangan
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Jumlah
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {pengeluaranData.map((item) => (
                              <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.tanggal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    {item.kategori}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.keterangan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                                  {formatRupiah(item.jumlah)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
            </div>
          </div>
       </>
  );
};

export default Financial;