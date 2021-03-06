import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TypeData, TypeChangeTodoState, UserIdContext } from '../../App';
import Button from '../../components/button/button';
import Header from '../../components/header/header';
import Line from '../../components/line/line';
import SelectBox from '../../components/select_box/select_box';
import Todo from '../../components/todo/todo';
import styles from './todo_page.module.css';
import btnStyles from '../../components/button/button.module.css';
import { callToday, isDayAfterTodayOrToday } from '../../util/calc';
import DbService from '../../service/dbService';
import UseTitle from '../../hook/useTitle';

// constants
const SORT_OPTION_LIST = [
  { text: '등록 순', value: 'default' },
  { text: '데드라인 순', value: 'deadlineSort' },
];
const SATISFACTION_OPTION_LIST = [
  { text: '만족도 : Nice', value: 3 },
  { text: '만족도 : Soso', value: 2 },
  { text: '만족도 : Bad', value: 1 },
];

// 타입
interface TypeHompPage {
  data: TypeData;
  changeTodoState: TypeChangeTodoState;
  dbService: DbService;
  deleteTodo: (date: string, todoId: string) => void;
}

export interface LocationState {
  [date: string]: string;
}

// 컴포넌트
const TodoPage = ({
  data,
  changeTodoState,
  dbService,
  deleteTodo,
}: TypeHompPage) => {
  const navigate = useNavigate();
  const [sort, setSort] = useState('dafault');
  const [satisfaction, setSatisfaction] = useState(3);
  const { date } = useParams();
  const dateData = date || '';
  UseTitle(`${date} 할일`);
  let record = data?.record?.[dateData];

  const categoryList = record?.categoryList || [];
  const todoListData = record?.todoList;
  const [rawData, setRawData] = useState(todoListData);
  const [seletedCategoryList, setSeletedCategoryList] = useState<string[]>([]);
  const [isAll, setIsAll] = useState(true);
  const userId = useContext(UserIdContext);

  useEffect(() => {
    setRawData(todoListData);
  }, [rawData, todoListData, data]);

  const selectCategory = useCallback(
    (category: string) => {
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
    },
    [seletedCategoryList]
  );

  const onClickCategory = useCallback(() => {
    const $buttons = document.querySelectorAll('button');
    $buttons.forEach(($button) => {
      if ($button.textContent === '전체') {
        $button.click();
        return;
      }
    });
  }, []);

  const onClickAll = useCallback(() => {
    const $buttons = document.querySelectorAll(`button`);
    let flag = false;

    $buttons.forEach(($button) => {
      if ($button.textContent === '전체') {
        flag = true;
        return;
      }
      if (flag) {
        if (
          $button.textContent !== '하루 완료하기' &&
          $button.className === `${btnStyles.btn}`
        ) {
          $button.click();
        }
      }
    });
  }, []);

  const getCompare = useCallback(
    (sortType: string) => {
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
    },
    [rawData]
  );

  const completeToday = () => {
    if (record) {
      if (
        window.confirm(
          `  ━━━━━━━━━하루종료━━━━━━━━━
   현재 todo의 상태로 하루를 종료하시겠습니까? 
    (하루 종류 후에는 편집이 ★불가능★합니다.)
  ━━━━━━━━━━━━━━━━━━━━━━`
        )
      ) {
        record.satisfaction = satisfaction;
        dbService.saveRecord(userId, dateData, record);
        navigate(-1);
      }
    } else {
      alert('하루를 완료 할 데이터가 없습니다.');
    }
  };

  const isCompleteBtnPossible = useCallback(() => {
    if (record) {
      return callToday() === date && record.satisfaction === 0;
    } else {
      return false;
    }
  }, [date, record]);

  const isCUDBtnPossible = useCallback(() => {
    // 오늘 미만이면 불가능
    if (!isDayAfterTodayOrToday(date || '')) {
      return false;
    }
    // 기록이 없으면 생성가능
    if (record) {
      // 기록에서 만족도가 0이면 아직 하루를 완료하지 않은 상태
      if (record.satisfaction === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }, [date, record]);

  const goToCalendar = useCallback(() => navigate('/calendar'), [navigate]);
  const goToAddTodo = useCallback(
    () => navigate(`/${date}/addTodo`),
    [date, navigate]
  );

  const playClickAll = useCallback(() => {
    setIsAll(!isAll);
    onClickAll();
  }, [isAll, onClickAll]);

  const selectSatisfaction = useCallback(
    (starValue: string) => setSatisfaction(parseInt(starValue)),
    []
  );
  const selectSort = useCallback((sortWord: string) => {
    setSort(sortWord);
  }, []);

  return (
    <section className={styles.todoPage}>
      <Header data={data} />
      <div className={styles.todoContent}>
        <section className={styles.contentHeader}>
          <div className={styles.pageBtnContainer}>
            <Button text="달력 보기" onClick={goToCalendar} />
            {isCUDBtnPossible() && (
              <>
                <div className={styles.btnGap}></div>
                <Button text="할일 추가하기" onClick={goToAddTodo} />
              </>
            )}
          </div>
          <div className={styles.controlMenu}>
            <SelectBox
              value={sort}
              optionList={SORT_OPTION_LIST}
              onChange={selectSort}
            />
            <Button isToggle={true} text="전체" onClick={playClickAll} />
            {categoryList.map((category, idx) => (
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
          <Line mB="6px" />
        </section>

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
                    isBtnPossible={isCUDBtnPossible()}
                    deleteTodo={deleteTodo}
                  />
                );
              })}
        </ul>
        {!record && <div className={styles.noData}>todo를 추가하세요~!</div>}
      </div>
      {isCompleteBtnPossible() && (
        <div className={styles.footerContainer}>
          <Line mT="-6px" />
          <section className={styles.contentFooter}>
            <SelectBox
              value={satisfaction}
              onChange={selectSatisfaction}
              optionList={SATISFACTION_OPTION_LIST}
            />
            <Button text={'하루 완료하기'} onClick={completeToday} />
          </section>
        </div>
      )}
    </section>
  );
};

export default TodoPage;
