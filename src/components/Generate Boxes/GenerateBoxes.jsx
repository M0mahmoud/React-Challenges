import { useCallback, useState } from "react";

import styles from "./GenerateBoxes.module.css";

const GenerateBoxes = () => {
  const [boxes, setBoxes] = useState(["1", "2", "3"]);

  const addBox = useCallback(
    (index) => {
      const newValue = boxes.length + 1;
      setBoxes((prevBoxes) =>
        [
          ...prevBoxes.slice(0, index + 1),
          newValue.toString(),
          ...prevBoxes.slice(index + 1),
        ].sort((a, b) => Number(a) - Number(b))
      ); // sort the array after adding the new value
    },
    [boxes]
  );

  return (
    <>
      <h1>Add Box While Click Between Two Boxes</h1>
      <div className={styles.boxes}>
        {boxes.map((box, index) => (
          <div className={styles.box} key={box}>
            <div>{box}</div>
            {index !== boxes.length - 1 ? (
              <span className={styles.mid} onClick={() => addBox(index)} />
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};

export default GenerateBoxes;
