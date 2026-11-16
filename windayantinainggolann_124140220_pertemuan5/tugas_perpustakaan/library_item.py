# library_item.py
# Isi: abstract class LibraryItem, lalu subclass Book dan Magazine

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    # class induk untuk semua item perpustakaan (abstract, tidak bisa dibuat objeknya)
    def __init__(self, id_item, judul):
        self._id_item = id_item      # protected
        self._judul = judul          # protected
        self.__dipinjam = False      # private, defaultnya belum dipinjam

    @property
    def id_item(self):
        return self._id_item

    @property
    def judul(self):
        return self._judul

    @property
    def is_dipinjam(self):
        # cuma bisa dibaca dari luar, ubahnya lewat pinjam() dan kembalikan()
        return self.__dipinjam

    def pinjam(self):
        # kalau sudah dipinjam, tidak bisa dipinjam lagi
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self):
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        # harus ditulis ulang di subclass
        pass

    @abstractmethod
    def hitung_denda(self, hari):
        # harus ditulis ulang di subclass
        pass


class Book(LibraryItem):
    def __init__(self, id_item, judul, penulis, halaman):
        super().__init__(id_item, judul)
        self.__penulis = penulis
        self.__halaman = halaman

    def get_detail(self):
        return f"Buku: {self._judul} | Penulis: {self.__penulis} | {self.__halaman} halaman"

    def hitung_denda(self, hari):
        # denda buku Rp1000 per hari
        return hari * 1000


class Magazine(LibraryItem):
    def __init__(self, id_item, judul, edisi, penerbit):
        super().__init__(id_item, judul)
        self.__edisi = edisi
        self.__penerbit = penerbit

    def get_detail(self):
        return f"Majalah: {self._judul} | Edisi: {self.__edisi} | Penerbit: {self.__penerbit}"

    def hitung_denda(self, hari):
        # denda majalah Rp500 per hari
        return hari * 500
