'use client'
import { useCompleteSignupMutation } from "@/generated";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const StepThree = () => {
const [completeSignup, {loading}] = useCompleteSignupMutation();
const [error, setError] = useState('')
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const router = useRouter()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if(password !== confirmPassword) {
    setError("passwords do not match")
    return }
  const email = localStorage.getItem('email');
  if (!email) {
    setError("email not found")
    return;
  }

  try {
    await completeSignup({
      variables: { email, password },
    });
    localStorage.removeItem('email'); 
    router.push('/')
  } catch (err) {
    console.error('Complete signup failed', err);
    setError("failed to set password")
  } 

}
  return(
    <>
    <form  onSubmit={handleSubmit} className="space-y-5" data-cy="step-three-form">

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          data-cy="password-input"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="••••••••"
          required
        />
      </div>

      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm password
        </label>
        <input
          data-cy="confirm-password-input"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="••••••••"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm" >{error}</p>}

      <button
        data-cy="submit-button"
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Continue'}
      </button>
    </form>
    </>
  )
}
