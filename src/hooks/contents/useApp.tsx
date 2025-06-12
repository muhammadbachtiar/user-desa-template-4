function useApp() {
    const {
        data: app,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value:[
                        {
                            title: "Perizinan",
                            icon: "HiPencil",
                            subMenu: [
                                {
                                    title: "About Us",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Library",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Resources",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: " Pro Version",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                            ]
                        },
                        {
                            title: "Pendidikan",
                            icon: "HiAcademicCap",
                            subMenu: [
                                {
                                    title: "About Us",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Library",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Resources",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: " Pro Version",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                            ]
                        },
                        {
                            title: "Kependudukan",
                            icon: "HiUserGroup",
                            subMenu: [
                                {
                                    title: "About Us",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Library",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Resources",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: " Pro Version",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                            ]
                        },
                        {
                            title: "Pariwisata",
                            icon: "HiMap",
                            subMenu: [
                                {
                                    title: "About Us",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Library",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: "Resources",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                                {
                                    title: " Pro Version",
                                    icon: "HiPencil",
                                    link: "Google.com"
                                },
                            ]
                        },
                    ]
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log("Refetching data..."),
      };

    return {
      data: app?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useApp;