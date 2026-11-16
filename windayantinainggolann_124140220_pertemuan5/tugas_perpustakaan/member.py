# member.py
# Isi: class Member (anggota yang meminjam buku)


class Member:
    def __init__(self, nama):
        self.__nama = nama
        self.__pinjaman = []

    @property
    def nama(self):
        return self.__nama

    def pinjam(self, item):
        if item.pinjam():
            self.__pinjaman.append(item)
            print(self.__nama, "meminjam", item.judul)
        else:
            print(item.judul, "sedang dipinjam")

    def kembalikan(self, item):
        if item in self.__pinjaman:
            item.kembalikan()
            self.__pinjaman.remove(item)
            print(self.__nama, "mengembalikan", item.judul)
