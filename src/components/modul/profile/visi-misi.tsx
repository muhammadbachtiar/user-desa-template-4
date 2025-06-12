'use client'

import HeadingBadge from "../../shared/headingBadge";
import RichTextContent from "../../shared/RichTextContent";

const VisiMisi = () => {

    const visi= `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2E86C1; text-align: center; border-bottom: 2px solid #2E86C1; padding-bottom: 10px;">Visi</h2>
                    <p style="text-indent: 20px; font-size: 16px;">
                        Menjadi daerah yang <strong>unggul</strong> dalam segala aspek kehidupan, 
                        berlandaskan nilai-nilai <em>keadilan, keberlanjutan, dan inovasi</em>, serta 
                        mampu memberikan kontribusi signifikan bagi kesejahteraan masyarakat dan 
                        pembangunan nasional.
                    </p>
                </div>`
    const misi= `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #2E86C1; text-align: center; border-bottom: 2px solid #2E86C1; padding-bottom: 10px;">Misi</h2>
                    <ol style="padding-left: 40px; font-size: 16px;">
                        <li>Meningkatkan mutu pendidikan dan kesehatan masyarakat secara menyeluruh.</li>
                        <li>Mendorong pertumbuhan ekonomi berbasis teknologi dan inovasi.</li>
                        <li>Melestarikan budaya lokal dan meningkatkan pariwisata berwawasan lingkungan.</li>
                        <li>Memastikan pengelolaan sumber daya alam yang berkelanjutan dan bertanggung jawab.</li>
                        <li>Memperkuat tata kelola pemerintahan yang transparan, efektif, dan akuntabel.</li>
                        <li>Memperkokoh solidaritas sosial untuk menciptakan masyarakat yang damai dan harmonis.</li>
                    </ol>
                </div>`
  
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                <HeadingBadge title="Visi"/>
            </div>
            <div className="w-full">
                <RichTextContent 
                    content={visi} 
                    className="px-4" 
                />
            </div>
            <div className="flex flex-col items-start gap-6 p-3 md:p-6 ">
                <HeadingBadge title="Misi"/>
            </div>
            <div className="w-full">
                <RichTextContent 
                    content={misi} 
                    className="px-4" 
                />
            </div>
        </div>
  );
};

export default VisiMisi;