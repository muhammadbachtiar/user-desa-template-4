'use client'

import HeadingBadge from "../../shared/headingBadge";
import Image from "next/image";
import useStructure from "@/hooks/contents/useStructure";
import { FaWhatsapp } from "react-icons/fa6";
import OrgChart from "@balkangraph/orgchart.js";
import { useEffect } from "react";

const Structure = () => {
    // const { data: structure, isLoading, isFetching, refetch, isError } = useStructure();
    const { data: structure } = useStructure();

    useEffect(() => {
       new OrgChart("#tree", {
            template: "olivia",
            layout: OrgChart.mixed,
            enableAI: false,
            enableSearch: false,
            mouseScrool: OrgChart.action.ctrlZoom,
            editForm: {readOnly: true},
            menu: {
                pdfPreview: {
                    text: "PDF Preview",
                    icon: OrgChart.icon.pdf(24, 24, '#7A7A7A')
                },
                pdf: { text: "Export PDF" },
                png: { text: "Export PNG" },
                svg: { text: "Export SVG" },
                csv: { text: "Export CSV" }
            },
            nodeMenu: {
                pdf: { text: "Export PDF" },
                png: { text: "Export PNG" },
                svg: { text: "Export SVG" }
            },
            nodeBinding: {
                field_0: "name",
                field_1: "title",
                img_0: "img"
            },
            nodes: structure.value
        });
        
      }, [structure.value]);
  
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                <HeadingBadge title="Struktur Aparat Desa"/>
            </div>
            <div className="w-full">
                <div className="relative border-2">
                    <div id="tree" className="aspect-[16/9] relative" />
                </div>
            </div>
            <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                <HeadingBadge title="Daftar Aparat Desa"/>
            </div>
            <div className="w-full grid grid-cols-12">
                {structure.value.map((official, index) => (
                    <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 w-full p-3">
                        <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="relative h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                <Image
                                    className="w-full h-64 object-cover shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 ease-in-out"
                                    src={official.img || 'https://via.placeholder.com/150'}
                                    alt={`${official.name}'s photo`}
                                    width={96}
                                    height={96}
                                    sizes="(max-width: 768px) 96px, 96px"
                                    priority
                                />
                                <div className="absolute w-full h-64 bg-gradient-to-br from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight line-clamp-1">
                                {official.name}
                                </h3>
                                <p className="text-base font-medium text-blue-600 dark:text-blue-300 mt-1">
                                {official.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                                {official.activeYears}
                                </p>
                                <div className="mt-4 flex justify-start">
                                <a
                                    href={`https://wa.me/${official.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Contact ${official.name} via WhatsApp`}
                                    className="flex items-center gap-2 text-[#25D366] dark:text-[#4ADE80] hover:bg-green-50 dark:hover:bg-green-900/20 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    <FaWhatsapp className="w-5 h-5" />
                                    <span>Contact</span>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
};

export default Structure;