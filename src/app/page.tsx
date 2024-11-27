'use client';
import axios from 'axios';
import Image from "next/image";
import { useEffect, useState } from 'react';

interface Image {
  createdAt: string;
  id: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  publishedAt: string;
  revisedAt: string;
  text: string;
  title: string;
  updatedAt: string;
}

export default function Home() {
  const [data, setData] = useState<Image[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/microCMS');
        setData(response.data.contents);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axiosのエラーが発生しました:', error);
        } else {
          console.error('Axios以外のエラーが発生しました:', error);
        }
      }
    };

    getData();
  }, []);

  return (
      <main>
        {data.length > 0 && (
            <main>
              <div className='flex'>
                {data.map((item, index) => (
                    <div key={index} className='flex-grow'>
                      <h3>{item.title}</h3>
                      <Image
                          src={item.image.url}
                          alt={item.title}
                          width={200}
                          height={100}
                          priority
                      />
                      <p>{item.text}</p>
                    </div>
                ))}
              </div>
            </main>
        )}
      </main>
  );
}