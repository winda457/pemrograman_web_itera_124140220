// Modul latihan Pertemuan 1 (versi B)
const keluaran = document.getElementById("keluaran");

const cetak = (judul, baris) => {
  const teks = Array.isArray(baris) ? baris.join("\n") : baris;
  keluaran.insertAdjacentHTML("beforeend", `<section><h2>${judul}</h2><pre>${teks}</pre></section>`);
  console.log(`== ${judul} ==\n${teks}`);
};

// 1. Data diri
const nama = "Nama Kalian";
let umur = 20;
const asal = "Lampung";
cetak("1. Data diri", [`Nama : ${nama}`, `Umur : ${umur}`, `Asal : ${asal}`]);

// 2. Cek kelulusan (>= 70)
const cekLulus = (nilai) => (nilai >= 70 ? "Lulus" : "Tidak lulus");
cetak("2. Kelulusan", [60, 70, 88].map((n) => `${n} -> ${cekLulus(n)}`));

// 3. Kategori umur
const kategori = (u) => {
  if (u < 12) return "Anak";
  else if (u <= 17) return "Remaja";
  else if (u <= 59) return "Dewasa";
  return "Lansia";
};
cetak("3. Kategori umur", [5, 12, 17, 18, 59, 60].map((u) => `${u} -> ${kategori(u)}`));

// 4. Switch-case hari (Inggris)
const hariInggris = (n) => {
  let hasil;
  switch (n) {
    case 1: hasil = "Monday"; break;
    case 2: hasil = "Tuesday"; break;
    case 3: hasil = "Wednesday"; break;
    case 4: hasil = "Thursday"; break;
    case 5: hasil = "Friday"; break;
    case 6: hasil = "Saturday"; break;
    case 7: hasil = "Sunday"; break;
    default: hasil = "Not a valid day";
  }
  return hasil;
};
cetak("4. Hari", [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `${n} -> ${hariInggris(n)}`));

// 5. Grade dengan ternary
const grade = (n) => (n >= 85 ? "A" : n >= 75 ? "B" : n >= 65 ? "C" : n >= 50 ? "D" : "E");
cetak("5. Grade (ternary)", [90, 80, 70, 55, 20].map((n) => `${n} -> ${grade(n)}`));

// 6. Tabel perkalian
const angka = 6;
const barisKali = [];
for (let i = 1; i <= 10; i++) barisKali.push(`${angka} x ${i} = ${angka * i}`);
cetak(`6. Tabel perkalian ${angka}`, barisKali);

// 7. Faktorial (rekursif)
const fakt = (n) => (n <= 1 ? 1 : n * fakt(n - 1));
cetak("7. Faktorial", [0, 1, 6, 12].map((n) => `${n}! = ${fakt(n)}`));

// 8. Bilangan prima
const apakahPrima = (n) => {
  if (n < 2) return false;
  for (let d = 2; d <= Math.sqrt(n); d++) if (n % d === 0) return false;
  return true;
};
cetak("8. Prima", [2, 15, 17, 100, 101].map((n) => `${n} -> ${apakahPrima(n) ? "prima" : "bukan"}`));

// 9. BMI
document.getElementById("tombolBmi").addEventListener("click", () => {
  const kg = parseFloat(document.getElementById("inBerat").value);
  const cm = parseFloat(document.getElementById("inTinggi").value);
  const out = document.getElementById("outBmi");

  if (!(kg > 0) || !(cm > 0)) {
    out.textContent = "Isi berat dan tinggi dengan angka positif.";
    return;
  }
  const bmi = kg / ((cm / 100) ** 2);
  const label = bmi < 18.5 ? "Kurus" : bmi < 25 ? "Normal" : bmi < 30 ? "Gemuk" : "Obesitas";
  out.textContent = `BMI = ${bmi.toFixed(1)} (${label})`;
});

// 10. FizzBuzz
const fizz = [];
for (let i = 1; i <= 100; i++) {
  let s = "";
  if (i % 3 === 0) s += "Fizz";
  if (i % 5 === 0) s += "Buzz";
  fizz.push(s || i);
}
cetak("10. FizzBuzz", fizz.join(" | "));
