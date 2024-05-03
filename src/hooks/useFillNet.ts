export const useFillNet = () => {
  const fillNet = () => {
    let len: number = 0;

    const genRandomArray = () => {
      let result: number[] = [];

      for (let j = 0; j < len; j++) {
        let _num = Math.ceil(Math.random() * 2) - 1;

        if (_num === 1 && result.includes(1)) {
          result.push(0);

          continue;
        }

        if (j === len - 1 && !result.includes(1)) {
          result.push(1);

          continue;
        }

        result.push(_num);
      }

      return result;
    };

    for (let i = 0; i < 5; i++) {
      let _data = JSON.parse(localStorage.getItem(String(i)) || "[]");

      if (_data.length) len = Math.max(len, _data.length);

      if (!_data.length) {
        localStorage.setItem(String(i), JSON.stringify(genRandomArray()));
      }
    }
  };

  return { fillNet };
};
