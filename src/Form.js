import React, { useState } from 'react';
import { supabase } from './db/supabaseClient';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    w_name: '',
    w_ph: '',
    w_address: '',
    w_time: '',
    w_animaltype: 'd',  // 초기값 설정
    w_numberofpets: 1,
    w_service: 'wj',
    w_day: ''
  });

  const [fs, setFS] = useState(true); // 폼 표시 여부
  const [submittedData, setSubmittedData] = useState(null); // 제출된 데이터 저장

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('petopiaform')
        .insert([formData]);

      if (error) throw error;

      // 제출된 데이터를 상태에 저장
      setSubmittedData(formData);
      alert('Data inserted successfully!');
      setFS(false); // 데이터 삽입 후 fs 상태를 변경
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };

  const submitdata = submittedData ? Object.entries(submittedData) : [];

  return (
    <>
      { 
        fs ? (
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <label>성함</label>
                <input name='w_name' onChange={handleChange} value={formData.w_name} />
              </li>
              <li>
                <label>전화번호</label>
                <input name='w_ph' onChange={handleChange} value={formData.w_ph} />
              </li>
              <li>
                <label>주소</label>
                <input name='w_address' onChange={handleChange} value={formData.w_address} />
              </li>
              <li>
                <label>시간</label>
                <input name='w_time' onChange={handleChange} value={formData.w_time} />
              </li>
              <li>
                <label>동물 종류</label>
                <select name='w_animaltype' onChange={handleChange} value={formData.w_animaltype}>
                  <option value='d'>강아지</option>
                  <option value='c'>고양이</option>
                  <option value='a'>둘 다</option>
                </select>
              </li>
              <li>
                <label>반려동물 수</label>
                <input
                  type='number'
                  name='w_numberofpets'
                  onChange={handleChange}
                  value={formData.w_numberofpets}
                  min='1'
                  max='6'
                />
              </li>
              <li>
                <label>서비스</label>
                <select name='w_service' onChange={handleChange} value={formData.w_service}>
                  <option value='wj'>산책</option>
                  <option value='wb'>목욕</option>
                  <option value='wh'>건강검진</option>
                  <option value='wc'>돌봄</option>
                </select>
              </li>
              <li>
                <label>날짜</label>
                <input type='date' name='w_day' onChange={handleChange} value={formData.w_day} />
              </li>
            </ul>
            <button type='submit'>제출</button>
          </form>
        ) : (
          <div>
            <h2>제출된 정보</h2>
            <ul>
            {submitdata.map(([ele, value]) => (
                <li key={ele}>
                  {ele}: {value}
                </li>
              ))}
            </ul>
            <button onClick={() => setFS(true)}>폼으로 돌아가기</button>
          </div>
        )
      }
    </>
  );
};

export default ConsultationForm;
