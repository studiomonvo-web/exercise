export interface ModuleSlugInfo {
  slugTitle: string;
  category: string;
  summaryId: string;
  tipsAndTricks: string[];
  instantTemplates: {
    label: string;
    description: string;
    content: string;
    fileName?: string;
  }[];
}

export const INDONESIAN_SLUGS: Record<string, ModuleSlugInfo> = {
  dashboard: {
    slugTitle: "Dasbor Kinerja & Pemantauan Shift",
    category: "Ringkasan Operasional Harian",
    summaryId: "Pusat kendali metrik SLA, CSAT pelanggan, tingkat penyelesaian tiket, dan kepatuhan shift kerja jarak jauh.",
    tipsAndTricks: [
      "Perhatikan kotak 'Pending Work Orders' untuk melihat tugas yang mendekati batas waktu tenggat.",
      "Cek 'Incoming Support Queue' untuk memprioritaskan tiket berstatus 'Urgent' agar tidak melewati batas SLA 15 menit.",
      "Gunakan tombol navigasi cepat di bawah untuk langsung menuju 5-Day Residency atau Kurikulum 50 Kursus."
    ],
    instantTemplates: []
  },
  courses: {
    slugTitle: "Kurikulum 50 Kursus Operasional Remote",
    category: "Pusat Pembelajaran & Penugasan Nyata",
    summaryId: "Pelatihan komprehensif 10 departemen operasional dari Level 01 hingga Level 10 dengan dataset bisnis nyata.",
    tipsAndTricks: [
      "Buka detail kursus mana pun untuk melihat skenario bisnis, SOP terkait, dan dataset terlampir.",
      "Tidak perlu mengetik dari nol: gunakan tombol 'Muat Template Solusi Resmi' di dalam form pengumpulan.",
      "Unduh dataset XLSX dengan sekali klik, atau buka langsung di 'Spreadsheet Workspace'."
    ],
    instantTemplates: [
      {
        label: "Template Memo Kesiapan Kerja (SOP-06)",
        description: "Format standar kesiapan workstation & jadwal shift remote",
        content: "MEMORANDUM RESMI OPERASIONAL\nKEPADA: Sarah Jenkins, Direktur Operasional & QA Lead\nDARI: Alex Mercer, Spesialis Operasional Remote (NX-TR-4091)\nHAL: Kepatuhan Workstation & Rencana Kontinjensi Shift\n\n1. Verifikasi Perangkat: Monitor ganda 27 inci terpasang, koneksi fiber 350 Mbps dengan latensi 12ms stabil, headset peredam bising bersertifikasi.\n2. Rencana Darurat (Failover): Hotspot 5G seluler sekunder aktif otomatis dalam 3 menit jika ISP terputus. Notifikasi instan dikirim via SMS gateway Slack.\n3. Jadwal Shift Resmi: 08:30 - 17:00 CST (Senin - Jumat) dengan istirahat terencana 45 menit pukul 12:30 CST sesuai SOP-06.",
        fileName: "memo_kesiapan_workstation_alex_mercer.pdf"
      },
      {
        label: "Template Audit Privasi PII & Penolakan 3-Poin (SOP-05)",
        description: "Format audit kepatuhan GDPR & skrip verifikasi identitas",
        content: "LAPORAN AUDIT PRIVASI PII & PCI-DSS (SOP-05)\n\nHASIL AUDIT TRANSKRIP:\n- Transkrip #1: Lulus (Verifikasi Kode Pos Billing & No Pesanan sebelum akses).\n- Transkrip #2: Pelanggaran Berat (Agen meminta nomor kartu kredit lengkap di chat biasa). Wajib dibersihkan segera.\n- Transkrip #3: Lulus (Menolak membuka alamat kirim ke pihak ketiga tanpa kuasa).\n- Transkrip #4: Pelanggaran Berat (Kode CVV tercatat di internal notes. Wajib di-purge).\n\nSKRIP PENOLAKAN AKSES STANDAR:\n'Demi melindungi keamanan data pribadi pemegang akun berdasarkan regulasi privasi internasional, kami tidak dapat mengubah data pengiriman atau memberikan rincian transaksi kepada pihak ketiga tanpa verifikasi identitas 3-poin. Pemegang akun resmi dapat menghubungi kami langsung atau mendaftarkan perwakilan resmi melalui portal akun terverifikasi.'",
        fileName: "laporan_audit_privasi_pii_sop05.xlsx"
      },
      {
        label: "Template De-eskalasi HEAT Pelanggan Marah (SOP-04)",
        description: "Skrip Hear, Empathize, Apologize, Take Action",
        content: "RESPONS RESMI DE-ESKALASI PELANGGAN (MODEL HEAT)\n\nKepada Pelanggan Yang Terhormat,\n\nTerima kasih telah menyampaikan kendala ini kepada kami. Saya memahami sepenuhnya kekecewaan dan rasa frustrasi Anda atas keterlambatan pengiriman monitor ini. Atas nama manajemen Nexora, saya memohon maaf yang sebesar-besarnya atas ketidaknyamanan yang terjadi.\n\nSaya mengambil alih kasus ini secara pribadi dan bertanggung jawab penuh untuk memastikan Anda menerima hak Anda hari ini. Saya telah menerbitkan Pesanan Pengganti Prioritas ($0) dengan kurir kilat semalam. Nomor pelacakan baru akan aktif dalam 2 jam kerja.\n\nSebagai bentuk apresiasi atas kesabaran Anda, kami juga menambahkan saldo kredit $20 ke dompet Nexora Anda.\n\nHormat kami,\nAlex Mercer - Nexora Operations Specialist",
        fileName: "de_eskalasi_heat_kasus_pelanggan.docx"
      }
    ]
  },
  assignments: {
    slugTitle: "Mesin Perintah Kerja & Evaluasi Manajer",
    category: "Pelacakan & Pengumpulan Deliverable",
    summaryId: "Antarmuka perintah kerja resmi di mana manajer mengeluarkan instruksi dan mengevaluasi deliverable kerja.",
    tipsAndTricks: [
      "Pilih 'Open' pada penugasan mana pun untuk melihat rincian instruksi manajer dan rubrik penilaian 100 poin.",
      "Gunakan tombol 'Klik untuk Masukkan Solusi Cepat' di formulir pengumpulan untuk mengisi narasi deliverable secara instan.",
      "Jika berstatus 'Revision Required', periksa catatan koreksi manajer dan perbarui respons Anda."
    ],
    instantTemplates: [
      {
        label: "Solusi Cepat: Laporan Pembersihan Data Pelanggan",
        description: "Format otomatis hasil cleansing dataset pelanggan di Sheets",
        content: "LAPORAN HASIL PEMBERSIHAN DATASET PELANGGAN (EXCEL OPERATIONS)\n\n1. Jumlah Akun Terverifikasi: 25 akun (Rumus: =COUNTA(A2:A26))\n2. Total Pendapatan Tercatat: $81,385.45 (Rumus: =SUM(E2:E26))\n3. Rata-rata Belanja per Akun: $3,255.42 (Rumus: =AVERAGE(E2:E26))\n4. Jumlah Pelanggan Gold VIP: 8 akun (Rumus: =COUNTIF(C2:C26, \"Gold VIP\"))\n5. Tindakan Cleansing: Spasi ganda dihapus (TRIM), penyeragaman nomor telepon ke format E.164, deteksi duplikasi ID selesai.",
        fileName: "nexora_customer_database_cleansed_master.xlsx"
      },
      {
        label: "Solusi Cepat: Rekonsiliasi Retur & Restocking Fee (SOP-01)",
        description: "Perhitungan otomatis pemotongan biaya retur",
        content: "LEMBAR PERHITUNGAN RETUR & RESTOCKING FEE (SOP-01)\n\n- Total Klaim Retur Dianalisis: 20 Kasus\n- Total Nominal Refund: $3,450.40 (Rumus: =SUM(D2:D21))\n- Retur Alasan Barang Rusak: 5 kasus (Ditanggung perusahaan 100% tanpa biaya pengembalian)\n- Retur Penyesalan Pembeli: 7 kasus (Dikenakan restocking fee 10% atau biaya label $5.99)\n- Kasus Memerlukan Override Manajer (> $250.00): 4 kasus telah diteruskan ke Supervisor Sarah Jenkins.",
        fileName: "rekonsiliasi_refund_restocking_fee.xlsx"
      }
    ]
  },
  tickets: {
    slugTitle: "Meja Tiket Layanan Pelanggan & SLA Radar",
    category: "Simulasi Omnichannel Zendesk/Freshdesk",
    summaryId: "Kelola kasus pelanggan nyata dengan radar batas waktu SLA, pelacakan kurir, dan catatan internal tim.",
    tipsAndTricks: [
      "Klik tiket mana saja di sebelah kiri untuk membuka riwayat obrolan dan data pesanan pelanggan.",
      "Gunakan dropdown 'Insert Canned Macro' untuk memasukkan permohonan maaf HEAT, otorisasi retur, atau verifikasi PII sekali klik.",
      "Pilih tab 'Internal Note' jika ingin menulis catatan rahasia antar divisi (@warehouse-lead) tanpa terlihat oleh pelanggan."
    ],
    instantTemplates: []
  },
  spreadsheet: {
    slugTitle: "Ruang Kerja Spreadsheet & Formula Otomatis",
    category: "Simulasi Excel & Google Sheets Terintegrasi",
    summaryId: "Olah data transaksi, retur, SLA, dan kepuasan pelanggan secara interaktif dengan formula engine dan ekspor XLSX.",
    tipsAndTricks: [
      "Gunakan chip rumus di panel kanan (=SUM, =AVERAGE, =COUNTIF, =SUMIF) untuk memasukkan rumus secara instan.",
      "Klik tombol 'Calculate' untuk menghitung hasil seketika.",
      "Klik 'Submit Output to Work Order' untuk langsung melampirkan hasil hitungan Anda ke tugas yang sedang berjalan tanpa mengetik ulang!",
      "Klik 'Download .XLSX' untuk mengunduh berkas Excel asli hasil pekerjaan Anda."
    ],
    instantTemplates: []
  },
  chat: {
    slugTitle: "Simulator Obrolan Langsung (Live Chat)",
    category: "Simulasi Percakapan Pelanggan Real-Time",
    summaryId: "Latih kemampuan multitasking obrolan langsung, kendalikan sentimen pelanggan, dan capai rating CSAT 5 bintang.",
    tipsAndTricks: [
      "Klik tombol 'Standard Macros' di sebelah kiri untuk mengisi jawaban ramah dan solutif seketika.",
      "Perhatikan indikator sentimen di kanan atas; jika sentimen membaik ke 'Satisfied', percakapan akan otomatis terselesaikan dengan nilai sempurna.",
      "Pilih skenario lain (Scenario 1, 2, atau 3) di bagian atas untuk melatih berbagai tipe kasus."
    ],
    instantTemplates: []
  },
  crm: {
    slugTitle: "Direktori Pelanggan 360 & Catatan Riwayat",
    category: "Pangkalan Data CRM Korporat",
    summaryId: "Akses profil lengkap pelanggan, histori pesanan, level risiko, alamat terverifikasi, dan tambahkan catatan CRM.",
    tipsAndTricks: [
      "Ketik nama atau ID pelanggan di kolom pencarian untuk menyaring daftar secara instan.",
      "Klik 'Edit Notes' untuk memperbarui riwayat interaksi atau mencatat preferensi pelanggan.",
      "Gunakan tombol 'Add Record' untuk mendaftarkan akun pelanggan baru ke sistem."
    ],
    instantTemplates: []
  },
  sops: {
    slugTitle: "Pangkalan Pengetahuan & Manual SOP Perusahaan",
    category: "Standar Prosedur Operasional Resmi",
    summaryId: "Panduan kepatuhan kerja resmi Nexora Customer Operations: SOP-01 sampai SOP-08.",
    tipsAndTricks: [
      "Gunakan kolom pencarian di sebelah kiri untuk mencari kata kunci seperti 'refund', 'lost package', atau 'PII'.",
      "Periksa bagian 'Escalation Triggers' untuk mengetahui kapan suatu kasus wajib dilaporkan ke manajer.",
      "Buka tab 'Company Profile & Structure' untuk memahami hierarki organisasi dan pembagian divisi."
    ],
    instantTemplates: []
  },
  manager: {
    slugTitle: "Konsol Evaluasi & Penilaian Rubrik Manajer",
    category: "Portal Supervisi & Pemberian Nilai",
    summaryId: "Alat evaluasi bagi manajer untuk meninjau tugas yang diserahkan trainee, menilai rubrik 4 pilar, dan memberikan feedback.",
    tipsAndTricks: [
      "Pilih penugasan di antrean sebelah kiri untuk membaca berkas yang dikirimkan oleh trainee.",
      "Geser 4 slider rubrik (Akurasi, Nada Bahasa, Kepatuhan SOP, Pemecahan Masalah) untuk menghitung skor total (0-100).",
      "Pilih status keputusan 'Approved' untuk meluluskan tugas, atau 'Revision Required' jika trainee perlu memperbaiki berkas."
    ],
    instantTemplates: []
  },
  internship: {
    slugTitle: "Simulasi Magang 5 Hari Operasional Kerja",
    category: "Residensi Kerja Nyata Hari 1 s/d Hari 5",
    summaryId: "Simulasi alur kerja mingguan penuh mencakup penanganan lonjakan tiket, audit retur, laporan QA, dan serah terima shift.",
    tipsAndTricks: [
      "Pilih tab hari kerja (Day 01 s/d Day 05) di bagian atas.",
      "Centang tugas yang sudah selesai pada checklist 'Mandatory Shift Deliverables'.",
      "Tuliskan ringkasan shift di kotak 'End-of-Shift Handover Memo' lalu klik 'Save Handover'.",
      "Beralih ke peran 'Manager' jika ingin memberikan tanda tangan persetujuan (Sign Off & Certify Shift)."
    ],
    instantTemplates: [
      {
        label: "Template Memo Serah Terima Shift Harian (Handover)",
        description: "Format resmi serah terima shift akhir hari kerja",
        content: "RINGKASAN SERAH TERIMA SHIFT OPERASIONAL (HANDOVER MEMO)\n\n1. Ringkasan Shift: 8 jam aktif pada Antrean #3. Total 18 tiket terselesaikan, 0 SLA breach, rata-rata respon 8.4 menit.\n2. Kasus Masih Berjalan (In-Flight): Tiket #NX-9011 (Marcus Brody) - Pesanan pengganti prioritas telah dibuat, menunggu nomor AWB dari FedEx Memphis.\n3. Kasus Risiko Tinggi: Akun David K. Vance (#NX-9015) telah dibekukan sementara menunggu verifikasi identitas 3-poin.\n4. Catatan untuk Shift Berikutnya: Stok SKU NX-GEAR-09 di gudang Chicago menipis, gunakan rute gudang Dallas untuk pesanan baru.",
        fileName: "shift_handover_report_alex_mercer.txt"
      }
    ]
  },
  portfolio: {
    slugTitle: "Sertifikasi Kompetensi & Portofolio Kerja Resmi",
    category: "Kredensial Profesional & Bukti Kerja Terverifikasi",
    summaryId: "Sertifikat resmi kompetensi operasional Nexora dengan kode verifikasi unik dan ringkasan portofolio deliverable nyata.",
    tipsAndTricks: [
      "Klik 'Print / Save Certificate PDF' untuk menyimpan dokumen sertifikat beresolusi tinggi.",
      "Sertifikat ini mencantumkan ID Verifikasi resmi: NX-CERT-2026-8849-AUTH dan tanda tangan Direktur Sarah Jenkins.",
      "Gunakan daftar portofolio deliverable di bagian bawah saat melamar posisi Remote Customer Support Specialist."
    ],
    instantTemplates: []
  }
};
