import React, { useContext, useEffect, useState } from 'react';
import backend from '../request/axios';
import { Puff } from 'react-loader-spinner';
import { ThemeContext } from '../App';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    setLoading(true)
    axios.get('https://json-api.uz/api/project/blog-api/articles')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, []);

  return (
    <div className="bg-white dark:bg-black px-5 py-10 min-h-screen text-black dark:text-white">
      <h1 className="mb-5 font-medium text-2xl">Articles</h1>
      {
        loading ?
          <div className="flex justify-center items-center mb-20 pt-[200px] w-full h-full max-h-[500px]">
            <Puff
              visible={true}
              height="80"
              width="80"
              color={theme === 'light' ? '#000' : '#fff'}
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperclassName=""
            />
          </div>
          :
          <div className="flex flex-col gap-4">
            {
              data.length > 0 && data.map((val, idx) => (
                <div key={idx} className="flex gap-2 p-3 border rounded-md">
                  <div className="w-[50%]">
                    <span className="block text-[8px] text-gray-600 dark:text-gray-300">Published: {new Date(val.time).toLocaleDateString()}</span>
                    <h3 className="mt-1 font-semibold text-sm">{val.title}</h3>
                    <p className="mt-1 text-[12px]">{val.description}</p>
                    <p className="mt-1 text-[10px] text-gray-600 dark:text-gray-500">{val.fullDescription}</p>
                  </div>
                  <div className="pl-4 border-l w-[50%]">
                    <h4 className="mb-2 font-medium text-sm">Comments</h4>
                    <div className="space-y-3 scrollbar-hidden max-h-40 overflow-y-auto">
                      {
                        val.comments && val.comments.length > 0 ? val.comments.map((value, index) => (
                          <div key={index} className="flex flex-col gap-1 bg-gray-50 dark:bg-[#121212] shadow-sm p-2 border rounded-md">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              {new Date(value.time).toLocaleDateString()} , {new Date(value.time).toLocaleTimeString()}
                            </span>
                            <h5 className="font-semibold text-blue-600 text-sm dark:text-blue-400">{value.username}</h5>
                            <p className="text-[12px] text-gray-700 dark:text-gray-300">{value.text}</p>
                          </div>
                        )) : (
                          <p className="text-gray-500 text-sm dark:text-gray-400">No comments yet.</p>
                        )
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
      }
    </div>
  );
}

export default Home;