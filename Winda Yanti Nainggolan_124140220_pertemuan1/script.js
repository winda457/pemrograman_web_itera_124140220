/* ==========================================================
   Sweet Kasir (Versi C)
   Pola: class KeranjangBelanja (state + hitung) dipisah dari
   fungsi tampilan. Penyimpanan lewat objek "Penyimpanan".
   ========================================================== */

const ATURAN = {
  namaMin: 3,
  hargaMin: 500,
  qtyMin: 1,
  diskonMinBelanja: 50000,
  diskonPersen: 10
};

const formatRp = (angka) => "Rp " + Math.round(angka).toLocaleString("id-ID");

/* ---------- Penyimpanan (localStorage) ---------- */
const Penyimpanan = {
  kunci: "sweet_kasir_data",

  tulis(daftar) {
    localStorage.setItem(this.kunci, JSON.stringify(daftar));
  },

  baca() {
    try {
      const data = JSON.parse(localStorage.getItem(this.kunci));
      if (!Array.isArray(data)) return [];
      return data.filter((b) => b && typeof b.nama === "string" && Number(b.harga) > 0 && Number(b.qty) > 0);
    } catch (e) {
      return [];
    }
  },

  hapus() {
    localStorage.removeItem(this.kunci);
  }
};

/* ---------- Model keranjang ---------- */
class KeranjangBelanja {
  constructor(daftarAwal = []) {
    this.daftar = daftarAwal;
  }

  tambah(barang) {
    this.daftar.push(barang);
  }

  hapusKe(indeks) {
    this.daftar.splice(indeks, 1);
  }

  kosongkan() {
    this.daftar = [];
  }

  subtotal(barang) {
    return barang.harga * barang.qty;
  }

  get total() {
    return this.daftar.reduce((acc, b) => acc + this.subtotal(b), 0);
  }

  get diskon() {
    return this.total >= ATURAN.diskonMinBelanja ? (this.total * ATURAN.diskonPersen) / 100 : 0;
  }

  get totalAkhir() {
    return this.total - this.diskon;
  }
}

/* ---------- Validasi ---------- */
function periksaInput(nama, hargaTeks, qtyTeks) {
  const pesan = { nama: "", harga: "", qty: "" };

  if (nama.length < ATURAN.namaMin) {
    pesan.nama = `Nama barang wajib diisi, minimal ${ATURAN.namaMin} karakter ya.`;
  }

  const harga = Number(hargaTeks);
  if (hargaTeks === "" || isNaN(harga)) {
    pesan.harga = "Harga wajib diisi dengan angka.";
  } else if (harga < ATURAN.hargaMin) {
    pesan.harga = `Harga minimal Rp ${ATURAN.hargaMin.toLocaleString("id-ID")}.`;
  }

  const qty = Number(qtyTeks);
  if (qtyTeks === "" || isNaN(qty)) {
    pesan.qty = "Jumlah wajib diisi dengan angka.";
  } else if (!Number.isInteger(qty) || qty < ATURAN.qtyMin) {
    pesan.qty = "Jumlah harus bilangan bulat minimal 1.";
  }

  const valid = !pesan.nama && !pesan.harga && !pesan.qty;
  return { valid, pesan, harga, qty };
}

/* ---------- DOM ---------- */
const $ = (id) => document.getElementById(id);

const ui = {
  form: $("formBelanja"),
  nama: $("namaBarang"),
  harga: $("hargaBarang"),
  qty: $("qtyBarang"),
  errNama: $("errNama"),
  errHarga: $("errHarga"),
  errQty: $("errQty"),
  tbody: $("tabelBody"),
  jumlah: $("jumlahItem"),
  total: $("vTotal"),
  diskon: $("vDiskon"),
  lblDiskon: $("lblDiskon"),
  akhir: $("vAkhir"),
  bayar: $("uangBayar"),
  boxKembali: $("boxKembali"),
  kembali: $("vKembali"),
  catatan: $("catatanKembali"),
  baru: $("btnBaru")
};

const keranjang = new KeranjangBelanja(Penyimpanan.baca());

