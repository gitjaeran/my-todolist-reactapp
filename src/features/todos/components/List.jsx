import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleStatusTodo,
  __getTodos,
} from "../../../redux/modules/todosSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const List = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector(state => {
    //영상에서는 reducer이름이 todosSlice,
    //찍히는 값도 todosSlice인데
    //왜 영상에서는 state.todos로 찍는지?
    //createSlice() 안의 name이 todos라서? -> 나는 undefined로 찍힘!!
    console.log(state, "state");
    console.log(state.todosSlice.todos, "state.todosSlice.todos");
    console.log(state.todos, "state.todos");
    return state.todosSlice;
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  // const onDeleteTodo = id => {
  //   dispatch(deleteTodo(id));
  // };

  // const onToggleStatusTodo = id => {
  //   dispatch(toggleStatusTodo(id));
  // };

  return (
    <div>
      {todos.map(todo => {
        return <div key={todo.id}>{todo.title}</div>;
      })}
    </div>
    // <StListContainer>
    //   <h2>Working.. 🔥</h2>
    //   <StListWrapper>
    //     {todos.map(todo => {
    //       if (!todo.isDone) {
    //         return (
    //           <StTodoContainer key={todo.id}>
    //             <StLink to={`/${todo.id}`} key={todo.id}>
    //               <div>상세보기</div>
    //             </StLink>
    //             <div>
    //               <h2 className="todo-title">{todo.title}</h2>
    //               <div>{todo.body}</div>
    //             </div>
    //             <StDialogFooter>
    //               <StButton
    //                 borderColor="red"
    //                 onClick={() => onDeleteTodo(todo.id)}
    //               >
    //                 삭제하기
    //               </StButton>
    //               <StButton
    //                 borderColor="green"
    //                 onClick={() => onToggleStatusTodo(todo.id)}
    //               >
    //                 {todo.isDone ? "취소!" : "완료!"}
    //               </StButton>
    //             </StDialogFooter>
    //           </StTodoContainer>
    //         );
    //       } else {
    //         return null;
    //       }
    //     })}
    //   </StListWrapper>
    //   <h2 className="list-title">Done..! 🎉</h2>
    //   <StListWrapper>
    //     {todos.map(todo => {
    //       if (todo.isDone) {
    //         return (
    //           <StTodoContainer key={todo.id}>
    //             <StLink to={`/${todo.id}`} key={todo.id}>
    //               <div>상세보기</div>
    //             </StLink>
    //             <div>
    //               <h2 className="todo-title">{todo.title}</h2>
    //               <div>{todo.body}</div>
    //             </div>
    //             <StDialogFooter>
    //               <StButton
    //                 borderColor="red"
    //                 onClick={() => onDeleteTodo(todo.id)}
    //               >
    //                 삭제하기
    //               </StButton>
    //               <StButton
    //                 borderColor="green"
    //                 onClick={() => onToggleStatusTodo(todo.id)}
    //               >
    //                 {todo.isDone ? "취소!" : "완료!"}
    //               </StButton>
    //             </StDialogFooter>
    //           </StTodoContainer>
    //         );
    //       } else {
    //         return null;
    //       }
    //     })}
    //   </StListWrapper>
    // </StListContainer>
  );
};

export default List;

const StListContainer = styled.div`
  padding: 0 24px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StTodoContainer = styled.div`
  width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

const StDialogFooter = styled.footer`
  display: flex;
  justify-content: end;
  padding: 12px;
  gap: 12px;
`;

const StButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
