function useEnterprise(params: Record<string, string | number> = {} ) {
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
                            id: 1,
                            category_id: 101,
                            title: "Tech Solutions Co.",
                            description: "A leading provider of innovative technology solutions for businesses worldwide.",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-04-20",
                            slug: "tech-solutions-co",
                            user_id: 1,
                            category: { name: "Technology" },
                            isVerified: true,
                            waNumber: "+62811111111111"
                          },
                          {
                            id: 2,
                            category_id: 202,
                            title: "Green Agriculture Ltd.",
                            description: "Promoting sustainable farming practices and providing eco-friendly agricultural products.",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-03-15",
                            slug: "green-agriculture-ltd",
                            user_id: 2,
                            category: { name: "Agriculture" },
                            isVerified: true,
                            waNumber: "+62811111111111"
                          },
                          {
                            id: 3,
                            category_id: 303,
                            title: "EduCare Academy",
                            description: "Empowering students with quality education through innovative learning platforms.",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-02-10",
                            slug: "educare-academy",
                            user_id: 3,
                            category: { name: "Education" },
                            isVerified: false,
                            waNumber: "+62811111111111"
                          },
                          {
                            id: 4,
                            category_id: 404,
                            title: "Healthy Living Hub",
                            description: "Your one-stop destination for health and wellness products and services.",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-01-05",
                            slug: "healthy-living-hub",
                            user_id: 4,
                            category: { name: "Health & Wellness" },
                            isVerified: true,
                            waNumber: "+62811111111111"
                          },
                          {
                            id: 5,
                            category_id: 505,
                            title: "Travelers' Paradise",
                            description: "Offering affordable travel packages to the most exotic destinations worldwide.",
                            thumbnail: "https://sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com/ckeditor/Vtwl182T08LudRdtHMKZOHSGK3aABMLWVicYwoeH.jpg",
                            published_at: "2025-04-01",
                            slug: "travelers-paradise",
                            user_id: 5,
                            category: { name: "Travel" },
                            isVerified: false,
                            waNumber: "+62811111111111"
                          }
                    ]
                }
              },
        isLoading: false,
        isError: false,
        isFetching: false,
        refetch: () => console.log(`"Refetching data..." ${params}`),
      };

    return {
      data: app?.data,
      isLoading,
      isFetching,
      refetch,
      isError,
    };
  }
  
  export default useEnterprise;