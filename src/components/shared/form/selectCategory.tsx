"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Select, { type SingleValue } from "react-select"
import type { StylesConfig } from "react-select"
import useCategory from "@/hooks/contents/article/useCategory"

type SelectCategoryProps = {
  setCategoryId: React.Dispatch<React.SetStateAction<number>>
}

const SelectCategory = ({ setCategoryId }: SelectCategoryProps) => {
  const [options, setOptions] = useState<{ value: number; label: string }[]>([])
  const [search, setSearch] = useState("");
  
  const [isMounted, setIsMounted] = useState(false)
  
  const { data: categories, isLoading } = useCategory({'search': search})
  
  const customStyles: StylesConfig<{ value: number; label: string }> = {
    placeholder: (base) => ({
      ...base,
      color: "white",
    }),
    control: (base, state) => ({
      ...base,
      color: "white",
      backgroundColor: "#850000",
      borderColor: state.isFocused ? "gray" : "#ccc",
      padding: "2px",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
  }

  const handleChange = (selectedOption: SingleValue<{ value: number; label: string }>) => {
    setCategoryId(selectedOption ? selectedOption.value : 0)
  }

  const handleInputChange = (inputValue: string) => {
    setSearch(inputValue)
  }

  useEffect(() => {
    if (!categories || !Array.isArray(categories)) {
      return
    }

    setOptions((prevOptions) => {
      const newOptions = categories.map((item) => ({
        value: item.id,
        label: item.name,
      }))

      if (JSON.stringify(prevOptions) === JSON.stringify(newOptions)) {
        return prevOptions
      }

      return newOptions
    })
  }, [categories])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Select<{ value: number; label: string }>
      styles={customStyles}
      isLoading={isLoading}
      isClearable
      placeholder="Cari kategori ..."
      name="category"
      options={options}
      onChange={handleChange}
      onInputChange={handleInputChange}
    />
  )
}

export default SelectCategory
