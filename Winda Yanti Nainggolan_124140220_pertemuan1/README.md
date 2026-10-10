# Sweet Kasir 🌸 – Mini POS (Kasir & Keranjang Belanja)

## Identitas

- **Nama Lengkap :** _Winda Yanti Nainggolan_
- **NIM :** _124140220_
- **Kelas Praktikum :** _RA_

## Deskripsi Aplikasi

**Sweet Kasir** adalah aplikasi kasir sederhana bertema pink pastel untuk kantin atau toko kampus. Kasir dapat menambahkan barang ke keranjang, melihat subtotal dan total otomatis, mendapat diskon, serta menghitung uang kembalian. Keranjang tersimpan di `localStorage` sehingga tidak hilang saat halaman di-refresh.

**Studi kasus:** kasir kantin kampus.

## Panduan Menjalankan

1. Unduh atau clone repository ini.
2. Buka folder `Winda Yanti Nainggolan_124140220_pertemuan1` di VS Code.
3. Klik kanan `index.html` → **Open with Live Server** (atau buka langsung di browser).
4. Latihan materi ada di `modul/index.html`.

## Struktur Folder

```
Winda Yanti Nainggolan_124140220_pertemuan1/
├── index.html          # Struktur halaman utama
├── style.css           # Tampilan halaman
├── script.js            # Logika aplikasi
├── README.md            # Dokumentasi proyek
│
├── modul/               # Latihan praktikum
│   ├── index.html
│   └── latihan.js
│
└── screenshot/          # Dokumentasi screenshot
    ├── Diskon.png
    ├── Eror.png
    └── Form.png
```

## Daftar Fitur

- [x] Validasi nama barang (wajib, minimal 3 karakter)
- [x] Validasi harga satuan (angka, minimal Rp 500)
- [x] Validasi qty (bilangan bulat, minimal 1)
- [x] Pesan error merah di bawah input; barang tidak masuk keranjang jika tidak valid
- [x] Form otomatis di-reset setelah berhasil
- [x] Subtotal per barang (harga × qty)
- [x] Total belanja otomatis
- [x] Diskon 10% otomatis jika total ≥ Rp 50.000
- [x] Input uang bayar, kembalian otomatis, dan pesan jika uang kurang
- [x] Tabel keranjang (No, Nama Barang, Harga Satuan, Qty, Subtotal, Aksi)
- [x] Tombol Hapus per item dengan hitung ulang otomatis
- [x] Penyimpanan localStorage (`JSON.stringify` / `JSON.parse`)
- [x] Tombol Transaksi Baru / Reset
- [x] Format Rupiah dan tampilan responsif

## Tangkapan Layar

> Ganti dengan screenshot sendiri (minimal 3).

1. Form input utama –
![Image Alt](https://github.com/winda457/pemrograman_web_itera_124140220/blob/d8b71de9796aa3e1e65e4bd93e5a9478ee899c83/Winda%20Yanti%20Nainggolan_124140220_pertemuan1/screenshot/Form.png)
3. Validasi error –
![Image Alt](https://github.com/winda457/pemrograman_web_itera_124140220/blob/d8b71de9796aa3e1e65e4bd93e5a9478ee899c83/Winda%20Yanti%20Nainggolan_124140220_pertemuan1/screenshot/Eror.png)
5. Hasil perhitungan & tabel –
![Image Alt](https://github.com/winda457/pemrograman_web_itera_124140220/blob/d8b71de9796aa3e1e65e4bd93e5a9478ee899c83/Winda%20Yanti%20Nainggolan_124140220_pertemuan1/screenshot/Diskon.png)

## Penjelasan Teknis Singkat

**Validasi.** Fungsi `periksaInput()` mengembalikan objek `{ valid, pesan, harga, qty }`. Nama harus ≥ 3 karakter, harga ≥ 500, dan qty bilangan bulat ≥ 1. Jika tidak valid, pesan merah ditampilkan di bawah input terkait dan barang tidak dimasukkan.

**Kalkulator.** Class `KeranjangBelanja` menyimpan daftar barang. Getter `total` menjumlahkan subtotal (harga × qty) dengan `reduce()`, getter `diskon` memberi 10% jika total ≥ 50.000, dan `totalAkhir` = total − diskon. Kembalian = uang bayar − total akhir; jika negatif muncul pesan uang belum mencukupi.

**localStorage.** Objek `Penyimpanan` menyimpan keranjang dengan `JSON.stringify()` setiap ada perubahan dan membacanya kembali dengan `JSON.parse()` (dalam `try/catch`) saat halaman dibuka. Tombol reset memanggil `localStorage.removeItem()`.
