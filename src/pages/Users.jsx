import React, { useContext, useEffect, useState } from 'react';
import backend from '../request/axios';
import { ThemeContext } from '../App';
import { Puff } from 'react-loader-spinner';

function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    backend.get('/users')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error.response?.data?.message || error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='bg-white dark:bg-black p-8 text-gray-800 dark:text-gray-100' >
      <h1 className="mb-8 font-bold text-3xl text-center">User List</h1>
      {
        loading ? (
          <div className="flex justify-center items-center mb-20 pt-[200px] w-full h-full max-h-[500px]">
            <Puff
              visible={true}
              height="80"
              width="80"
              color={theme === 'light' ? '#000' : '#fff'}
              ariaLabel="puff-loading"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data.length > 0 ? (
              data.map((user, idx) => (
                <div key={idx} className='flex justify-between items-center bg-white dark:bg-black shadow-lg p-4 border rounded-lg transition-all duration-300 cursor-pointer'>
                  <h2 className="font-semibold text-xl">{user.username}</h2>
                  <p className="text-gray-500 text-sm">{user.type}</p>
                  <div className="text-sm">
                    <span className="font-medium">Password:</span> {user.password}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-lg">No users found.</p>
            )}
          </div>
        )
      }
    </div >
  );
}

export default React.memo(Users);