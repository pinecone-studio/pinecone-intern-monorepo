import LoginPageLogo from '../../../public/assets/LoginPageLogo'
import LoginForm from './_feature/LoginForm'

const page = () => {
  return (
    <div className=' w-full h-full flex' >
      <div className=' w-1/2 h-[100vh] flex  justify-center items-center '>
      <LoginForm/>
      </div>
      <div className=' w-1/2 h-[100vh] flex justify-center items-center bg-black '>
        <div >
  <LoginPageLogo/>
        </div>
      </div>

    </div>
  )
}

export default page