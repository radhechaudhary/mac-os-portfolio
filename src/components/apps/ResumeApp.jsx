import React from 'react';
import { FileText, Download, ExternalLink, Printer, Sparkles } from 'lucide-react';
import resumePdf from '../../../assets/resume.pdf';
import { sounds } from '../../utils/sound';

export default function ResumeApp({ theme }) {
  const isLight = theme === 'light';
  const pdfUrl = resumePdf || '/resume.pdf';

  const handlePrint = () => {
    sounds.playClick();
    const win = window.open(pdfUrl, '_blank');
    if (win) {
      win.focus();
      win.print();
    }
  };

  return (
    <div className={`h-full flex flex-col transition-colors ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
      {/* Top PDF Controls Bar */}
      <div className={`flex items-center justify-between p-3 rounded-xl border mb-3 shadow-sm ${
        isLight ? 'bg-slate-200/80 border-black/10' : 'bg-slate-800/80 border-white/10'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold truncate">resume.pdf</h3>
            <p className="text-[11px] opacity-75">Official Document • PDF Viewer</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/60 transition-colors text-xs font-medium flex items-center gap-1.5"
            title="Print PDF"
          >
            <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Print</span>
          </button>
          
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => sounds.playClick()}
            className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/60 transition-colors text-xs font-medium flex items-center gap-1.5"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" /> <span className="hidden sm:inline">Open Tab</span>
          </a>

          <a
            href={pdfUrl}
            download="Resume.pdf"
            onClick={() => sounds.playClick()}
            className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md text-xs font-bold flex items-center gap-1.5 hover:scale-105"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>

      {/* Embedded PDF Document Display */}
      <div className="flex-1 w-full h-full rounded-xl overflow-hidden border shadow-inner bg-slate-900 relative">
        <object
          data={`${pdfUrl}#toolbar=1`}
          type="application/pdf"
          className="w-full h-full rounded-xl"
        >
          <iframe
            src={`${pdfUrl}#toolbar=1`}
            title="Resume PDF Viewer"
            className="w-full h-full border-0 rounded-xl"
          >
            <div className="p-8 text-center space-y-4 text-white">
              <p>Your browser doesn't support embedded PDFs directly.</p>
              <a
                href={pdfUrl}
                download="Resume.pdf"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold inline-block"
              >
                Download Resume.pdf
              </a>
            </div>
          </iframe>
        </object>
      </div>
    </div>
  );
}
