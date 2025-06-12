function useStructure() {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value: [
                      { id: 1, name: "Budi Santoso", title: "Kepala Desa", img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",  phone: '+6281234567890',
                        activeYears: '2020 - 2026' },
                      { id: 2, pid: 1, name: "Siti Aisyah", title: "Sekretaris Desa",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026'  },
                      { id: 3, pid: 1, name: "Rudi Hartono", title: "Bendahara Desa",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026'  },
                      { id: 4, pid: 1, name: "Dewi Lestari", title: "Kepala Dusun 1",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026' },
                      { id: 5, pid: 2, name: "Andi Wijaya", title: "Kepala Dusun 2",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026'  },
                      { id: 6, pid: 2, name: "Joko Susilo", title: "Kepala Dusun 3",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026'  },
                      { id: 7, pid: 3, name: "Fitri Handayani", title: "Ketua PKK",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026'  },
                      { id: 8, pid: 3, name: "Hendri Saputra", title: "Ketua Karang Taruna",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026'  },
                      { id: 9, pid: 6, name: "Ratna Sari", title: "Kasi Pemerintahan",img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026'  },
                      { id: 10, pid: 6, name: "Toni Pratama", title: "Kasi Pelayanan", img: "https://tottong.desa.id/storage/2020/02/WhatsApp-Image-2020-02-21-at-09.03.12-1.jpeg",   phone: '+6281234567890',
                          activeYears: '2020 - 2026' }
                  ]
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log("Refetching data..."),
      };

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useStructure;