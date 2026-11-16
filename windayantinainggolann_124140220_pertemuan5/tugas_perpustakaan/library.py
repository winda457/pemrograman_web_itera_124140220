# library.py
# Isi: class Library untuk menyimpan dan mengelola koleksi


class Library:
    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = []   # private, jadi diakses lewat method saja

    def tambah_item(self, item):
        # cek dulu id nya supaya tidak ada yang kembar
        if self.cari_id(item.id_item) is not None:
            print("Gagal, id", item.id_item, "sudah ada")
            return
        self.__koleksi.append(item)
        print("Berhasil menambahkan:", item.judul)

    def tampilkan_katalog(self):
        # tampilkan item yang masih tersedia saja
        print("\nKatalog", self.nama)
        for item in self.__koleksi:
            if not item.is_dipinjam:
                print("-", item.id_item, "|", item.get_detail())

    def cari_id(self, id_item):
        for item in self.__koleksi:
            if item.id_item == id_item:
                return item
        return None

    def cari_judul(self, kata):
        hasil = []
        for item in self.__koleksi:
            if kata.lower() in item.judul.lower():
                hasil.append(item)
        return hasil
