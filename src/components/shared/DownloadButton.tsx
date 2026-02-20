"use client";

import React from "react";
import moment from 'moment';
import 'moment/locale/id';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import SettingService from "@/services/controlers/setting/setting.service";
import { PressReleaseType } from "@/services/controlers/press-release/pressRelease.type";
import { Document, Packer, Paragraph, TextRun, ImageRun } from 'docx';

export default function DownloadButton({
  article,
  paragraphs,
  contentImageUrl
} : { article: PressReleaseType | undefined, paragraphs: string[], contentImageUrl: { title: string; link: string }[] }) {
  const handleDownloadZip = async () => {
    const zip = new JSZip();
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    const logoURL = await SettingService.getSetting(`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`);
    const logoResponse = await fetch(logoURL?.data?.value?.imageUrl);
    const logoBlob = await logoResponse.blob();
    const logoArrayBuffer = await logoBlob.arrayBuffer();

    const uint8Array = new Uint8Array(logoArrayBuffer);
    const logoWidth = 25;
    const logoHeight = 25;
    const logoX = 20; 
    const logoY = 20; 
    pdf.addImage(uint8Array, 'JPEG', logoX, logoY, logoWidth, logoHeight);

    let yOffset = 20; 
    const pageHeight = 297 - 40; 
    const margin = 20;
    const lineHeight = 6;
    const maxWidth = 170;

    // Header styling (PDF)
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SIARAN PERS', 105, yOffset + 5, { align: 'center' });
    yOffset += 10;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('PEMERINTAH KABUPATEN MUARA ENIM', 105, yOffset + 5, { align: 'center' });
    yOffset += 10;

    pdf.setFontSize(12);
    pdf.text('(Press Release)', 105, yOffset + 5, { align: 'center' });
    yOffset += 20;

    // Title styling (PDF)
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(article?.title ?? "Artikel Tidak Ditemukan", maxWidth);
    pdf.text(titleLines, margin, yOffset + 5);
    yOffset += (titleLines.length * lineHeight) + 10;

    // Date styling (PDF)
    pdf.setFontSize(12);
    const dateText = moment(article?.published_at ?? "").locale('id').format('dddd, D MMMM YYYY');
    pdf.text(dateText, margin, yOffset + 5);
    yOffset += lineHeight + 5;

    // Paragraphs styling with justification (PDF)
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    paragraphs.forEach((para) => {
      const cleanText = para.replace(/<[^>]+>/g, '');
      const lines = pdf.splitTextToSize(cleanText, maxWidth);
      lines.forEach((line: string) => {
        if (yOffset > pageHeight) {
          pdf.addPage();
          yOffset = 20; 
        }
        pdf.text(line, margin, yOffset + 5, { align: 'justify' });
        yOffset += lineHeight;
      });
      yOffset += 5; 
    });

    // Footer styling (PDF)
    if (yOffset > pageHeight) {
      pdf.addPage();
      yOffset = 20;
    }
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Dinas Kominfo SP Pemkab Muara Enim', margin, yOffset + 5);
    yOffset += lineHeight;

    pdf.setFont('helvetica', 'normal');
    pdf.text('Website: https://muaraenimkab.go.id/press-release', margin, yOffset + 5);
    yOffset += lineHeight;
    pdf.text('Facebook: Pemkab Muara Enim', margin, yOffset + 5);
    yOffset += lineHeight;
    pdf.text('Instagram: @pemkab_muaraenim', margin, yOffset + 5);

    zip.file(`press-release-${article?.slug}.pdf`, pdf.output('blob'));

    // Membuat dokumen Word
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: logoArrayBuffer,
                transformation: {
                  width: 100,
                  height: 100,
                },
              } as never),
              new TextRun({
                text: 'SIARAN PERS',
                bold: true,
                size: 24 * 2, // Konversi pt ke half-point
              }),
            ],
            alignment: 'center',
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'PEMERINTAH KABUPATEN MUARA ENIM',
                size: 14 * 2,
              }),
            ],
            alignment: 'center',
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '(Press Release)',
                size: 12 * 2,
              }),
            ],
            alignment: 'center',
          }),
          new Paragraph({
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: article?.title ?? "Artikel Tidak Ditemukan",
                bold: true,
                size: 18 * 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: dateText,
                size: 12 * 2,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
          }),
          ...paragraphs.map(para => new Paragraph({
            children: [
              new TextRun({
                text: para.replace(/<[^>]+>/g, ''),
                size: 11 * 2,
              }),
            ],
            alignment: 'both', // Justifikasi di Word
          })),
          new Paragraph({
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Dinas Kominfo SP Pemkab Muara Enim',
                bold: true,
                size: 10 * 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Website: https://muaraenimkab.go.id/press-release',
                size: 10 * 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Facebook: Pemkab Muara Enim',
                size: 10 * 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Instagram: @pemkab_muaraenim',
                size: 10 * 2,
              }),
            ],
          }),
        ],
      }],
    });

    // Menyimpan dokumen Word ke ZIP
    const docBlob = await Packer.toBlob(doc);
    zip.file(`press-release-${article?.slug}.docx`, docBlob);

    // Menambahkan gambar ke ZIP
    const imagePromises = contentImageUrl.map(async (img, index) => {
      const response = await fetch(img.link);
      const blob = await response.blob();
      zip.file(`image_${index + 1}.jpg`, blob);
    });
    await Promise.all(imagePromises);

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'press-release-files.zip');
  };

  return (
    <button
      onClick={handleDownloadZip}
      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Download ZIP
    </button>
  );
}