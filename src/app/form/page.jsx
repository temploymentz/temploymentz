'use client'

import React, { useState, useCallback } from 'react'
import Button from '../components/Button'
import { style } from '@/styles'

const industries = [
  'IT',
  'Sales & Marketing',
  'Retail',
  'Education',
  'Healthcare',
  'Hospitality',
  'Logistics',
  'Corporate',
  'Manufacturing',
  'Other',
]

const departments = ['HR', 'Sales', 'Marketing', 'Admin', 'Operations', 'Finance', 'IT', 'Logistics', 'Other']
const workModes = ['On-site', 'Hybrid', 'Remote']
const startDateOptions = ['Immediate', '1 week', 'Flexible']

const FormSection = ({ number, title, children }) => (
  <div className="bg-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
)

const FormField = ({ label, name, type = 'text', placeholder = '', error, children, required = true, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children || (
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)

const SelectField = ({ label, name, options, error, required = true, value, onChange }) => (
  <FormField label={label} name={name} error={error} required={required} value={value} onChange={onChange}>
    <select
      name={name}
      value={value || ''}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </FormField>
)

const FormPage = () => {
  const [formData, setFormData] = useState({
    // Company Info
    companyName: '',
    location: '',
    industry: '',

    // Contact Person
    contactName: '',
    mobile: '',
    email: '',

    // Requirement Details
    roleNeeded: '',
    noOfPositions: '',
    department: '',
    workType: '',
    workMode: '',

    // Budget & Start Date
    budget: '',
    startDate: '',

    // Additional Notes
    additionalNotes: '',

    // Confirmation
    approval: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.industry) newErrors.industry = 'Industry is required'
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required'
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.roleNeeded.trim()) newErrors.roleNeeded = 'Role needed is required'
    if (!formData.noOfPositions) newErrors.noOfPositions = 'Number of positions is required'
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.workType.trim()) newErrors.workType = 'Work type is required'
    if (!formData.workMode) newErrors.workMode = 'Work mode is required'
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required'
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.approval) newErrors.approval = 'You must approve to start hiring'
    return newErrors
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
      alert('Form submitted successfully!')
      // Reset form
      setFormData({
        companyName: '',
        location: '',
        industry: '',
        contactName: '',
        mobile: '',
        email: '',
        roleNeeded: '',
        noOfPositions: '',
        department: '',
        workType: '',
        workMode: '',
        budget: '',
        startDate: '',
        additionalNotes: '',
        approval: false,
      })
    } else {
      setErrors(newErrors)
    }
  }, [formData])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`${style.header.fontSize} ${style.header.fontWeight} mb-3 text-gray-900`}>
            Temploymentz
          </h1>
          <p className={`${style.minHeader.fontSize} font-semibold text-gray-800 mb-2`}>
            Client Registration Form
          </p>
          <p className={`${style.para.fontSize} text-gray-600`}>
            Join our platform and connect with skilled gig professionals
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Company Info */}
          <FormSection number="1️⃣" title="Company Info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Company Name" name="companyName" placeholder="Enter your company name" error={errors.companyName} value={formData.companyName} onChange={handleChange} />
              <FormField label="Location (City)" name="location" placeholder="Enter your city" error={errors.location} value={formData.location} onChange={handleChange} />
            </div>
            <SelectField label="Industry" name="industry" options={industries} error={errors.industry} value={formData.industry} onChange={handleChange} />
          </FormSection>

          {/* 2. Contact Person */}
          <FormSection number="2️⃣" title="Contact Person">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Name" name="contactName" placeholder="Full name" error={errors.contactName} value={formData.contactName} onChange={handleChange} />
              <FormField label="Mobile" name="mobile" type="tel" placeholder="+91 XXXXX XXXXX" error={errors.mobile} value={formData.mobile} onChange={handleChange} />
            </div>
            <FormField label="Email" name="email" type="email" placeholder="your@email.com" error={errors.email} value={formData.email} onChange={handleChange} />
          </FormSection>

          {/* 3. Requirement Details */}
          <FormSection number="3️⃣" title="Requirement Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Role Needed" name="roleNeeded" placeholder="e.g., Sales Executive, Developer" error={errors.roleNeeded} value={formData.roleNeeded} onChange={handleChange} />
              <FormField label="No. of Positions" name="noOfPositions" type="number" placeholder="Enter number" error={errors.noOfPositions} value={formData.noOfPositions} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField label="Department" name="department" options={departments} error={errors.department} value={formData.department} onChange={handleChange} />
              <FormField label="Work Type (No. of days required)" name="workType" placeholder="e.g., 5 days, 3 days" error={errors.workType} value={formData.workType} onChange={handleChange} />
            </div>
            <SelectField label="Work Mode" name="workMode" options={workModes} error={errors.workMode} value={formData.workMode} onChange={handleChange} />
          </FormSection>

          {/* 4. Budget & Start Date */}
          <FormSection number="4️⃣" title="Budget & Start Date">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Budget/Payout per day" name="budget" placeholder="₹ Enter amount" error={errors.budget} value={formData.budget} onChange={handleChange} />
              <SelectField label="Start Date" name="startDate" options={startDateOptions} error={errors.startDate} value={formData.startDate} onChange={handleChange} />
            </div>
          </FormSection>

          {/* 5. Additional Notes */}
          <FormSection number="5️⃣" title="Additional Notes">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any special instructions
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Share any additional requirements or instructions..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </FormSection>

          {/* 6. Confirmation */}
          <FormSection number="6️⃣" title="Confirmation">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="approval"
                checked={formData.approval}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-1 cursor-pointer"
              />
              <label className="ml-3 text-gray-700">
                <span className="font-medium">I approve Temploymentz to start hiring</span>
                {errors.approval && <p className="text-red-500 text-sm mt-1">{errors.approval}</p>}
              </label>
            </div>
          </FormSection>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormPage