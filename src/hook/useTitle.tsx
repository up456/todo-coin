import React, { useEffect, useState } from 'react';

const UseTitle = (initialTitle: string) => {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const $title = document.querySelector('title');
    if ($title) {
      $title.textContent = title;
    } else return;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};

export default UseTitle;
