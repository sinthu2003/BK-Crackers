import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { authService } from '../services/authService'

export default function MyProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || ''
  })

  const handleEdit = () => {
    setIsEditing(true)
    setSuccess('')
    setError('')
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || ''
    })
    setError('')
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    
    if (!formData.name || !formData.email || !formData.mobile) {
      setError('All fields are required')
      return
    }
    
    setLoading(true)
    try {
      if (user?.id) {
        const response = await authService.updateProfile(user.id, formData)
        
        if (response.success) {
          updateUser({ ...user, ...formData })
          setIsEditing(false)
          setSuccess('Profile updated successfully!')
        } else {
          setError(response.error || 'Failed to update profile')
        }
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-garderobe-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-garderobe-black mb-8 text-center uppercase tracking-wider">
            My Profile
          </h1>
          
          <div className="bg-white border border-garderobe-gray-200 rounded-lg p-8">
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
                {success}
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-garderobe-gray-600 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 rounded focus:outline-none focus:border-garderobe-black"
                  />
                ) : (
                  <p className="text-lg text-garderobe-black">{user?.name || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-garderobe-gray-600 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 rounded focus:outline-none focus:border-garderobe-black"
                  />
                ) : (
                  <p className="text-lg text-garderobe-black">{user?.email || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-garderobe-gray-600 mb-2">
                  Mobile Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-2 border border-garderobe-gray-300 rounded focus:outline-none focus:border-garderobe-black"
                    maxLength={10}
                  />
                ) : (
                  <p className="text-lg text-garderobe-black">{user?.mobile || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-garderobe-gray-600 mb-2">
                  Member Since
                </label>
                <p className="text-lg text-garderobe-black">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently joined'}
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 py-3 px-4 bg-garderobe-black text-white text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors disabled:bg-garderobe-gray-300"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 py-3 px-4 border border-garderobe-gray-300 text-garderobe-black text-sm uppercase tracking-wider hover:bg-garderobe-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="w-full py-3 px-4 bg-garderobe-black text-white text-sm uppercase tracking-wider hover:bg-garderobe-red transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}