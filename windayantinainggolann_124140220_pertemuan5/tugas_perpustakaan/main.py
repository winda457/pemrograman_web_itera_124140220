# main.py
# Untuk mencoba semua fitur perpustakaan. Jalankan: python main.py

from library_item import Book, Magazine
from library import Library
from member import Member

perpus = Library("Perpustakaan ITERA")

# 1. menambahkan item
print("=== Tambah item ===")
perpus.tambah_item(Book("B01", "Python Dasar", "Budi Santoso", 250))
perpus.tambah_item(Book("B02", "Pemrograman Web", "Siti Aminah", 320))
perpus.tambah_item(Magazine("M01", "Tech Monthly", 12, "Gramedia"))
perpus.tambah_item(Magazine("M02", "Sains Populer", 5, "Kompas"))
perpus.tambah_item(Book("B01", "Buku Kembar", "Tidak ada", 100))  # id sama, harusnya gagal

# 2. katalog
perpus.tampilkan_katalog()

# 3. pencarian
print("\n=== Cari item ===")
item = perpus.cari_id("M01")
if item:
    print("Ketemu:", item.get_detail())
for item in perpus.cari_judul("python"):
    print("Cari judul 'python':", item.get_detail())
print("Cari id X99:", perpus.cari_id("X99"))

# 4. status ketersediaan
print("\n=== Pinjam dan kembalikan ===")
winda = Member("Winda")
buku = perpus.cari_id("B01")
print("Dipinjam?", buku.is_dipinjam)
winda.pinjam(buku)
print("Dipinjam?", buku.is_dipinjam)
winda.pinjam(buku)  # dipinjam dua kali
perpus.tampilkan_katalog()  # B01 tidak muncul lagi
winda.kembalikan(buku)
print("Dipinjam?", buku.is_dipinjam)

# 5. polymorphism: method yang sama hasilnya beda
print("\n=== Denda terlambat 5 hari ===")
for item in [perpus.cari_id("B02"), perpus.cari_id("M02")]:
    print(item.judul, "= Rp", item.hitung_denda(5))
