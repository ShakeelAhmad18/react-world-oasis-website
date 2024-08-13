import {Link} from 'react-router-dom'

function LoginMessage() {
    return (
      <div className='grid bg-primary-800 '>
        <p className='text-center text-xl py-12 self-center'>
          Please{' '}
          <Link to='/login' className='underline text-accent-500'>
            login
          </Link>{' '}
          to reserve this
          <br /> cabin right now
        </p>
      </div>
    );
  }
  
  export default LoginMessage;

  