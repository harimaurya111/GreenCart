import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {

  const { axios, toast, navigate, user } = useAppContext()
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  console.log(user)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (user !== null) {
        const { data } = await axios.post("/api/address/add", { address, userId: user._id })
        if (data.success) {
          navigate("/cart")
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)

    }
  };


  useEffect(() => {
    if (!user) {
      navigate("/cart")
    }
  }, [])

  return (
    <div className='mt-16 pb-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl md:text-3xl text-gray-800'>
          Add Shipping <span className='font-semibold text-primary'>Address</span>
        </h1>

        <div className='flex flex-col-reverse md:flex-row justify-between gap-20 mt-10'>
          <div className='flex-1 max-w-md'>
            <form onSubmit={onSubmitHandler} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name='firstName'
                  type="text"
                  placeholder="First Name"
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name='lastName'
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              <InputField
                handleChange={handleChange}
                address={address}
                name='email'
                type="email"
                placeholder="Email address"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name='street'
                type="text"
                placeholder="Street"
              />

              <div className='grid grid-cols-2 gap-4'>
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name='city'
                  type="text"
                  placeholder="City"
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name='state'
                  type="text"
                  placeholder="State"
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name='zipcode'
                  type="number"
                  placeholder="Zip code"
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name='country'
                  type="text"
                  placeholder="Country"
                />
              </div>

              <InputField
                handleChange={handleChange}
                address={address}
                name='phone'
                type="tel"
                placeholder="Phone" />

              <button
                type="submit"
                className='w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition'>
                SAVE ADDRESS
              </button>
            </form>
          </div>

          <div className='md:mt-16'>
            <img
              className='w-full max-w-md'
              src={assets.add_address_iamge}
              alt="Add Address"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;