function tampilkanPesan(pesan) {
  const peta = [
    [ui.nama, ui.errNama, pesan.nama],
    [ui.harga, ui.errHarga, pesan.harga],
    [ui.qty, ui.errQty, pesan.qty]
  ];
  peta.forEach(([input, elemen, teks]) => {
    elemen.textContent = teks;
    input.classList.toggle("salah", teks !== "");
  });
}

function gambarTabel() {
  ui.tbody.innerHTML = "";

  if (keranjang.daftar.length === 0) {
    ui.tbody.innerHTML = `<tr><td colspan="6" class="kosong">Keranjangmu masih kosong 🌷</td></tr>`;
  }

  keranjang.daftar.forEach((barang, i) => {
    const tr = document.createElement("tr");
    const isi = [
      [i + 1, ""],
      [barang.nama, ""],
      [formatRp(barang.harga), "right"],
      [barang.qty, "right"],
      [formatRp(keranjang.subtotal(barang)), "right"]
    ];
    isi.forEach(([nilai, kelas]) => {
      const td = document.createElement("td");
      td.textContent = nilai; // aman dari injeksi HTML
      td.className = kelas;
      tr.appendChild(td);
    });

    const tdAksi = document.createElement("td");
    tdAksi.className = "center";
    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = "btn-hapus";
    tombol.textContent = "Hapus";
    tombol.addEventListener("click", () => {
      keranjang.hapusKe(i);
      Penyimpanan.tulis(keranjang.daftar);
      gambarSemua();
    });
    tdAksi.appendChild(tombol);
    tr.appendChild(tdAksi);

    ui.tbody.appendChild(tr);
  });

  ui.jumlah.textContent = `${keranjang.daftar.length} item`;
}

function gambarKembalian() {
  const teks = ui.bayar.value.trim();
  const akhir = keranjang.totalAkhir;
  ui.boxKembali.classList.remove("cukup", "kurang");

  if (teks === "" || isNaN(Number(teks))) {
    ui.kembali.textContent = formatRp(0);
    ui.catatan.textContent = "";
    return;
  }

  const selisih = Number(teks) - akhir;
  if (akhir === 0) {
    ui.kembali.textContent = formatRp(0);
    ui.catatan.textContent = "Keranjang masih kosong.";
  } else if (selisih < 0) {
    ui.kembali.textContent = formatRp(0);
    ui.catatan.textContent = `Uang belum mencukupi, kurang ${formatRp(-selisih)}.`;
    ui.boxKembali.classList.add("kurang");
  } else {
    ui.kembali.textContent = formatRp(selisih);
    ui.catatan.textContent = "Pembayaran cukup, terima kasih! 💕";
    ui.boxKembali.classList.add("cukup");
  }
}

function gambarRingkasan() {
  ui.total.textContent = formatRp(keranjang.total);
  ui.diskon.textContent = "- " + formatRp(keranjang.diskon);
  ui.lblDiskon.textContent = keranjang.diskon > 0
    ? `Diskon ${ATURAN.diskonPersen}% (belanja ≥ Rp 50.000)`
    : "Diskon (min. belanja Rp 50.000)";
  ui.akhir.textContent = formatRp(keranjang.totalAkhir);
  gambarKembalian();
}

function gambarSemua() {
  gambarTabel();
  gambarRingkasan();
}

/* ---------- Event ---------- */
ui.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = ui.nama.value.trim();
  const hasil = periksaInput(nama, ui.harga.value.trim(), ui.qty.value.trim());
  tampilkanPesan(hasil.pesan);
  if (!hasil.valid) return;

  keranjang.tambah({ nama, harga: hasil.harga, qty: hasil.qty });
  Penyimpanan.tulis(keranjang.daftar);
  gambarSemua();

  ui.form.reset();
  tampilkanPesan({ nama: "", harga: "", qty: "" });
  ui.nama.focus();
});

ui.bayar.addEventListener("input", gambarRingkasan);

ui.baru.addEventListener("click", () => {
  if (keranjang.daftar.length > 0 && !confirm("Mulai transaksi baru dan kosongkan keranjang?")) return;
  keranjang.kosongkan();
  Penyimpanan.hapus();
  ui.bayar.value = "";
  ui.form.reset();
  tampilkanPesan({ nama: "", harga: "", qty: "" });
  gambarSemua();
});

/* ---------- Mulai ---------- */
gambarSemua();
