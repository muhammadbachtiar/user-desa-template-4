'use client'

import HeadingBadge from "../../shared/headingBadge";
import RichTextContent from "../../shared/RichTextContent";

const History = () => {

    const visi= `   <div>
                        <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 10px;">
                        Kerajaan Sriwijaya
                        </h2>
                        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
                        Kerajaan maritim yang pernah berjaya di Asia Tenggara pada abad ke-7 hingga ke-13. 
                        Sriwijaya dikenal sebagai pusat perdagangan dan penyebaran agama Buddha.
                        </p>
                        <img 
                        src="http://3.bp.blogspot.com/-wnrkShr8Cdo/VPBWGf24RLI/AAAAAAAABa8/cj0NNr6euE8/s1600/sriwijaya%2B4.jpg" 
                        alt="Kerajaan Sriwijaya" 
                        style="width: 100%; max-width: 600px; border-radius: 8px; margin-top: 10px;"
                        />
                    </div>
                    <div style="margin-top: 20px;">
                        <h2 style="color: #2c3e50; font-size: 24px; margin-bottom: 10px;">
                        Pendudukan Belanda
                        </h2>
                        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
                        Periode penjajahan Belanda di wilayah Sumatra Selatan berlangsung dari tahun 1602 hingga 1942, 
                        memberikan dampak besar pada sejarah dan budaya lokal.
                        </p>
                    </div>`
  
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                <HeadingBadge title="Sejarah"/>
            </div>
            <div className="w-full">
                <RichTextContent 
                    content={visi} 
                    className="px-4" 
                />
            </div>
        </div>
  );
};

export default History;