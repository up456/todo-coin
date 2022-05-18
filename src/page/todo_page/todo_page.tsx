import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeData, TypeChangeTodoState, UserIdContext } from '../../App';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Line from '../../components/line/line';
import SelectBox from '../../components/select_box/select_box';
import Todo from '../../components/todo/todo';
import styles from './todo_page.module.css';
import btnStyles from '../../components/button/button.module.css';

// constants
const SORT_OPTION_LIST = [
  { text: '등록 순', value: 'default' },
  { text: '데드라인 순', value: 'deadlineSort' },
];

// 타입
interface TypeHompPage {
  data: TypeData;
  changeTodoState: TypeChangeTodoState;
}

// 컴포넌트
const TodoPage = ({ data, changeTodoState }: TypeHompPage) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState('dafault');
  const { date } = useParams();
  const dateData = date || '';

  const userId = useContext(UserIdContext);
  const categoryList = data[userId]?.record[dateData]?.categoryList || [];
  const todoListData = data[userId]?.record[dateData]?.todoList;
  const [rawData, setRawData] = useState(todoListData);
  const [seletedCategoryList, setSeletedCategoryList] = useState<string[]>([]);
  const [isAll, setIsAll] = useState(true);

  const selectCategory = (category: string) => {
    if (!seletedCategoryList.includes(category)) {
      setSeletedCategoryList((prevSeletedCategoryList) => {
        const newSeletedCategoryList = [...prevSeletedCategoryList, category];
        return newSeletedCategoryList;
      });
    } else {
      setSeletedCategoryList((prevSeletedCategoryList) => {
        const newSeletedCategoryList = [...prevSeletedCategoryList];
        return newSeletedCategoryList.filter((it) => it !== category);
      });
    }
  };

  const onClickCategory = () => {
    const $buttons = document.querySelectorAll('button');
    const isReverse = $buttons[2].className.split(' ').length;
    if (isReverse === 1) {
      $buttons[2].click();
    }
  };

  const onClickAll = () => {
    const $buttons = document.querySelectorAll(`button`);
    $buttons.forEach(($button, key) => {
      if (key > 2) {
        if ($buttons[key].className === `${btnStyles.btn}`) {
          $buttons[key].click();
        }
      }
    });
  };

  const getCompare = (sortType: string) => {
    let compare: (a: string, b: string) => 1 | -1;
    switch (sortType) {
      case 'deadlineSort':
        const deadlineCompare = (a: string, b: string) => {
          if (rawData[a].deadline < rawData[b].deadline) {
            return -1;
          } else {
            return 1;
          }
        };
        compare = deadlineCompare;
        break;
      default:
        const defaultCompare = (a: string, b: string) => {
          if (a < b) {
            return -1;
          } else {
            return 1;
          }
        };
        compare = defaultCompare;
        break;
    }
    return compare;
  };

  return (
    <>
      <section className={styles.todoPage}>
        <Header data={data} />
        <div className={styles.todoContent}>
          <section className={styles.contentHeader}>
            <div className={styles.pageBtnContainer}>
              <Button text="달력 보기" onClick={() => navigate('/calendar')} />
              <Button
                text="할일 추가하기"
                onClick={() => navigate(`/${date}/addTodo`)}
              />
            </div>
            <div className={styles.controlMenu}>
              <SelectBox
                value={sort}
                optionList={SORT_OPTION_LIST}
                onChange={(item) => {
                  setSort(item);
                }}
              />
              <Button
                isToggle={true}
                text="전체"
                onClick={() => {
                  setIsAll(!isAll);
                  onClickAll();
                }}
              />
              {Array.from(categoryList).map((category, idx) => (
                <Button
                  typeReverse={true}
                  isToggle={true}
                  key={idx}
                  text={category || '미지정'}
                  onClick={() => {
                    if (isAll) {
                      setIsAll(false);
                      onClickCategory();
                    }
                    selectCategory(category);
                  }}
                />
              ))}
            </div>
          </section>
          <Line />
          <ul className={styles.todoList}>
            {rawData &&
              Object.keys(rawData)
                .sort(getCompare(sort))
                .map((key) => {
                  if (!isAll) {
                    if (!seletedCategoryList.includes(rawData[key].category))
                      return null;
                  }
                  return (
                    <Todo
                      key={key}
                      todo={rawData[key]}
                      changeTodoState={changeTodoState}
                      date={dateData}
                      todoId={key}
                    />
                  );
                })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default TodoPage;
