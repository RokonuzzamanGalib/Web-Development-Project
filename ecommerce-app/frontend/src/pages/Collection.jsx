import React, { useContext, useMemo, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams,Link } from 'react-router-dom'


const Collection = () => {

  const { products, currency } = useContext(ShopContext)

  const [filters, setFilters] = useState({
    search: '',
    category: [],
    type: [],
    price: 4000,
    sort: 'relevant'
  })

  const [searchInput, setSearchInput] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  // 🔥 Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchInput
      }))
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput])

  // 🔁 Load from URL
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const cat = searchParams.get('category') || ''
    const typ = searchParams.get('type') || ''
    const price = searchParams.get('price')
    const sort = searchParams.get('sort')

    setFilters({
      search,
      category: cat ? cat.split(',') : [],
      type: typ ? typ.split(',') : [],
      price: price ? Number(price) : 4000,
      sort: sort || 'relevant'
    })

    setSearchInput(search)
  }, [])

  // 🔗 Save to URL
  useEffect(() => {
    setSearchParams({
      search: filters.search,
      category: filters.category.join(','),
      type: filters.type.join(','),
      price: filters.price,
      sort: filters.sort
    })
  }, [filters])

  // 🔘 Toggle category
  const toggleCategory = (val) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(val)
        ? prev.category.filter(i => i !== val)
        : [...prev.category, val]
    }))
  }

  // 🔘 Toggle type
  const toggleType = (val) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(val)
        ? prev.type.filter(i => i !== val)
        : [...prev.type, val]
    }))
  }

  // 🔥 FILTER
  const filteredProducts = useMemo(() => {
    return products.filter(item => {

      const matchSearch =
        item.name.toLowerCase().includes(filters.search.toLowerCase())

      const matchCategory =
        filters.category.length === 0 ||
        filters.category.includes(item.category)

      const matchType =
        filters.type.length === 0 ||
        filters.type.includes(item.subCategory)

      const matchPrice =
        item.price <= filters.price

      return matchSearch && matchCategory && matchType && matchPrice
    })
  }, [products, filters])

  // 🔥 SORT
  const sortedProducts = useMemo(() => {
    let data = [...filteredProducts]

    if (filters.sort === 'low-high') {
      data.sort((a, b) => a.price - b.price)
    }

    if (filters.sort === 'high-low') {
      data.sort((a, b) => b.price - a.price)
    }

    return data
  }, [filteredProducts, filters.sort])

  return (
    <div className='flex flex-col sm:flex-row gap-6 pt-10 border-t'>

      {/* FILTER BUTTON (mobile) */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className='sm:hidden border px-4 py-2 text-sm'
      >
        Filters
      </button>

      {/* SIDEBAR */}
      <div className={`min-w-60 ${showFilter ? 'block' : 'hidden'} sm:block`}>

        <p className='text-xl mb-4'>FILTERS</p>

        {/* SEARCH */}
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search products...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='border px-3 py-1 text-sm w-full'
          />
        </div>

        {/* CATEGORY */}
        <div className='border p-4 mb-4'>
          <p className='font-medium mb-2'>CATEGORIES</p>
          {['Men', 'Women', 'Kids'].map(c => (
            <label key={c} className='block text-sm'>
              <input
                type='checkbox'
                onChange={() => toggleCategory(c)}
              /> {c}
            </label>
          ))}
        </div>

        {/* TYPE */}
        <div className='border p-4 mb-4'>
          <p className='font-medium mb-2'>TYPE</p>
          {['Topwear', 'Bottomwear', 'Winterwear'].map(t => (
            <label key={t} className='block text-sm'>
              <input
                type='checkbox'
                onChange={() => toggleType(t)}
              /> {t}
            </label>
          ))}
        </div>

        {/* PRICE */}
        <div className='border p-4'>
          <p className='font-medium mb-2'>
            MAX PRICE: {currency}{filters.price}
          </p>
          <input
            type='range'
            min='0'
            max='4000'
            value={filters.price}
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                price: Number(e.target.value)
              }))
            }
            className='w-full'
          />
        </div>

      </div>

      {/* MAIN */}
      <div className='flex-1'>

        {/* TOP BAR */}
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-xl sm:text-2xl'>ALL COLLECTIONS
             <p className=' w-8 md:w-20 h-0.5 bg-[#414141]'></p>
          </h2>

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                sort: e.target.value
              }))
            }
            className='border px-2 py-1 text-sm'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>

        {sortedProducts.map((item, index) => (
          <Link
            key={index}
            to={`/product/${item._id}`}
            className='hover:shadow p-2 cursor-pointer block'
          >
            <div className='overflow-hidden'>
              <img
              src={item.image[0]}
              className='w-full h-52 object-cover hover:scale-110 transition ease-in-out'
            /></div>

            

            <p className='text-sm mt-2'>{item.name}</p>
            <p className='font-medium text-sm'>
      {currency}{item.price}
            </p>

          </Link>
        ))}

        </div>

      </div>

    </div>
  )
}

export default Collection