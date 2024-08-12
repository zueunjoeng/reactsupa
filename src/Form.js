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
      alert('Data inserted successfully!');
    } catch (error) {
      console.error('Error inserting data:', error.message);
    }
  };

  return (
    <>
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
              <option value='wk'>산책</option>
              <option value='wb'>목욕</option>
              <option value='wh'>건강검진</option>
              <option value='wc'>돌봄</option>
              <option value='wt'>상담 후 결정</option>
            </select>
          </li>
          <li>
            <label>날짜</label>
            <input type='date' name='w_day' onChange={handleChange} value={formData.w_day} />
          </li>
        </ul>
        <button type='submit'>제출</button>
      </form>
    </>
  );
};

export default ConsultationForm;
