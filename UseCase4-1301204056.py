def ShowStorage(Money, Admin, Database):
    user = str

    print("Masukkan nama Anda : ")
    input(user)

    print("Apakah Anda Admin? (Yes/No)")
    input(Admin)
    if ((user == Admin) and (Admin == "Yes")):
        print("Tampilkan info keuangan toko", Database, Money)
    elif ((user != Admin) and (Admin == "no")):
        print("Menamplkan keuangan pribadi", Money)
    else:
        print("kembali ke menu awal")

    menu()
    pilihan()
    