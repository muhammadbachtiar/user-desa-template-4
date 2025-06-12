function useEnterpriseDetail(params: Record<string, string | number> = {}, slug: string ) {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
      } = { 
        data: { 
                data: {
                    value: {
                      id: 1,
                      category_id: 101,
                      title: "Tech Solutions Co.",
                      description: "A leading provider of innovative technology solutions for businesses worldwide.",
                      thumbnail:
                        "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                      published_at: "2025-04-20",
                      slug: "tech-solutions-co",
                      user_id: 1,
                      category: { name: "Technology" },
                      isVerified: true,
                      waNumber: "+62811111111111",
                      address: "Jalan Kirap Remaja",
                      gmap: "https://maps.google.com/?q=Jalan+Kirap+Remaja",
                      ownerName: "Suharjo",
                      product: ["Software Development", "IT Consulting", "Cloud Solutions"],
                    }
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log(`"Refetching data..." ${params} ${slug}`),
      };

    return {
      data: data?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useEnterpriseDetail;