import { useState } from 'react'
import { 
  AlertCircle, 
  CheckCircle, 
  Loader2, 
  Send, 
  ThumbsUp, 
  ThumbsDown,
  Target,
  FileText,
  User,
  Mail,
  RefreshCw
} from 'lucide-react'
import { classifyActivity, submitActivityWithClassification } from '../services/apiClient'

const initialFormState = {
  title: '',
  description: '',
  activity_type: 'project',
  lead_author_username: '',
  lead_author_email: '',
}

export default function AddEntryPage() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle, classifying, classified, submitting, success, error
  const [classificationResult, setClassificationResult] = useState(null)
  const [userAgreed, setUserAgreed] = useState(null) // null, true, false
  const [serverMessage, setServerMessage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const validationErrors = {}
    if (!form.title.trim()) validationErrors.title = 'Title is required.'
    if (!form.description.trim()) validationErrors.description = 'Description is required.'
    if (!form.lead_author_username.trim()) validationErrors.lead_author_username = 'Author username is required.'
    if (!form.lead_author_email.trim()) {
      validationErrors.lead_author_email = 'Author email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.lead_author_email)) {
      validationErrors.lead_author_email = 'Please enter a valid email address.'
    }
    return validationErrors
  }

  const handleClassify = async (e) => {
    e.preventDefault()
    setServerMessage(null)
    
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length) return

    setStatus('classifying')
    setClassificationResult(null)
    setUserAgreed(null)

    try {
      const result = await classifyActivity(
        form.title,
        form.description,
        form.activity_type
      )
      setClassificationResult(result)
      setStatus('classified')
    } catch (error) {
      setStatus('error')
      setServerMessage(error.message || 'Classification failed. Please try again.')
    }
  }

  const handleAgree = () => {
    setUserAgreed(true)
  }

  const handleDisagree = () => {
    setUserAgreed(false)
  }

  const handleSubmitFinal = async () => {
    setStatus('submitting')
    try {
      const payload = {
        ...form,
        sdg_impacts: classificationResult?.sdg_impacts || [],
        user_agreed: userAgreed,
      }
      await submitActivityWithClassification(payload)
      setStatus('success')
      setServerMessage('Activity submitted successfully!')
      // Reset form after success
      setTimeout(() => {
        setForm(initialFormState)
        setClassificationResult(null)
        setUserAgreed(null)
        setStatus('idle')
        setServerMessage(null)
      }, 3000)
    } catch (error) {
      setStatus('error')
      setServerMessage(error.message || 'Submission failed. Please try again.')
    }
  }

  const handleReclassify = () => {
    setClassificationResult(null)
    setUserAgreed(null)
    setStatus('idle')
  }

  const handleReset = () => {
    setForm(initialFormState)
    setErrors({})
    setStatus('idle')
    setClassificationResult(null)
    setUserAgreed(null)
    setServerMessage(null)
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">Add New Activity</h1>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Enter activity details and let the AI classifier identify relevant SDGs.
        </p>

        {/* Status Messages */}
        {serverMessage && (
          <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
            status === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <p className={status === 'success' ? 'text-green-700' : 'text-red-700'}>
              {serverMessage}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleClassify} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4" />
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              disabled={status === 'classified' || status === 'classifying'}
              placeholder="Enter the title of your project or publication"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4" />
              Description / Abstract <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={form.description}
              onChange={handleInputChange}
              disabled={status === 'classified' || status === 'classifying'}
              placeholder="Provide a detailed description of the activity for accurate SDG classification"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none disabled:bg-gray-100 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Activity Type */}
          <div>
            <label htmlFor="activity_type" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Target className="w-4 h-4" />
              Activity Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                form.activity_type === 'project' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${(status === 'classified' || status === 'classifying') ? 'opacity-60 cursor-not-allowed' : ''}`}>
                <input
                  type="radio"
                  name="activity_type"
                  value="project"
                  checked={form.activity_type === 'project'}
                  onChange={handleInputChange}
                  disabled={status === 'classified' || status === 'classifying'}
                  className="sr-only"
                />
                <span className="font-medium">Project</span>
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                form.activity_type === 'publication' 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${(status === 'classified' || status === 'classifying') ? 'opacity-60 cursor-not-allowed' : ''}`}>
                <input
                  type="radio"
                  name="activity_type"
                  value="publication"
                  checked={form.activity_type === 'publication'}
                  onChange={handleInputChange}
                  disabled={status === 'classified' || status === 'classifying'}
                  className="sr-only"
                />
                <span className="font-medium">Publication</span>
              </label>
            </div>
          </div>

          {/* Lead Author Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Author Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lead_author_username" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4" />
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lead_author_username"
                  name="lead_author_username"
                  value={form.lead_author_username}
                  onChange={handleInputChange}
                  disabled={status === 'classified' || status === 'classifying'}
                  placeholder="Enter author username"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 ${
                    errors.lead_author_username ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lead_author_username && <p className="mt-1 text-sm text-red-600">{errors.lead_author_username}</p>}
              </div>
              <div>
                <label htmlFor="lead_author_email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="lead_author_email"
                  name="lead_author_email"
                  value={form.lead_author_email}
                  onChange={handleInputChange}
                  disabled={status === 'classified' || status === 'classifying'}
                  placeholder="author@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 ${
                    errors.lead_author_email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lead_author_email && <p className="mt-1 text-sm text-red-600">{errors.lead_author_email}</p>}
              </div>
            </div>
          </div>

          {/* Classify Button */}
          {status !== 'classified' && status !== 'success' && (
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === 'classifying'}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {status === 'classifying' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Classifying with AI...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Classify Activity
                  </>
                )}
              </button>
            </div>
          )}
        </form>

        {/* Classification Results */}
        {status === 'classified' && classificationResult && (
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                AI Classification Results
              </h2>
              <button
                onClick={handleReclassify}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Edit & Re-classify
              </button>
            </div>

            {/* SDG Classifications */}
            <div className="space-y-4">
              {(classificationResult.sdg_impacts || []).map((impact, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100"
                >
                  {/* SDG Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                      {impact.sdg_goal_detail?.number || impact.sdg_goal}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        SDG {impact.sdg_goal_detail?.number || impact.sdg_goal}: {impact.sdg_goal_detail?.name || `Goal ${impact.sdg_goal}`}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {impact.sdg_goal_detail?.description || 'Sustainable Development Goal'}
                      </p>
                    </div>
                    {/* Score Badge */}
                    <div className="text-right">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-lg ${
                        impact.score >= 80 ? 'bg-green-100 text-green-700' :
                        impact.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {impact.score}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Relevance Score</p>
                    </div>
                  </div>

                  {/* Justification */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">Justification:</p>
                    <p className="text-gray-600">{impact.justification}</p>
                  </div>

                  {/* SDG Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500">SDG Goal</p>
                      <p className="font-bold text-blue-600">{impact.sdg_goal}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500">Number</p>
                      <p className="font-bold text-purple-600">{impact.sdg_goal_detail?.number || impact.sdg_goal}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500">Score</p>
                      <p className="font-bold text-green-600">{impact.score}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500">Classification</p>
                      <p className="font-bold text-orange-600">AI</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Agreement Section */}
            <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">Do you agree with this classification?</h3>
              
              {userAgreed === null ? (
                <div className="flex gap-4">
                  <button
                    onClick={handleAgree}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Yes, I Agree
                  </button>
                  <button
                    onClick={handleDisagree}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    No, I Disagree
                  </button>
                </div>
              ) : (
                <div className={`flex items-center gap-3 p-4 rounded-lg ${
                  userAgreed ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                }`}>
                  {userAgreed ? (
                    <>
                      <ThumbsUp className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-medium">You agreed with the classification</span>
                    </>
                  ) : (
                    <>
                      <ThumbsDown className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 font-medium">You disagreed with the classification</span>
                    </>
                  )}
                  <button
                    onClick={() => setUserAgreed(null)}
                    className="ml-auto text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* Final Submit / Reset Buttons */}
            {userAgreed !== null && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleSubmitFinal}
                  disabled={status === 'submitting'}
                  className="flex-1 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Submit Activity
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div className="mt-8 text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Activity Submitted Successfully!</h2>
            <p className="text-gray-600">Your activity has been recorded and classified.</p>
          </div>
        )}
      </div>
    </div>
  )
}
