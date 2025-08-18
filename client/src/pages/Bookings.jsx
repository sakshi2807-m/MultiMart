import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import RelatedVendor from '../compo/RelatedVendor'
import { toast } from 'react-toastify'
import axios from 'axios'

const Bookings = () => {
  const { vendorId } = useParams()
  const navigate = useNavigate()
  const { vendor, currencySymbol, backendUrl, token, getAllVendorsData } = useContext(AppContext)

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const [vendorInfo, setVendorInfo] = useState(null)
  const [vendorslots, setVendorSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [selectedTime, setSelectedTime] = useState(null)

  const timeScrollRef = useRef(null)

  const fetchVendorInfo = async () => {
    const vendorInfo = vendor.find(vendor => vendor._id === vendorId)
    setVendorInfo(vendorInfo)
  }

  const getAvailableSlots = async () => {
    setVendorSlots([])
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        let day=currentDate.getDay()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()


        const slotDate= day+"_"+month+"_"+year

        const slotTime = formattedTime

        const isSlotAvailable= vendorInfo.slots_booked[slotDate] && vendorInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable){
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

       
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setVendorSlots(prev => [...prev, timeSlots])
    }
  }

  const bookVendor = async () => {
    if (!token) {
      toast.warn('Login to Book Vendor')
      return navigate('/login')
    }

    const userId = localStorage.getItem('userId')
    const user = JSON.parse(localStorage.getItem('user'))

    if (!userId || !user) {
      toast.error("User data not found. Please log in again.")
      return navigate('/login')
    }

    if (!selectedTime) {
      toast.warn("Please select a time slot.")
      return
    }

    try {
      const date = vendorslots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1 // Months are 0-based
      let year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      const response = await axios.post(
        `${backendUrl}/api/user/book-vendor`,
        {
          vendorId,
          userId,
          userData: user,
          slotDate,
          slotTime: selectedTime
        },
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        getAllVendorsData()
        navigate('/my-bookings')
      } else {
        toast.error(response.data.message || 'Booking failed')
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchVendorInfo()
  }, [vendor, vendorId])

  useEffect(() => {
    if (vendorInfo) {
      getAvailableSlots()
    }
  }, [vendorInfo])

  const scrollLeft = () => {
    if (timeScrollRef.current) {
      timeScrollRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (timeScrollRef.current) {
      timeScrollRef.current.scrollBy({ left: 100, behavior: 'smooth' })
    }
  }

  return vendorInfo && (
    <div className="text-white px-4 py-8">
      <div className="flex flex-col md:flex-row items-start justify-center gap-4">
        <div className="w-full md:w-1/4 flex justify-center">
          <img src={vendorInfo.image} alt="Vendor" className="w-40 rounded-lg object-cover" />
        </div>

        <div className="w-full md:w-3/4">
          <div className="border border-green-500 rounded-lg p-6 bg-gray-900 mt-3">
            <h2 className="text-2xl font-semibold mb-2">{vendorInfo.name}</h2>
            <p className="text-green-400 mb-4 text-[15px]">{vendorInfo.category}</p>

            <div>
              <h3 className="font-semibold text-[15px] mb-1 text-green-500">About</h3>
              <p className="text-gray-300 text-xs">{vendorInfo.about}</p>
            </div>

            <div className="inline-block px-3 py-1 mt-4 text-sm text-green-300 border border-green-500 rounded-md bg-gray-800">
              Booking Starts At <span className="font-semibold text-white">{currencySymbol} {vendorInfo.fees}</span>
            </div>
          </div>

          {/* Booking Slots */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Booking Slots</h3>

            <div className="flex gap-x-4 overflow-x-auto w-full pb-2">
              {vendorslots && vendorslots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`min-w-[64px] px-3 py-4 rounded-lg text-center cursor-pointer transition-all duration-200 ${slotIndex === index
                    ? "bg-green-500 text-white"
                    : "border border-green-500 text-green-300"
                    }`}
                >
                  <p className="text-sm font-semibold">
                    {item[0] && daysOfWeek[new Date(item[0].datetime).getDay()]}
                  </p>
                  <p className="text-xs">
                    {item[0] && new Date(item[0].datetime).getDate()}
                  </p>
                </div>
              ))}
            </div>

            {/* Time slots scrollable row */}
            <div className="flex items-center gap-2 mt-4">
              <button onClick={scrollLeft} className="p-2 bg-gray-800 rounded-full">
                <FaChevronLeft className="text-green-400" />
              </button>

              <div ref={timeScrollRef} className="flex items-center gap-3 w-full overflow-x-auto scroll-smooth whitespace-nowrap">
                {vendorslots.length > 0 &&
                  vendorslots[slotIndex].map((item, index) => (
                    <p
                      key={index}
                      onClick={() => setSelectedTime(item.time)}
                      className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${selectedTime === item.time
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 border border-green-500 text-white"
                        }`}
                    >
                      {item.time.toLowerCase()}
                    </p>
                  ))}
              </div>

              <button onClick={scrollRight} className="p-2 bg-gray-800 rounded-full">
                <FaChevronRight className="text-green-400" />
              </button>
            </div>

            <button onClick={bookVendor} className='bg-green-500 px-5 py-2 rounded-4xl mt-6 font-medium cursor-pointer'>
              Book The Service
            </button>
          </div>
        </div>
      </div>

      {/* Related Vendor List */}
      <RelatedVendor vendorId={vendorId} category={vendorInfo.category} />
    </div>
  )
}

export default Bookings
