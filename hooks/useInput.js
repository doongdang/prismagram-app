import React, { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (text) => {
    setValue(text);
  };
  // 처음에 initialValue로 value 값을 초기화 해두고 text를 받아와서 onChange 함수를 통해 value값을 text로 설정해줌
  return { value, onChange };
};

export default useInput;
