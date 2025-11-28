import { useAuth } from '../modules/auth/AuthContext'

export default function Settings() {
  const { user, logout } = useAuth()

  return (
    <div className="max-w-4xl p-">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Account Setting</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg font-medium">
            Login & Security
          </div>
          <div className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            Notifications
          </div>
          <div className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            Interface
          </div>
          <div className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            Interface
          </div>
        </div> 

        {/* Main Content */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 p-6">
          {/* Profile Picture Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm text-center">Atualizar foto</span>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Upload New Photo
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                placeholder="Please enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                placeholder="Please enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Please enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
              <input
                type="tel"
                placeholder="Please enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                placeholder="Write your Bio here e.g your includes. Interests ETC"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Update Profile
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Reset
              </button>
              <button 
                onClick={logout}
                className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-auto"
              >
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}